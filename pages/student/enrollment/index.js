import { useState, useEffect} from "react";
import { useRouter } from 'next/router'
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
        "ispreviouslyenrolledelectives":'',
        "previouslyenrolledelectives": [],
        "electivesallowed":'',
        "oeallowed": [],
        "peallowed": [],
        "addonallowed": '',
        "mandatorycourses":[],
        "pecourses":[],
        "oecourses":[]
       
});
const [courses, setCourses] = useState({
    courses:[],
    electives:[]
});


const [oecategory,setOecategory]=useState([])
const [pecategory,setPecategory]=useState([])
const [add,setAdd]=useState(['addon'])
const addontype=['PE-1','PE-2','PE-3','PE-4','PE-5']
const [previouslyenrolledelectives,setPreviouslyenrolledelectives]=useState(false)
const router = useRouter()

//Dropdown
const pe=[]

const [selected,setSelected]=useState("")

const oe=[]

const [selectoe,setSelectoe]=useState("")

const [selectaddon,setSelectaddon]=useState("")
const [selecttype,setSelecttype]=useState("")

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
            setPecategory(JSON.parse(JSON.stringify(response.data.peallowed)))
            setOecategory(JSON.parse(JSON.stringify(response.data.oeallowed)))
            setEnrolmentdata({ "success": response.data.success,
            "msg":response.data.msg,
            "Semester": response.data.Semester,
            "ispreviouslyenrolledelectives":response.data.ispreviouslyenrolledelectives,
            "previouslyenrolledelectives":response.data.previouslyenrolledelectives,
            "electivesallowed":response.data.electivesallowed,
            "oeallowed": response.data.oeallowed,
            "peallowed":response.data.peallowed,
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
    setPreviouslyenrolledelectives(JSON.stringify(enrolmentdata.ispreviouslyenrolledelectives))
  }, []);
console.log(enrolmentdata)
const [oecounter,setOecounter]=useState(0)
const [pecounter,setPecounter]=useState(0)

const findoeindex=(index)=>()=>{
    setOecounter(index)
}

const findpeindex=(index)=>()=>{
    setPecounter(index)
}

const findaddonindex=()=>{
    console.log('addon dropodown enabled')
}

