import Dropdown from "../../utilities/Dropdown"
import Table from "../../utilities/Table"
import Button from '../../utilities/Button'
import MultiSelect from '../../utilities/MultiSelect'
import tableSchedule from "../../test/tableSchedule"
import test from '../../test/timeTableTest'
import ttDataTest from '../../test/ttDataTest'
import { use, useEffect, useState } from "react"
import axios from "axios"
import Icon from "../../utilities/Icon"
import Input from "../../utilities/Input"

const EffectiveDate= ({ setOpen }) => {
    const [ submit, setSubmit ] = useState(false)
    const [date, setDate] = useState("")

    return (
        <div className="absolute w-3/12 z-40 border-x-2 bg-white rounded-lg  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute cursor-pointer text-red-500 top-4 right-2" onClick={() => setOpen(false)}>
            <Icon name="close" icon="close"/>
            </div>
            <div className="text-md font-bold w-fit m-auto my-3">Attendance effective from:</div>
            <div className="flex pl-14 space-x-4 justify-center w-fit m-4">
                <Input name="Date" type="date" color="blue"  update={setDate}/>
            </div>
           <hr/>
            <div onClick={() => setSubmit(true)} className={`py-4 px-3 rounded-md cursor-pointer font-semibold text-sm m-4 text-center items-center text-white ${submit ? "bg-slate-400" : "bg-blue-500"}`} disabled={submit ? "disabled" : ""}>Ok</div>
        </div>
    )
}

