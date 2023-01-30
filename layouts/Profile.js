import { useState } from "react"

import Dropdown from "../utilities/Dropdown.js"
import Input from "../utilities/Input.js"
import Calendar from "../utilities/Calendar.js"
import Button from "../utilities/Button.js"
import MultiSelect from "../utilities/MultiSelect.js"
import Table from "../utilities/Table.js"

const Profile = () => {

    const [ value, setValue ] = useState("")

    return (
        <div>
            <MultiSelect name="Register Number" data={[ "1918147", "1918501", "19181L01", "1918148" ]}/><br/>
            <Input name="Name" type="text" value={value} update={setValue} size="w-1/4" color="blue"/><br/>
            <Dropdown name="Branch" data={[ "Computer Engineering", "Information Technology", "Mechanical Engineering", "Bio-technology" ]}/><br/>
            <Dropdown name="State" data={[ "Present", "Absent", "On-duty" ]} special/><br/>
            <Calendar selectDate={() => console.log("Hi")}/><br/>
            <div className="flex justify-between w-1/4">
                <Button name="Update" icon="add" color="blue"/>
                <Button name="Check" icon="check" color="blue" outline/>
            </div><br/>
            <Table data={[ { name: "Vishal", register: "1918147", age: "21", cgpa: 82.34 }, { name: "Vishal", register: "1918147", age: "21", cgpa: 82.34 }, { name: "Vishal", register: "1918147", age: "21", cgpa: 82.34 }, { name: "Vishal", register: "1918147", age: "21", cgpa: 82.34 }, { name: "Vishal", register: "1918147", age: "21", cgpa: 82.34 }, { name: "Vishal", register: "1918147", age: "21", cgpa: 82.34 }, { name: "Vishal", register: "1918147", age: "21", cgpa: 82.34 } ]}/>
        </div>
    )
}

export default Profile