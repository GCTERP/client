import { add } from "date-fns"
import { use, useEffect, useState } from "react"
import Button from "../../../utilities/Button"
import Dropdown from "../../../utilities/Dropdown"
import MultiSelect from "../../../utilities/MultiSelect"
import Table from "../../../utilities/Table"
import groupsData from "../../../test/groupsTestData"
import Icon from "../../../utilities/Icon"
import axios from "axios"


const Practical = () => {

    // Get data from the api

    const [fetchData, setFetchData] = useState(groupsData.courses)
    const [getSemester, setSemester] = useState(['1'])
    const [getCourseCode, setCourseCode] = useState([])
    const [getCourseName, setCourseName] = useState('')
    const [getBatch, setBatch] = useState(['2023'])
    const [addData, setAddData] = useState([])
    const [revert, setRevert] = useState([])
    const [courseCode, setSelectedCourseCode] = useState("")
    const [studentList, setStudentList] = useState([])
    const [courseIncharge, setCourseIncharge] = useState([])
    const [group, setGroup] = useState(['Select Batch'])
    const [selectedStudentList, setSelectedStudentList] = useState([])
    const [selectedBatchNumber, setSelectedBatchNumber] = useState("")
    const [selectedCI, setSelectedCI] = useState("")
    const [flag, setFlag] = useState(false)
    const [facultyData, setFacultyData] = useState(groupsData.faculty)


    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_URL + '/ttc/groups', { params: { branch: "Information Technology" } })
        .then(response => {
            let data = response.data
            console.log(data)
            setFetchData(data.courses)
            setRevert(data.courses) // need to be tested

            const cc = [...new Set(data.courses.map(course => course.courseCode))];
            setCourseCode(cc)

            setCourseIncharge(data.faculty.map(fac => fac.Name))
        })
        .catch(err => console.log(err.message))
    },[])

    // EITHER OR

    // useEffect(() => {
    //     const cc = [...new Set(fetchData.map(course => course.courseCode))];
    //     setCourseCode(cc)

    //     setCourseIncharge(groupsData.faculty.map(fac => fac.Name))
    // }, [])

    // POST 
    useEffect(() => {
        if(flag) {
            // axios.post
            let dummy  = addData.map(item =>({...item}))
            let outdummy = fetchData.map(item => ({...item}))
            console.log("in", outdummy)
            outdummy.map(course=> {
                dummy.map(newgrp => {
                    if(newgrp["Group Number"]==course.groupNo && course.courseCode == courseCode){
                        course.student = newgrp["Student List"].split(", ")
                        course.facultyName = newgrp["Course Incharge"]
                        course.facultyId = facultyData.filter(item => item.Name == course.facultyName).map(item => item._id)[0]
                    }
                })
            })
            console.log("out", outdummy)
            setFlag(false)
        }
    }, [flag])


    // On Select Course Code
    const selectedCourseCode = (data) => {
        setSelectedCourseCode(data)

        const cn = [...new Set(fetchData.map(course => {
            if(course.courseCode === data) return course.courseName
        }))]

        console.log(cn)
        setCourseName(cn)

    }


    useEffect(() => {
        if(fetchData && courseCode){
            const groupNum = []
        const studentList = []
        const batch = []

        for (let i = 0; i < fetchData.length; i++) {
            const course = fetchData[i];
            console.log(course)
            if(course.courseCode === courseCode) {
                const obj = {
                    "Group Number": course.groupNo,
                    "Student List": course.student.join(", "),
                    "Course Incharge": course.facultyName
                };
                course.student.map(stud => studentList.push(stud))
                groupNum.push("Batch "+course.groupNo)
                batch.push(obj);    
            }
        }
        
        console.log(groupNum)
        setStudentList(studentList)
        setGroup([...groupNum])
        setAddData(batch)
        setRevert(batch)
        }
        
    }, [courseCode])

    

    const fields = addData && addData[0] ? Object.keys(addData[0]) : [];

    // To update a row
    const updateBatch = () => {
        let dummy = addData.map(item => ({...item}))
        let bno = selectedBatchNumber.split(" ")

        dummy.map(batch => {
            if (batch["Group Number"] == bno[1]) {
                batch["Student List"] = [...selectedStudentList].join(', '),
                batch["Course Incharge"] = selectedCI
            }
        })

        setAddData([...dummy])
    }

    
    const handleStudentLists = (data) => {
        // studentListsSelected = [...data];
        let transformedArray;
        transformedArray = data.map(function(innerArray) {
              return innerArray.value;
        });
        setSelectedStudentList([...transformedArray])
    }

    const batchNumber = (data) => {
        setSelectedBatchNumber(data)
    }

    const handleCourseIncharge = (data) => {
        setSelectedCI(data)
    }

    const addBatch = () => {
        // if(batchNumberSelected && transformedArray && courseInchargeSelected)
        //     setAddData([...addData, {"Group Number" : batchNumberSelected, "Student List" : transformedArray.join(", "), "Course Incharge" : courseInchargeSelected }])
        // else alert("Please add the required data")
        let grp = [...group]
        let dummy = addData.map(doc => ({...doc}))

        const obj = {
            "Group Number": group.length + 1,
            "Student List": "",
            "Course Incharge": ""
        };    
        dummy.push(obj)
        grp.push("Batch "+(group.length+1))
        setAddData([...dummy])
        setGroup([...grp])

    }

    const saveData = (d) => {
        console.log("Added Data ", addData)
        setRevert(addData)

        setFlag(true)
    }

    const cancelData = () => {        
        setAddData(revert)
        // setAddData([])
    }

    
    return (( getCourseCode.length > 0 && courseIncharge.length > 0 ) ?
        <>
        <div className="px-2 m-2">
            <div className="flex">
                <div className="w-1/4">
                    {/* <Dropdown name ={"Department"} data = {['Information Technology']} special = {false} update={selectedBranch}/> */}
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
                    <Dropdown name ={"Course Code"} data = {getCourseCode} special = {false} update={selectedCourseCode} />
                </div>
                <div className="w-1/5 p-1">
                    {/* <Dropdown name ={"Course Name"} data = {getCourseName} special = {false} update={selectedCourseName}/> */}
                    <h5 className="p-1">Course Name</h5>
                    <div className="text-slate-400 p-1">{getCourseName}</div>
                </div>

            </div>

            <div className="flex pt-10 justify-around">
                <div className="w-1/4 pt-5 pl-3">
                    <Dropdown name ={"Batch No"} data = {group} special ={true} update={batchNumber} />
                </div>
                <div className="w-1/2">
                    <MultiSelect name = {'Student List'} data = {studentList} selectedData={handleStudentLists} />
                </div>
                <div className="w-1/3 pt-5">
                    <Dropdown name ={"Course Incharge"} data = {courseIncharge} special ={true} update={handleCourseIncharge} />
                </div>
                <div className="w-1/4 pt-2">
                    <Button color={'blue'} name={"Update"} icon={'update'} outline={false} event={updateBatch}/>
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
                                        {/* <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Delete</th> */}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {
                                        addData.map((row, index) => ( 
                                        <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                            {
                                                fields.map((key, index) => ( key == "Group Number" ? 
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td> : 
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
        </> : <div>Loading...</div>
    ) 
}

export default Practical