if(enrol){
    const saveEnrolment=()=>{
        enrolmentdata.mandatorycourses.map(m=>{courses.courses.push(m.courseCode)})
        console.log(courses)
        const url ="http://localhost:5000/student/enrolment/savedata"
  
        axios
          .post(url, courses)
          .then((res) => {
            console.log(res.data.success);
            const success = res.data.success;
            if (success) {
              console.log('SUCCESS')
              alert('enrolment details saved successfully')
              router.reload()
            }
          })
          .catch((err) => {
            console.log('error');
          });    
    }

    const editEnrolment=()=>{
       setPreviouslyenrolledelectives(false)
    }

    const back=()=>{
        setPreviouslyenrolledelectives(true)
    }

    const fields =  ['courseCode', 'title']

    const fields_1 =  ['courseCode', 'title', 'category']

    const fields_2 =  ['courseCode', 'title', 'courseType']

    const handleElectives=(coursecode,coursetype)=>(e)=>{
        
        let doc = { courseType:"",courseCode: "" }
        doc.courseType=coursetype
        doc.courseCode=coursecode
        if(e.target.checked){
            setCourses({ ...courses, [courses]:  courses.electives.push(doc) });            
        }
        if(!e.target.checked){
            var index = courses.electives.findIndex(x => x.courseType === coursetype)
            setCourses({ ...courses, [courses]:  courses.electives.splice(index,1) });     
        }
        console.log(courses)
    }

    return(
        
        <div>
        <h1 className="mt-2 ml-2 text-blue-600 font-semibold underline underline-offset-8 decoration-2">MANDATORY COURSES</h1><br></br>
        { enrolmentdata.electivesallowed && enrolmentdata.pecourses.map(m=>{pe.push(m.title)})}
        { enrolmentdata.electivesallowed && enrolmentdata.oecourses.map(m=>{oe.push(m.title)})}
        
        { enrolmentdata.mandatorycourses &&
        <>
        <div className="relative p-1.5 w-fit inline-block align-middle">
            <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                <table className="w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                    <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                        <tr>
                            {
                                enrolmentdata.success &&
                                fields.map((heading, index) => (
                                    <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                ))
                            }
                            {
                            enrolmentdata.success &&
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Selected</th>
                        }
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
                                {row.previouslyenrolled? 
                                <td><div className="grid justify-items-center">
                                 <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                 </div></td>
                                : <td><div className="grid justify-items-center">
                                <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                </td>
                                } 
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <br></br><br></br>
        </>
  }
 {previouslyenrolledelectives? 
     <>
      <h1 className="mt-2 ml-2 text-blue-600 font-semibold underline underline-offset-8 decoration-2">ELECTIVE COURSES</h1><br></br>
     <div className="relative p-1.5 w-fit inline-block align-middle">
         <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
             <table className="w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                 <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                     <tr>
                         {
                            enrolmentdata.success &&
                       
                             fields_2.map((heading, index) => (
                                 <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                             )) }
                        {
                            enrolmentdata.success &&
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Selected</th>
                        }
                     </tr>

                 </thead>
                 <tbody className="divide-y divide-gray-200">
                     {
                         enrolmentdata.previouslyenrolledelectives.map((row, index) => (
                         
                         <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                             {
                                 fields_2.map((key, index) => (<>
                                 <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td>
                                 </> ))
                             }
                             {row.previouslyenrolledforthiselective? 
                             <td><div className="grid justify-items-center">
                              <input checked id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                              </div></td>
                             : <td><div className="grid justify-items-center">
                             <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-space-center text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                 </div>
                             </td>
                             } 
                         </tr>))
                     }
                 </tbody>
             </table>
         </div>
     </div>
     <br></br><br></br>
     
     </>
:<>
 {
         enrolmentdata.electivesallowed &&  
         
         <><div className="ml-2 text-blue-600 font-semibold pt-5 underline underline-offset-8 decoration-2">
        PROFESSIONAL ELECTIVE</div><div className="flex ml-2 text-black-600 pt-4">
        Please select a course and then    {<div className="pl-1 pr-2 text-blue-500"><Icon name={'select_check_box'}/></div>}   the box</div><br></br>
        {
        <div className="relative p-1.5 w-fit inline-block align-middle pb-3">
            <div className="shadow-md sm:rounded-lg border">
                <table className="w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                    <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                        {
                        <tr>
                            { 
                                fields_1.map((heading, index) => (
                                    <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                ))
                            }
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Selected</th>
                        </tr>
                    }
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            
                                
                            enrolmentdata.pecourses.slice(0, enrolmentdata.peallowed.length).map((row, index) => (
                            <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                               <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{pecategory[index]}</td>
                                <td>
                                {
                                    <div className="mt-2 ml-2 pt-3 pb-3">
                                    <Dropdown name={enrolmentdata.peallowed[index]} data={pe} update={setSelected} special={true} event={findpeindex(index)}/></div>
                                   
                                }
                                </td>
                                {
                                pecategory.map((c, i) => {
                                    if (i === index) {
                                    if(selected != ''){
                                    const object = enrolmentdata.pecourses.find(obj => obj.title === selected)
                                    pecategory[pecounter] = object.courseCode;
                                    }} 
                                    })
                                }
                                <td><div className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{enrolmentdata.peallowed[index]}</div></td>
                                <td><div className="grid justify-items-center">
                                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleElectives(pecategory[index],enrolmentdata.peallowed[index])}/></div>
                                </td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        }
        <br></br><br></br>
        </>
    }

{
         enrolmentdata.electivesallowed &&
<>
<h1 className="ml-2 text-blue-600 font-semibold underline underline-offset-8 decoration-2">OPEN ELECTIVE</h1><div className="flex ml-2 text-black-600 pt-4">
        Please select a course and then    {<div className="pl-1 pr-2 text-blue-500"><Icon name={'select_check_box'}/></div>}   the box</div><br></br>
         <div className="relative p-1.5 w-fit inline-block align-middle">
             <div className="shadow-md sm:rounded-lg border">
                 <table className="min-w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                     <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                        {
                         <tr>
                             {
                                 fields_1.map((heading, index) => (
                                     <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                 ))
                             }
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Selected</th>
                         </tr>
                        }
                     </thead>
                     <tbody className="divide-y divide-gray-200">
                        {
                            
                             enrolmentdata.oecourses.slice(0, enrolmentdata.oeallowed.length).map((row, index) => (
                             <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                 <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{oecategory[index]}</td>
                                <td>
                                {
                                    <div className="mt-2 ml-2 pt-3 pb-3">
                                    <Dropdown name={enrolmentdata.oeallowed[index]} data={oe} update={setSelectoe} special={true} disabled={false} event={findoeindex(index)}/></div>
                                } 
                                </td>
                                {   
                                    
                                oecategory.map((c, i) => {
                                    if (i === index) {
                                 
                                    if(selectoe != ''){
                                    const object = enrolmentdata.oecourses.find(obj => obj.title === selectoe)
                                    oecategory[oecounter] = object.courseCode;
                                  
                                }
                            }})
                                }
                             <td><div className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{enrolmentdata.oeallowed[index]}</div></td>
                             <td><div className="grid justify-items-center">
                             <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleElectives(oecategory[index],enrolmentdata.oeallowed[index])}/></div></td>
                             </tr>))
                        }
                     </tbody>
                 </table>
             </div>
         </div>
         <br></br><br></br>
         </>
        }

        { enrolmentdata.addonallowed &&
            
            <>
            <h1 className="ml-2 text-blue-600 font-semibold underline underline-offset-8 decoration-2">ADD ON COURSE</h1><div className="flex ml-2 text-black-600 pt-4">
        Please select a course and then    {<div className="pl-1 pr-2 text-blue-500"><Icon name={'select_check_box'}/></div>}   the box</div><br></br>
       
        <div className="relative p-1.5 w-fit inline-block align-middle">
            <div className="shadow-md sm:rounded-lg border">
                <table className="w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                    <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                        { 
                        <tr>
                            {
                                fields_1.map((heading, index) => (
                                    <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                ))
                            }
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Selected</th>
                        </tr>
                    }
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            enrolmentdata.pecourses.slice(0, 1).map((row, index) => (
                            <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{add[index]}</td>
                                <td>
                                {
                                    <div className=" ml-2 ">
                                    <Dropdown name={'Add-on'} data={pe} update={setSelectaddon} special={true} event={findaddonindex}/></div>
                                   
                                }
                                </td>
                                {
                                add.map((c, i) => {
                                    if (i === index) {
                                    if(selectaddon != ''){
                                    const object = enrolmentdata.pecourses.find(obj => obj.title === selectaddon)
                                    add[0] = object.courseCode;
                                    }} 
                                    })
                                }

                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {
                                    <div className=" ml-2 ">
                                    <Dropdown name={'Type'} data={addontype} update={setSelecttype} special={true} event={findaddonindex}/></div>
                                   
                                }  
                                </td>
                                <td><div className="grid justify-items-center">
                                <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleElectives(add[0],selecttype)}/>
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
</>
}
    {previouslyenrolledelectives?<>
        <div className="bottom-6 ">
            <Button  name={'Edit'} icon={'save'} Outline={'Outlined'} event={editEnrolment} color={'blue'}/>
            </div>
    </>:
        <div className="flex bottom-6 ">
        {enrolmentdata.ispreviouslyenrolledelectives &&
        <>
        <div className="pr-4 bottom-6 ">
            <Button color={'blue'} name={'Back'} icon={'arrow_back_ios_new'} outline="false" event={back}/>
        </div></>
        }
        <Button color={'blue'} name={'Save Enrollment'} icon={'save'} Filled={'True'} event={saveEnrolment}/>
        </div>
    }
    
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