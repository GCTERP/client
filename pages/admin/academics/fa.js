import axios from "axios"
import { useEffect, useState } from "react"

import Dropdown from "../../../utilities/Dropdown"
import Button from "../../../utilities/Button"
import initial from "../../../utilities/initial.json"

const FA = () => {

    let fields = [ "batch", "name", "action" ], branches = initial.branches
    const [ data, setData ] = useState(null)
    const [ catalog, setCatalog ] = useState(null)
    const [ current, setCurrent ] = useState(null)
    const [ batch, setBatch ] = useState(2019)
    const [ semester, setSemester ] = useState(1)
    const [ fas, setFas ] = useState(null)
    const [ purged, setPurged ] = useState(null)
    const [ save, setSave ] = useState(false)
    const [ batchSet, setBatchSet ] = useState(null)
    const [ semesterSet, setSemesterSet ] = useState(null)

    const prepareCatalog = (data, sem = semester, bth = batch) => {
        
        let current = data.filter(doc => doc.sem == sem && doc.batch == bth)[0]
        let catalog = [], falist = {}

        if(current && current.facultyAdvisor.length > 0)
            for(let fa of current.facultyAdvisor)
                falist[fa.branch] = fa.faculty

        for(let key of Object.keys(branches))
            catalog.push({ batch: batch, name: branches[key], faculty: falist[key] ?? "--None--" })

        setCatalog(catalog)
        setCurrent(current)
    }

    useEffect(() => {

        axios.get(process.env.NEXT_PUBLIC_URL + "/admin/semestermeta/fa", { params: { batch, semester } })
            .then(response => {
                let data = response.data
                let actual = [...new Set(data.map(doc => doc.batch))].sort((a,b) => b - a)
                let sem_actual = data.filter(doc => doc.batch == actual[0]).map(doc => doc.sem)
                setBatch(actual[0])
                setBatchSet(actual)
                setSemesterSet(sem_actual)
                prepareCatalog(data, sem_actual[0], actual[0])
                setData(data)
            }).catch(err => console.log(err.message))
        
        axios.get(process.env.NEXT_PUBLIC_URL + '/admin/faculty/fa')
            .then(response => {
                setFas(response.data)
                let purged = {}
                for(let fa of response.data)
                    purged[fa.fullName] = { faculty: fa._id, branch: fa.branch }
                setPurged(purged)
            }).catch(err => console.log(err.message))

    }, [])

    useEffect(() => {

        if(data && data.length > 0) {
            let sem_actual = data.filter(doc => doc.batch == batch).map(doc => doc.sem);
            setSemesterSet(sem_actual)
            prepareCatalog(data, sem_actual[0])
        }

    }, [ batch, semester ])

    useEffect(() => {

        if(save) {
            if(!current) {
                console.log("No Semester Found")
                setSave(false)
                return
            }
            let result = catalog.filter(doc => doc.faculty != "--None--").map(doc => purged[doc.faculty])
            axios.put(process.env.NEXT_PUBLIC_URL + "/admin/semestermeta/update", { _id: current._id, facultyAdvisor: result })
                .then(response => setSave(false))
                .catch(err => console.log(err.message))
        }

    }, [ save ])

    return ((batchSet && semesterSet) && <>
        <div className="flex space-x-2">
            <Dropdown name="Batch" data={batchSet} update={setBatch}/>
            <Dropdown name="Semester" data={semesterSet} update={setSemester}/>
        </div><br/>{ (catalog && fas) ? <>
        <div className="max-w-min max-h-[80%] overflow-auto overscroll-none mr-2 rounded-b-lg shadow-md align-middle border rounded-t-lg">
            <table className="table-auto divide-y divide-gray-200 text-sm text-left">
                <thead className="bg-gray-100 text-xs uppercase">
                    <tr>
                        <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold first:rounded-tl-lg uppercase">sno</th>
                        {
                            fields.map((heading, index) => 
                                <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase" key={index}>{heading}</th>)
                        }
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {
                    catalog.map((row, ridx) => (
                    <tr className={`px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap group hover:bg-sky-50`} key={ridx}>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ridx + 1}</td>
                        {
                            fields.map((key, kidx) =>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={kidx}>
                                {
                                    key == "action" ? 
                                    <Dropdown update={(e) => { catalog[ridx].faculty = e; setCatalog([...catalog]) }} data={[ row.faculty, ...fas.filter(fa => branches[fa.branch] == row.name && row.faculty != fa.fullName ).map(doc => doc.fullName) ]}/> :
                                    typeof(row[key]) == typeof('') ? row[key].charAt(0).toUpperCase() + row[key].slice(1) : row[key]
                                }
                            </td>)
                        }
                    </tr>))
                }
                </tbody>
            </table>
        </div><br/> 
        <Button name="Save" icon="check" color="blue" event={() => setSave(true)}/>
        </> : <div>No Data Here</div> }
    </> )
}

export default FA