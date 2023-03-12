import { useState, useEffect } from "react"
import axios from "axios"

import Icon from "../../../utilities/Icon"
import Search from "../../../utilities/Search"
import Dropdown from "../../../utilities/Dropdown"
import { setSize } from "../../../utilities/helpers"

const Branch = [ "ALL", "CIVIL", "MECH", "ECE", "EEE", "EIE", "CSE", "IT", "IBT" ];

const CustomTable = ({ data, editable, update, omit  }) => {

    const omitFields = (field) => !omit.some((item) => item == field);
    const fields = data && data.length > 0
    ? Object.keys(data[0]).filter((key) => omitFields(key))
    : [];

    const [edit, setEdit] = useState(data.map((item) => 0));
    const [values, setValues] = useState({});

    const mutate = (index, state, reset = true) => {

        for (let idx = 0; idx < edit.length; idx++) 
            edit[idx] = reset ? 0 : 2;
        
        edit[index] = state;
        if (state == 1) 
            setValues({ ...data[index] });
        
        setEdit([...edit]);
    }

    const Editor = ({ index, open }) => {
    
        return open != 1 ? (
            <td onClick={() => open == 0 && mutate(index, 1, false)} className={`px-4 py-2 text-center text-gray-${ open == 0 ? "100" : "500" } ${open == 0 && "hover:text-blue-500"} whitespace-nowrap`}>
                <Icon name="edit"/>
            </td>
            ) : (
            open == 1 && (
            <td className="flex space-x-2 px-4 py-2 text-center text-gray-500 whitespace-nowrap">
                <div onClick={() => mutate(index, 0)} className="text-red-500">
                    <Icon name="close" />
                </div>
                <div onClick={() => { mutate(index, 0); update({ ...values }); }} className="text-blue-500">
                    <Icon name="done" />
                </div>
            </td>))
        }

        return ( data &&
        
            (data.length > 0 ?   
            <div className="max-w-min max-h-[80%] overflow-auto overscroll-none mr-2 rounded-b-lg shadow-md align-middle border rounded-t-lg ">
                <table className="table-auto divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-gray-100 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold first:rounded-tl-lg uppercase">sno</th>
                            { 
                                fields.map((heading, index) => (
                                <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase"key={index}>{heading}</th>))
                            }
                            {   
                                editable && (
                                <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold rounded-tr-lg uppercase">Action</th>)
                            }
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {
                        data.map((row, ridx) => (
                        <tr className={`px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap group hover:bg-sky-50`} key={ridx}>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ridx + 1}</td>
                            {
                                fields.map((key, kidx) => edit[ridx] != 1 ? (
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={kidx}>
                                { row[key]===true?<span className="material-symbols-outlined">done</span>:row[key] }
                                </td>) : (

                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={kidx}>
                                    {
                                        (key!="fullName" && key!="branch" && key!="facultyId") ? 
                                        (<input type="checkbox" name={key} value={values[key]} checked={values[key]} size={setSize(values[key])} onClick={(e) => { values[key] = !values[key]; setValues({ ...values }); }} className="group-hover:bg-sky-50 outline-none" />
                                        ) : (
                                        <input type="text" name={key} size={setSize(values[key])} value={values[key]} onChange={(e) => { values[key] = e.target.value; setValues({ ...values }); }} className="group-hover:bg-sky-50 outline-none" />)
                                    }
                                </td>))
                            }
                            { editable && <Editor index={ridx} open={edit[ridx]} /> }
                        </tr>))
                    }
                    </tbody>
                </table>
            </div> : <div>No Data Here...</div>)
        )
    }


const Roles = () => {

    const omit = ["_id","email","personalEmail","type","firstName","lastName","mobile","primaryRole","title","isCredentialCreated","isActive"];
    const omitFields = (field) => !omit.some(item => item == field)

    const [ data, setData ] = useState(null);
    const [ editedDoc, setEditedDoc ] = useState({});
    const [ filter, setFilter ] = useState("")
    const [ search, setSearch ] = useState("");
    const [ fields, setFields ] = useState(null);
    const [ branch, setBranch ] = useState("ALL");
    
    useEffect(() => {

        if(JSON.stringify(editedDoc) != "{}")
            for(let idx in data)
                if(data[idx]._id == editedDoc._id) {
                    axios.put(process.env.NEXT_PUBLIC_URL +  "/admin/faculty/update", editedDoc)
                        .then(response => {
                            data[idx] = {...editedDoc}
                            setData([...data])
                        }).catch(err => console.log(err.message))
                }

    }, [ editedDoc ])

    const filterSearch = (doc) => doc[filter.charAt(0).toLowerCase() + filter.slice(1)].toString().toLowerCase().includes(search.toString().toLowerCase())

    const filterCheck = (doc) => (branch == "ALL" ? true : doc.branch == branch) && filterSearch(doc)

    useEffect(() => {
        
        axios.get(process.env.NEXT_PUBLIC_URL + "/admin/faculty")
            .then((response) => {
                let data = response.data, fields = [];
                if(data.length > 0)
                    fields = Object.keys(data[0]).filter(key => omitFields(key))
                setFilter(fields[0])
                setFields(fields)
                setData(data);
            }).catch((err) => console.log(err.message));
    }, [])

    return (data && <>
        <div className="flex p-4  space-x-12">
            <div className="flex  justify-center  items-center">
                <Dropdown name="Branch" data={Branch} update={setBranch} special={false}/>
                <div className="ml-80">
                { data.length > 0 && <Search  options={fields} filter={filter} setFilter={setFilter} search={search} update={setSearch}/> }
                </div>
            </div>
        </div>
        <CustomTable editable data={data.filter(doc => filterCheck(doc))} update={setEditedDoc}  omit={omit} />
        </>
    )
}

export default Roles