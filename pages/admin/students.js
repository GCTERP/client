import { useEffect, useState } from "react"
import axios from "axios"

import Download from "../../utilities/Download"
import Dropdown from "../../utilities/Dropdown"
import Upload from "../../utilities/Upload"
import Search from "../../utilities/Search"
import Table from "../../utilities/Table"

const Students = () => {

    let fields = [], omit = [ "_id", "father", "mother", "guardian", "sslc", "hsc", "diploma", "undergraduate", "isCredentialCreated", "isActive", "permanentAddress", "temporaryAddress" ]
    const omitFields = (field) => !omit.some(item => item == field)

    const [ branch, setBranch ] = useState("ALL")
    const [ semester, setSemester ] = useState("ALL")
    const [ type, setType ] = useState("ALL")
    
    const [ filter, setFilter ] = useState(null)
    const [ search, setSearch ] = useState("")

    const [ data, setData ] = useState(null)
    const [ editedDoc, setEditedDoc ] = useState({})

    const [ file, setFile ] = useState(null)

    useEffect(() => {

        axios.get('http://localhost:5000/students')
            .then(response => {
                let data = response.data
                fields = Object.keys(data[0]).filter(key => omitFields(key))
                setFilter(fields[0])
                setData(data)
            })
            .catch(err => console.log(err.message))

    }, [])

    useEffect(() => {
        if(JSON.stringify(editedDoc) != "{}")
            for(let idx in data)
                if(data[idx].id == editedDoc.id) {
                    axios.put('http://localhost:5000/students/' + editedDoc.id, editedDoc)
                        .then(response => {
                            data[idx] = {...editedDoc}
                            setData([...data])
                        }).catch(err => console.log(err.message))
                }
    }, [ editedDoc ])
    
    const filterSearch = (doc) => doc[filter.charAt(0).toLowerCase() + filter.slice(1)].toString().toLowerCase().includes(search.toString().toLowerCase())

    const filterCheck = (doc) => (branch == "ALL" ? true : doc.branch == branch) && (semester == "ALL" ? true : doc.sem == semester) && (type == "ALL" ? true : doc.type.toLowerCase() == type.toLowerCase()) && filterSearch(doc)

    return ( data && <>
        <div className="mr-2 flex justify-between">
            <div className="flex space-x-6">
                <Dropdown name="Branch" update={setBranch} data={[ "ALL", "CIVIL", "MECH", "ECE", "EEE", "EIE", "CSE", "IT", "IBT" ]} />
                <Dropdown name="Semester" update={setSemester} data={[ "ALL", 1, 2, 3, 4, 5, 6, 7, 8 ]}/>
                <Dropdown name="Type" update={setType} data={[ "ALL", "regular", "lateral", "transfer" ]}/> 
            </div>
            <Search options={fields.map(key => key.charAt(0).toUpperCase() + key.slice(1))} filter={filter} setFilter={setFilter} search={search} update={setSearch}/>
        </div><br/>
        <Table editable data={data.filter(doc => filterCheck(doc))} update={setEditedDoc} omit={omit}/><br/>
        <div className="flex mt-2 space-x-10">
            <Upload file={file} setFile={setFile}/>
            <Download blob={null}/>
        </div></>
    )
}
 
export default Students;