import { useState } from "react"

/**
 * Switch or Toggle Component
 * @param initial @type Boolean - Is it ON or OFF
 * @param setToggle @type Function - React `setState1` method signature
 */
const Switch = ({ initial, toggle }) => {
    
    const [ isTrue, setIsTrue ] = useState(initial)

    return (
        <div className="relative h-8 w-28 rounded-full text-gray-500 flex border">
            <div onClick={() => { toggle(!isTrue); setIsTrue(!isTrue)}} className={`absolute ${isTrue && "right-0"} h-full shadow bg-white z-10 w-7/12 border-${isTrue ? "l" : "r"} cursor-pointer rounded-full`}></div>
            <div className="h-full w-1/2 rounded-l-full border-r text-left bg-blue-400 text-white pl-2 pt-[3px]">ON</div>
            <div className="h-full w-1/2 rounded-r-full text-right bg-slate-50 pr-2 pt-[3px]">OFF</div>
        </div>
    )
}

export default Switch