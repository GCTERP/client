import Dropdown from "../../utilities/Dropdown"
import Table from "../../utilities/Table"
import Button from '../../utilities/Button'
import MultiSelect from '../../utilities/MultiSelect'
import tableSchedule from "../../test/tableSchedule"
import test from '../../test/timeTableTest'
import ttDataTest from '../../test/ttDataTest'
import { useEffect, useState } from "react"

const Timetable = () => {
    
    // use States
    const [tableData, setTableData] = useState(test)
    const [editBtn, setEditBtn] = useState(false)
    const [update, setUpdate] = useState(false)
    const [period, setPeriod] = useState([])
    const [courseCode, setCourseCode] = useState("");
    const [getCourseCodeData, setCourseCodeData] = useState([''])
    const [selectedPeriodList, setSelectedPeriodList] = useState("")
    const [previousTableData, setPreviousTableData] = useState([]);
    const [branch, setBranch] = useState(['2023'])
    const [getSemester, setSemester] = useState(['7'])
    const [semester, setSelectedSemester] = useState("")

    // //Get Semester

    useEffect(() => {
        const semesterCodes = [...new Set(ttDataTest.sems.map(semester => semester.sem))];
        setSemester(semesterCodes)
    }, [ttDataTest])

    // Get Course Code
    useEffect(() => {
        const cc = [...new Set(ttDataTest.courses.map(course => course.courseCode))];
        // setCourseCode(cc)
        setCourseCodeData(cc)
    }, [ttDataTest])
      
    useEffect(() => {
        const periods = [];
        
        for (const obj of tableData) {
            for (const key of Object.keys(obj)) {
                if (obj[key] === courseCode) {
                    const val = obj["DayOrder"] + " " + key;
                    periods.push(val);
                }
            }
        }
        
        setPeriod(periods);
    
    }, [courseCode, tableData]);

    const selectedSemester = (data) => {
        setSelectedSemester(data)

        const b = ttDataTest.sems.map(semester => {
            if(semester.sem === data) return semester.batch
        })

        setBranch(b)
        console.log(b)
    }

    const selectedCourseCode = (data) => {
        setCourseCode(data);
    }

    const selectedBranch = (data) => {
        setBranch(data);
    }
      
    const periodOptions = period.map((p) => ({
    value: p.replace(/\s+/g, ''),
    label: p,
    }));
      
    // Map the period list
    // const periodValues = period.map(item => ({ value: item, label: item }))

    // Multi Select functionality
    const selectedPeriod = (data) => {
        setSelectedPeriodList(data)
    }

    // Update Button Functionality
    const updateTable = () => {
        setPreviousTableData(tableData)

        const updatedTableData = tableData.map((obj) => {
          for (const pkey of Object.keys(selectedPeriodList)) {
            const periodString = selectedPeriodList[pkey].value;
            const periodArray = periodString.split(" ");
      
            for (const key of Object.keys(obj)) {
              if (key === "DayOrder" && obj[key] === periodArray[0]) {
                  const val = "Period "+ periodArray[1]
                return { ...obj, [val]: courseCode };
              }
            }
          }
          return obj;
        });
        setTableData(updatedTableData);
        setCourseCode("");
        setSelectedPeriodList("");
        setUpdate(true);
    };
      

    // Save Button Functionality
    const saveData = (d) => {
        console.log("Added Data ", tableData)
        setEditBtn(false)
        setUpdate(false)
    }

    // Cancel Button Functionality
    const cancelData = () => { 
        setTableData(previousTableData)
        setEditBtn(false)    
        setUpdate(false)
    }
    
    return (
        <>
        <div className="px-2 m-2">
            <div className="flex">
                <div className="w-1/4">
                    {/* <Dropdown name ={"Department"} data = {['Information Technology','Computer Science and Engineering']} special ={false} selectedData={selectedBranch}/> */}
                    <h5 className="p-1">Department</h5>
                    <div className="text-slate-400 p-1">Information Technology</div>
                </div>
                <div className="w-1/5">
                    <Dropdown name ={"Semester"} data = {getSemester} special ={false} selectedData={selectedSemester} />
                </div>
                <div className="w-1/4">
                    <h5 className="p-1">Branch</h5>
                    <div className="text-slate-400 p-1">{branch}</div>
                </div>
                {
                    !editBtn ? 
                    <div className="w-1/4">
                        <Button color={'blue'} name={"Edit Timetable"} icon={'edit'} outline={false} event={() => {setEditBtn(true)}} />
                    </div> : null
                }
            </div>

            {
                editBtn ? 
                <div className="flex pt-10">
                    <div className="w-1/3 pt-5 pl-3">
                        {/* <Dropdown name ={"Course Code"} data = {['18IPC701', '18IPC702', '18IEE703', '18IPS321']} special ={true} selectedData={selectedCourseCode} /> */}
                        <Dropdown name ={"Course Code"} data = {getCourseCodeData} special ={true} selectedData={selectedCourseCode} />
                    </div>
                    <div className="w-1/2">
                        <MultiSelect name = {'Period'} data = {tableSchedule} values={periodOptions} selectedData={selectedPeriod} />
                    </div>
                    <div className="w-1/3 pt-2">
                        <Button color={'blue'} name={"Update"} icon={'add'} outline={false} event={updateTable} />
                    </div>
                </div> : null
            }

            <div className="flex pt-10 flex-wrap">
                <Table data={tableData} />
            </div>

            {
                editBtn ? update ?  
                <div className="flex justify-end flex-row m-10">
                    <div className="mx-4 w-1/8">
                        <Button color={'blue'} name={"Cancel"} outline={true} event={cancelData} />
                    </div>
                    <div className="mx-4 w-1/6">
                        <Button color={'blue'} name={"Save"} outline={false} event={saveData} />
                    </div>
                </div> : null : null
            }

        </div>

        </>
    )
}

export default Timetable