import { useEffect, useState } from 'react'
import { isEqual } from 'date-fns'
import axios from 'axios'

import Icon from '../../utilities/Icon'
import Input from '../../utilities/Input'
import Switch from '../../utilities/Switch'
import Dropdown from '../../utilities/Dropdown'
import Button from '../../utilities/Button'

const MakeCalendar = ({ setOpen }) => {

    const [endDate, setEndDate] = useState(null)
    const [submit, setSubmit] = useState(false)
    const [startDate, setStartDate] = useState(null)
    const [isSaturdayHoliday, setSaturdayHoliday] = useState(true)
    const [min, setMin] = useState()

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_URL + "/admin/calendar/minmaxdate")
            .then(response => {
                let tomorrow = new Date(response.data.max)
                let result = new Date(tomorrow.setDate(tomorrow.getDate() + 1))
                setMin(result.toISOString().split('T')[0])
                setStartDate(result.toISOString().split('T')[0])
            }).catch(err => console.log(err.message))

    }, [])

    useEffect(() => {
        if (submit) {
            let data = { from: startDate, to: endDate, isSaturdayHoliday: isSaturdayHoliday }
            axios.post(process.env.NEXT_PUBLIC_URL + "/admin/calendar/create", data)
                .then(response => {
                    setSubmit(false)
                    setOpen(false)
                }).catch(err => console.log(err.message))
        }
    }, [submit]);

    return (
        <div className="absolute border z-20 w-1/3 bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute text-slate-400 cursor-pointer hover:text-red-500 top-4 right-2" onClick={() => setOpen(false)}>
                <Icon name="close" />
            </div>
            <div className="text-xl font-bold w-fit m-auto my-4">Add Calendar</div><hr />
            <div className="flex items-center space-x-4 justify-center w-fit mx-auto m-5">
                <label className="text-sm">Start Date</label>
                <Input name="" type="date" min={min} color="blue" value={startDate} update={setStartDate} />
                <label className="text-sm ">End Date</label>
                <Input name="" type="date" min={min} color="blue" value={endDate} update={setEndDate} />
            </div>
            <div className="flex space-x-2 mb-2 justify-center">
                <div className="text-sm pt-1">Is Saturday Holiday ?</div>
                <Switch initial={isSaturdayHoliday} toggle={setSaturdayHoliday} />
            </div>
            <hr />
            <div onClick={() => setSubmit(true)} className={`py-2 px-2 rounded-md cursor-pointer font-semibold text-sm m-4 text-center items-center text-white ${submit ? "bg-slate-400" : "bg-blue-500"}`} disabled={submit ? "disabled" : ""}>
                Create
            </div>
        </div>)

}

