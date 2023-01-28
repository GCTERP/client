import Link from "next/link"
import { useState } from "react"

import Icon from "../utilities/Icon.js"

const ProfileMenu = () => {

  const [currentRole, setCurrentRole] = useState(1);
  
  // Sample list data for roles 
  const data = [
      { id: 1, name: "Facutly Advisor" },
      { id: 2, name: "Program Coordinator" },
      { id: 3, name: "Time Table Coordinator" },
      { id: 4, name: "Head of the Department" },
    ]

  return (
        <div className="absolute bg-white mt-12 mr-1 w-fit ml-96 border shadow rounded-md">
            <div className="group hover:bg-slate-50 rounded-md">
                <div className="absolute w-5 h-5 border-t border-l rotate-45 bg-white group-hover:bg-slate-50 right-4 -top-[10.5px] "></div>
                <Link className="cursor-pointer flex peer p-2" href="/profile">
                    <Icon name="offline_bolt"/>
                    <div className="pl-2 text-sm">My Profile</div>
                </Link>
            </div>
            <hr className="border-gray-200"></hr>
            
            <div className="text-xs text-slate-400 px-1 pt-1">ROLES</div>

            {
                data.map(item => (
                    <li onClick={() => setCurrentRole(item.id) } className={`px-2 cursor-pointer ${ currentRole === item.id ? `marker:text-blue-500 marker:text-xl ` : " marker:text-white marker:text-xl" } list-outside `}>
                        <span className={`text-xs hover:text-blue-500 ${currentRole == item.id && "text-blue-500"} -left-2`}>
                            {item.name}
                        </span>
                    </li>
                ))
            }
            
            <hr className="border-gray-200 mt-2"></hr>
            <Link className="flex cursor-pointer p-2 hover:bg-slate-50" href="/login">
                <Icon name="logout"/>
                <div className="pl-2 text-sm">Sign Out</div>
            </Link>

        </div>
    );
};

export default ProfileMenu;