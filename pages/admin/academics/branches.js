import axios from "axios"
import { useEffect, useState } from "react"

import Button from "../../../utilities/Button"
import Table from "../../../utilities/Table"
import Input from "../../../utilities/Input"
import Icon from "../../../utilities/Icon"
import Dropdown from "../../../utilities/Dropdown"
const BranchForm = ({ setOpen }) => {

    const [ branch, setBranch ] = useState("")
    const [ launch, setLaunch ] = useState("Today")
    const [ code, setCode ] = useState("")
    const [ name, setName ] = useState("")
    const [ programme, setProgramme] = useState("B.E")
    const [ cap, setCap ] = useState("")
    const [ key, setKey ] = useState("")
    const [ submit, setSubmit ] = useState(false)

    useEffect(() => {

        if(submit) {
            axios.post(process.env.NEXT_PUBLIC_URL + '/admin/branch/manage', data)
            let data = { branch, launchDate: launch, code, name, key, capacity: cap, programme: programme }
                .then(response => { setSubmit(false); setOpen(false) })
                .catch(err => console.log(err.message))
        }

    }, [ submit ])

    return (
        <div className="absolute w-fit bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute cursor-pointer text-red-500 top-4 right-2" onClick={() => setOpen(false)}>
                <Icon name="close"/>
            </div>
            <div className="text-xl font-bold w-fit m-auto my-4">Create New Branch</div><hr/>
            <div className="flex space-x-4 justify-center w-fit m-4" >
                <Dropdown data={["B.E","B.Tech"]} name="Programme" update={setProgramme}></Dropdown> 
                            
            </div>

            <div className="flex space-x-4 justify-center w-fit m-4">
                <Input name="Branch" type="text" color="blue" value={branch} update={setBranch}/>
                <Input name="Code" type="number" color="blue" value={code} update={setCode}/>
            </div>
            <div className="flex space-x-4 justify-center w-fit m-4">
                <Input name="Name" type="text" color="blue" value={name} update={setName}/>
                <Input name="Capacity" type="number" color="blue" value={cap} update={setCap}/>
            </div>
            <div className="flex space-x-4 justify-center w-fit m-4">
                <Input name="Branch Key" type="text" color="blue" value={key} update={setKey}/>
                <Input name="Launch Date" type="date" color="blue" value={launch} update={setLaunch}/>
            </div><hr/>
            <div onClick={() => setSubmit(true)} className={`py-2 px-2 rounded-md cursor-pointer font-semibold text-sm m-4 text-center items-center text-white ${submit ? "bg-slate-400" : "bg-blue-500"}`} disabled={submit ? "disabled" : ""}>Launch</div>
        </div>
    )
}

const Branches = () => {

    const [ open, setOpen ] = useState(false)
    const [ data, setData ] = useState(null)
    const [ editedDoc, setEditedDoc ] = useState({})

    useEffect(() => {

        axios.get(process.env.NEXT_PUBLIC_URL+'/admin/branch')
            .then(response => {

                let data = response.data
                for(let idx in data)
                    data[idx].launchDate = data[idx].launchDate.split('T')[0]
                setData(data)
            })
            .catch(err => console.log(err.message))
    
    }, [])

    useEffect(() => {
        if(JSON.stringify(editedDoc) != "{}")
            for(let idx in data)
                if(data[idx]._id == editedDoc._id) {
                    axios.post(process.env.NEXT_PUBLIC_URL+'/admin/branch/manage', editedDoc)
                        .then(response => {
                            data[idx] = {...editedDoc}
                            setData([...data])
                            console.log(data[idx])
                        }).catch(err => console.log(err.message))
                }
    }, [ editedDoc ])

    return (data ? <>
        <Table editable data={data} update={setEditedDoc}/><br/>
        <Button name="Add Branch" icon="add" color="blue" event={() => setOpen(true)}/>
        { open && <BranchForm setOpen={setOpen}/> }
        </> : <div>Loading...</div>
    )
}

export default Branches