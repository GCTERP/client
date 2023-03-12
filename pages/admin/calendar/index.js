import { useEffect, useState } from 'react'
import { isEqual } from 'date-fns'
import axios from 'axios'

import Icon from '../../../utilities/Icon'
import Input from '../../../utilities/Input'
import Switch from '../../../utilities/Switch'

const MakeCalendar = ({setOpen}) => {

    const [ endDate, setEndDate ] = useState(null)
    const [ submit, setSubmit ] = useState(false)
    const [ startDate, setStartDate ] = useState(null)
    const [ isSaturdayHoliday, setSaturdayHoliday ] = useState(true)
    const [ min, setMin ] = useState()

    useEffect(() => {

        axios.get(process.env.NEXT_PUBLIC_URL+"/admin/calendar/minmaxdate")
        .then( response =>{
            let tomorrow = new Date(response.data.max)
            let result = new Date(tomorrow.setDate(tomorrow.getDate() + 1))
            setMin(result.toISOString().split('T')[0])
            setStartDate(result.toISOString().split('T')[0])
        }).catch( err => console.log(err.message) )

    }, [])

    useEffect(() => {
        if(submit) {
            let data = { from: startDate, to: endDate, isSaturdayHoliday: isSaturdayHoliday }
            axios.post(process.env.NEXT_PUBLIC_URL+"/admin/calendar/create", data)
                .then( response => {
                    console.log(data)
                    setSubmit(false)
                    setOpen(false)
                }).catch( err => console.log(err.message) )
        }
    }, [ submit ]);
    
    return (
        <div className="absolute border z-20 w-1/3 bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute text-slate-400 hover:text-red-500 top-4 right-2" onClick={() => setOpen(false)}>
                <Icon name="close" />
            </div>
            <div className="text-xl font-bold w-fit m-auto my-4">Add Calendar</div><hr/>
            <div className="flex items-center space-x-4 justify-center w-fit mx-auto m-5">
                <label className="text-sm">Start Date</label>
                <Input name="" type="date" min={min} color="blue" value={startDate} update={setStartDate}/>
                <label className="text-sm ">End Date</label>
                <Input name="" type="date" min={min} color="blue" value={endDate} update={setEndDate}/>
            </div>
            <div className="flex space-x-2 mb-2 justify-center">
                <div className="text-sm pt-1">Is Saturday Holiday ?</div>            
                <Switch initial={isSaturdayHoliday} toggle={setSaturdayHoliday}/>
            </div>
            <hr/>
            <div onClick={() => setSubmit(true)} className={`py-2 px-2 rounded-md cursor-pointer font-semibold text-sm m-4 text-center items-center text-white ${submit ? "bg-slate-400" : "bg-blue-500" }`} disabled={submit ? "disabled" : ""}>
                Create
            </div>
        </div>)

}

const Calendar = () => {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const [ data, setData ] = useState([])
    let [ currentYear, setCurrentYear ] = useState(new Date().getFullYear())
    let [ currentMonth, setCurrentMonth ] = useState(new Date().getMonth())
    let [ today, setToday ] = useState(new Date())
    let [ showCal, setShowCal ] = useState(false)  

    useEffect( () => {
        setData([])
        axios.get(process.env.NEXT_PUBLIC_URL+"/admin/calendar", { params: { year: currentYear } })
            .then( response => setData(response.data) )
                .catch(err => console.log(err.message))
    }, [ currentYear ] )
    
    let calendar = []
    if(data.length!=0)
        for(let month=0; month<12; month++){
        calendar.push( data.filter( doc => doc.month == month ) )
        }

    const previousMonth = () => {
        if(currentMonth==0){
            setCurrentYear(currentYear-1)
            setCurrentMonth(11)
        }else setCurrentMonth(currentMonth-1)
    }

    const nextMonth = () => {
        if(currentMonth==11){
            setCurrentYear(currentYear+1)
            setCurrentMonth(0)
        }else setCurrentMonth(currentMonth+1)
    }

    return (
            <div className="w-5/6 h-full pt-5 pl-5">
            <div className='flex justify-between'>
                <div className="flex items-center">
                    <button type="button" onClick={() => previousMonth()} className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                        <Icon name="chevron_left"/>
                    </button>
                    <h2 className="font-semibold text-gray-900 pl-1 text-xl w-48 flex justify-center">{ months[currentMonth]+" - "+currentYear }</h2>
                    <button type="button" onClick={() => nextMonth()} className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                        <Icon name="chevron_right"/>
                    </button>
                </div>
                <div
                    onClick={() => setShowCal(true)}
                    className={`py-2 px-2 rounded-md cursor-pointer  text-lg m-4 text-center items-center hover:text-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white"`}
                >
                Create Calendar
                </div>
            </div>
            <div className="grid grid-cols-7 mt-4 text-lg leading-6 text-center text-gray-500 font-bold">
                { ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <div>{ day }</div>) }
            </div>
            <div className="grid grid-cols-7 mt-2 text-xl h-flex">
            {
                calendar.length>0 ?
                calendar[currentMonth].map((day, dayIdx) => {
                    let date = new Date(day.date)
                    let isSunday = day.day == 0 ? true: false
                    let isToday = isEqual(today.getDate(), date.getDate()) && isEqual(today.getFullYear(), date.getFullYear()) && isEqual(today.getMonth(), date.getMonth())
                    return (
                    <Cell key={dayIdx} day={day} today={isToday} sunday={isSunday}/>
                    )})
                    : <div>Create calendar for this month </div>
            }
            </div>
            { showCal && <MakeCalendar setOpen={setShowCal}/>}
        </div>
    )
}

const Cell = ({ day, today, sunday }) => {

    return (
        <div className={`w-full h-28 group rounded-lg border relative hover:bg-gray-50 col-start-${day.day + 1} ${today ? "border-blue-400" : ""}`}>
            { 
                !sunday &&
                <div className="absolute top-1 right-1 text-gray-500 hidden group-hover:block">
                    <Icon name="edit"/>
                </div> 
            }
            <div className={`w-full h-full flex justify-center items-center text-${!day.isWorkingDay ? "gray" : "blue"}-500`}>
                { (new Date(day.date)).getDate() }
            </div>
        </div>
    )
}

export default Calendar