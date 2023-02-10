import { useEffect, useState } from "react"

import Dropdown from "../../utilities/Dropdown"
import Button from "../../utilities/Button"
import Table from "../../utilities/Table"

const Students = () => {

    let result = [
        {
            sno: 1,
            register: "1918147",
            name: "Vishal Pranav RB",
            sem: 7,
            branch: "IT",
            type: "regular",
            age: 21,
            cgpa: 8.21
        }
    ]

    for(let i = 0; i < 7; i++)  result.push(result[0])

    const [ branch, setBranch ] = useState("ALL")
    const [ semester, setSemester ] = useState("ALL")
    const [ type, setType ] = useState("regular")
    const [ change, setChange ] = useState({ key: null, value: {} })
    const [ data, setData ] = useState(result)
    
    useEffect(() => {

        data[change.key] = change.value
        setData([...data])

    }, [change])

    const filterCheck = (doc) => (branch == "ALL" ? true : doc.branch == branch) && (semester == "ALL" ? true : doc.sem == semester) && doc.type == type.toLowerCase()

    const getKeyChain = () => {
        let keys = []
        data.forEach((doc, key) => filterCheck(doc) && keys.push(key))
        return keys
    }

    return ( <> 
        <div className="flex space-x-6">
            <Dropdown name="Branch" update={setBranch} data={[ "ALL", "CIVIL", "MECH", "ECE", "EEE", "EIE", "CSE", "IT", "IBT" ]} />
            <Dropdown name="Semester" update={setSemester} data={[ "ALL", 1, 2, 3, 4, 5, 6, 7, 8 ]}/>
            <Dropdown name="Type" update={setType} data={[ "regular", "lateral", "transfer" ]}/> 
        </div><br/>
        <Table editable update={setChange} keys={getKeyChain(data)} data={data.filter(doc => filterCheck(doc))}/><br/>
        <div className="flex mt-5 space-x-10">
            <Button name="Upload" icon="upload" color="blue"/>
            <Button name="Download" icon="download" color="blue"/>
        </div></>
    )
}
 
export default Students;