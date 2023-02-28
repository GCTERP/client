import { useEffect, useState } from "react"
import axios from "axios"

import Download from "../../../utilities/Download"
import Dropdown from "../../../utilities/Dropdown"
import Upload from "../../../utilities/Upload"
import Search from "../../../utilities/Search"
import Table from "../../../utilities/Table"

const Details = () => {

    let omit = [ "_id", "admin", "cfa", "hod", "pc", "ttc", "fa", "ci" ]
    const omitFields = (field) => !omit.some(item => item == field)

    const [ branch, setBranch ] = useState("ALL")
    
    const [ filter, setFilter ] = useState(null)
    const [ fields, setFields ] = useState(null)
    const [ search, setSearch ] = useState("")

    const [ data, setData ] = useState(null)
    const [ editedDoc, setEditedDoc ] = useState({})

    useEffect(() => {

        axios.get(process.env.NEXT_PUBLIC_URL + '/admin/faculty')
            .then(response => {
                let data = response.data, fields = []    
                fields = Object.keys(data[0]).filter(key => omitFields(key))
                setFilter(fields[0])
                setFields(fields)
                setData(data)
            })
            .catch(err => console.log(err.message))

    }, [])

    useEffect(() => {
        if(JSON.stringify(editedDoc) != "{}")
            for(let idx in data)
                if(data[idx]._id == editedDoc._id) {
                    axios.put(process.env.NEXT_PUBLIC_URL + '/admin/faculty/update', editedDoc)
                        .then(response => {
                            data[idx] = {...editedDoc}
                            setData([...data])
                        }).catch(err => console.log(err.message))
                }
    }, [ editedDoc ])
    
    const filterSearch = (doc) => doc[filter.charAt(0).toLowerCase() + filter.slice(1)].toString().toLowerCase().includes(search.toString().toLowerCase())

    const filterCheck = (doc) => (branch == "ALL" ? true : doc.branch == branch) && filterSearch(doc)

    return ( data ? <>
        <div className="mr-2 flex justify-between">
            <div className="flex space-x-6">
                <Dropdown name="Branch" update={setBranch} data={[ "ALL", "COE", "CIVIL", "MECH", "ECE", "EEE", "EIE", "CSE", "IT", "IBT" ]} />
            </div>
            <Search options={fields} filter={filter} setFilter={setFilter} search={search} update={setSearch}/>
            <div className="flex mt-2 space-x-2">
                <Upload url={process.env.NEXT_PUBLIC_URL + '/admin/faculty/upload'}/>
                <Download url={process.env.NEXT_PUBLIC_URL + '/admin/faculty/download'} ids={data.filter(doc => filterCheck(doc)).map(doc => doc._id)} name="faculty"/>
            </div>
        </div><br/>
        <Table editable data={data.filter(doc => filterCheck(doc))} update={setEditedDoc} omit={omit} indexed/><br/>
        </> : <div>Loading</div>
    )
}
 
export default Details;