const About = ({ selectedDay, months, batches: defaultBatches }) => {
    const [isWorkingDay, setWorkingDay] = useState(selectedDay.isWorkingDay)
    const [isEdit, setEdit] = useState(true)
    const [save, setSave] = useState(false)
    const [isfuture, setfuture] = useState(false)
    const [ batches, setBatches ] = useState(defaultBatches.map(doc => ({ check: selectedDay.batches ? selectedDay.batches.includes(doc) : false, batch: doc }) ))
    const [order, setOrder] = useState(selectedDay.order)

    useEffect(() => {
        let currentDate = new Date(selectedDay.date).toDateString()
        let today = new Date().toDateString()
        let future = new Date(currentDate) > new Date(today)
        setEdit(true)
        setOrder(selectedDay.order ?? 1)
        setBatches(defaultBatches.map(doc => ({ check:selectedDay.batches ? selectedDay.batches.includes(doc) : false, batch: doc }) ))
        setWorkingDay(selectedDay.isWorkingDay)
        setfuture(future)
    }, [selectedDay])

    useEffect(() => {
        if (save) {
            selectedDay.isWorkingDay = isWorkingDay
            let data = { date: selectedDay.date, order, batches: isWorkingDay ?  batches.map(doc => doc.check ? doc.batch : false).filter(doc => doc) : [], isWorkingDay: isWorkingDay }
            axios.put(process.env.NEXT_PUBLIC_URL + "/admin/calendar/workingday", data)
                .then(response=> setSave(false))
                .catch(err => console.log(err.message))
        }
    }, [save])

    let date = selectedDay.date.split("T")[0].split("-")
    date = months[selectedDay.month] + " " + date[2] + ",  " + date[0]
    return (
        selectedDay.day != 0 ? <>
            <div className='h-2/3'>
                <div className={`text-lg font-semibold text-${!isfuture ? "slate-500" : "blue-500"} flex justify-around ml-2 p-1 mt-10 `}>
                    {date}
                    {isfuture && <div onClick={() => { setEdit(!isEdit) }} className={` w-fit cursor-pointer rounded-lg text-m ${isEdit ? "text-blue-500" : "text-red-500"}`}>
                        <Icon name={isEdit ? "edit" : "close"} />
                    </div>}
                </div>
                <div className='flex justify-around items-center py-5'>
                    <label className='text-m'>Working Day</label>
                    <Switch initial={isWorkingDay} toggle={setWorkingDay} editable={!isEdit} />
                    {/* <input name="workingDay" className="p-5 m-2" disabled={!isEdit ? "" : "disabled"} checked={isWorkingDay} type="checkbox" onChange={(e) => setWorkingDay(e.target.checked)}/> */}
                </div>
                <div className='flex justify-around py-5 text-m items-center'>
                    <label>Order</label>
                    {isEdit ? <label>{selectedDay.order ?? "--null--"}</label> : <Dropdown name="" data={[1, 2, 3, 4, 5]} update={setOrder} special initial={selectedDay.order ?? 1} />}
                </div>
                <div className='flex justify-around py-5'>
                    <div>
                        <label className='text-xl justify-center flex pb-5'>Batches</label>
                        <div className="grid grid-cols-4 gap-4">
                            {
                                batches.map((batch, idx) =>
                                    <>
                                    <div className="flex col-span-2 gap-2">
                                        {isEdit ? <Icon name={batch.check && "check"} ></Icon> :
                                            <input
                                                checked={batch.check}
                                                onChange={(e) => {
                                                    batches[idx].check = e.target.checked
                                                    setBatches([...batches])
                                                }}
                                                name={batch.batch} type="checkbox"></input>}
                                        <label>{batch.batch}</label>
                                    </div>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
                {!isEdit && <div className="w-full justify-center flex py-5">
                    <button onClick={() => { setSave(true); setEdit(true) }} className={`border w-2/5 p-2 rounded-lg font-medium text-m ${isEdit ? "border-blue-500 text-blue-500" : "bg-blue-500 text-white"}`}>{isEdit ? "Edit" : "Save"}</button>
                </div>}

            </div></> : <>
            <div className='h-full items-center justify-center flex text-2xl'>Sunday</div></>
    )
}

const DeclareHolidays = () => {
    return (
        <div>Declare Holidays</div>
    )
}

const ManageBatch = () => {
    return (
        <div>Manage batch</div>
    )
}


const ManageSaturday = ({ batches: defaultBatches }) => {

    let today = new Date()
    today = today.getFullYear() + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + today.getDate()

    const [ batches, setBatches ] = useState(defaultBatches.map(doc => ({ check: false, batch: doc }) ))
    const [ fromDate, setFromDate ] = useState(null)
    const [ toDate, setToDate ] = useState(null)
    const [ workingDay, setWorkingDay ] = useState(true)
    const [ maxDate, setMaxDate ] = useState(new Date())
    const [ save, setSave ] = useState(false)
    const [isEdit, setEdit] = useState(true)


    useEffect(() => {

        axios.get(process.env.NEXT_PUBLIC_URL + "/admin/calendar/minmaxdate")
            .then(response => {
                setMaxDate(response.data.max.split('T')[0])
            }).catch(err => console.log(err.message))

    }, [])

    useEffect(() => {

        if(save) {
            let data = { from: fromDate, to: toDate, batches: batches.map(doc => doc.check ? doc.batch : false).filter(doc => doc), isWorkingDay: workingDay, order: 1 }
            // console.log(data)
            // setSave(false)
            axios.put(process.env.NEXT_PUBLIC_URL + "/admin/calendar/manage/saturday", data)
                .then(response => {
                    setSave(false)
                    setEdit(true)})
                .catch(err => console.log(err.message))
        }

    }, [ save ])

    return (
        <div className="p-5 mt-12">
            <Input name="from" type="date" min={today} value={fromDate ?? today} update={e => setFromDate(e)} disabled={isEdit ? "disabled" : ""}/><br/>
            <Input name="to" type="date" max={maxDate} value={toDate} update={e => setToDate(e)} disabled={isEdit ? "disabled" : ""}/>
            <div className='flex justify-around items-center py-5'>
                <label className="text-sm">Working Day</label>
                <Switch initial={workingDay} toggle={setWorkingDay} editable={!isEdit}/>
            </div>
            <div className="grid grid-cols-4 gap-4">
            { batches.map((batch, idx) =><>
                <div className="flex col-span-2 gap-2">
                    <input
                        checked={batch.check}
                        disabled={isEdit ? "disabled" : ""}
                        onChange={(e) => { batches[idx].check = e.target.checked; setBatches([...batches]) }}
                        name={batch.batch} type="checkbox" />
                    <label>{batch.batch}</label>
                </div></>
            )}
            </div>
            <div className="m-auto w-fit mt-5 ">
                {!isEdit ? <><Button name="Save" color="blue" event={() => setSave(true)}/><Button  name="Cancel" color="red" event={() => setEdit(true)}/></> :
                <Button name="Edit" color="blue" outline event={() => setEdit(false)} />}
            </div>
        </div>

    )
}


const Calendar = () => {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let actions = ["About", "Manage Saturday", "Declare Holidays", "Manage Batch"]

    const [expand, setExpand] = useState(false)
    const [action, setAction] = useState(actions[0])
    const [selectedDay, setSelectedDay] = useState(null)

    const [data, setData] = useState([])
    let [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    let [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    let [today, setToday] = useState(new Date())
    let [showCal, setShowCal] = useState(false)
    const [batches, setBatches] = useState([])

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_URL + "/admin/batch")
            .then(response => {
                let data = response.data.batches
                setBatches(data.slice(0, 4))
            })
    }, [])

    useEffect(() => {
        setData([])
        axios.get(process.env.NEXT_PUBLIC_URL + "/admin/calendar", { params: { year: currentYear } })
            .then(response => {
                setData(response.data)
                setSelectedDay(response.data.filter(doc => (new Date(doc.date).getDate() == today.getDate() && doc.month == today.getMonth() && doc.year == today.getFullYear()))[0]._id)
            })
            .catch(err => console.log(err.message))
    }, [currentYear])

    let calendar = []
    if (data.length != 0)
        for (let month = 0; month < 12; month++) {
            calendar.push(data.filter(doc => doc.month == month))
        }

    const previousMonth = () => {
        if (currentMonth == 0) {
            setCurrentYear(currentYear - 1)
            setCurrentMonth(11)
        } else setCurrentMonth(currentMonth - 1)
    }

    const nextMonth = () => {
        if (currentMonth == 11) {
            setCurrentYear(currentYear + 1)
            setCurrentMonth(0)
        } else setCurrentMonth(currentMonth + 1)
    }

    return (
        <div className="grid grid-cols-9 h-full pl-3">
            <div className="col-span-7 pr-10">
                <div className='flex justify-between'>
                    <div className="flex items-center">
                        <button type="button" onClick={() => previousMonth()} className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                            <Icon name="chevron_left" />
                        </button>
                        <h2 className="font-semibold text-gray-900 text-xl w-48 flex justify-center">{months[currentMonth] + " - " + currentYear}</h2>
                        <button type="button" onClick={() => nextMonth()} className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                            <Icon name="chevron_right" />
                        </button>
                    </div>
                    <div
                        onClick={() => setShowCal(true)}
                        className={`py-2 px-2 rounded-md cursor-pointer  text-lg m-4 text-center items-center hover:text-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white"`}
                    >
                        Create Calendar
                    </div>
                </div>
                <div className="grid grid-cols-7  mt-4 text-lg leading-6 text-center text-gray-500 font-bold">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <div>{day}</div>)}
                </div>
                <div className="grid grid-cols-7 mt-2 text-xl h-flex">
                    {
                        calendar.length > 0 ?
                            calendar[currentMonth].map((day, dayIdx) => {
                                let date = new Date(day.date)
                                let isSunday = day.day == 0 ? true : false
                                let isToday = isEqual(today.getDate(), date.getDate()) && isEqual(today.getFullYear(), date.getFullYear()) && isEqual(today.getMonth(), date.getMonth())
                                return (
                                    <Cell key={dayIdx} day={day} today={isToday} sunday={isSunday} update={setSelectedDay} selectedDay={selectedDay} />
                                )
                            })
                            : <div>Create calendar for this month </div>
                    }
                </div>
                {showCal && <MakeCalendar setOpen={setShowCal} />}
            </div>
            <div className='col-span-2 border p-10 rounded-lg group '>
                <div className="h-full">
                    <div className="border px-2 py-1 rounded h-12 group-hover:border-blue-400">
                        <div className="absolute text-m w-fit bg-white ml-[0.5px] px-1 -mt-4">Actions</div>
                        <div className="flex w-full justify-between text-m px-1 pt-2 cursor-pointer" onClick={() => setExpand(!expand)}>
                            {action}&nbsp;&nbsp;&nbsp;
                            <Icon name={`expand_${expand ? "less" : "more"}`} />
                        </div>
                        <ul className={`absolute max-h-64 overflow-auto overscroll-none z-10 bg-white rounded shadow px-2 py-1 -ml-1 mt-1 ${expand ? "" : "hidden"}`}>
                            {
                                actions.map((ele, idx) => <li key={idx} onClick={() => { setExpand(false); setAction(actions[idx]) }} className={`text-m cursor-pointer text-slate-400 hover:text-opacity-80 rounded p-1 my-1 hover:bg-blue-50 hover:text-blue-500 ${action == actions[idx] && "text-blue-500 bg-blue-50"}`}>{ele}</li>)
                            }
                        </ul>
                    </div>
                    {
                        data.length > 0 &&
                        <div className='h-5/6'>
                            {actions[0] == action && <About selectedDay={data.filter(doc => doc._id == selectedDay)[0]} months={months} batches={batches} />}
                            {actions[1] == action && <ManageSaturday batches={batches}/>}
                            {actions[2] == action && <DeclareHolidays />}
                            {actions[3] == action && <ManageBatch />}
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

const Cell = ({ day, today, sunday, update, selectedDay }) => {
    return (
        <div className={`h-28 group rounded-lg border relative col-start-${day.day + 1} ${today ? "border-blue-400" : ""} ${selectedDay == day._id && "bg-blue-50"} hover:bg-gray-50`} onDoubleClick={() => { update(day._id); }}>
            <div className={`w-full h-full flex justify-center items-center text-${!day.isWorkingDay ? "gray" : "blue"}-500`}>
                {(new Date(day.date)).getDate()}
            </div>

        </div>
    )
}

export default Calendar