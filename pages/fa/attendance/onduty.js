import { useEffect, useState } from "react"

import Button from "../../../utilities/Button"
import Calendar from "../../../utilities/Calendar"
import Dropdown from "../../../utilities/Dropdown"
import MultiSelect from "../../../utilities/MultiSelect"

import onDutyTestData from "../../../test/onDutyTestData"
import { setDate } from "date-fns"
import axios from "axios"

const OnDuty = () => {

    const [ data, setData ] = useState(null)
    const [ period, setPeriod ] = useState(null)
    const [odReq, setOdReq] = useState(null)
    const [ fields, setFields ] = useState(null)
    const [studentList, setStudentList] = useState([''])
    const [addPeriod, setAddPeriod] = useState([])
    const [addRegno, setAddRegno] = useState([])
    const [getDate, setDate] = useState("")
    const [apiDateFormat, setApiDateFormat] = useState("")
    const [dateFlag, setDateFlag] = useState(false)
    const [saveFlag, setSaveFlag] = useState(false)
    const [tableData, setTableData] = useState([''])

    const per = [1,2,3,4,5,6,7,8]

    useEffect(() => {
        if(dateFlag)
            axios.get(process.env.NEXT_PUBLIC_URL + '/fa/attendance?date=' + apiDateFormat + '&batch=2019&branch=Information Technology' )
            .then(response => {
                console.log(response.data)
                setTableData(response.data)

                setDateFlag(false)
            })
            .catch(err => console.log(err.message))

    }, [dateFlag])

    useEffect(() => {

        const studentList = [...new Set(tableData.map(course => course.register))];
        
        let random = {}, values = tableData, details = [], randomColor = {}
        console.log(tableData)
        for(let datum of studentList) {
            random[datum] = per.map(period => false)
            randomColor[datum] = per.map(period => false)
        }

        console.log(random)

        for(let obj of tableData) {
            random[obj['register']][obj['period'] -1] = obj['onduty'] && obj['present']  
            randomColor[obj['register']][obj['period'] -1] = obj['onduty'] && !(obj['present'])
        }

        console.log(random)

        for(let value of values) {
            let present = details.some(doc => doc.register == value.register)
            if(!present) details.push(value)
        }
        
        setPeriod({...random})
        setOdReq({...randomColor})
        setData(details)
        setFields(Object.keys(details[0]).filter(key => omitFields(key)))
        setStudentList(studentList)

    }, [tableData])

    useEffect(()=> {
        if(saveFlag){
            axios.post(process.env.NEXT_PUBLIC_URL + '/fa/attendance', tableData )
            .then(response => {
                console.log(response.data)
                setSaveFlag(false)
            })
            .catch(err => console.log(err.message))
        }
    }, [saveFlag])


    const omit = ["_id", "studentId", "present", "onduty", "masterTimetableId", "courseId", "courseCode", "branch", "batch", "date", "period", "__v", "createdAt", "updatedAt", "courseName"]
    const omitFields = (field) => !omit.some((item) => item == field)
    

    const periodAdd = () => {

        let periods = addPeriod.map(doc => doc.value)
        let register = addRegno.map(doc => doc.value)

        if(periods.length > 0 && register.length > 0)
            for(let reg of register)
                for(let per of periods)
                    period[reg][per - 1] = true
        
        if(periods.length > 0 && register.length > 0)
            setPeriod({...period})
    }

    const selectedDate = (date) => {
        setDate(date.toString().slice(4, 15))

        let format4 = date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0")
        console.log(format4)
        setApiDateFormat(format4)
        
        setDateFlag(true)
    }

    const cancelData = () => {

    }


    const saveData = () => {
        let random = period, values = tableData
        for(let obj of values) {
            if (random[obj['register']][obj['period'] -1]){
                obj['onduty'] = true
                obj['present'] = true
            }
        }
        console.log(values)
        setTableData(values)
        setSaveFlag(true)

    }

    return ((data && period) ?
        <>
        <div className="flex">
            { tableData.length > 0 ? 
            <div className="w-9/12">
                <div className="px-2 m-2">
                    <div className="flex">
                    <div className="w-1/4">
                    <h5 className="p-1">Date</h5>
                    <div className="text-slate-400 p-1">{getDate}</div>
                    </div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3">
                            <MultiSelect name = {'Period'} data = {['1', '2', '3', '4', '5', '6', '7', '8']} selectedData={setAddPeriod}/>            
                        </div>
                        <div className="w-1/3">
                            <MultiSelect name = {'Register Number'} data = {studentList} selectedData={setAddRegno}/>         
                        </div>
                        <div className="w-1/3 pt-2">
                            <Button color={'blue'} name={"Add"} icon={'add'} outline={false} event={() => periodAdd()} />
                        </div>
                    </div><br/>

                    <div className="relative p-1.5 w-fit inline-block align-middle">
                        <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                            <table className="min-w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                                <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                                    <tr>
                                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">S NO</th>
                                        {
                                            fields.map((heading, index) => (
                                                <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                            ))
                                        }
                                        {
                                            per.map((heading, index) => (
                                                <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {
                                        data.map((row, index) => ( 
                                        <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" >{index+1}</td>
                                            {
                                                fields.map((key, index) => (
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td> ))
                                            }
                                            {
                                                per.map((key, idx) => (
                                                    <td className="px-4 py-2 text-sm text-gray-800 whitespace-nowrap"  key={index + idx}>
                                                            <div className={odReq[row.register][idx] == true ? " border-2 rounded-full bg-amber-400 border-amber-500" : ""}>
                                                            <input class="m-2" name={row.register + "-" + idx} type="checkbox" checked={period[row.register][idx]} value={true} 
                                                                onChange={() => { 
                                                                    period[row.register][idx] = !period[row.register][idx]; 
                                                                    setPeriod({...period})
                                                                }}
                                                            />

                                                            </div>
                                                    </td>
                                                ))
                                            }
                                        </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div> 

                </div>
                    <div className="flex justify-end flex-row m-10">
                        <div className="mx-4 w-1/8">
                            <Button color={'blue'} name={"Cancel"} outline={true} event={cancelData} />
                        </div>
                        <div className="mx-4 w-1/6">
                            <Button color={'blue'} name={"Save"} outline={false} event={saveData} />
                        </div>
                    </div> 
            </div> : <div>Loading</div> }
                    <div className="w-3/12 border-l">
                    <div className="ml-6 flex flex-col h-screen">
                        <h4 className="pb-4">Calendar</h4>
                        <Calendar className="ml-2 flex-1" selectDate={selectedDate} />
                    </div>
                </div>
            </div>
            </>  : <div>"Loading"</div>        
    )
}

export default OnDuty