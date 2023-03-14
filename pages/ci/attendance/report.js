import Table from "../../../utilities/Table";
import Dropdown from "../../../utilities/Dropdown";
import Button from "../../../utilities/Button";
import Input from "../../../utilities/Input";
import { useEffect, useState } from "react"
import axios from "axios"

const Report = () => {
      
    const [ courseCode, setCourseCode ] = useState(['NIL'])
    const [ batch, setBatch ] = useState(["--None--"])
    const [ dept, setDept ] = useState(["--None--"])
    const [ selectCourseCode, setSelectCourseCode ] = useState("--None--")
    const [ selectbatch, setSelectBatch ] = useState("--None--")
    const [ selectdept, setSelectdept ] = useState("--None--")
    const [ resData, setResData ] = useState([])
    const [ startDate, setStartDate ] = useState("")
    const [ endDate, setEndDate ] = useState("")
    const [ courseId, setCourseId ] = useState("")
    const [ courseName, setCourseName ] = useState("--None--")
    const [ getSemester, setSemester ] = useState("--None--")
    const [ flag, setFlag ] = useState(false)    
    const [ Date1, setDate1 ]=useState()
    const [ Date2, setDate2 ]=useState()
    const [ tableData, setTableData ] = useState([])
    
    let data1=[]
    let temp={}

    //EITHER THIS
    // useEffect( () => {

    //     setResData(course.courses.map(doc=>({...doc})))
    //     setStartDate(course.start_date)
    //     setEndDate(course.end_date)
    //     setCourseCode(["--None--", ...new Set(course.courses.map(item=>item.courseCode))])
    // },[])


    //OR THIS
    useEffect( () => {
        axios.get(process.env.NEXT_PUBLIC_URL + '/ci/courses?facultyId=63f42892a8a5c50a79ed2664' )
        .then( response => {
            console.log(response.data)
            setResData(response.data.courses.map(doc=>({...doc})))
            setStartDate(respnse.start_date)
            setEndDate(response.end_date)
            setCourseCode(["--None--", ...new Set(response.courses.map(item=>item.courseCode))])

        })
        .catch(err => console.log(err.message))
    },[])

    useEffect(() => {
        if(flag) {
            axios.get(process.env.NEXT_PUBLIC_URL + '/ci/attendancePercent?start_date='+Date1+'&end_date='+Date2+'&courseId='+courseId )
            .then((response) => {
                console.log(response.data)
                setTableData(response.data)
                setFlag(false)
            })
            .catch(err => console.log(err.message))
        }
    }, [flag])

    const selectedCourseCode = (data) => {
        setSelectCourseCode(data);
        if(data === '--None--'){
            setCourseName('--None--')
            setDept(["--None--"])
            setSelectdept("--None--")
            setBatch(["--None--"])
            setSelectBatch("--None--")
            setSemester("--None--")
        }else{
            setCourseName(resData.filter(item => item.courseCode == data ).map(item => item.courseName)[0])
            setBatch(["--None--",...new Set(resData.filter(item => item.courseCode == data ).map(item => item.batch))])
            setSelectBatch("--None--")
            setSemester("--None--")
            setDept(["--None--"])
            setSelectdept("--None--")
        }
    }

    const selectedBatch = (val) => {
        setSelectBatch(val)
        if(val==='--None--'){
            setDept(["--None--"])
            setSelectdept("--None--")
        }else{
            setSemester(resData.filter(item=>item.batch == val).map(item=>item.semester)[0])
            setDept(["--None--",...new Set(resData.filter(item => item.courseCode == selectCourseCode && item.batch == val ).map(item => item.branch))])
            setSelectdept("--None--")
        }
    }

    const selectedDepartment = (val) => {
        setSelectdept(val)
    }

    const generateReport = () => {
        let dummy = resData.filter(item=>item.courseCode === selectCourseCode && item.batch === selectbatch && item.branch === selectdept)
        console.log("Selected course = ", dummy)
        if(dummy.length==0){
            alert("Please Select a valid Course code, Batch and Branch")
        }else{
            setCourseId(dummy.courseId)
            setFlag(true)
        }
    }

    let omit = [ "Sem","Course_Code" ]
 
    return( resData ?
        <>
            <span className="inline-grid grid-cols-5 gap-5 p-6">

                <Dropdown name="Department" update={selectedDepartment}  data={dept}/>
                
                <Dropdown name="Batch" update={selectedBatch}  data={batch}/>
                
                <div className="grid-cols-1">
                    <div className="text-sm font-semibold pl-3 mb-2 grid-cols-1 ">{ "Semester" }</div>
                    <div className="flex w-fit justify-between text-slate-400  text-sm pl-3 cursor-pointer ">{getSemester}</div>            
                </div>

                <Dropdown name="Course Code" update={selectedCourseCode}  data={courseCode}/>

                <div className="grid-cols-1">
                    <div className="text-sm font-semibold pl-3 mb-2 grid-cols-1 ">{ "Course Name" }</div>
                    <div className="flex w-fit justify-between text-slate-400  text-sm pl-3 cursor-pointer ">{courseName}</div>            
                </div>

                <span className="inline-grid grid-cols-1 gap-10 p-y-4 p-2">
                    <Input name="from" type="date" min={startDate} max={endDate} update={setDate1}/>
                </span>

                <span className="inline-grid grid-cols-1 gap-10 p-y-4 p-2">
                    <Input name="to" type="date" min={startDate} max={endDate} update={setDate2}/>
                </span>

                <div className="inline-grid grid-cols-1 gap-10 p-y-4 p-2">  
                    <Button  color="blue" name="Generate Report" event={generateReport}/>
                </div>
         
            </span>

            <div className="w-5/7 px-5 pr-8">
                {tableData ?
                    <Table data={tableData} omit={omit} indexed={true} />
                    :"No Data Here..."
                }
            </div>
        </>
        :<div>Loading...</div>
    )                    
}

export default Report