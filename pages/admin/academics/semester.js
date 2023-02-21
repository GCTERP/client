import Icon from "../../../utilities/Icon"
import { numberToRoman } from "../../../utilities/helpers"

const Batch = ({ batch, sem = 1, status = 0, days = 1 }) => {

    return (
        <div className={`w-fit p-2 border rounded-lg cursor-pointer ${status == 1 && "border-red-500"} hover:bg-${status == 1 ? "red" : "slate"}-50`}>
            <div className="flex justify-between mb-4">
                <div className="flex text-slate-400 text-sm">
                    Batch
                </div>
                <div className="text-sm">{ (batch) + " - " + (batch + 4) }</div>
            </div>
            <div className="flex justify-between space-x-4">
                <div>
                    <span className="text-slate-400 text-xs">Semester&nbsp;</span>
                    <span className="text-xs">{ numberToRoman(sem) }</span>
                </div>
                <div className={`text-${status == 0 ? "blue" : status == 1 ? "red" : "slate"}-500 text-xs pt-1`}>
                    { status == 0 ? "Ongoing" : status == 1 ? "Add Sem" : status == 2 ? "Starts" : "Ends" }
                    { status > 1 && " in " + days + (days > 1 ? " days" : " day") }
                </div>
            </div>
        </div>
    )
}

const BatchHolder = () => {

    let data = [ { batch: 2024, sem: 1, status: 0 }, { batch: 2023, sem: 3, status: 1 }, { batch: 2022, sem: 5, status: 2 }, { batch: 2021, sem: 7, status: 3 } ]

    return (
        <div className="flex space-x-4 p-2">
            <div className="w-[160px] border border-dashed rounded-lg cursor-pointer hover:bg-slate-50">
                <div className="flex h-full justify-center items-center space-x-2 text-slate-400">
                    <Icon name="add"/>
                    Create
                </div>
            </div>
            {
                data.map((doc, idx) => (
                    <Batch key={idx} batch={doc.batch} sem={doc.sem} status={doc.status}/>
                ))
            }
        </div>
    )
}

const Cutter = ({ title }) => {

    return (
        <div className="flex ml-2 space-x-2 justify-center items-center">
            <div className="text-sm text-slate-500 font-bold">
                { title }
            </div>
            <div className="h-[1px] mt-1 bg-slate-200 w-full"></div>
        </div>
    )
}

const Semester = () => {

    let semesters = [ 1, 2, 3, 4, 5, 6, 7 ]

    return ( <>
        <BatchHolder />
        <div className="text-dark font-bold mt-2 ml-2">Semester</div>
        <div className="flex space-x-5 p-2 my-3">
        { semesters.map(sem => <div className="border px-3 py-2 w-12 text-center rounded cursor-pointer hover:bg-slate-50">{ numberToRoman(sem) }</div>) }
            <div className="border px-3 pt-2 w-12 rounded text-white bg-blue-500 cursor-pointer hover:bg-blue-600">
                <Icon name="add"/>
            </div>
        </div>
        <Cutter title="Timeline"/>
        <div className="p-2">

        </div>
        <Cutter title="Internals"/>
    </>)
}

export default Semester