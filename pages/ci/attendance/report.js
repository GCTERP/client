import Table from "../../../utilities/Table";
import Dropdown from "../../../utilities/Dropdown";
import Download from "../../../utilities/Download";
import Button from "../../../utilities/Button";
import Input from "../../../utilities/Input";
import { useEffect, useState } from "react"
import { report, course } from "../../../test/attendanceReport"
import axios from "axios"

const Report = () => {

  let d = {
        "start_date": "2023-01-31T18:30:00.000Z",
        "end_date": "2023-02-27T10:12:28.126Z",
        "courses": [
        {
        "_id": "63f6f94d3c04b669ec7a4bc9",
        "semester": 7,
        "courseCode": "18IPC702",
        "branch": "Information Technology",
        "batch": 2019,
        "courseName": "Cryptography and Network Security"
        },
        {
            "_id": "63f6f94d3c04b669ec7a4bc8",
            "semester": 7,
            "courseCode": "18IPC702",
            "branch": "Information Technology",
            "batch": 2019,
            "courseName": "Internet of Things"
            },
            {
                "_id": "63f6f94d3c04b669ec7a4bc7",
                "semester": 7,
                "courseCode": "18IPC702",
                "branch": "Information Technology",
                "batch": 2019,
                "courseName": "Disaster Management and Mitigation"
                },
                {
                    "_id": "63f6f94d3c04b669ec7a4b9",
                    "semester": 7,
                    "courseCode": "18IPC702",
                    "branch": "Information Technology",
                    "batch": 2020,
                    "courseName": "Cryptography and Network Security"
                    },
                    {
                        "_id": "63f6f94d3c04b669ec7abc8",
                        "semester": 7,
                        "courseCode": "18IPC702",
                        "branch": "Information Technology",
                        "batch": 2020,
                        "courseName": "Internet of Things"
                        },
                        {
                            "_id": "63f6f94d3c04b69ec7a4bc7",
                            "semester": 7,
                            "courseCode": "18IPC702",
                            "branch": "Information Technology",
                            "batch": 2020,
                            "courseName": "Disaster Management and Mitigation"
                 }
        ]
        }
    
    let branches = []
    let course_Code=["--None--"]
    let course_Names = []
    let course_Name="--None--"
    let semester = []
    
    let [res, setRes] = useState(null)

    const [resData, setResData] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [courseCode, setCourseCode] = useState(['NIL'])
    const [courseName, setCourseName] = useState("NIL")
    const [getSemester, setSemester] = useState("NIL")
    const [branch, setBranch] = useState("NIL")
    const [flag, setFlag] = useState(false)    
    const[Date1,setDate1]=useState()
    const[Date2,setDate2]=useState()
    const [tableData, setTableData] = useState([])

    const[Dept,setDept]=useState()
    const[Course,setCourse]=useState()
    const[CourseCode,setCourseCode1]=useState()
    const[Sem,setSem]=useState()
    // const[Display,setDisplay]=useState(false)
    let sem=["--None--"]
    let data1=[]
    let temp={}
    

    useEffect( () => {
        axios.get(process.env.NEXT_PUBLIC_URL + '/ci/courses?facultyId=63f42892a8a5c50a79ed2664' )
        .then( response => {
            console.log(response.data)

            setResData(response.data.courses)
            setStartDate(response.data.start_date)
            setEndDate(response.data.end_date)

            console.log([...new Set(response.data.courses.map(item=> item.courseCode))])

            setCourseCode([...new Set(response.data.courses.map(item=> item.courseCode))])
        })
        .catch(err => console.log(err.message))
    },[])

    useEffect(() => {

    }, [courseCode, getSemester])

    useEffect(() => {
        if(flag) {
            axios.get(process.env.NEXT_PUBLIC_URL + '/ci/attendancePercent?start_date='+Date1+'&end_date='+Date2+'&courseId=6401c4eccf7720a45c89b38f' )
            .then((response) => {
                console.log(response.data)
                setTableData(response.data)
                setFlag(false)
            })
            .catch(err => console.log(err.message))
        }
    }, [flag])

    const selectedCourseCode = (data) => {
        // setSelectedcc(data)
        setCourseName(resData.filter(item => item.courseCode == data ).map(item => item.courseName))
        setSemester(resData.filter(item => item.courseCode == data ).map(item => item.semester))
        setBranch(resData.filter(item => item.courseCode == data ).map(item => item.branch))
        
    }

    const generateReport = () => {
        setFlag(true)
    }

    // const onlyUnique = (value, index, array) => {
    //     return self.indexOf(value) === index;
    //   }
      
      course_Code.push("--None--")
      if(d!=null){
        for (let course of d.courses){
            // sem.push(course.semester)
            branches.push(course.branch)
            // course_Code.push(course.courseCode)
            course_Names.push(course.courseName)
        }
        branches = branches.filter((value, index, array) => array.indexOf(value) === index)
        // course_Code=course_Code.filter((value, index, array) => array.indexOf(value) === index)
        course_Names=course_Names.filter((value, index, array) => array.indexOf(value) === index)
        // sem=sem.filter((value, index, array) => array.indexOf(value) === index)
        course_Code=["--None--","18IPC702","18IOE702","18IPC703"]
        sem=["--None--",7,5,3]
        // console.log(course_Code)

        for(let i=0;i<d.courses.length;i++){
            if(CourseCode===course_Code[i+1]){
                course_Name=course_Names[i]
            }
            // else{
            //     course_Name="--None--"
            // }
        }
    //  console.log("CC",CourseCode)
    //  console.log("CN", course_Names)
    }

    // useEffect(() => {
    //     if(res!=null){
    //         for(let i=0;i<res.courses.length;i++){
    //             console.log("Entred")
    //             console.log(CourseCode)
    //             console.log(course_Code[i])
    //             if(CourseCode===course_Code[i+1]){
    //                 console.log("matched")
    //                 course_Name=course_Names[i]
    //             }
    //         }
    
    //         console.log("course name: ",course_Name) 
    //     }
        
    // }, [CourseCode])

    // if(d!=null){
    //     for(let i=0;i<d.courses.length;i++){
    //         console.log("Entred")
    //         console.log(CourseCode)
    //         console.log(course_Code[i])
    //         if(CourseCode===course_Code[i+1]){
    //             console.log("matched")
    //             course_Name=course_Names[i]
    //         }
    //     }

    //     console.log("course name: ",course_Name) 
    // }

    // for(let i=0;i<course.length;i++){
    //     course_Code.push(course[i].courseCode)
    //     //course_Name.push(course[i].courseName)
    // }
                        // console.log(report.length)
                        for(let i=0;i<report.length;i++){
                            temp["Register_Number"]=report[i].regNo
                            temp["Name"]=report[i].name
                            temp["Total_Hours_Present"]=report[i].totalPresent
                            temp["Total_Working_hours"]=report[i].totalHours
                            temp["Attendance_Percentage"]=report[i].percent
                            temp["Sem"]=report[i].semester
                            temp["Course_Code"]=report[i].courseCode
                            data1.push({...temp})

                        } 
                        let fields = []    
                        let omit = [ "Sem","Course_Code" ]
                        const omitFields = (field) => !omit.some(item => item == field)
                        fields = Object.keys(data1[0]).filter(key => omitFields(key))
                        const[data,setData]=useState(data1)
                        const [ filter, setFilter ] = useState(Object.keys(data[0])[0])
                        // console.log(Sem)
                        // console.log(Course)
                        const filterCheck = (doc) => (sem=="--None--" ? true : doc.Sem == Sem) && (CourseCode == "--None--" ? true : doc.Course_Code == CourseCode) 
                        
                        const getValues=()=>{
                            // console.log(data1)
                            let b=data1
                    setDisplay(true)
                        }

    return( data1 &&
        <>
         <span className="inline-grid grid-cols-5 gap-5 p-6">
         {/* <Dropdown name="Department" update={setDept} data={branches}/> */}
         <div className="grid-cols-1">
            <div className="text-sm font-semibold pl-3 mb-2 grid-cols-1 ">{ "Department" }</div>
            <div className="flex w-fit justify-between text-slate-400  text-sm pl-3 cursor-pointer ">{branch}</div>            
        </div>

         <Dropdown name="Course Code" update={selectedCourseCode}  data={courseCode}/>
         
        <div className="grid-cols-1">
            <div className="text-sm font-semibold pl-3 mb-2 grid-cols-1 ">{ "Course Name" }</div>
            <div className="flex w-fit justify-between text-slate-400  text-sm pl-3 cursor-pointer ">{courseName}</div>            
        </div>

        <div className="grid-cols-1">
        <div className="text-sm font-semibold pl-3 mb-2 grid-cols-1 ">{ "Semester" }</div>
            <div className="flex w-fit justify-between text-slate-400  text-sm pl-3 cursor-pointer ">{getSemester}</div>            
        </div>

         <div class="w-5/7 top-1 justify-end gap-x-1">  

         <Button  color="blue" name="Generate Report" event={generateReport}/>
         </div>
         <span className="inline-grid grid-cols-1 gap-10 p-y-4 p-2">
            <Input name="from" type="date" min={startDate} max={endDate} update={setDate1}/>
         </span>
         <span className="inline-grid grid-cols-1 gap-10 p-y-4 p-2">
            <Input name="to" type="date" min={startDate} max={endDate} update={setDate2}/>
         </span>
         
         </span>
         <div class="w-5/7 px-5 pr-8">
         {/* {Display?  <Table data={data1.filter(doc=> filterCheck(doc))} omit={omit}/>: "No Data Here..."} */}
         {tableData ?
            <Table data={tableData} omit={omit} indexed={true} />: "No Data Here..."}
         {/* <Table data={data1}/> */}
         </div>
        </>
    )                    
}

export default Report