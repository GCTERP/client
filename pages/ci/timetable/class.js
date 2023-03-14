import Button from "../../../utilities/Button"
import Table from "../../../utilities/Table"
import Input from "../../../utilities/Input"
import { useEffect, useState } from "react"
import Icon from "../../../utilities/Icon"
import masterTableData from "../../../test/masterTestData"

const ExtraClass = ({ setOpenState }) => {
    const [ submit, setSubmit ] = useState(false)
    const [date, setDate] = useState("")
    const [period, setPeriod] = useState("")
    const [reason, setReason] = useState("")

    return (
        <div className="absolute w-3/12 z-40 border-x-2 bg-white rounded-lg  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute cursor-pointer text-red-500 top-4 right-2" onClick={() => setOpenState(false)}>
                <Icon name="close" icon="close"/>
            </div>
            <div className="text-l font-semibold w-fit m-auto my-4">EXTRA CLASS</div><hr/>
            <div className="flex pl-14 space-x-4 justify-center w-fit m-4">
                <Input name="Date" type="date" color="blue" update={setDate} />
            </div>
            <div className="flex pl-12 space-x-4 justify-center w-fit m-4">
                <Input name="Period" type="text" color="blue" update={setPeriod} />
            </div>
            <div className="flex pl-12 space-x-4 justify-center w-fit m-4">
                <Input name="Reason" type="text" color="blue" update={setReason} />
            </div><hr/>
            <div onClick={() => setSubmit(true)} className={`py-2 px-2 rounded-md cursor-pointer font-semibold text-sm m-4 text-center items-center text-white ${submit ? "bg-slate-400" : "bg-blue-500"}`} disabled={submit ? "disabled" : ""}>Add</div>
        </div>
    )
}

const SwapClass = ({ setOpen }) => {
    const [ submit, setSubmit ] = useState(false)
    const [date1, setDate1] = useState("")
    const [date2, setDate2] = useState("")
    const [reason, setReason] = useState("")
    const [period1, setPeriod1] = useState("")
    const [period2, setPeriod2] = useState("")

    return (
        <div className="absolute w-3/12 z-40 border-x-2 bg-white rounded-lg  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute cursor-pointer text-red-500 top-4 right-2" onClick={() => setOpen(false)}>
            <Icon name="close" icon="close"/>
            </div>
            <div className="text-xl font-bold w-fit m-auto my-4">SWAP CLASS</div><hr/>
            <div className="flex pl-14 space-x-4 justify-center w-fit m-4">
                <Input name="Date" type="date" color="blue"  update={setDate1}/>
            </div>
            <div className="flex pl-14 space-x-4 justify-center w-fit m-4">
                <Input name="Period" type="text" color="blue"  update={setPeriod1}/>
            </div>
            <div className="flex pl-14 space-x-4 justify-center w-fit m-4">
                <Input name="Date" type="date" color="blue"  update={setDate2}/>
            </div>
            <div className="flex pl-14 space-x-4 justify-center w-fit m-4">
                <Input name="Period" type="text" color="blue"  update={setPeriod2}/>
            </div>
            <div className="flex pl-14 space-x-4 justify-center w-fit m-4">
                <Input name="Reason" type="text" color="blue"  update={setReason}/>
            </div><hr/>
            <div onClick={() => setSubmit(true)} className={`py-2 px-2 rounded-md cursor-pointer font-semibold text-sm m-4 text-center items-center text-white ${submit ? "bg-slate-400" : "bg-blue-500"}`} disabled={submit ? "disabled" : ""}>Request</div>
        </div>
    )
}
  

const Class = () => {
    const [ open, setOpen ] = useState(false)
    const [ openState, setOpenState ] = useState(false)

    const [tableData,setTableData]=useState(masterTableData)
    const [tableView, setTableView] = useState(false)
    let data=[]
    let temp={}
    let min_data =[]
    let i=0

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
 
 


    return (
        // <>
        // <div className="flex justify-end m-2 mr-10">
        //     <div className="pr-10">
        //         <Button color={'blue'} name={"Swap Classes"} icon={'edit'} outline={true} event={() => setOpen(true)}/>
        // { open && <SwapClass setOpen={setOpen}/> }
        //     </div>

        //     <Button color={'blue'} name={"Extra Class"} icon={'edit'} outline={true} event={() => setOpenState(true)}/>
        // { openState && <ExtraClass setOpenState={setOpenState}/> }
        // </div>
        // <div className="table m-10 " >
        //     <Table data={mastertabledata}/>
        // </div>
        // <div className="m-10">
        //     <Button color={'blue'} name={"View Full TimeTable"} icon={'edit'} outline={false} on />
        // </div>
        
        // </>

        data && min_data?
     
         <>
        <div className="flex justify-end m-2 mr-10">
             <div className="pr-10">
                 <Button color={'blue'} name={"Swap Classes"} icon={'edit'} outline={true} event={() => setOpen(true)}/>
         { open && <SwapClass setOpen={setOpen}/> }
             </div>

             <Button color={'blue'} name={"Extra Class"} icon={'edit'} outline={true} event={() => setOpenState(true)}/>
         { openState && <ExtraClass setOpenState={setOpenState}/> }
         </div>
         <Table data={tableView ? data : min_data}/>

         <div class="w-4/5 flex justify gap-x- p-2">
             <Button color="blue" icon={tableView?"expand_less":"expand_more"} outline={true} event={ () => tableView?changeState(false):changeState(true)} name= {tableView?"Minimize Timetable":"View Full Timetable"} />
         </div>
         </>:<>Loading...</>
    )
}

export default Class