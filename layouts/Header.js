import { useState } from "react"
import Icon from "../utilities/Icon"

const Header = () => {

    const [ notify, setNotify ] = useState(false)
    const [ toggle, setToggle ] = useState(false)

    return (  
        <div className="col-span-6 border-b flex justify-end">
            <div className={`p-2 relative hover:text-blue-500 cursor-pointer ${notify && "text-blue-500"}`} onClick={() => setNotify(!notify)}>
                <Icon name={`notifications${notify ? "_active" : ""}`} fill={notify}/>
                <div className="absolute w-2 h-2 bg-red-400 top-1/4 right-1/4 rounded-full"></div>
            </div>
            <div className={`p-2 hover:text-blue-500 cursor-pointer ${toggle && "text-blue-500"}`} onClick={() => setToggle(!toggle)}>
                <Icon name="person" fill={toggle}/>
                <Icon name={`expand_${toggle ? "less" : "more"}`}/>
            </div>
        </div>
    )
}
 
export default Header;