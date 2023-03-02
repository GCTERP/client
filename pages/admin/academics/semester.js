import { useState, useEffect } from "react";
import axios from "axios";

import Icon from "../../../utilities/Icon";
import Input from "../../../utilities/Input";
import Switch from "../../../utilities/Switch";
import Button from "../../../utilities/Button";
import { numberToRoman } from "../../../utilities/helpers";
import initial from "../../../utilities/initial.json"

const CreateForm = ({ limits = null, setOpen, setNewBatch }) => {
  
    const [ sem, setSem ] = useState("");
    const [ batch, setBatch ] = useState("");
    const [ endDate, setEndDate ] = useState(null);
    const [ submit, setSubmit ] = useState(false);
    const [ startDate, setStartDate ] = useState(null);
    const [ regulation, setRegulation ] = useState("");

    useEffect(() => {
        if(submit) {
            setNewBatch({ sem, status: 0, batch, regulation, startDate, endDate })
            setSubmit(false)
            setOpen(false)
        }
    }, [ submit ]);

    return ( limits &&
        <div className="absolute z-20 w-1/3 bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute text-slate-400 hover:text-red-500 top-4 right-2" onClick={() => setOpen(false)}>
                <Icon name="close" />
            </div>
            <div className="text-xl font-bold w-fit m-auto my-4">Add Batch</div><hr/>
            <div className="flex space-x-4 justify-center w-full m-4">
                <Input name="Semester" size="w-1/3" type="number" color="blue" value={sem} update={setSem}/>
                <Input name="Batch" size="w-1/3" type="number" color="blue" value={batch} update={setBatch}/>
                <Input name="Regulation" size="w-1/3" type="number" color="blue" value={regulation} update={setRegulation}/>
            </div>
            <div className="flex items-center space-x-4 justify-center w-fit mx-auto m-5">
                <label className="text-sm">Start Date</label>
                <Input name="" type="date" min={limits.min} max={limits.max} color="blue" value={startDate ?? limits.min} update={setStartDate}/>
                <label className="text-sm ">End Date</label>
                <Input name="" type="date" min={limits.min} max={limits.max} color="blue" value={endDate ?? limits.min} update={setEndDate}/>
            </div><hr/>
            <div onClick={() => setSubmit(true)} className={`py-2 px-2 rounded-md cursor-pointer font-semibold text-sm m-4 text-center items-center text-white ${submit ? "bg-slate-400" : "bg-blue-500" }`} disabled={submit ? "disabled" : ""}>
                Submit
            </div>
        </div>)
}

const Batch = ({ batch, selected, setBatch, days = 1 }) => {
    
    return (
        <div onClick={() => setBatch({...batch})} className={`w-fit p-2 border rounded-lg cursor-pointer ${selected && "border-blue-500"} hover:bg-slate-50`}>
            <div className="flex justify-between mb-4">
                <div className="flex text-slate-400 text-sm">Batch</div>
                <div className="text-sm">{batch.batch + " - " + (parseInt(batch.batch) + 4)}</div>
            </div>
            <div className="flex justify-between space-x-4">
                <div>
                    <span className="text-slate-400 text-xs">Semester&nbsp;</span>
                    <span className="text-xs">{numberToRoman(batch.sem)}</span>
                </div>
                <div className={`text-${batch.status == 0 ? "blue" : batch.status == 1 ? "red" : "slate"}-500 text-xs pt-1`}>
                {batch.status == 0 ? "Ongoing" : batch.status == 1 ? "Add Sem" : batch.status == 2 ? "Starts" : "Ends"}
                {batch.status > 1 && " in " + days + (days > 1 ? " days" : " day")}
                </div>
            </div>
        </div>)
}

const BatchHolder = ({ data, initial, limits, setBatch, setNewBatch }) => {

    const [create, setCreate] = useState(false);
    
    return (<>
        <div className="flex space-x-4 p-2">
            <div className="w-[160px] border border-dashed rounded-lg cursor-pointer hover:bg-slate-50">
                <div onClick={() => setCreate(true)} className="flex h-full justify-center items-center space-x-2 text-slate-400">
                    <Icon name="add" />
                    Create
                </div>
            </div>
            { data.map((doc, idx) => ( <Batch key={idx} setBatch={setBatch} selected={initial.batch == doc.batch} batch={doc}/> )) }
        </div>
        {create && <CreateForm limits={limits} setOpen={setCreate} setNewBatch={setNewBatch}/>}
        </>)
}

