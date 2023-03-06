import {useEffect,useState} from 'react'
import Table from "../../../utilities/Table";
import Button from "../../../utilities/Button";
import axios from "axios";

const Timetable = () => {
    const [tableData,setTableData]=useState(null)
    const [tableView, setTableView] = useState(false)
    let data=[]
    let temp={}
    let min_data =[]
    let i=0

    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_URL + '/ci/staffTimetable?facultyId=63f42892a8a5c50a79ed2664')
        .then(res=>{
            let a = res.data
            // console.log(a)
            setTableData(a)
            
            if(tableData==null)
                console.log("no data")


        })
    }, [])
    console.log("Table : ",tableData)

    if (tableData!=null){

       let j
        for(let i=0;i<tableData.length;i++){
            j = tableData[i].date
            console.log(typeof(j))
            console.log(typeof(tableData[i].date))
            temp["Date"] = j.slice(0,10)
            temp["Period_1"]= " "
            temp["Period_2"]= " "
            temp["Period_3"]= " "
            temp["Period_4"]= " "
            temp["Period_5"]= " "
            temp["Period_6"]= " "
            temp["Period_7"]= " "
            temp["Period_8"]= " "
            while(tableData[i].date === j){
                temp["Period_" + tableData[i].period]= tableData[i].courseCode
                i++
                if(i==tableData.length)
                    break
            }
            data.push({...temp})
            i--
        }

        for(let i=0;i<5&&i<data.length;i++){
            min_data.push({...data[i]})
        }

    }
    
   const changeState = (status) => {
    setTableView(status)
   }


    return(data && min_data?

    <>
    <Table data={tableView ? data : min_data}/>
    <div class="w-4/5 flex justify gap-x- p-2">
        <Button color="blue" icon={tableView?"expand_less":"expand_more"} outline={true} event={ () => tableView?changeState(false):changeState(true)} name= {tableView?"Minimize Timetable":"View Full Timetable"} />
    </div>
    </>:<>Loading...</>
    )
}

export default Timetable