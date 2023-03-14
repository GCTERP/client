import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Icon from "../../../utilities/Icon";
import Dropdown from "../../../utilities/Dropdown";

const Registration = () => {
  const data1 = [2017,2018,2019,2020,2021, 2022, 2023, 2024];
  const data2 = ["ALL","ECE", "CSE", "EEE", "IT", "CIVIL", "MECH", "EIE"];
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

  const [enroledStudents, setEnroledStudents] = useState({
    courseCode: [],
  });

  const [approve, setApprove] = useState({
    courses: [],
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
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
      console.log(enrolmentdata)
   
  }, [sem, branch, batch]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const saveEnrol = () => {
    setLoading(true);
    const url = "http://localhost:5000/hod/courseregistration";
    axios
      .post(url, enrolmentdata)
      .then((res) => {
        console.log(res.data);
        setEnroledStudents({
          courseCode: res.data,
        });
        setSearch(true);
        setLoading(false);
      })

      .catch((err) => {
        console.log("error");
        setLoading1(false);
        alert(err.response.data.message)
      });
  };

  const fields = ["courseCode", "courseTitle", "studentsenrolled"]
  const data = enroledStudents.courseCode;

  const fields1 = ["registernumber", "studentname", "branch", "batch"]

  const [expand, setExpand] = useState(false)
  const [studentListTable, setStudentListTable] = useState([])

  const studentDetails = (indrow) => (e) => {
    setExpand(!expand);
    setStudentListTable(indrow);
  }

  const handleSelectAll = (indrow) => (e) => {
    let doc = { courseCode: "", students: [] };
    if (e.target.checked) 
    {
      indrow.studentsList.map((row) => {
        row["approval"] = 13;
        doc.courseCode = indrow["courseCode"];
        doc.students.push({
          register: row["registernumber"],
          approval: row["approval"],
        });
      });
      setApprove({ ...approve, [enrolmentdata]: approve.courses.push(doc) });
    }
    else if (!e.target.checked)
     {
      indrow.studentsList.map((row) => {
        row["approval"] = -13;
        doc.courseCode = indrow["courseCode"];
        doc.students.push({
          register: row["registernumber"],
          approval: row["approval"],
        });
      });
      var index = approve.courses.indexOf(indrow.courseCode);
      setApprove({
        ...approve,
        [enrolmentdata]: approve.courses.splice(index, 1),
      });
    }
  };

  const handleClick = (courseCode, ind) => (e) => {
    const object = approve.courses.find((obj) => obj.courseCode === courseCode);

    const stud = object.students.find((obj) => obj.register === ind["registernumber"]);

    if (e.target.checked) 
    {
      stud.approval = 13;
      ind["approval"] = 13;
    } 
    else if (!e.target.checked) 
    {
      stud.approval = -13;
      ind["approval"] = -13;
      router.replace(router.asPath);
      setIsRefreshing(true);
    }
     else if (ind["approval"] > 13) {
      alert("You can't able to make changes!");
    }
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [approve]);

  const saveApprove = () => {
    setLoading1(true);
    const url = "http://localhost:5000/hod/courseregistration/approvestudents";

    axios
      .post(url, approve)
      .then((res) => {
        console.log(res.data);
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
        console.log("error");
        setLoading1(false);
        alert(err.response.data.message)
      });
  };

  return (
    <>
      <div className="flex space-x-6">
        <div>
          <Dropdown name="Batch" data={data1} update={setBatch} special={false} />
        </div>
        &nbsp;&nbsp;&nbsp;
        <div>
          <Dropdown name="Branch" data={data2} update={setBranch} special={false} />
        </div>
        &nbsp;&nbsp;&nbsp;
        <div>
          <Dropdown name="Semester" data={data3} update={setSem} special={false} />
        </div>
        &nbsp;&nbsp;&nbsp;
        <div className="justify-end mt-2">
        <button className="flex w-fit py-2 px-2 rounded-md cursor-pointer font-semibold text-sm items-center bg-blue-500 text-white" onClick={saveEnrol}  disabled={loading}><div className="px-1">{loading ? "Loading..." : "Get Details"}</div></button>
        </div>
      </div>
      <br></br>
      <div>
        {enroledStudents.courseCode && (
          <>
            <div className="relative p-1.5 w-fit inline-block align-middle">
              <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                <table className="w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                  <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                    {search && (
                      <tr>
                        {fields.map((heading, index) => (
                          <th className="text-center px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                        ))}
                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider"> Approval</th>
                        <th className="px-6 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">   Actions</th>
                      </tr>
                    )}
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.map((row, index) => (
                      <>
                        <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                          {fields.map((key, index) => (
                            <>
                              <td className="text-center px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td>
                            </>
                          ))}
                          <td>
                            <div className="flex grid justify-items-center">
                              <input id="default-checkbox" type="checkbox" value="" onChange={handleSelectAll(row)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            </div>
                          </td>
                          <td>
                            <div className="flex justify-evenly items-center">
                              <div onClick={studentDetails(row)}>
                                <Icon name={`expand_${expand4 ? "less" : "more"}`}/>
                              </div>
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
        {studentListTable.studentsList && expand && (
          <>
            <h1 className="p-3 font-semibold">{studentListTable.courseCode}-Students</h1>
            <div className="relative p-1.5 w-fit  align-middle">
              <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                <table className="w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                  {studentListTable.studentsList && expand && (
                    <tr className="rounded-t-lg bg-gray-100 text-xs uppercase">
                      {fields1.map((heading, index) => (
                        <th className="text-center px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                      ))}
                      <th className="text-center px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider"> Approval</th>
                      <th className="text-center px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider"> Approval-PC</th>
                    </tr>
                  )}
                  <tbody className="divide-y divide-gray-200">
                    {studentListTable.studentsList &&
                      expand &&
                      studentListTable.studentsList.map((element, index) => {
                        return (
                          <>
                            <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={element._id}>
                              {fields1.map((key, index) => {
                                return (
                                  <>
                                    <td className="text-center px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={element[key]}>{element[key]}</td>
                                  </>
                                );
                              })}
                              <td className="text-center  px-6 py-4 text-sm text-gray-800 ">
                                {element["approval"] === 13 ? (
                                  <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"onChange={handleClick(studentListTable.courseCode,element)}checked/>
                                ) : (
                                  <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleClick(studentListTable.courseCode,element)}/>
                                )}
                              </td>
                              <td className="text-center  px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                              {element.approval=== 11 &&  <div className="text-blue-500"><Icon name="check_circle" fill={false} /></div>}
                              {element.approval=== 12 &&  <div className="text-blue-500"><Icon name="check_circle" fill={false} /></div>}
                              {element.approval <= 9 && <div className="text-red-500"><Icon name="cancel" fill={false} /></div>}
                              {element.approval>= 13 && <div className="text-green-500"><Icon name="check_circle" fill={false} /></div>}
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
        {search && (
          <div className="mt-2">
            <button className="flex w-fit py-2 px-2 rounded-md cursor-pointer font-semibold text-sm items-center bg-blue-500 text-white" onClick={saveApprove}  disabled={loading1}><div className="px-1">{loading1 ? "Loading..." : "Approve"}</div></button>
          </div>
        )}
      </div>
    </>
  );
};

export default Registration;