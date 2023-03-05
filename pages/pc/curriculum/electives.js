import axios from "axios"
import { useEffect, useState } from "react"
import Select from "react-select"

import Button from "../../../utilities/Button"
import Table from "../../../utilities/Table"
import Icon from "../../../utilities/Icon"
import Dropdown from "../../../utilities/Dropdown"

const MultiSelect = ({ name, data, selectedData, values }) => {

    const options = data.map(val => ({ value: val, label: val }))

    const [selectData, setSelectedData] = useState([])

    useEffect(() => {
        setSelectedData(values)
    }, [values])

    const handleChange = (values) => {
        setSelectedData(values)
        selectedData(values)
    }

    return ( 
        <div className="group">
            <div className='flex items-center justify-start pl-2'>
                <div className='-mb-2.5 z-10'>
                    <span className='bg-white text-gray-400 group-focus-within:font-bold group-focus-within:text-blue-500 text-sm px-1'>{name}</span>
                </div>
            </div>
            <Select styles={{
                control: (base) => ({
                    ...base,
                    minHeight: '45px',
                    height: '45px',
                }),
                valueContainer: (base) => ({
                    ...base,
                    overflowX: "unset",
                    flexWrap: 'unset',
                    height: '30px',
                   }),
                multiValue: (base) => ({
                    ...base,
                    flex: '0 0 auto',
                })
                }} 
                className="w-60 text-sm" 
                maxMenuHeight={250} 
                key={JSON.stringify(values)} 
                options={options} 
                // isClearable={false} 
                // onChange={selectedData}
                onChange={handleChange}
                // value = {selectData}
                defaultValue={selectData}
                // defaultValue={values}
                // value={values}
                isMulti 
                placeholder="Please enter a tag" 
            />
        </div>
    );
}



const ElectiveForm = ({regulation, branch, setOpen }) => {
    const [semester,setSemester] = useState(5)
    const [pe,setPe] = useState([])
    const [oe,setOe] = useState([])
    const [ submit, setSubmit ] = useState(false)
    const peArray = new Set()
    const oeArray = new Set()

    const peData = [
        "PE-1 ",
        "PE-2 ",
        "PE-3 ",
        "PE-4 ",
        "PE-5 ",
        "PE-6 ",
    ]
    const oeData = [
        "OE-1 ",
        "OE-2 ",
        "OE-3 ",
        "OE-4 ",
    ]
   
    pe.map(peval => (peArray.add(peval.value)))
    oe.map(oeval => (oeArray.add(oeval.value)))

    


    useEffect(() => {

        if(submit) {
            let data = { branch:branch, regulation: regulation, semester: semester, pe: [...peArray],oe: [...oeArray]}
            console.log(data)
            axios.post(process.env.NEXT_PUBLIC_URL + '/admin/electives/manage', data)
                .then(response => { setSubmit(false); setOpen(false) })
                .catch(err => console.log(err.message))
        }

    }, [ submit ])
    

    return (
        <div className="absolute w-fit bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute cursor-pointer text-red-500 top-4 right-2" onClick={() => setOpen(false)}>
                <Icon name="close"/>
            </div>
            <div className="text-xl font-bold w-fit m-auto my-4">Add Electives</div><hr/>
            <div className="flex space-x-4 justify-center w-fit m-4">
                <Dropdown name="Semester" update={setSemester} data={[5,6,7,8 ]}/>
                <MultiSelect name="Professional Electives" data={peData} selectedData={setPe}></MultiSelect>
                <MultiSelect name="Open Electives" data={oeData} selectedData={setOe}></MultiSelect>
            </div>
            <hr/>
            <div onClick={() => setSubmit(true)} className={`py-2 px-2 rounded-md cursor-pointer font-semibold text-sm m-4 text-center items-center text-white ${submit ? "bg-slate-400" : "bg-blue-500"}`} disabled={submit ? "disabled" : ""}>Add</div>

        </div>
    )
}

const Electives = () => {

    const [ open, setOpen ] = useState(false)
    const [ data, setData ] = useState(null)
    const [ editedDoc, setEditedDoc ] = useState({})
    const [regulation,setRegulation] = useState(2014)
    const [branch,setBranch] = useState("CIVIL")

    useEffect(() => {

        axios.get(process.env.NEXT_PUBLIC_URL + '/admin/electives')
            .then(response => {
                let data = response.data
                setData(data)
            })
            .catch(err => console.log(err.message))
    
    }, [])

    useEffect(() => {
        if(JSON.stringify(editedDoc) != "{}")
            for(let idx in data)
                if(data[idx]._id == editedDoc._id) {
                    axios.post(process.env.NEXT_PUBLIC_URL + '/admin/branch/manage', editedDoc)
                        .then(response => {
                            data[idx] = {...editedDoc}
                            setData([...data])
                        }).catch(err => console.log(err.message))
                }
    }, [ editedDoc ])

    const filterCheck = (doc) => (doc.regulation == regulation) && (branch == "ALL" ? true : doc.branch == branch)

    return (data ? <>
        <div className="mr-2 flex justify-between mb-12">
            <div className="flex space-x-6">
                <Dropdown name="Regulation" update={setRegulation} data={[ 2014, 2018, 2022 ]}/>
                <Dropdown name="Branch" update={setBranch} data={["CIVIL", "MECH", "ECE", "EEE", "EIE", "CSE", "IT", "IBT" ]} />
            </div>
            <div className="flex mt-2 space-x-2 mr-20">
                <Button name="Add Elective" icon="add" color="blue" event={() => setOpen(true)}/>
                { open && <ElectiveForm regulation={regulation} branch={branch} setOpen={setOpen}/> }
            </div>
        </div>
        <Table data={data.filter(doc => filterCheck(doc))} update={setEditedDoc}/><br/>
        </> : <div>Loading...</div>
    )
}

export default Electives