const Cutter = ({ title }) => {
  
    return (
        <div className="flex ml-2 space-x-2 justify-center items-center">
            <div className="text-sm text-slate-500 font-bold">{title}</div>
            <div className="h-[1px] mt-1 bg-slate-200 w-full"></div>
        </div>
    )
}

const Semester = () => {

    // Phase I
    const [ batches, setBatches ] = useState(null)
    const [ batch, setBatch ] = useState(null)
    const [ newBatch, setNewBatch ] = useState({})
    const [ save, setSave ] = useState(false)

    // Phase II
    const [ addSem, setAddSem ] = useState(false)
    const [ semesters, setSemesters ] = useState([])
    const [ semester, setSemester ] = useState(1)

    // Phase III
    const [ document, setDocument ] = useState(initial.metadata)
    const [ limits, setLimits ] = useState(null)

    useEffect(() => {

        axios.get(process.env.NEXT_PUBLIC_URL + "/admin/semestermeta")
            .then(response => {
                let result = response.data.map(doc => ({ batch: doc.batch, sem: doc.sem, status: 0 }))
                let docs = response.data ? response.data.map(doc => {
                    let keys = [ "ut", "assignment", "tutorial", "schedule", "freeze", "deadline", "feedback", "enrollment", "courseRegistration" ]
                    doc.begin = doc.begin.split("T")[0]
                    doc.end = doc.end.split("T")[0]
                    for(let key of keys)
                        for(let idx of Object.keys(doc[key]))
                            doc[key][idx] = doc[key][idx] ?? ""
                    return doc
                }) : []
                setBatches(result)
                setBatch({...result[0]})
                setDocument(docs[0] ?? initial.metadata)
            }).catch(err => console.log(err.message))
        
        axios.get(process.env.NEXT_PUBLIC_URL + "/admin/calendar/minmaxdate")
            .then(response => {
                let limits = {}
                limits.min = response.data.min.split('T')[0]
                limits.max = response.data.max.split('T')[0]
                setLimits({...limits})
            }).catch(err => console.log(err.message))

    }, [])

    useEffect(() => {

        if(batch) {
            let sems = []
            for(let i = 0; i < batch.sem; i++)
                sems.push(i + 1)
            setSemesters([...sems])
            setSemester(batch.sem)
            // if(document) {
                document.batch = batch.batch
                document.sem = batch.sem
                document.begin = batch.startDate
                document.end = batch.endDate
                setDocument({...document})
            // }
        }

    }, [ batch ]);

    useEffect(() => {

        if(JSON.stringify(newBatch) != "{}") {
            batches.push(newBatch)
            batches.sort((a, b) => a.batch > b.batch)
            setBatches([...batches])
            // if(document) {
                document.batch = newBatch.batch
                document.sem = newBatch.sem
                document.regulation = newBatch.regulation
                document.begin = newBatch.startDate
                document.end = newBatch.endDate
                setDocument({...document})
            // }
        }

    }, [ newBatch ])

    useEffect(() => {
        
        let lastSem = semesters[semesters.length - 1]
        if(addSem && lastSem < 8) {

            // Change Batch
            batch.sem = lastSem + 1

            // Change Semester
            semesters.push(lastSem + 1)
            for(let unit of batches)
                if(unit.batch == batch.batch)
                    unit.sem = lastSem + 1
                
            // Change Document
            let newDoc = initial.metadata
            newDoc.batch = batch.batch
            newDoc.regulation = batch.regulation
            newDoc.sem = lastSem + 1
            newDoc.begin = batch.startDate
            newDoc.end = batch.endDate

            setDocument({...newDoc})
            setSemesters([...semesters])
            setSemester(lastSem + 1)
            setBatches([...batches])
            setBatch({...batch})
            setAddSem(false);
        }

    }, [ addSem ]);

    useEffect(() => {

        if(save) {
            document.sem = parseInt(document.sem)
            document.batch = parseInt(document.batch)
            document.regulation = parseInt(document.regulation)
            axios.post(process.env.NEXT_PUBLIC_URL + "/admin/semestermeta/create", document)
                .then(response => setSave(false))
                .catch(err => console.log(err.message))
        }

    }, [ save ])

    return( batch && <>
        { batches && <BatchHolder data={batches} initial={batch} limits={limits} setBatch={setBatch} setNewBatch={setNewBatch}/> }
        
        <div className="text-dark font-bold mt-2 ml-2">Semester</div>
        <div className="flex space-x-5 p-2 my-3">
            {
                semesters.map((sem, idx) => (
                <div key={idx} onClick={() => setSemester(sem)} className={`border ${semester == sem && "border-blue-500"} px-3 py-2 w-12 text-center rounded cursor-pointer hover:bg-slate-50`}>
                    {numberToRoman(sem)}
                </div>))
            }
            <div onClick={() => setAddSem(true)} className="border px-3 pt-2 w-12 rounded text-white bg-blue-500 cursor-pointer hover:bg-blue-600">
                <Icon name="add"/>
            </div>
        </div>

        { (semester && limits && document) && <>
        <Cutter title="Timeline"/>
        <div className="p-8">
            <span className="space-x-4 flex items-center">
                <div className="text-gray-400 text-sm ">Regulation</div>
                <Input color={"gray"} name="Number" value={document.regulation} disabled/>
                <div className="text-gray-400 text-sm ">Start Date</div>
                <Input color={"gray"} name="Date" type="date" min={limits.min} max={limits.max} value={document.begin == "" ? document.begin = batch.startDate : document.begin} update={(e) => { document.begin = e; setDocument({...document}) }}/>
                <div className="text-gray-400 text-sm">End Date</div>
                <Input color={"gray"} name="Date" type="date" min={limits.min} max={limits.max} value={document.end == "" ? document.end = batch.endDate : document.end} update={(e) => { document.end = e; setDocument({...document}) }}/>
                <div className="text-gray-400 text-sm ">Working Days / Week</div>
                <Input color={"gray"} name="Number" value={document.schedule.workingDaysPerWeek} update={(e) => { document.schedule.workingDaysPerWeek = e; setDocument({...document}) }}/>
            </span>
        </div>

        <Cutter title="Academics"/>
        <div className="p-8 grid grid-cols-10">
            <div className="col-span-1 space-y-14 my-auto">
                <div className="text-gray-400 text-sm">Schedule</div>
                <div className="text-gray-400 text-sm">Defaults</div>
            </div>
            <div className="col-span-2 space-y-10">
                <div className="flex pb-1 space-x-2">
                    <Switch initial={document.schedule.opened} toggle={(e) => { document.schedule.opened = e; setDocument({...document})}}/>
                    <div className="text-xs text-gray-400 pt-2">Status</div>
                </div>
                <Input type="number" color={"gray"} size="w-56" name="Internal Freeze" value={document.freeze.internal} update={(e) => { document.freeze.internal = e; setDocument({...document}) }}/>
            </div>
            <div className="col-span-2 space-y-10">
                <Input type="number" color={"gray"} size="w-56" name="Period Count" value={document.schedule.periodCount} update={(e) => { document.schedule.periodCount = e; setDocument({...document}) }}/>
                <Input type="number" color={"gray"} size="w-56" name="Attd. Freeze" value={document.freeze.attendance} update={(e) => { document.freeze.attendance = e; setDocument({...document}) }}/>
            </div>
            <div className="col-span-2 space-y-10">
                <Input type="number" color={"gray"} size="w-56" name="Period Duration" value={document.schedule.periodDuration} update={(e) => { document.schedule.periodDuration = e; setDocument({...document}) }}/>
                <Input type="number" color={"gray"} size="w-56" name="Internal Deadline" value={document.deadline.internal} update={(e) => { document.deadline.internal = e; setDocument({...document}) }}/>
            </div>
            <div className="col-span-2 space-y-10">
                <div className="flex pb-1 space-x-2">
                    <Switch initial={document.schedule.isDayOrder} toggle={(e) => { document.schedule.isDayOrder = e; setDocument({...document})}}/>
                    <div className="text-xs text-gray-400 pt-2">Is Day Order</div>
                </div>
                <Input type="number" color={"gray"} size="w-56" name="Attd. Deadline" value={document.deadline.attendance} update={(e) => { document.deadline.attendance = e; setDocument({...document}) }}/>
            </div>
        </div>

        <Cutter title="Enrollment"/>
        <div className="p-8 grid grid-cols-10">
            <div className="col-span-1 space-y-14 my-auto">
                <div className="text-gray-400 text-sm">Enrollment</div>
                <div className="text-gray-400 text-sm">Registration</div>
                <div className="text-gray-400 text-sm">Feedback</div>
            </div>
            <div className="col-span-2 space-y-10">
                <div className="flex pb-1 space-x-2">
                    <Switch initial={document.enrollment.status} toggle={(e) => { document.enrollment.status = e; setDocument({...document}) }}/>
                    <div className="text-xs text-gray-400 pt-2">Status</div>
                </div>
                <div className="flex pb-1 space-x-2">
                    <Switch initial={document.courseRegistration.status} toggle={(e) => { document.courseRegistration.status = e; setDocument({...document}) }}/>
                    <div className="text-xs text-gray-400 pt-2">Status</div>
                </div>
                <div className="flex pb-1 space-x-2">
                    <Switch initial={document.feedback.status} toggle={(e) => { document.feedback.status = e; setDocument({...document}) }}/>
                    <div className="text-xs text-gray-400 pt-2">Status</div>
                </div>
            </div>
            <div className="col-span-2 space-y-10">
                <Input type="number" color={"gray"} size="w-56" name="Start Date" value={document.enrollment.start} update={(e) => { document.enrollment.start = e; setDocument({...document}) }}/>
                <Input type="number" color={"gray"} size="w-56" name="Start Date" value={document.courseRegistration.start} update={(e) => { document.courseRegistration.start = e; setDocument({...document}) }}/>
                <Input type="number" color={"gray"} size="w-56" name="Start Date" value={document.feedback.start} update={(e) => { document.feedback.start = e; setDocument({...document}) }}/>
            </div>
            <div className="col-span-2 space-y-10">
                <Input type="number" color={"gray"} size="w-56" name="End Date" value={document.enrollment.end} update={(e) => { document.enrollment.end = e; setDocument({...document}) }}/>
                <Input type="number" color={"gray"} size="w-56" name="End Date" value={document.courseRegistration.end} update={(e) => { document.courseRegistration.end = e; setDocument({...document}) }}/>
                <Input type="number" color={"gray"} size="w-56" name="End Date" value={document.feedback.end} update={(e) => { document.feedback.end = e; setDocument({...document}) }}/>
            </div>
        </div>

        <Cutter title="Internals"/>
        <div className="p-8 grid grid-cols-10">
            <div className="col-span-1 space-y-14 my-auto">
                <div className="text-gray-400 text-sm">Unit Test</div>
                <div className="text-gray-400 text-sm">Assignment</div>
                <div className="text-gray-400 text-sm">Tutorial</div>
            </div>
            <div className="col-span-2 space-y-10">
                <Input type="number" color={"gray"} size="w-56" name="Count" value={document.ut.count} update={(e) => { document.ut.count = parseInt(e); setDocument({...document}) }}/>
                <Input type="number" color={"gray"} size="w-56" name="Count" value={document.assignment.count} update={(e) => { document.assignment.count = parseInt(e); setDocument({...document}) }}/>
                <Input type="number" color={"gray"} size="w-56" name="Count" value={document.tutorial.count} update={(e) => { document.tutorial.count = parseInt(e); setDocument({...document}) }}/>
            </div>
            <div className="col-span-2 space-y-10">
                <Input type="number" color={"gray"} size="w-56" name="Total" value={document.ut.marks} update={(e) => { document.ut.marks = parseInt(e); setDocument({...document}) }}/>
                <Input type="number" color={"gray"} size="w-56" name="Total" value={document.assignment.marks} update={(e) => { document.assignment.marks = parseInt(e); setDocument({...document}) }}/>
                <Input type="number" color={"gray"} size="w-56" name="Total" value={document.tutorial.marks} update={(e) => { document.tutorial.marks = parseInt(e); setDocument({...document}) }}/>
            </div>
            <div className="col-span-2 space-y-10">
                <Input type="number" color={"gray"} size="w-56" name="Contribution" value={document.ut.contribution} update={(e) => { document.ut.contribution = parseInt(e); setDocument({...document}) }}/>
                <Input type="number" color={"gray"} size="w-56" name="Contribution" value={document.assignment.contribution} update={(e) => { document.assignment.contribution = parseInt(e); setDocument({...document}) }}/>
                <Input type="number" color={"gray"} size="w-56" name="Contribution" value={document.tutorial.contribution} update={(e) => { document.tutorial.contribution = parseInt(e); setDocument({...document}) }}/>
            </div>
            <div className="col-span-2 space-y-10">
                <Input type="number" color={"gray"} size="w-56" name="Duration" value={document.ut.duration} update={(e) => { document.ut.duration = parseInt(e); setDocument({...document}) }}/>
            </div>
        </div>

        <div className="ml-10 right-0">
            <Button name="Save" color="blue" event={() => setSave(true)}/>
        </div> </>}
    </>)
}

export default Semester;