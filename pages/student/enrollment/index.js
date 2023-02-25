import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../../../utilities/Button"
import Dropdown from "../../../utilities/Dropdown";
import Icon from "../../../utilities/Icon"

const Enrollment = () => {

    const [enrol, setEnrol] = useState('');
    const [enrolmentdata, setEnrolmentdata] = useState({
        "success": '',
        "msg": '',
        "Semester": '',
        "oecountallowed": '',
        "pecountallowed": '',
        "addonallowed": '',
        "mandatorycourses":[],
        "pecourses":[],
        "oecourses":[]
       
    });
const [courses, setCourses] = useState({
    courses:[]
});

const [choosepe,setChoosepe]=useState({
    choosepe:[]
})

const [chooseoe,setChooseoe]=useState({
    chooseoe:[]
})

const [addon,setAddon]=useState({
      addon:[]
})

//Dropdown
const pe=[]
enrolmentdata.pecourses.map(m=>{pe.push(m.title)})
const [selected,setSelected]=useState("")

const oe=[]
enrolmentdata.oecourses.map(m=>{oe.push(m.title)})
const [selectoe,setSelectoe]=useState("")

const [selectaddon,setSelectaddon]=useState("")

const getEnrol = async () => {
    let response = await axios.get(
        "http://localhost:5000/student/enrolment"
    );
    setEnrol(response.data.success)
  }

useEffect(() => {
    const getAllProfile = () => {
        axios
          .get("http://localhost:5000/student/enrolment/getdata")
          .then((response) => {
            console.log(response.data.msg)
            setEnrolmentdata({ "success": response.data.success,
            "msg":response.data.msg,
            "Semester": response.data.Semester,
            "oecountallowed": response.data.oecountallowed,
            "pecountallowed":response.data.pecountallowed,
            "addonallowed": response.data.addonallowed, 
            "mandatorycourses":response.data.courses.mandatorycourses,
            "pecourses":response.data.courses.pecourses,
            "oecourses":response.data.courses.oecourses,
        });
          }
          )
          .catch((err) => console.error(err));
      }

    getEnrol();
    getAllProfile();
  }, []);

const peHandler=()=>{
const object = enrolmentdata.pecourses.find(obj => obj.title === selected);
let found = choosepe.choosepe.find(el => el._id === object._id)
if(!found && selected !== ''){
setChoosepe({ ...choosepe, [choosepe]:  choosepe.choosepe.push(object) });
}
}


const oeHandler=()=>{
    console.log("button clicked")
const object = enrolmentdata.oecourses.find(obj => obj.title === selectoe);
let found = chooseoe.chooseoe.find(el => el._id === object._id)
if(!found && selectoe !== ''){
setChooseoe({ ...chooseoe, [chooseoe]:  chooseoe.chooseoe.push(object) });
}}

const addonHandler=()=>{
const object = enrolmentdata.pecourses.find(obj => obj.title === selectaddon);
let found = addon.addon.find(el => el._id === object._id)
if(!found && selectaddon !== ''){
console.log("baaaka")
setAddon({ ...addon, [addon]:  addon.addon.push(object) });
}}

useEffect(() => {
    peHandler();
},[selected])

useEffect(() => {
     oeHandler();
 },[selectoe])

 useEffect(() => {
    addonHandler();
},[selectaddon])

if(enrol){

    const saveEnrol=()=>{
        const url ="http://localhost:5000/student/enrolment/savedata"
  
        axios
          .post(url, courses)
          .then((res) => {
            console.log(res.data.success);
            const success = res.data.success;
            if (success) {
              console.log('SUCCESS')
              alert('enrolment details saved successfully')
            }
          })
          .catch((err) => {
            console.log('error');
          });
    }

    const fields =  ['courseCode', 'title', 'category']
    const data= enrolmentdata.mandatorycourses

    const fields_1 =  ['courseCode', 'title', 'category']
    const data_1= enrolmentdata.pecourses

    const fields_2 =  ['courseCode', 'title', 'category']
    const data_2= enrolmentdata.oecourses


    const handleSubmit=(coursecode)=>(e)=>{
        console.log(coursecode)
        if(e.target.checked && (courses.courses.indexOf(coursecode) ===-1) ){
            setCourses({ ...courses, [courses]:  courses.courses.push(coursecode) });            
        }
        if(!e.target.checked && (courses.courses.indexOf(coursecode) !=-1)){
            console.log("dsfasdf")
            var index = courses.courses.indexOf(coursecode)
            setCourses({ ...courses, [courses]:  courses.courses.splice(index,1) });     
        }
        
    }


    const deletePE=(peid)=>()=>{
        const object = enrolmentdata.pecourses.find(obj => obj._id === peid);
        console.log(object)
        var index=choosepe.choosepe.indexOf(object._id)
        setChoosepe({ ...choosepe, [choosepe]:  choosepe.choosepe.splice(index,1) });
    
        if(courses.courses.indexOf(object.courseCode) !=-1){
        var index = courses.courses.indexOf(object.courseCode)
        setCourses({ ...courses, [courses]:  courses.courses.splice(index,1) });     
        }
    }

    const deleteOE=(oeid)=>()=>{
        const object = enrolmentdata.oecourses.find(obj => obj._id === oeid);
        var index=chooseoe.chooseoe.indexOf(object._id)
        setChooseoe({ ...chooseoe, [chooseoe]:  chooseoe.chooseoe.splice(index,1) });
        
        if(courses.courses.indexOf(object.courseCode) !=-1){
        var index = courses.courses.indexOf(object.courseCode)
        setCourses({ ...courses, [courses]:  courses.courses.splice(index,1) });     
        }
    }

    const deleteAddon=(addonid)=>()=>{
        const object = enrolmentdata.pecourses.find(obj => obj._id === addonid);
        var index=addon.addon.indexOf(object._id)
        setAddon({ ...addon, [addon]:  addon.addon.splice(index,1) });
    
        if(courses.courses.indexOf(object.courseCode) !=-1){
        var index = courses.courses.indexOf(object.courseCode)
        setCourses({ ...courses, [courses]:  courses.courses.splice(index,1) });     
        }
    }
    return(
        <div>
        <h1 className="text-blue-600 font-semibold">MANDATORY COURSES</h1>

        { enrolmentdata.mandatorycourses &&
        <>
        <div className="relative p-1.5 w-fit inline-block align-middle">
            <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                <table className="w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                    <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                        <tr>
                            {
                                fields.map((heading, index) => (
                                    <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                ))
                            }
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Selected</th>
                        </tr>

                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            enrolmentdata.mandatorycourses.map((row, index) => (
                            
                            <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                {
                                    fields.map((key, index) => (<>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td>
                                    </> ))
                                }
                                <td><div class="flex justify-items-center">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-space-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleSubmit(row['courseCode'])}/>
                                    </div>
                                </td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
  }
 
  <br></br>
  {
         choosepe && enrolmentdata.pecountallowed &&  <><div className="text-blue-600 font-semibold  inline-block pt-5">
        PROFESSIONAL ELECTIVE</div><h1>  Choose any {enrolmentdata.pecountallowed} Professional Electives</h1>
        {
        <div className="pt-3 pb-3">
        <Dropdown name="Select PE" data={pe} update={setSelected} special={true} /></div>
        }
        {
      
        <div className="relative p-1.5 w-fit inline-block align-middle pb-3">
            <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                <table className="w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                    <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                        {selected && 
                        <tr>
                            { 
                                fields_1.map((heading, index) => (
                                    <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                ))
                            }
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Remove</th>
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Selected</th>
                        </tr>
                    }
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            selected && 
                            
                                
                            choosepe.choosepe.slice(0, enrolmentdata.pecountallowed).map((row, index) => (
                            <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                {
                                    fields_1.map((key, index) => (<>
                                    {console.log(row)}
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td>
                                    </> ))
                                }
                                <td>
                                <div className="flex w-fit justify-between text-slate-400 text-sm pl-3 cursor-pointer" onClick={deletePE(row['_id'])}>
                                    <Icon name={'remove'}/>
                                </div>
                                </td>
                                <td><div class="flex items-center">
                                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleSubmit(row['courseCode'])}/>
                                </div>
                                </td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        }
        </>
       }
       
<br></br>
{
         chooseoe && enrolmentdata.oecountallowed &&
<>
<h1 className="text-blue-600 font-semibold">OPEN ELECTIVE</h1><h1>  Choose any {enrolmentdata.oecountallowed} Open Electives</h1>
{
        <div className="pt-3 pb-3">
        <Dropdown name="Select OE" data={oe} update={setSelectoe} special={true} /></div>
        }
     
         <div className="relative p-1.5 w-fit inline-block align-middle">
             <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                 <table className="min-w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                     <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                        {selectoe &&
                         <tr>
                             {
                                 fields_2.map((heading, index) => (
                                     <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                 ))
                             }
                             <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Remove</th>
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Selected</th>
                         </tr>
                        }
                     </thead>
                     <tbody className="divide-y divide-gray-200">
                         {
                            
                             chooseoe.chooseoe.slice(0, enrolmentdata.oecountallowed).map((row, index) => (
                             <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                 {
                                     fields_2.map((key, index) => (<>
                                     <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td>
                                     </> ))
                                 }
                                 <td>
                                <div className="flex w-fit justify-between text-slate-400 text-sm pl-3 cursor-pointer" onClick={deleteOE(row['_id'])}>
                                    <Icon name={'remove'}/>
                                </div>
                                </td>
                                <td><div class="flex items-center">
                                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleSubmit(row['courseCode'])}/>
                                    </div>
                                </td>
                             </tr>))
                         }
                     </tbody>
                 </table>
             </div>
         </div>
         </>
        }
         {
            addon && enrolmentdata.addonallowed &&
            <>
            <h1 className="text-blue-600 font-semibold">ADD ON COURSE</h1><h1>  Choose any ONE Add-on</h1>
            {
        <div className="pt-3 pb-3">
        <Dropdown name="Select Add-on" data={pe} update={setSelectaddon} special={true} /></div>
        }
       
        <div className="relative p-1.5 w-fit inline-block align-middle">
            <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                <table className="w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                    <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                        { selectaddon &&
                        <tr>
                            {
                                fields_1.map((heading, index) => (
                                    <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                ))
                            }
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Remove</th>
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Selected</th>
                        </tr>
                    }
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            addon.addon.slice(0, 1).map((row, index) => (
                            <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                {
                                    fields_1.map((key, index) => (<>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td>
                                    </> ))
                                }
                                 <td>
                                <div className="flex w-fit justify-between text-slate-400 text-sm pl-3 cursor-pointer" onClick={deleteAddon(row['_id'])}>
                                    <Icon name={'remove'}/>
                                </div>
                                
                                </td>
                                <td><div class="flex items-center">
                                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleSubmit(row['courseCode'])}/>
                                    </div>
                                </td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div>
            </>
        
        }
<div className="bottom-6 ">
        <Button color={'blue'} name={'Save Enrollment'} icon={'save'} Filled={'True'} event={saveEnrol}/>
        </div>

        </div>
    )
  }
  if(enrol === 'false'){
      return(
          <h1>Enrollment not yet opened</h1>
      )
  }
  
 
}

export default Enrollment;