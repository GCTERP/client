import { useState } from "react"
import Icon from "../utilities/Icon"

import UserMenu from "./UserMenu.js"
import Notification from "./Notification.js"

const Header = () => {

    const [ notify, setNotify ] = useState(false)
    const [ toggle, setToggle ] = useState(false)

    return (  
        <div className="col-span-6 border-b flex justify-end">
            <div className={`p-2 relative hover:text-blue-500 cursor-pointer ${notify && "text-blue-500"}`} onClick={() => { setNotify(!notify); setToggle(false) }}>
                <Icon name={`notifications${notify ? "_active" : ""}`} fill={notify}/>
                <div className="absolute animate-ping w-2 h-2 bg-red-400 top-1/4 right-1/4 rounded-full"></div>
                <div className="absolute w-2 h-2 bg-red-400 top-1/4 right-1/4 rounded-full"></div>
            </div>
            <div className={`p-2 hover:text-blue-500 cursor-pointer ${toggle && "text-blue-500"}`} onClick={() => { setToggle(!toggle); setNotify(false) }}>
                <Icon name="person" fill={toggle}/>
                <Icon name={`expand_${toggle ? "less" : "more"}`}/>
            </div>
            { notify && <Notification /> }
            { toggle && <UserMenu /> }
        </div>
    )
}
 
export default Header;