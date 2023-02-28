import tableSchedule from "../../../test/tableSchedule"
import tableDateData from "../../../test/timeDataTest"
import Button from "../../../utilities/Button"
import Calendar from "../../../utilities/Calendar"
import Dropdown from "../../../utilities/Dropdown"
import MultiSelect from "../../../utilities/MultiSelect"
import Table from "../../../utilities/Table"
import studentData from "../../../test/studentData"
import { useEffect, useState } from "react"
import onDutyTestData from "../../../test/onDutyTestData"

const OnDuty = () => {

    const data = onDutyTestData
    const per = [1,2,3,4,5,6,7,8]
    // const fields = data && data[0] ? Object.keys(data[0]) : [];
    const [fields, setFields] = useState(onDutyTestData.map(c => c.register) && onDutyTestData.map(c => c.studentName) > 0
        ? (onDutyTestData.map(c => Object.keys(c.studentName[0]).filter((key) => omitFields(key))))
        : [])

    const omit = ["_id", "studentId", "present", "onduty", "masterTimetableId", "courseId", "courseCode", "branch", "batch", "date", "period", "__v"]
    const omitFields = (field) => !omit.some((item) => item == field)

    const [isChecked, setIsChecked] = useState(false);
    const [editBtn, setEditBtn] = useState(false)
    const [studentList, setStudentList] = useState([''])
    const [studentName, setStudentName] = useState([''])
    const [studentRegNo, setStudentRegNo] = useState([''])

    useEffect(() => {
        const studentList = [...new Set(onDutyTestData.map(course => course.register))];
        studentList.sort()
        setStudentList(studentList)
    }, [])

    useEffect(() => {
        const dt = []
        const date = [...new Set(onDutyTestData.map(course => {
            const parts = course.date.split("T");
            dt.push(parts[0])
        }))];

        const srn = []
        const sn = []

        const courseCo = [...new Set(onDutyTestData.map(course => {
            sn.push(course.studentName)
            srn.push(course.register)
        }))]

        setStudentName(sn)
        setStudentRegNo(srn)


    }, [])

    const selectedPeriod = () => {

    }

    const selectedRegNo = () => {

    }

    function handleCheckboxChange(event) {
        setIsChecked(event.target.checked);
        console.log(isChecked)
    }

    // Save Button Functionality
    const saveData = (d) => {
    }

    // Cancel Button Functionality
    const cancelData = () => { 
    }

    return (
        <>
        <div className="flex">
            <div className="w-9/12">
                <div className="px-2 m-2">
                    <div className="flex">
                        <div className="w-1/3">
                            <Dropdown name ={"Date"} data = {['12 December 2022', '13 December 2023']} special ={false} />
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-1/3">
                            <MultiSelect name = {'Period'} data = {['1', '2', '3', '4', '5', '6', '7', '8']} selectedData={selectedPeriod}/>            
                        </div>
                        <div className="w-1/3">
                            <MultiSelect name = {'Register Number'} data = {studentList} selectedData={selectedRegNo}/>         
                        </div>
                        <div className="w-1/3 pt-2">
                            <Button color={'blue'} name={"Add"} icon={'add'} outline={false} event={() => {setEditBtn(true)}} />
                        </div>
                    </div>

                    <h4 className="mt-4">Class List</h4>
                    {/* <Table data={tableDateData} /> */}

                    <div className="relative p-1.5 w-fit inline-block align-middle">
                        <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                            <table className="min-w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                                <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                                    <tr>
                                        {
                                            fields.map((heading, index) => (
                                                <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                            ))
                                        }
                                        {
                                        per.map((key) => (
                                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">{key}</th>                                        
                                        ))
                                        }
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {
                                        data.map((row, index) => ( 
                                        <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>

                                            {
                                                fields.map((key, index) => (
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td> ))
                                            }
                                            
                                            {/* Should be optimised better => map */}
                                            {
                                                per.map((key) => (
                                                <td>
                                                  <input
                            type="checkbox"
                            name={key}
                            // value={checked[key]}
                            // checked={values[key]}
                            // size={setSize(checked[key])}
                            // onClick={(e) => {
                            //   checked[key] === ""
                            //     ? (values[key] = (
                            //         <span class="material-symbols-outlined">
                            //           done
                            //         </span>
                            //       ))
                            //     : (values[key] = "");

                            // //   setChecked({ ...checked });
                            //   setValues({ ...values });
                            //   checked[key] != ""
                            //     ? (checked[key] = "")
                            //     : checked[key];
                            // }}
                            className="group-hover:bg-sky-50 outline-none"
                          />
                                                </td>
                                                ))
                                            }

                                        </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="relative p-1.5 w-fit inline-block align-middle">
                        <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                            <table className="min-w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                                <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                                    <tr>
                                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Serial Number</th>
                                        {
                                            fields.map((heading, index) => (
                                                <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                            ))
                                        }
                                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Present</th>
                                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">Absent</th>
                                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">On-Duty</th>                                    
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {
                                        data.map((row, index) => ( 
                                        <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" >{index+1}</td>
                                            {
                                                fields.map((key, index) => (
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td> ))
                                            }
                                        </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div> 

                </div>
                {
                    editBtn ? 
                    <div className="flex justify-end flex-row m-10">
                        <div className="mx-4 w-1/8">
                            <Button color={'blue'} name={"Cancel"} outline={true} event={cancelData} />
                        </div>
                        <div className="mx-4 w-1/6">
                            <Button color={'blue'} name={"Save"} outline={false} event={saveData} />
                        </div>
                    </div> : null
                }

            </div>
            <div className="w-3/12 border-l">
                    <div className="ml-6 flex flex-col h-screen">
                        <h4 className="pb-4">Calendar</h4>
                        <Calendar className="ml-2 flex-1" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default OnDuty