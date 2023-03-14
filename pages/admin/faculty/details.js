import { useEffect, useState } from "react"
import axios from "axios"

import Download from "../../../utilities/Download"
import Dropdown from "../../../utilities/Dropdown"
import Upload from "../../../utilities/Upload"
import Search from "../../../utilities/Search"
import Table from "../../../utilities/Table"
import Button from "../../../utilities/Button"
import Icon from "../../../utilities/Icon"
import Input from "../../../utilities/Input"
import MultiSelect from "../../../utilities/MultiSelect"

const FacultyForm = ({ setOpen }) => {
    
    const [branch, setBranch] = useState("Civil");
    const [email, setEmail] = useState(null);
    const [FacultyId, setFacultyId] = useState(null);
    const [fName, setFName] = useState(null);
    const [lName, setLName] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [title,setTitle] = useState("Dr.");
    const [primaryRole,setPrimaryRole] = useState("fa");
    const [type,setType]= useState("adhoc");
    const [roles,setRoles]=useState([]);
    const [submit, setSubmit] = useState(false);
  
    useEffect(() => {
    
        if (submit  && email && FacultyId && fName && lName && mobile ) {
        
            let data = { branch, email, admin: false, cfa: false, ci: false, fa: false, facultyId: FacultyId, firstName: fName, hod: false, isActive: true, isCredentialCreated: false, lastName: lName, mobile: mobile, pc: false, personalEmail: "rjmmalavika@gmail.com", primaryRole: primaryRole, title: title, ttc: false, type: type };
            axios.post("http://192.168.204.175:5000/admin/faculty/add", data)
                .then((response) => {
                    setSubmit(false);
                    setOpen(false);
                }).catch((err) => console.log(err.message));
        }

    }, [submit]);

    return (
        <div className="absolute w-fit bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="absolute cursor-pointer text-red-500 top-4 right-2" onClick={() => setOpen(false)}>
                <Icon name="close" />
            </div>
      
            <div className="text-xl font-bold w-fit m-auto my-4">
                Add New Faculty
            </div><hr />

            <div className="flex space-x-4 justify-center w-fit m-4">
                <Dropdown data={["Dr.","Mr.","Mrs."]} update={setTitle} />
                <Input name="First Name" type="text" color="blue" value={fName} update={setFName} />
                <Input name="Last Name" type="text" color="blue" value={lName} update={setLName} />
            </div>
      
            <div className=" space-x-4 justify-center w-full m-4">
                <MultiSelect name="Roles" data={["admin", "cfa", "hod", "pc", "ttc", "fa", "ci"]} selectedData={setRoles} />
            </div>
        
            <div className="flex space-x-4 justify-center w-fit m-4">
                <Dropdown  update={setBranch} name="Branch" data={ ["CIVIL", "MECH", "ECE", "EEE", "EIE", "CSE", "IT", "IBT"] } />
                <Dropdown  update={setPrimaryRole} name="Primary Role" data={["admin", "cfa", "hod", "pc", "ttc", "fa", "ci"]} />
                <Dropdown  name={"Type"} data={["Adhoc","COE","External","Internal"]} update={setType} />
            </div>
      
            <div className="flex space-x-4 justify-center w-fit m-4">
                <Input name="Faculty ID" type="number" color="blue" value={FacultyId} update={setFacultyId} />
            </div>
      
            <div className="flex space-x-4 justify-center w-fit m-4">
                <Input name="Email" type="email" color="blue" value={email} update={setEmail} />
                <Input name="Mobile" type="text" color="blue" value={mobile} update={setMobile} />
            </div><hr />
      
            <div onClick={() => setSubmit(true)} className={`py-2 px-2 flex space-x-2 rounded-md cursor-pointer font-semibold text-sm m-4 text-center items-center text-white ${submit ? "bg-slate-400" : "bg-blue-500" }`} disabled={submit ? "disabled" : ""} >
                <Icon name="add"/>
                Add
            </div>

        </div>)
}


const Details = () => {

    let omit = [ "_id", "admin", "cfa", "hod", "pc", "ttc", "fa", "ci" ]
    const omitFields = (field) => !omit.some(item => item == field)
    
    const [ open, setOpen ] = useState(false);
    const [ branch, setBranch ] = useState("ALL")
    const [ filter, setFilter ] = useState(null)
    const [ fields, setFields ] = useState(null)
    const [ search, setSearch ] = useState("")
    const [ data, setData ] = useState(null)
    const [ editedDoc, setEditedDoc ] = useState({})

    useEffect(() => {   
        axios.get(process.env.NEXT_PUBLIC_URL + "/admin/faculty")
            .then((response) => {
                let data = response.data, fields = [];
                if(data.length > 0)
                fields = Object.keys(data[0]).filter((key) => omitFields(key));
                setFilter(fields[0]);
                setFields(fields);
                setData(data);
            }).catch((err) => console.log(err.message));

    }, [ open ])

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
            
            { data.length > 0 && <Search options={fields} filter={filter} setFilter={setFilter} search={search} update={setSearch}/> }
            
            <div className="flex mt-2 space-x-2">
                <Upload url={process.env.NEXT_PUBLIC_URL + '/admin/faculty/upload'}/>
                <Download url={process.env.NEXT_PUBLIC_URL + '/admin/faculty/download'} ids={data.filter(doc => filterCheck(doc)).map(doc => doc._id)} name="faculty"/>
            </div>
        
        </div><br/>
        
        <Table editable data={data.filter(doc => filterCheck(doc))} update={setEditedDoc} omit={omit} indexed/><br/>
        <Button name="Add Faculty" icon="add" color="blue" event={() => setOpen(true)}/>
        
        { open && <FacultyForm setOpen={setOpen}/> }
        </> : <div>Loading</div>)
}
 
export default Details;
