import {useEffect,useState} from 'react'
import Table from "../../../utilities/Table";
import axios from 'axios';

const Timetable = () => {

    const [tableData,setTableData]=useState(null)
    const [courses, setCourses] = useState(null)

    useEffect(() => {

        axios.get(process.env.NEXT_PUBLIC_URL + '/student/timetable', { params: { studentId: "63e37ccae3ca2d915d68de47", semester:7 } })
            .then(res=> {
                setTableData(res.data)
                console.log(res.data)
                let data = []
                for(let course of res.data){
                    let temp = {
                        courseCode:course.courseCode,
                        courseName:course.courseName,
                        facultyName: course.facultyName
                    }
                    data.push({...temp})
                }
                console.log(data)
                setCourses(data)
                
            })
            .catch(err => console.log(err.message))

    }, [])


    
    let day_order=["Monday","Tuesday","Wednesday","Thursday","Friday"]
    let data1 = []
    for (let i=0;i<5;i++){
        let temp = {
            "Day Order" : day_order[i],
            "Period1" : " ",
            "Period2" : " ",
            "Period3" : " ",
            "Period4" : " ",
            "Period5" : " ",
            "Period6" : " ",
            "Period7" : " ",
            "Period8" : " "
        }
        data1.push({...temp})
    }
    if(tableData)
        for(let course of tableData){
            for(let period of course.schedule){
                let dayO = Math.floor(period/10) - 1;
                if(data1[dayO]["Period"+(period%10).toString()] === " ")
                    data1[dayO]["Period"+(period%10).toString()] = course.courseCode
                else
                    data1[dayO]["Period"+(period%10).toString()] += " / "  + course.courseCode
                
            }
        }
    
    return( (tableData && courses)?

    <>
    <Table data={data1}/>
    <br></br>
    <div class="justify-center flex">
    <Table data={courses}/>
    </div>
    </>
    :<div>Loading</div>
    )
}

export default Timetable