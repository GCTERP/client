import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useContext } from "react"

import Icon from "../utilities/Icon"
import { AuthContext } from "../pages/_app"

const roles = {
    admin: "Admin",
    hod: "Head of the Department",
    pc: "Program Coordinator",
    ttc: "Timetable Coordinator",
    fa: "Faculty Advisor",
    ci: "Course Incharge"
}

const UserMenu = () => {

  const [currentRole, setCurrentRole] = useState(0);

  const { auth, setAuth } = useContext(AuthContext)

  const router = useRouter()

  return (
        <div className="absolute bg-white mt-12 mr-1 w-fit ml-96 border shadow rounded-md">
            <div className="group hover:bg-slate-50 rounded-md">
                <div className="absolute w-5 h-5 border-t border-l rotate-45 bg-white group-hover:bg-slate-50 right-4 -top-[10.5px] "></div>
                <Link className="cursor-pointer flex peer p-2" href={"/" + auth.primaryRole + "/profile"}>
                    <Icon name="offline_bolt"/>
                    <div className="pl-2 text-sm">My Profile</div>
                </Link>
            </div>
            <hr className="border-gray-200"></hr>
            
            {   auth.primaryRole != "student" &&
                <><div className="text-xs text-slate-400 px-1 pt-1">ROLES</div>

                {
                    auth.roles.map((role, idx) => (
                        <li onClick={() => setCurrentRole(idx) } key={idx} className={`px-2 cursor-pointer ${ currentRole === idx ? `marker:text-blue-500 marker:text-xl ` : " marker:text-white marker:text-xl" } list-outside `}>
                            <Link href={router.pathname.split('/')[1] == role ? {} : ("/" + role)}>
                                <span className={`text-xs hover:text-blue-500 ${currentRole == idx && "text-blue-500"} -left-2`}>
                                    { roles[role] }
                                </span>
                            </Link>
                        </li>
                    ))
                }</>
            }
            
            { auth.primaryRole != "student" && <hr className="border-gray-200 mt-2"></hr> }
            <div className="flex cursor-pointer p-2 hover:bg-slate-50" onClick={() => setAuth({ status: false })}>
                <Icon name="logout"/>
                <div className="pl-2 text-sm">Sign Out</div>
            </div>

        </div>
    );
};

export default UserMenu;