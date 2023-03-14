import Link from "next/link"
import { useState, useEffect } from "react";
import Button from '../../../utilities/Button';
import axios from "axios";
import Icon from "../../../utilities/Icon"
import Dropdown from "../../../utilities/Dropdown";
import { useRouter } from "next/router"

const Enrolment = () => {
  const [enrol, setEnrol] = useState('');

  const data1 = [2018,2019,2020,2021, 2022, 2023, 2024, 2025, 2026];
  const data2 = ["ALL","ECE", "CSE", "IT", "EEE", "CIVIL", "MECH", "EIE"];
  const data3 = ["ALL",1, 2, 3, 4, 5, 6, 7, 8];
  const [batch, setBatch] = useState(0);
  const [branch, setBranch] = useState("");
  const [sem, setSem] = useState(0);
  const [enrolmentdata, setEnrolmentdata] = useState({
    batch: 0,
    sem: 0,
    branch: "",
  });


  const [search, setSearch] = useState(false);
  const [expand4, setExpand4] = useState(false);

  const [profile, setProfile] = useState({
    courseCode: [],
  });

  const [approve, setApprove] = useState({
    courses: [],
  });
  const [removestudent, setRemove] = useState({
    courses: [],
  });
  const [addstudent, setAdd] = useState({
    courses: [],
  });
  const data7={  
    "batch" :2019,
    "sem" : 6,
  }
 
  const getEnrol = async () => {
    let response = await axios.post(
        "http://localhost:5000/admin/enrolment",
        data7
    );
    setEnrol(response.data.success)
  }


  useEffect(() => {
    getEnrol(); 
 }, []);

 useEffect(() => {
  var bran=branch;
  var semes=sem;
  if(branch==="ALL"){
    bran=["ECE", "CSE", "IT", "EEE", "CIVIL", "MECH", "EIE"];
  }
  if(semes==="ALL"){
    semes=[1,2,3,4,5,6,7,8];
  }
  
    setEnrolmentdata((prevState) => {
      return {
        ...prevState,
        batch: batch,
        sem: semes,
        branch: bran,
      };
    });
 
 
  }, [sem, branch, batch]);


 const [expand, setExpand] = useState(false);
 const [unique, setUnique] = useState([]);
 const [isRefreshing, setIsRefreshing] = useState(false)
 const router = useRouter()

 const studentDetails = (indrow) => (e) => {
   setExpand(!expand);
   setUnique(indrow);
   return <></>;
 };
 const handleSelectAll = (indrow) => (e) => {
   let doc = { courseCode: "", students: [] };
     if (e.target.checked) {
       indrow.studentsList.map((row) => {
       row["approval"] = 4;
       doc.courseCode = indrow["courseCode"];
       doc.students.push({
         register: row["registernumber"],
         approval: row["approval"],
       });})
       setApprove({ ...approve, [approve]:  approve.courses.push(doc) });
       router.replace(router.asPath);
      setIsRefreshing(true);
     } else if (!e.target.checked) {
       indrow.studentsList.map((row) => {
       row["approval"] = -4;
       doc.courseCode = indrow["courseCode"];
       doc.students.push({
         register: row["registernumber"],
         approval: row["approval"],
       });})
       var index = approve.courses.indexOf(indrow.courseCode)
       setApprove({ ...approve, [approve]:  approve.courses.splice(index,1) });
       router.replace(router.asPath);
      setIsRefreshing(true);
     }
 };

 const handleClick = (courseCode, ind) => (e) => {
   const object = approve.courses.find((obj) => obj.courseCode === courseCode);
   const stud = object.students.find(
     (obj) => obj.register === ind["registernumber"]
   );
   if (e.target.checked) {
     stud.approval = 4;
     ind["approval"] = 4;
   } 
   else if(!e.target.checked){
     stud.approval = -4;
     ind["approval"] = -4;
      router.replace(router.asPath);
      setIsRefreshing(true);
   } 
   else if (row["approval"] > 1) {
     alert("You can't able to make changes!");
   }
 };

 useEffect(() => {
  setIsRefreshing(false);
},[approve])

 //remove students
 const deleteStudent = (courseCode, ind) => (e) => {
  let doc1 = { courseCode: "", students: [] };
      doc1.courseCode = courseCode;
      doc1.students.push({
        register: ind["registernumber"]
      });
      var index = removestudent.courses.indexOf(courseCode)
      setRemove({ ...removestudent, [removestudent]:  removestudent.courses.push(doc1) });
  const url = "http://localhost:5000/admin/enrolment/removestudents";
      axios
        .post(url, removestudent)
        .then((res) => {
          alert("student removed successfully!! please refresh the page to view the updated details...")
          router.reload();
        })
  
        .catch((err) => {
        });
};

//POPUP for Add Student
const [modalOn, setModalOn] = useState(false);
const [inputTag, setInputTag] = useState("");
const [inputTag1, setInputTag1] = useState("");
const [adds,setAdds]=useState('')
const modalClicked = (row) => {
  setModalOn(true)
  setAdds(row)
}
const handleOKClick = (addrow) => {
  setModalOn(false)
  let doc2 = { courseCode: "", students: [] };
  doc2.courseCode = addrow.courseCode;
  doc2.students.push({
    register: inputTag
  });
  var index1 = addstudent.courses.indexOf(addrow.courseCode)
  setAdd({ ...addstudent, [addstudent]: addstudent.courses.push(doc2) });
  const url = "http://localhost:5000/admin/enrolment/addstudents";
      axios
        .post(url, addstudent)
        .then((res) => {
          alert(`${res.data.message} Please refresh the page`)
          router.reload();
        })
  
        .catch((err) => {
          alert(err.response.data.message)
        });

}
const handleCancelClick = () => {
  setModalOn(false)
}
const handleInput = (e) => {
  setInputTag(e.target.value);
};
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  if(enrol === true){

    const saveEnrol = () => {
      setLoading(true);
      const url = "http://localhost:5000/admin/enrolment/getdata";
      axios
        .post(url, enrolmentdata)
        .then((res) => {
          setProfile({
            courseCode: res.data,
          });
          setSearch(true);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          alert(err.response.data.message)
        });
    };
  
    const fields = ["courseCode", "courseTitle", "studentsenrolled"];
    const data = profile.courseCode;
    const fields1 = ["registernumber", "studentname", "branch", "batch"];

    const saveApprove = () => {
      setLoading1(true);
      const url = "http://localhost:5000/admin/enrolment/approve";
      axios
        .post(url, approve)
        .then((res) => {
          if(res.data.success){
            setLoading1(false);
            alert("Approval done successfully!")
          }
          else{
          setLoading1(false);
          alert(res.data.message)
          }
        })
        .catch((err) => {
          setLoading1(false);
          alert(err.response.data.message)
        });
    };
  
  
  return (
    <>
    <div className="flex space-x-6">
    <Dropdown name="Batch" data={data1} update={setBatch} special={false} />
      &nbsp;&nbsp;&nbsp;
      <Dropdown name="Branch" data={data2} update={setBranch} special={false} />
      &nbsp;&nbsp;&nbsp;
      <Dropdown name="Semester" data={data3} update={setSem} special={false} />
      &nbsp;&nbsp;&nbsp;
      <div className="justify-end mt-2">
      <button className="flex w-fit py-2 px-2 rounded-md cursor-pointer font-semibold text-sm items-center bg-blue-500 text-white" onClick={saveEnrol}  disabled={loading}><div className="px-1">{loading ? "Loading..." : "Get Details"}</div></button>
      </div>
    </div>
    <br></br>
    <div>
      {profile.courseCode && (
        <>
          <div className="relative p-1.5 w-fit inline-block align-middle">
            <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
              <table className="w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                  {search && (
                    <tr>
                      {fields.map((heading, index) => (
                        <th
                          className="text-center px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider"
                          key={index}
                        >
                          {heading}
                        </th>
                      ))}
                    <th className="px-6 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                       Approval
                      </th>
                      <th className="px-6 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  )}
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((row, index) => (
                    <>
                      <tr
                        className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50"
                        key={index}
                      >
                        {fields.map((key, index) => (
                          <>
                            <td
                              className="text-center px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                              key={index}
                            >
                              {row[key]}
                            </td>
                          </>
                        ))}
                      <td>
                        <div className="flex justify-center">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            value=""
                            onChange={handleSelectAll(row)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          </div>
                          </td>
                      <td>
                        <div className="flex justify-evenly cursor-pointer">
                        <div onClick={studentDetails(row)}>
                              {" "}
                              <Icon
                                name={`expand_${expand4 ? "less" : "more"}`}
                              />
                            </div>
                            <div onClick = {() =>modalClicked(row)}>
                          <div className="text-blue-500"><Icon name="group" fill={false} /></div>
                        </div>
                        {modalOn && (
                          <>
                           <div className="s fixed inset-0 z-50 drop-shadow-md "> 
                      <div className="flex h-screen justify-center items-center ">
                 <div className="flex-col justify-center  bg-white py-6 px-20 border-2 rounded-xl ">
          <div className="flex  text-lg font-semibold mb-5" >Add student</div>         
            <div>
              <div><input type="text" value={adds.courseCode} className="border border-sky-500 p-2 rounded mb-5 focus:outline-none" placeholder={adds.courseCode}/></div>
             <div> <input type="text" className="border border-sky-500 p-2 rounded mb-5 focus:outline-none" placeholder="Roll No" onChange={handleInput}/></div>
            
            </div>
            <div className="flex justify-around">
            <Button name={"Add"} color={"blue"} event= {() =>handleOKClick(adds)} />
            <Button name={"Cancel"} color={"blue"} event={handleCancelClick} />
           </div>
      </div>
  </div>
</div>
</>
)}
</div>
                      </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {unique.studentsList && expand && (
        <>
        <h1 className="text-sm font-semibold pl-3 mt-3 mb-3">{unique.courseCode}-Students</h1>
          <div className="relative p-1.5 w-fit  align-middle">
            <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
              <table className="w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                {unique.studentsList && expand && (
                  <tr className="rounded-t-lg bg-gray-100 text-xs uppercase">
                    {fields1.map((heading, index) => (
                      <th
                        className="text-center px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider"
                        key={index}
                      >
                        {heading}
                      </th>
                    ))}
                    <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                     Approval
                    </th>
                    <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                    <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                     Approval-Status
                    </th>
                  </tr>
                )}
                <tbody className="divide-y divide-gray-200">
                  {unique.studentsList &&
                    expand &&
                    unique.studentsList.map((element, index) => {
                      return (
                        <>
                          <tr
                            className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50"
                            key={element._id}
                          >
                            {fields1.map((key, index) => {
                              return (
                                <>
                                  <td
                                    className="text-center px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                                    key={element[key]}
                                  >
                                    {element[key]}
                                  </td>
                                </>
                              );
                            })}
                           
                            <td className="px-6 py-4 text-sm text-gray-800 ">
                              <div className="flex justify-center">
                        {element["approval"] === 4 ? (
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleClick(unique.courseCode,element)} checked />
                              ) : (
                                <input id="default-checkbox" type="checkbox" value="" onChange={handleClick(unique.courseCode,element)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                              )}
                        </div>
                      </td>
                            <td>
                        <div className="flex justify-center items-center cursor-pointer" >
                          <div onClick={deleteStudent(unique.courseCode,
                                    element)}>
                         <div className="text-red-500"><Icon name="delete" fill={false} /></div>
                        </div>
                        </div>
                      </td> 
                      <td className="text-center px-5 py-3 text-sm text-gray-800 whitespace-nowrap">
                              {element["approval"]=== 1 &&  <div className="text-blue-500"><Icon name="check_circle" fill={false} /></div>}
                              {element["approval"]=== 2 &&  <div className="text-green-500"><Icon name="check_circle" fill={false} /></div>}
                              {element["approval"] <= 0 && <div className="text-red-500"><Icon name="cancel" fill={false} /></div>}
                              {element["approval"]>= 3 && <div className="text-green-500"><Icon name="check_circle" fill={false} /></div>}
                              </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          
        </>
      )}
     {
        search &&
      <div className="mt-2"><button className="flex w-fit py-2 px-2 rounded-md cursor-pointer font-semibold text-sm items-center bg-blue-500 text-white" onClick={saveApprove}  disabled={loading1}><div className="px-1">{loading1 ? "Loading..." : "Approve"}</div></button></div>
    }
    </div>
  </>
  );
  }
  else if(enrol === false){
    
             return (
              <>
              <div className="content-center">
               <h1>Registration Not yet Opened!!!</h1>
              </div>
              </>
            )
}
}
export default Enrolment