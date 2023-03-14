import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../../../utilities/Button"
import Dropdown from "../../../utilities/Dropdown";
import Icon from "../../../utilities/Icon"

const Registration = () => {

    const [registrationdata, setRegistrationdata] = useState({
        "success": '',
        "msg": '',
        "enrolledCourses": [],
        "RACourses":[],
        "SACourses":[],
        "DroppedCourses":[],
        "allowApplyForIntern": '',
        "registeredforinternship":'',
        "internship": [], 
        "registeredforactivitypoints":'',
        "allowApplyForActPoints":'',
        "activityPoints":[],
       
    });
const [courses, setCourses] = useState({
    enrolledCourses:[],
    RACourses:[],
    SACourses:[],
    droppedCourses:[],
    droppingCourses:[],
    internship:'',
    ActivityPoints:''
});

const [RA,setRA]=useState(false)
const [SA,setSA]=useState(false)
const [dropped,setDropped]=useState(false)
const [dropping,setDropping]=useState([])
const [drop,setDrop]=useState(false)
const [doc,setDoc]=useState([])
const [index,setIndex]=useState(0)
let index2 = 0

useEffect(() => {
    const getAllProfile = () => {
        axios
          .get("http://localhost:5000/student/courseregistration/getdata")
          .then((response) => {
            console.log(response.data.msg)
            console.log('response')
            console.log(response.data)
            setDoc(JSON.parse(JSON.stringify(response.data.enrolledCourses)))
            setRegistrationdata({ "success": response.data.success,
            "msg":response.data.msg,
            "enrolledCourses": response.data.enrolledCourses,
            "RACourses":response.data.RACourses,
            "SACourses":response.data.SACourses,
            "DroppedCourses":response.data.DroppedCourses,
            "allowApplyForIntern": response.data.allowApplyForIntern,
            "registeredforinternship":response.data.registeredforinternship,
            "internship": response.data.internship, 
            "registeredforactivitypoints":response.data.registeredforactivitypoints,
            "allowApplyForActPoints":response.data.allowApplyForActPoints,
            "activityPoints":response.data.activityPoints,
        });
          }
          )
          .catch((err) => console.error(err));
      }
    getAllProfile();
    if(registrationdata.RACourses.length > 0){
        setRA(true)
        console.log(RA)
    }
    
    if(registrationdata.SACourses.length > 0){
        setSA(true)
        console.log(SA)
    }
    
    if(registrationdata.DroppedCourses.length > 0){
        setDropped(true)
        console.log(dropped)
    }
  }, []);
console.log('registraion data')
console.log(registrationdata)
console.log(doc)

if(registrationdata.success){

    const fields =  ['courseCode', 'courseTitle']

    const saveRegistration=()=>{
        console.log(courses)
        const url ="http://localhost:5000/student/courseregistration/savedata"
  
        axios
          .post(url, courses)
          .then((res) => {
            console.log(res.data.success);
            const success = res.data.success;
            if (success) {
              console.log('SUCCESS')
              alert('Registration details saved successfully')
            }
          })
          .catch((err) => {
            console.log('error');
          });
    }

    
    const handleEnrolledcourses=(coursecode)=>(e)=>{
        console.log(coursecode)
        if(e.target.checked && (courses.enrolledCourses.indexOf(coursecode) ===-1) ){
            console.log('bakkkka')
            setCourses({ ...courses, [courses]:  courses.enrolledCourses.push(coursecode) });            
        }
        if(!e.target.checked && (courses.enrolledCourses.indexOf(coursecode) !=-1)){
            console.log("dsfasdf")
            var index = courses.enrolledCourses.indexOf(coursecode)
            console.log(index)
            setCourses({ ...courses, [courses]:  courses.enrolledCourses.splice(index,1) });     
        }
        console.log(courses)
    }

    const handleRAcourses=(coursecode)=>(e)=>{
        console.log(coursecode)
        if(e.target.checked && (courses.RACourses.indexOf(coursecode) ===-1) ){
            console.log('bakkkka')
            setCourses({ ...courses, [courses]:  courses.RACourses.push(coursecode) });            
        }
        if(!e.target.checked && (courses.RACourses.indexOf(coursecode) !=-1)){
            console.log("dsfasdf")
            var index = courses.RACourses.indexOf(coursecode)
            setCourses({ ...courses, [courses]:  courses.RACourses.splice(index,1) });     
        }
        console.log(courses)
    }

    const handleSAcourses=(coursecode)=>(e)=>{
        console.log(coursecode)
        if(e.target.checked && (courses.SACourses.indexOf(coursecode) ===-1) ){
            console.log('bakkkka')
            setCourses({ ...courses, [courses]:  courses.SACourses.push(coursecode) });            
        }
        if(!e.target.checked && (courses.SACourses.indexOf(coursecode) !=-1)){
            console.log("dsfasdf")
            var index = courses.SACourses.indexOf(coursecode)
            setCourses({ ...courses, [courses]:  courses.SACourses.splice(index,1) });     
        }
        console.log(courses)
    }

    const handleDroppedcourses=(coursecode)=>(e)=>{
        console.log(coursecode)
        if(e.target.checked && (courses.droppedCourses.indexOf(coursecode) ===-1) ){
            console.log('bakkkka')
            setCourses({ ...courses, [courses]:  courses.droppedCourses.push(coursecode) });            
        }
        if(!e.target.checked && (courses.droppedCourses.indexOf(coursecode) !=-1)){
            console.log("dsfasdf")
            var index = courses.droppedCourses.indexOf(coursecode)
            setCourses({ ...courses, [courses]:  courses.droppedCourses.splice(index,1) });     
        }
        console.log(courses)
    }

    const addDroppingcourses=(row)=>()=>{
        
        console.log('button clicked')
        console.log(row)
        console.log(dropping)
        if (Object.keys(dropping).length === 0){
        var index = registrationdata.enrolledCourses.indexOf(row)
        console.log(index)
        setIndex(index)
        setRegistrationdata({ ...registrationdata, [registrationdata]:  registrationdata.enrolledCourses.splice(index,1) });
        setDropping(row)
        var index1 = courses.enrolledCourses.indexOf(row.coursecode)
        setCourses({ ...courses, [courses]:  courses.enrolledCourses.splice(index1,1) }); 
        }
        else{
            alert('You can only drop one course for a semester')
        }
        setDrop(true)

    }

    const removeDroppingcourses=(coursecode)=>()=>{
        console.log('remove clicked')
        setDropping({})
        console.log(registrationdata)
        console.log(doc)
        const object = doc.find(obj => obj.courseCode === coursecode);
        console.log(object)
        setCourses({...courses,droppingCourses:[]})
        setRegistrationdata({ ...registrationdata, [registrationdata]:  registrationdata.enrolledCourses.splice(index,0,object) })
        setDrop(false)
    }

    const handleDroppingcourses=(coursecode)=>(e)=>{
        console.log(coursecode)
        if(e.target.checked && (courses.droppingCourses.indexOf(coursecode) ===-1) ){
            console.log('bakkkka')
            setCourses({ ...courses, [courses]:  courses.droppingCourses.push(coursecode) });            
        }
        if(!e.target.checked && (courses.droppingCourses.indexOf(coursecode) !=-1)){
            console.log("dsfasdf")
            var index = courses.droppingCourses.indexOf(coursecode)
            setCourses({ ...courses, [courses]:  courses.droppingCourses.splice(index,1) });     
        }
        console.log(courses)
    }

    const handleInternship=(e)=>{
        if(e.target.checked){
            console.log('bakkkka')
            setCourses({...courses, internship:true });            
        }
        if(!e.target.checked){
            console.log("dsfasdf")
            setCourses({ ...courses, internship:false  });     
        }
        console.log(courses)
    }

    const handleActivitypoints=(e)=>{
        if(e.target.checked){
            console.log('bakkkka')
            setCourses({...courses, ActivityPoints:true });            
        }
        if(!e.target.checked){
            console.log("dsfasdf")
            setCourses({...courses, ActivityPoints:false });     
        }
        console.log(courses)
    }

    

    return(
        <div>
        <h1 className="mt-2 ml-2 text-blue-600 font-semibold underline underline-offset-8 decoration-2">ENROLLED COURSES</h1><br></br>

        { registrationdata.enrolledCourses &&
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
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Drop</th>
                        </tr>

                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            registrationdata.enrolledCourses.map((row, index) => (
                            
                            <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                {
                                    fields.map((key, index) => (<>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td>
                                    </> ))
                                } 
                                <td ><div className="grid justify-items-center">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-space-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleEnrolledcourses(row['courseCode'])}/>
                                </div>
                                </td>
                                <td><div className="text-red-500 grid justify-items-center" onClick={addDroppingcourses(row)}><Icon name='delete'/></div></td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
  }
  <br></br><br></br>

  
 { registrationdata.RACourses && RA &&
        <>
        <h1 className="mt-2 ml-2 text-blue-600 font-semibold underline underline-offset-8 decoration-2">REAPPEAR COURSES</h1><br></br>
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
                            registrationdata.RACourses.map((row, index) => (
                            
                            <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                {
                                    fields.map((key, index) => (<>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td>
                                    </> ))
                                } 
                                <td><div className="grid justify-items-center">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-space-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleRAcourses(row['courseCode'])}/>
                                    </div>
                                </td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <br></br><br></br>
        </>
  }

  
 { registrationdata.SACourses && SA &&
        <>
        <h1 className="mt-2 ml-2 text-blue-600 font-semibold underline underline-offset-8 decoration-2">RE-REGISTRATION COURSES</h1><br></br>
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
                            registrationdata.SACourses.map((row, index) => (
                            
                            <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                {
                                    fields.map((key, index) => (<>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td>
                                    </> ))
                                } 
                                <td><div className="grid justify-items-center">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-space-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleSAcourses(row['courseCode'])}/>
                                    </div>
                                </td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <br></br><br></br>
        </>
  }


 { registrationdata.DroppedCourses && dropped &&
        <>
        <h1 className="mt-2 ml-2 text-blue-600 font-semibold underline underline-offset-8 decoration-2">DROPPED COURSES</h1><br></br>
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
                           registrationdata.DroppedCourses.map((row, index) => (
                            
                            <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                {
                                    fields.map((key, index) => (<>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td>
                                    </> ))
                                } 
                                <td><div className="grid justify-items-center">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-space-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleDroppedcourses(row['courseCode'])}/>
                                    </div>
                                </td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <br></br><br></br>
        </>
}

{  drop &&
        <>
        <h1 className="mt-2 ml-2 text-blue-600 font-semibold underline underline-offset-8 decoration-2">DROPPING COURSES</h1><br></br>
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
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Cancel</th>
                        </tr>

                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                           <tr className="justify-items-centerpx-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50">
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{dropping.courseCode}</td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{dropping.courseTitle}</td>
                            <td><div className="grid justify-items-center">
                                <input id="default-checkbox" type="checkbox" value="" className="flex justify-items-center w-4 h-4 text-space-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleDroppingcourses(dropping.courseCode)}/>
                                    </div>
                                </td>
                                <td><div className="grid justify-items-center text-red-500" onClick={removeDroppingcourses(dropping.courseCode)}><Icon name='cancel'/></div></td>
                           </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <br></br><br></br>
        </>
}

{ registrationdata.allowApplyForIntern && 
        <>{console.log('dropping')}{console.log(dropping)}
        <h1 className="mt-2 ml-2 text-blue-600 font-semibold underline underline-offset-8 decoration-2">INTERNSHIP</h1><br></br>
        <div className="relative p-1.5 w-fit inline-block align-middle">
            <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                <table className="w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                    <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                        <tr>
                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Course Title</th>
                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Obtained Credits</th>
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Selected</th>
                        </tr>

                    </thead>
                    <tbody className="divide-y divide-gray-200">
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">Internship</td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"><div className="grid justify-items-center">{registrationdata.internship[0]}</div></td>
                                <td><div className="grid justify-items-center">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-space-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleInternship}/>
                                    </div>
                                </td>
            
                        
                    </tbody>
                </table>
            </div>
        </div>
        <br></br><br></br>
        </>
}

{ registrationdata.allowApplyForActPoints && 
        <>
        <h1 className="mt-2 ml-2 text-blue-600 font-semibold underline underline-offset-8 decoration-2">ACTIVITY POINTS</h1><br></br>
        <div className="relative p-1.5 w-fit inline-block align-middle">
            <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                <table className="w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                    <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                        <tr>
                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Course Title</th>
                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Obtained Points</th>
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Selected</th>
                        </tr>

                    </thead>
                    <tbody className="divide-y divide-gray-200">
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">Activity points</td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"><div className="grid justify-items-center">{registrationdata.activityPoints[0]}</div></td>
                                <td><div className="grid justify-items-center">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-space-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={handleActivitypoints}/>
                                    </div>
                                </td>
                    </tbody>
                </table>
            </div>
        </div>
        <br></br><br></br>
        </>
}

<div className="bottom-6 ">
        <Button color={'blue'} name={'Save Registration'} icon={'save'} Filled={'True'} event={saveRegistration}/>
        </div>

        </div>
    )
}
}

export default Registration;