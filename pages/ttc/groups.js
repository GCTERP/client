import { add } from "date-fns"
import { use, useEffect, useState } from "react"
import Button from "../../utilities/Button"
import Dropdown from "../../utilities/Dropdown"
import MultiSelect from "../../utilities/MultiSelect"
import Table from "../../utilities/Table"
import groupsData from "../../test/groupsTestData"
import Icon from "../../utilities/Icon"


const Groups = () => {

    // Get data from the api
    const [fetchData, setFetchData] = useState(groupsData)
    const [getSemester, setSemester] = useState(['1'])
    const [getCourseCode, setCourseCode] = useState(['18IPC708'])
    const [getCourseName, setCourseName] = useState(['Mini Project'])
    const [getBatch, setBatch] = useState(['2023'])
    const [addData, setAddData] = useState([])
    const [revert, setRevert] = useState([])
    const [getSelectedCourseCode, setSelectedCourseCode] = useState("");
    const [getSelectedCourseName, setSelectedCourseName] = useState("");

    const selectedCourseCode = (data) => {
        setSelectedCourseCode(data);

        const cn = groupsData.courses.map(course => {
            if(course.courseCode === data) return course.courseName
        })

        setSelectedCourseName(cn)
    }

    const selectedCourseName = (data) => {
        setSelectedCourseName(data);

        const cc = groupsData.courses.map(course => {
            if(course.courseName === data) return course.courseCode
        })

        setSelectedCourseName(cc)

    }

    //Get Semester
    useEffect(() => {
        const semesterCodes = [...new Set(groupsData.courses.map(course => course.semester))];
        setSemester(semesterCodes)
    }, [groupsData])

    // Get Batch 
    useEffect(() => {
        const batch = [...new Set(groupsData.courses.map(course => course.batch))];
        setBatch(batch)
    }, [groupsData])

    // Get Course Code
    useEffect(() => {
        const courseCode = [...new Set(groupsData.courses.map(course => course.courseCode))];
        setCourseCode(courseCode)
    }, [groupsData])

    // Get Course Name
    useEffect(() => {
        const courseName = [...new Set(groupsData.courses.map(course => course.courseName))];
        setCourseName(courseName)
    }, [groupsData])

    useEffect(() => {
        const GroupNo = groupsData.courses.map(course => course.groupNo)
        const studentList = groupsData.courses.map(course => course.student)
        const courseIncharge = groupsData.courses.map(course => course.facultyName)

        const batch = []

        for (let i = 0; i < groupsData.courses.length; i++) {
            const course = groupsData.courses[i];
            const obj = {
                "Group Number": course.groupNo,
                "Student List": course.student.join(", "),
                "Course Incharge": course.facultyName
            };
            batch.push(obj);
        }
        
        console.log(batch)

        setAddData(batch)
        setRevert(batch)
    }, [groupsData])

    const fields = addData && addData[0] ? Object.keys(addData[0]) : [];

    // console.log(addData)
    
    // To perform displaying in table and further use
    const [branch, setBranch] = useState("")

    // To delete a row
    //DELETE

    let batchNumberSelected;
    const batchNumber = (data) => {
        batchNumberSelected = data;
    }

    const selectedBranch = (data) => {
        setBranch(data);
    }

    let studentListsSelected = [];
    let transformedArray;
    const studentLists = (data) => {
        // studentListsSelected = [...data];
        transformedArray = data.map(function(innerArray) {
              return innerArray.value;
        });
        console.log(transformedArray)
    }

    let courseInchargeSelected;
    const courseIncharge = (data) => {
        courseInchargeSelected = data;
    }

    const addBatch = () => {
        if(batchNumberSelected && transformedArray && courseInchargeSelected)
            setAddData([...addData, {"Group Number" : batchNumberSelected, "Student List" : transformedArray.join(", "), "Course Incharge" : courseInchargeSelected }])
        else alert("Please add the required data")
    }

    const saveData = (d) => {
        console.log("Added Data ", addData)
        setRevert(addData)
    }

    const cancelData = () => {        
        setAddData(revert)
        // setAddData([])
    }

    
    return ( getCourseCode &&
        <>
        <div className="px-2 m-2">
            <div className="flex">
                <div className="w-1/4">
                    {/* <Dropdown name ={"Department"} data = {['Information Technology']} special = {false} selectedData={selectedBranch}/> */}
                    <h5 className="p-1">Department</h5>
                    <div className="text-slate-400 p-1">Information Technology</div>
                </div>
                <div className="w-1/5">
                    {/* <Dropdown name ={"Semester"} data = {getCourseCode} special = {false} /> */}
                    <h5 className="p-1" >Semester</h5>
                    <div className="text-slate-400 p-1">{getSemester}</div>
                </div>
                <div className="w-1/5">
                    {/* <Dropdown name ={"Batch"} data = {['2018-2022', '2019-2023', '2020-2024']} special = {false} /> */}
                    <h5 className="p-1">Batch</h5>
                    <div className="text-slate-400 p-1">{getBatch}</div>
                </div>
                <div className="w-1/5 p-1">
                    <Dropdown name ={"Course Code"} data = {getCourseCode} special = {false} selectedData={selectedCourseCode} />
                </div>
                <div className="w-1/5 p-1">
                    <Dropdown name ={"Course Name"} data = {getCourseName} special = {false} selectedData={selectedCourseName}/>
                </div>

            </div>

            <div className="flex pt-10 justify-around">
                <div className="w-1/4 pt-5 pl-3">
                    <Dropdown name ={"Batch No"} data = {['number 1', '2', '3', '4']} special ={true} selectedData={batchNumber} />
                </div>
                <div className="w-1/2">
                    <MultiSelect name = {'Student List'} data = {['1918101', '1918102', '1918103', '1918104', '1918105', '1918106', '1918107', '1918108']} selectedData={studentLists} />
                </div>
                <div className="w-1/3 pt-5">
                    <Dropdown name ={"Course Incharge"} data = {['Likhit Kumar V P', 'Dr. Suguna', 'Rathi S', 'Gowri Shankar']} special ={true} selectedData={courseIncharge} />
                </div>
                <div className="w-1/4 pt-2">
                    {/* <Button color={'blue'} name={"Add"} icon={'add'} outline={false} event={addBatch}/> */}
                </div>
            </div>

            <div className="flex pt-10 items-center justify-center">
                {
                    !addData.length ? "No Data Available" :         
                    <div className="relative p-1.5 w-fit inline-block align-middle">
                        <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                            <table className="min-w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                                <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                                    <tr>
                                        {
                                            fields.map((heading, index) => (
                                                <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                            ))
                                        }
                                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Delete</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {
                                        addData.map((row, index) => ( 
                                        <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                            {
                                                fields.map((key, index) => (
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td> ))
                                            }
                                            {/* <td className="block mx-auto px-6 py-4 text-sm text-gray-800 whitespace-nowrap cursor-pointer"><Icon name={'delete'}  /></td> */}
                                        </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>

            <div className="flex pt-10 items-center justify-center">
                <Button color={'blue'} name={"Add Batch"} icon={'add'} outline={false} event={addBatch} />
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
        </> 
    ) 
}

export default Groups