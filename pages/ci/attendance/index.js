import Dropdown from "../../../utilities/Dropdown"
import Table from "../../../utilities/Table"
import studentData from "../../../test/studentData"
import Calendar from "../../../utilities/Calendar"
import Button from "../../../utilities/Button"
import ciAttendanceTestData from "../../../test/ciAttendanceTestData"
//import groupsData from "../../../test/groupsTestData"
import { useEffect, useState } from "react"
import axios from "axios"
const Attendance = () => {

    // const data = ciAttendanceTestData.students
    // const fields = data && data[0] ? Object.keys(data[0]) : [];
    const [data, setData] = useState([])
    const [fields, setFields] = useState([])
    const [markAttdBtn, setMarkAttdBtn] = useState(false)
    const [calDate, setCalDate] = useState("")
    const [filterCourse, setFilterCourse] = useState([])
    const [period, setPeriod] = useState(['1'])
    const [flag, setFlag] = useState(false)

    const [present, setPresent] = useState([''])
    const [absent, setAbsent] = useState([''])    

    const [getSelectedCourseCode, setSelectedCourseCode] = useState("");
    const [getSelectedCourseName, setSelectedCourseName] = useState("");
    //const [fetchData, setFetchData] = useState(ciAttendanceTestData)
    const [getCourseCode, setCourseCode] = useState(['18IPC702'])
    const [getCourseName, setCourseName] = useState(['Cryptography and Network Security'])
    const [getDate, setDate] = useState("")
    const [postId, setPostId] = useState([])
    const [attdData, setAttdData] = useState([])

    const [cc, setcc] = useState(["NIL"])
    const [cn, setcn] = useState(["NIL"])

    // Set Calendar Course Code
    const [calCourseCode, setCalCourseCode] = useState(['18IPC702'])
    const [calCourseName, setCalCourseName] = useState(['Network Sec'])

    const [getSemester, setSemester] = useState(['1'])    
    const [revert, setRevert] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);


    const selectedPeriod = (d) => {
        let filteredData = filterCourse.filter(item => item.period == d)

        setPostId(filteredData)

        setcc(filteredData[0].courseCode)
        setcn(filteredData[0].courseName)


    }
    // Cal
    const selectedCalCourseCode = (data) => {
        // setSelectedCourseCode(data);
        console.log(data)
    }

    const selectedCalCourseName = (data) => {
        // setSelectedCourseCode(data);
    }
    
    // Selected Course Code Display
    const selectedCourseCode = (data) => {
        setSelectedCourseCode(data);
    }
    
    // Selected Course Code Display
    const selectedCourseName = (data) => {
        setSelectedCourseName(data);
    }

    // API GET
    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_URL + '/ci/masterAttendance?branch=Information%20Technology&facultyId=63f42892a8a5c50a79ed2664' )
        // axios.get(process.env.NEXT_PUBLIC_URL + 'ci/masterAttendance' , {params : {branch : "Information Technology", facultyId : '63f42892a8a5c50a79ed2664' }})
        .then(response => {
            let data = response.data
            console.log(data)
            
            setData(data)
        })
        .catch(err => console.log(err.message))
    },[])

    // API GET MARK ATTD
    useEffect(() => {
        if(markAttdBtn) {
            console.log(postId[0]._id)
            axios.get(process.env.NEXT_PUBLIC_URL + '/ci/attendance?_id=' + postId[0]._id + '&courseId=' + postId[0].courseId )
            .then(response => {
                let data = response.data
                setAttdData(data)

                let dummy = []
                data.map(student => {
                    if(student.present==true)
                    dummy.push(0)
                    else if(student.onduty==true)
                    dummy.push(2)
                    else
                    dummy.push(1)
                })
                console.log("bsha",dummy)
                setPresent(dummy)
            })
            .catch(err => console.log(err.message))
            setMarkAttdBtn(false)
        }
    },[markAttdBtn])

    // API POST ATTD DATA
    useEffect(() => {
        if(flag) {
            axios.post(process.env.NEXT_PUBLIC_URL + '/ci/attendance', attdData)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => console.log(err.message))
            setFlag(false)
        }
    }, [flag])

     // Get Course Code
     useEffect(() => {
        const courseCode = [...new Set(ciAttendanceTestData.courses.map(course => course.courseCode))];
        setCourseCode(courseCode)
    }, [ciAttendanceTestData])

    // Get Course Name
    useEffect(() => {
        const courseName = [...new Set(ciAttendanceTestData.courses.map(course => course.courseName))];
        setCourseName(courseName)
    }, [ciAttendanceTestData])

    useEffect(() => {
        // setCourseCode(data.filter(item => item.date.slice(0, 10) == calDate).map(course => course.courseCode))

        data.map(item => {

        })
        let temp = data.filter(item => item.date.slice(0, 10) == calDate)
        // console.log(data.filter(item => item.date.slice(0, 10) == calDate))
        console.log(temp)

        setFilterCourse(temp)
        // setCalCourseCode(temp.map(item=> item.courseCode))
        setPeriod(temp.map(item=> item.period))

    }, [calDate])

    // Selected Date
    const selectedDate = (date) => {
        let format4 = date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0")
            const cc = []
            const cn = []
        
            console.log(format4)
            setCalDate(format4)

        const courseCo = [...new Set(ciAttendanceTestData.courses.map(course => {
            const parts = course.date.split("T");
            if(parts[0] == format4) {
                cc.push(course.courseCode)
                cn.push(course.courseName)
            }
        }))]
        setCalCourseCode(cc)
        setCalCourseName(cn)

        console.log(calCourseCode)
        console.log(calCourseName)        
    }

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleCancelClick = () => {

    };

    const saveData = (d) => {

        let dummy = attdData.map(d => ({...d}))

        dummy.map((datum, idx) => {
            console.log(datum)
            if(present[idx] == 0) datum.present = true
            else if (present[idx] == 2) {
                datum.present = false
                datum.onduty = true
            } else {
                datum.present = false
            }
        })

        console.log(dummy)

        setAttdData(dummy)
        setFlag(true)

        // setRevert(addData)
    }

    const cancelData = () => {        
        // setAddData(revert)
        // setAddData([])
        setSelectedOption(null);
    }

    // Mark Attendance Handler
    const markAttendanceHandler = () => {
        setMarkAttdBtn(true)

        const omit = ["_id", "studentId", "present", "onduty"]
        const omitFields = (field) => !omit.some((item) => item == field)

        setFields(ciAttendanceTestData.students && ciAttendanceTestData.students.length > 0
        ? Object.keys(ciAttendanceTestData.students[0]).filter((key) => omitFields(key))
        : [])


    }


    return ( getCourseCode && 
        <>
        <div className="flex">
            <div className="w-9/12">
                <div className="flex">
                    <div className="w-1/4">
                    <h5 className="p-1">Department</h5>
                    <div className="text-slate-400 p-1">Information Technology</div>
                    </div>
                    <div className="w-1/4">
                        <h5 className="p-1" >Semester</h5>
                        <div className="text-slate-400 p-1">{getSemester}</div>
                    </div>
                    <div className="w-1/4">
                        {/* <Dropdown name ={"Course Code"} data = {['18IPC801', '18IPC702', '18IPC701', '18IEE621']} special ={false} /> */}
                        {/* <Dropdown name ={"Course Code"} data = {calCourseCode} special = {false} update={selectedCourseCode} /> */}
                        <h5 className="p-1">Course Code</h5>
                        <div className="text-slate-400 p-1">{cc}</div>
                    </div>                
                    <div className="w-1/4">
                        {/* <Dropdown name ={"Course Name"} data = {['Professional Ethics', 'Cryptography and Network Security', 'Data Structures and Algorithm']} special ={false} /> */}
                        {/* <Dropdown name ={"Course Name"} data = {calCourseName} special = {false} update={selectedCourseName}/> */}
                        <h5 className="p-1">Course Code</h5>
                        <div className="text-slate-400 p-1">{cn}</div>
                    </div>                
                </div>

                <div className="relative py-10 mr-10 ml-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-b border-gray-300"></div>
                    </div>
                </div>
                
                <div className="flex m-2">
                    <h4> Class List</h4>
                </div>

                <div className="flex pt-10 flex-wrap">
                {/* <Table /> */}

                { (attdData.length > 0 && present.length > 0)? 
                    <div className="relative p-1.5 w-fit inline-block align-middle">
                        <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                            <table className="min-w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                                <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                                    <tr>
                                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Serial Number</th>
                                        {
                                            fields.map((heading, index) => (
                                                <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                            ))
                                        }
                                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Present</th>
                                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Absent</th>
                                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">On-Duty</th>                                    
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {
                                        attdData.map((row, index) => ( 
                                        <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" >{index+1}</td>
                                            {
                                                fields.map((key, index) => (
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td> ))
                                            }
                                            <td>
                                                {/* <input id="default-radio-1" type="radio" value="1" checked={selectedOption === "1"} onChange={handleRadioChange} name={"present-radio"+index} class="block mx-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> */}
                                                <input id="default-radio-1" checked={present[index]==0?true:false} value={0} type="radio" onChange={(e) => { 
                                                    let temp = [...present]
                                                    console.log("dfv",e.target.value)
                                                    temp[index] = e.target.value; 
                                                    console.log(temp[index]); 
                                                    setPresent([...temp]) 
                                                    }} name={"present-radio"+index} className="block mx-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            </td>
                                            <td>
                                                <input id="default-radio-1" type="radio" value={1} checked={present[index]==1?true:false} onChange={(e) => { 
                                                        let temp = [...present]
                                                        console.log("sf",e.target.value)
                                                        temp[index] = e.target.value; 
                                                        console.log(temp[index]); 
                                                        setPresent([...temp]) 
                                                    }} name={"present-radio"+index} className="block mx-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            </td>
                                            <td>
                                                <input id="default-radio-1" type="radio" value={2} checked={present[index] == 2 ? true: false} onChange={(e) => {
                                                    let temp = [...present]
                                                    console.log("sf",e.target.value)
                                                    temp[index] = e.target.value; 
                                                    console.log(temp[index]); 
                                                    setPresent([...temp]) 
                                                }} name={"present-radio"+index} className="block mx-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            </td>
                                        </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div> : <div className="mx-auto text-center">No Data Available</div>}
                </div>

                <div className="flex justify-end flex-row m-10">
                    <div className="mx-4 w-1/8">
                        <Button color={'blue'} name={"Cancel"} outline={true} event={cancelData} />
                    </div>
                    <div className="mx-4 w-1/6">
                        <Button color={'blue'} name={"Save"} outline={false} event={saveData} />
                    </div>
                </div>
        </div>
            <div className="w-3/12 border-l">
                <div className="ml-6 flex flex-col h-screen">
                    <h4 className="pb-4">Calendar</h4>
                    <Calendar className="ml-2 flex-1" selectDate={selectedDate} />
                    <div className="flex-6/12 mt-4" >
                        <Dropdown name ={"Select Period"} data = {period} special ={false} update={selectedPeriod} />                
                    </div>
                    <div className="flex-6/12 mt-4" >
                        <h5 className="p-1">Course Code</h5>
                        <div className="text-slate-400 p-1">{cc}</div>
                    </div>
                    <div className="flex-6/12 mt-4" >
                        <h5 className="p-1">Course Name</h5>
                        <div className="text-slate-400 p-1">{cn}</div>
                    </div>
                    <div className="flex-1 mt-4 p-10">
                        <Button color={'blue'} name={"Mark Attendance"} icon={'edit'} outline={false} event={markAttendanceHandler} />
                    </div>
                </div>
            </div>
        </div>
        </> 
    )
}

export default Attendance