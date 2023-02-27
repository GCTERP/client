import { useEffect, useState } from "react"
import axios from "axios"

import Download from "../../../utilities/Download"
import Dropdown from "../../../utilities/Dropdown"
import Search from "../../../utilities/Search"
import Table from "../../../utilities/Table"

const Courses = () => {

    let omit = [ "_id", "marks", "hours" ]
    const omitFields = (field) => !omit.some(item => item == field)

    const [ regulation, setRegulation ] = useState(2018)
    const [ branch, setBranch ] = useState("ALL")
    const [ type, setType ] = useState("ALL")
    
    const [ filter, setFilter ] = useState(null)
    const [ fields, setFields ] = useState(null)
    const [ search, setSearch ] = useState("")

    const [ data, setData ] = useState(null)

    useEffect(() => {

        axios.get(process.env.NEXT_PUBLIC_URL + '/admin/curriculum', { params: { regulation } })
            .then(response => {
                let data = response.data, fields = []
                fields = Object.keys(data[0]).filter(key => omitFields(key))
                setFilter(fields[0])
                setFields(fields)
                setData(data)
            })
            .catch(err => console.log(err.message))

    }, [ regulation ])
    
    const filterSearch = (doc) => doc[filter.charAt(0).toLowerCase() + filter.slice(1)].toString().toLowerCase().includes(search.toString().toLowerCase())

    const filterCheck = (doc) => (doc.regulation == regulation) && (branch == "ALL" ? true : doc.branch == branch) && (type == "ALL" ? true : doc.type.toLowerCase() == type.toLowerCase()) && filterSearch(doc)

    return ( data ? <>
        <div className="mr-2 flex justify-between">
            <div className="flex space-x-6">
                <Dropdown name="Batch" update={setRegulation} data={[ 2018, 2019, 2014, 2010 ]}/>
                <Dropdown name="Branch" update={setBranch} data={[ "ALL", "CIVIL", "MECH", "ECE", "EEE", "EIE", "CSE", "IT", "IBT" ]}/>
                <Dropdown name="Type" update={setType} data={[ "ALL", "theory", "practical" ]}/> 
            </div>
            <Search options={fields} filter={filter} setFilter={setFilter} search={search} update={setSearch}/>
            <div className="flex mt-2 space-x-2">
                <Download ids={data.filter(doc => filterCheck(doc)).map(doc => doc._id)} name="students"/>
            </div>
        </div><br/>
        <Table data={data.filter(doc => filterCheck(doc))} omit={omit}/><br/>
        </> : <div>Loading</div>
    )
}
 
export default Courses;