const Timetable = () => {
    const dtt = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    let test1 = test.map(doc => ({...doc}))

    const [ workout, setWorkout ] = useState([...test]) 

    // use States
    const [tableData, setTableData] = useState(ttDataTest.courses.filter(doc => doc.semester == 7))
    const [inorVar, setInorVar] = useState(ttDataTest.courses)
    const [open, setOpen] = useState(false)
    const [ submit, setSubmit ] = useState(false)
    const [effectiveDate, setEffectiveDate] = useState("")


    const [tableValue, setTableValue] = useState([...test])
    const [savedData, setSavedData] = useState(test)
    const [flag, setFlag] = useState(false)

    // const [tableData, setTableData] = useState(test)
    const [editBtn, setEditBtn] = useState(false)
    const [update, setUpdate] = useState(false)
    const [period, setPeriod] = useState([])
    const [courseCode, setCourseCode] = useState("");
    const [getCourseCodeData, setCourseCodeData] = useState([''])
    const [selectedPeriodList, setSelectedPeriodList] = useState([])
    const [previousTableData, setPreviousTableData] = useState(tableValue);
    const [branch, setBranch] = useState(['2023'])
    const [getSemester, setSemester] = useState(['7'])
    const [semester, setSelectedSemester] = useState(7)

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_URL + '/ttc/timetable', { params: { branch: "Information Technology" } })
        .then(response => {
            let data = response.data
            console.log(data)
            setTableData(data.courses.filter(doc => doc.semester == 7))

            const cc = [...new Set(data.courses.map(course => course.courseCode))];
            setCourseCodeData(cc)
        })
        .catch(err => console.log(err.message))
    },[])

    useEffect(() => {
        if(flag){            
            axios.post(process.env.NEXT_PUBLIC_URL + '/ttc/timetable', { ed: effectiveDate, branch: "Information Technology", data: savedData })
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err.message))
            setFlag(false)
        }
    }, [flag])

    //Get Semester      
    useEffect(() => {

        // const cc = [...new Set(tableData.map(course => course.courseCode))];
        // setCourseCodeData(cc)

        const semesterCodes = [...new Set(ttDataTest.sems.map(semester => semester.sem))];
        setSemester(semesterCodes)

        const periods = [];
                
        // for (const obj of tableData) {
        //     for (const key of Object.keys(obj)) {
        //         if (obj[key] === courseCode) {
        //             const val = obj["DayOrder"] + " " + key;
        //             periods.push(val);
        //         }
        //     }
        // }
        
        setPeriod(periods);
    
    }, [courseCode]);


    const selectedSemester = (data) => {
        setSelectedSemester(data)
        const b = ttDataTest.sems.map(semester => {
            if(semester.sem === data) return semester.batch
        })
        test1 = [...test]
        setBranch(b)

        setTableData(inorVar.filter(sem => sem.semester === data))

    }

    useEffect(()=>{

        let dummy = []

        // console.log(test)
        test1 = test.map(doc => ({...doc}))

        for(let course of tableData) {
            for(let cell of course.schedule) {
                let r = Math.floor(cell / 10), c = cell % 10
                test1[r - 1]["Period " + c] = course.courseCode
            }
        }
        dummy = [...test1]
        setTableValue([...dummy])

    }, [tableData])

    const selectedCourseCode = (data) => {
        setCourseCode(data);
    }

    const selectedBranch = (data) => {
        setBranch(data);
    }
      
    const periodOptions = period.map((p) => ({
    value: p.replace(/\s+/g, ''),
    label: p,
    }));
      

    // Multi Select functionality
    const selectedPeriod = (data) => {
        setSelectedPeriodList(data)
    }

    // Update Button Functionality
    const updateTable = () => {
        console.log(tableValue)
        setPreviousTableData(tableValue)

        let dummy = []
        for(let cell of tableValue) {
            let obj = {...cell}
            for(let period of selectedPeriodList) {
                let keys = period.value.split(" ")
                if(obj["DayOrder"] == keys[0])
                    obj["Period " + keys[1]] = courseCode
            }
            dummy.push(obj)
        }
        setTableValue(dummy)
        setCourseCode("");
        setSelectedPeriodList("");
        setUpdate(true);
    };
      

    // Save Button Functionality
    const saveData = (d) => {

        setOpen(true)

    }

    const sendData = () => {

        setOpen(false)

        let dummy = tableData.map(d => ({...d}))

        dummy.map(course => {
            course.schedule = []
        })

        tableValue.map((row, idx) => {
            console.log(row)

            for(let key of Object.keys(row)) {
                if(key != "DayOrder")
                    for(let course of dummy) {
                        if(course.courseCode == row[key]) {
                            course.schedule.push((idx+1)*10 + parseInt(key.charAt(key.length - 1)))
                        }
                    }                    
            }
            // row.map((cell, cidx) => {
            //     if(cidx != 0)
            //         for(let course of dummy) {
            //             if(course.courseCode == cell) {
            //                 course.schedule.push = (idx+1)*10 + cidx
            //             }
            //         }    
            // })
        })

        console.log("Me",dummy)
        setSavedData(dummy)
        setFlag(true)



        // console.log("Added Data ", tableData)
        setEditBtn(false)
        setUpdate(false)

    }

    const effDate = (data) => {
        // console.log(data)
        setEffectiveDate(data)
    }

    // Cancel Button Functionality
    const cancelData = () => { 
        setTableData(ttDataTest.courses.filter(doc => doc.semester == semester))
        setEditBtn(false)    
        setUpdate(false)
    }
    
    return ( tableValue ?
        <>
        <div className="px-2 m-2">
            <div className="flex">
                <div className="w-1/4">
                    <h5 className="p-1">Department</h5>
                    <div className="text-slate-400 p-1">Information Technology</div>
                </div>
                <div className="w-1/5">
                    <Dropdown name ={"Semester"} data = {getSemester} special ={false} update={selectedSemester} />
                </div>
                <div className="w-1/4">
                    <h5 className="p-1">Branch</h5>
                    <div className="text-slate-400 p-1">{branch}</div>
                </div>
                {
                    !editBtn ? 
                    <div className="w-1/4">
                        <Button color={'blue'} name={"Edit Timetable"} icon={'edit'} outline={false} event={() => {setEditBtn(true)}} />
                    </div> : null
                }
            </div>

            {
                editBtn ? 
                <div className="flex pt-10">
                    <div className="w-1/3 pt-5 pl-3">
                        <Dropdown name ={"Course Code"} data = {getCourseCodeData} special ={true} update={selectedCourseCode} />
                    </div>
                    <div className="w-1/2">
                        <MultiSelect name = {'Period'} data = {tableSchedule} values={periodOptions} selectedData={selectedPeriod} />
                    </div>
                    <div className="w-1/3 pt-2">
                        <Button color={'blue'} name={"Update"} icon={'add'} outline={false} event={updateTable} />
                    </div>
                </div> : null
            }

            <div className="flex pt-10 flex-wrap">
                <Table data={tableValue} />
            </div>

            {
                editBtn ? update ?  
                <div className="flex justify-end flex-row m-10">
                    <div className="mx-4 w-1/8">
                        <Button color={'blue'} name={"Cancel"} outline={true} event={cancelData} />
                    </div>
                    <div className="mx-4 w-1/6">
                        <Button color={'blue'} name={"Save"} outline={false} event={saveData} />
                    </div>
                </div> : null : null
            }

            { open ?         
            <div className="absolute w-3/12 z-40 border-x-2 bg-white rounded-lg  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="absolute cursor-pointer text-red-500 top-4 right-2" onClick={() => setOpen(false)}>
                <Icon name="close" icon="close"/>
                </div>
                <div className="text-md font-bold w-fit m-auto my-3">Attendance effective from: </div>
                <div className="flex pl-14 space-x-4 justify-center w-fit m-4">
                    <Input name="Date" type="date" color="blue"  update={effDate}/>
                </div>
                <hr/>
                <div onClick={sendData} className={`py-4 px-3 rounded-md cursor-pointer font-semibold text-sm m-4 text-center items-center text-white ${submit ? "bg-slate-400" : "bg-blue-500"}`} disabled={submit ? "disabled" : ""}>Ok</div>
            </div> : <></>}


        </div>

        </> : <div>Loading..</div>
    ) 
}

export default Timetable