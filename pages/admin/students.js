import { useEffect, useState } from "react"
import axios from "axios"

import Download from "../../utilities/Download"
import Dropdown from "../../utilities/Dropdown"
import Upload from "../../utilities/Upload"
import Search from "../../utilities/Search"
import Table from "../../utilities/Table"

const Students = () => {

    let omit = [ "_id", "father", "mother", "guardian", "sslc", "hsc", "diploma", "undergraduate", "isCredentialCreated", "isActive", "permanentAddress", "temporaryAddress" ]
    const omitFields = (field) => !omit.some(item => item == field)

    const [ batch, setBatch ] = useState(2019)
    const [ branch, setBranch ] = useState("ALL")
    const [ type, setType ] = useState("ALL")
    
    const [ filter, setFilter ] = useState(null)
    const [ fields, setFields ] = useState(null)
    const [ search, setSearch ] = useState("")

    const [ data, setData ] = useState(null)
    const [ editedDoc, setEditedDoc ] = useState({})

    useEffect(() => {

        axios.get(process.env.NEXT_PUBLIC_URL + '/admin/students', { params: { batch } })
            .then(response => {
                let data = response.data, fields = []    
                fields = Object.keys(data[0]).filter(key => omitFields(key))
                setFilter(fields[0])
                setFields(fields)
                setData(data)
            })
            .catch(err => console.log(err.message))

    }, [ batch ])

    useEffect(() => {
        if(JSON.stringify(editedDoc) != "{}")
            for(let idx in data)
                if(data[idx]._id == editedDoc._id) {
                    axios.put(process.env.NEXT_PUBLIC_URL + '/admin/student/update', editedDoc)
                        .then(response => {
                            data[idx] = {...editedDoc}
                            setData([...data])
                        }).catch(err => console.log(err.message))
                }
    }, [ editedDoc ])
    
    const filterSearch = (doc) => doc[filter.charAt(0).toLowerCase() + filter.slice(1)].toString().toLowerCase().includes(search.toString().toLowerCase())

    const filterCheck = (doc) => (doc.batch == batch) && (branch == "ALL" ? true : doc.branch == branch) && (type == "ALL" ? true : doc.type.toLowerCase() == type.toLowerCase()) && filterSearch(doc)

    return ( data ? <>
        <div className="mr-2 flex justify-between">
            <div className="flex space-x-6">
                <Dropdown name="Batch" update={setBatch} data={[ 2019, 2020, 2021, 2022 ]}/>
                <Dropdown name="Branch" update={setBranch} data={[ "ALL", "CIVIL", "MECH", "ECE", "EEE", "EIE", "CSE", "IT", "IBT" ]} />
                <Dropdown name="Type" update={setType} data={[ "ALL", "regular", "lateral", "transfer" ]}/> 
            </div>
            <Search options={fields} filter={filter} setFilter={setFilter} search={search} update={setSearch}/>
            <div className="flex mt-2 space-x-2">
                <Upload url={process.env.NEXT_PUBLIC_URL + '/admin/students/upload'}/>
                <Download url={process.env.NEXT_PUBLIC_URL + '/admin/students/download'} ids={data.filter(doc => filterCheck(doc)).map(doc => doc._id)} name="students"/>
            </div>
        </div><br/>
        <Table editable data={data.filter(doc => filterCheck(doc))} update={setEditedDoc} omit={omit} indexed/><br/>
        </> : <div>Loading</div>
    )
}
 
export default Students;