import { useEffect, useContext, useState } from "react"
import { useRouter } from "next/router"

import { AuthContext } from "../_app"
import Input from "../../utilities/Input"
import isEmail from "validator/lib/isEmail"
import axios from "axios"

const OTP = 545

const Login = () => {

    const router = useRouter()

    const { auth } = useContext(AuthContext)

    useEffect(() => { if(auth.status)   router.push('/' + auth.role) }, [])

    // 0 - Enters Email (initial)
    // 1 - Email does not exist
    // 2 - Inactive user
    // 3 - Password does not exist
    // 4 - Password exists
    const [ type, setType ] = useState(0)

    const [ email, setEmail ] = useState("")
    const [ passwd, setPasswd ] = useState("")

    const onSubmit = async () => {

        if(type == 0 && isEmail(email)) {
            const res = await axios.get('http://localhost:5050/users', { params: { email } })
            if(res.data.length > 0) {
                if(res.data[0].password) {
                    
                    setType(4)
                }   else setType(3)
            }   else setType(1)
        }   else setEmail("")

    }
    
    return (  
        <div className="flex h-screen">
            <div className="m-auto p-5 w-1/4 border rounded-lg shadow-md">
                <div className="text-xl font-bold text-center">GCTERP</div>
                <div className="grid mt-10">
                    <label htmlFor="email" className={`text-sm pl-1 text-slate-200 ${email.length > 0 ? "text-blue-400" : ""}`}>Email</label>
                    <input name="email" type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} className={`text-sm border rounded p-2 focus:outline-none ${email.length > 0 ? "border-blue-400" : ""}`}/>
                </div>
                {   type == 4 &&
                    <div className="grid mt-5 relative">
                        <label htmlFor="passwd" className={`text-sm pl-1 text-slate-200 ${passwd.length > 0 ? "text-blue-400" : ""}`}>Password</label>
                        <input name="passwd" type="password" value={passwd} onChange={(e) => setPasswd(e.target.value)} className={`text-sm text-slate-400 border rounded p-2 focus:outline-none ${email.length > 0 ? "border-blue-400" : ""}`}/>
                    </div>
                }
                {   type == 3 &&
                    <div className="grid mt-5 relative">
                        <label htmlFor="passwd" className={`text-sm pl-1 text-slate-200 ${passwd.length > 0 ? "text-blue-400" : ""}`}>OTP</label>
                        <input name="passwd" type="password" value={passwd} onChange={(e) => setPasswd(e.target.value)} className={`text-sm text-slate-400 border rounded p-2 focus:outline-none ${email.length > 0 ? "border-blue-400" : ""}`}/>
                    </div>
                }
                {   (type == 2 || type == 1) &&
                    <div className="text-sm mt-5 text-center text-red-400 font-bold">User not found</div>
                }
                <div onClick={() => onSubmit()} className="p-2 cursor-pointer bg-blue-400 h-10 text-white font-semibold text-center rounded mt-5">Next</div>
            </div>
        </div>
    )
}

const Workout = () => {

    const [ email, setEmail ] = useState("")

    let color = "slate"
    if(email.length > 10)    color = "red"
    else if(email.length > 5)   color = "green"
    else if(email.length > 0)   color = "blue"
    else color = "slate"

    return (
        <div className="p-10">
            <Input name="Email" type="email" state={color} value={email} update={setEmail} size="w-1/6"/>
        </div>
    )
}

export default Workout;