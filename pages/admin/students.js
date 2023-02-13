import { useEffect, useState } from "react"

import Dropdown from "../../utilities/Dropdown"
import Button from "../../utilities/Button"
import Table from "../../utilities/Table"
import input from "../../db.json"

const Students = () => {

    const [ branch, setBranch ] = useState("ALL")
    const [ semester, setSemester ] = useState("ALL")
    const [ type, setType ] = useState("ALL")

    const [ data, setData ] = useState(input)
    const [ editedDoc, setEditedDoc ] = useState({})

    const filterCheck = (doc) => (branch == "ALL" ? true : doc.branch == branch) && (semester == "ALL" ? true : doc.sem == semester) && (type == "ALL" ? true : doc.type == type.toLowerCase())

    useEffect(() => {

        if(JSON.stringify(editedDoc) != "{}")
            for(let idx in data)
                if(data[idx]._id == editedDoc._id) {
                    data[idx] = {...editedDoc}
                    setData([...data])
                }

    }, [ editedDoc ])

    return ( <> 
        <div className="flex space-x-6">
            <Dropdown name="Branch" update={setBranch} data={[ "ALL", "CIVIL", "MECH", "ECE", "EEE", "EIE", "CSE", "IT", "IBT" ]} />
            <Dropdown name="Semester" update={setSemester} data={[ "ALL", 1, 2, 3, 4, 5, 6, 7, 8 ]}/>
            <Dropdown name="Type" update={setType} data={[ "ALL", "regular", "lateral", "transfer" ]}/> 
        </div><br/>
        <Table editable data={data.filter(doc => filterCheck(doc))} update={setEditedDoc} omit={[ "_id", "father", "mother", "guardian", "sslc", "hsc", "diploma", "undergraduate", "permanentAddress", "temporaryAddress" ]}/><br/>
        <div className="flex mt-5 space-x-10">
            <Button name="Upload" icon="upload" color="blue"/>
            <Button name="Download" icon="download" color="blue"/>
        </div></>
    )
}
 
export default Students;