import Dropdown from "../../../utilities/Dropdown"
import Table from "../../../utilities/Table"
import studentData from "../../../test/studentData"
import Calendar from "../../../utilities/Calendar"
import Button from "../../../utilities/Button"
import ciAttendanceTestData from "../../../test/ciAttendanceTestData"
//import groupsData from "../../../test/groupsTestData"
import { useEffect, useState } from "react"
const Attendance = () => {

    const data = ciAttendanceTestData.students
    // const fields = data && data[0] ? Object.keys(data[0]) : [];
    const [fields, setFields] = useState([])
    const [markAttdBtn, setMarkAttdBtn] = useState(false)

    const [present, setPresent] = useState([''])
    const [absent, setAbsent] = useState([''])    

    const [getSelectedCourseCode, setSelectedCourseCode] = useState("");
    const [getSelectedCourseName, setSelectedCourseName] = useState("");
    //const [fetchData, setFetchData] = useState(ciAttendanceTestData)
    const [getCourseCode, setCourseCode] = useState(['18IPC702'])
    const [getCourseName, setCourseName] = useState(['Cryptography and Network Security'])
    const [getDate, setDate] = useState("")

    // Set Calendar Course Code
    const [calCourseCode, setCalCourseCode] = useState(['18IPC702'])
    const [calCourseName, setCalCourseName] = useState(['Network Sec'])

    const [getSemester, setSemester] = useState(['1'])    
    const [revert, setRevert] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);

    // Cal
    const selectedCalCourseCode = (data) => {
        // setSelectedCourseCode(data);
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

    // Selected Date
    const selectedDate = (date) => {
        let format4 = date.getFullYear() + "-" + (date.getMonth()+1).toString().padStart(2, "0") + "-" + date.getDate()
            const cc = []
            const cn = []

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
                        <Dropdown name ={"Course Code"} data = {calCourseCode} special = {false} selectedData={selectedCourseCode} />
                    </div>                
                    <div className="w-1/4">
                        {/* <Dropdown name ={"Course Name"} data = {['Professional Ethics', 'Cryptography and Network Security', 'Data Structures and Algorithm']} special ={false} /> */}
                        <Dropdown name ={"Course Name"} data = {calCourseName} special = {false} selectedData={selectedCourseName}/>
                    </div>                
                </div>

                <div class="relative py-10 mr-10 ml-2">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-b border-gray-300"></div>
                    </div>
                </div>
                
                <div className="flex m-2">
                    <h4> Class List</h4>
                </div>

                <div className="flex pt-10 flex-wrap">
                {/* <Table /> */}

                { markAttdBtn ? 
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
                                        data.map((row, index) => ( 
                                        <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" >{index+1}</td>
                                            {
                                                fields.map((key, index) => (
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td> ))
                                            }
                                            <td>
                                                {/* <input id="default-radio-1" type="radio" value="1" checked={selectedOption === "1"} onChange={handleRadioChange} name={"present-radio"+index} class="block mx-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> */}
                                                <input id="default-radio-1" type="radio" value={present[index]} onChange={(e) => { present[index] = e.target.value; setPresent([...present]) }} name={"present-radio"+index} class="block mx-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            </td>
                                            <td>
                                                <input id="default-radio-1" type="radio" value={absent[index]} onChange={(e) => { absent[index] = e.target.value; setAbsent([...absent]) }} name={"present-radio"+index} class="block mx-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            </td>
                                            <td>
                                                <input id="default-radio-1" type="radio" value="r" name={"present-radio"+index} class="block mx-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                    <Dropdown name ={"Select Course Code"} data = {calCourseCode} special ={false} selectedData={selectedCalCourseCode} />                
                    </div>
                    <div className="flex-6/12 mt-4" >
                        <Dropdown name ={"Select Course Name"} data = {calCourseName} special ={false} selectedData={selectedCalCourseName} />                
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