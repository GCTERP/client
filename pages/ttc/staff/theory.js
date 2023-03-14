import { useEffect, useState } from "react"
import axios from "axios"

import Dropdown from "../../../utilities/Dropdown"
import Table from "../../../utilities/Table"
import Button from "../../../utilities/Button"

const Theory = () => {
    
    const omit = [ "_id", "semester", "courseId", "facultyId", "courseCategory", "facultyName" ]

    const [ semester, setSemester ] = useState(null)
    const [ batch, setBatch ] = useState("ALL")
    const [ courses, setCourses ] = useState(null)
    const [ save, setSave ] = useState(false)
    
    useEffect(() => {

        if(save) {
            console.log(courses)
            axios.post(process.env.NEXT_PUBLIC_URL + '/ttc/staff', { courses })
                .then(res => {
                    console.log(res.data)
                    setSave(false)
                })
                .catch(err => console.log(err.message))
        }

    }, [ save ])

    useEffect(() => {

        axios.get(process.env.NEXT_PUBLIC_URL + '/ttc/staff', { params: { branch: "Information Technology" } })
            .then(res => {
                let courses = res.data.courses
                courses.map((course, idx) => {
                    course["faculty"] = <Dropdown 
                        update={(val) => { 
                            let newFacultyId = res.data.faculty.filter(doc => doc.Name == val)[0]._id
                            courses[idx].facultyName = val; 
                            courses[idx].facultyId = newFacultyId;
                            setCourses([...courses])
                        }}
                        data={[ 
                            course.facultyName, 
                            ...res.data.faculty.map(doc => doc.Name).filter(doc => doc != course.facultyName) 
                        ]}/>
                    return course
                })
                setCourses(courses)
                setSemester(res.data.sems)
            })
            .catch(err => console.log(err.message))

    }, [])

    return (
        semester ? <>
        <div className="mr-2 flex justify-between">
            <Dropdown name="Batch" update={setBatch} data={[ "ALL", ...semester.map(doc => doc.batch) ]}/>
        </div><br/>
        <Table data={courses.filter(doc => batch == "ALL" ? true : doc.batch == batch)} omit={omit} indexed/><br/>
        <Button name="Save" color="blue" icon="check" event={() => setSave(true)}/>
        </> : <div>Loading</div>
    )
}

export default Theory