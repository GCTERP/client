import { useState } from "react"

import Icon from "../utilities/Icon.js"

/**
 * Dropdown UI Component
 * @param name @type String - Dropdown label 
 * @param data @type [String] - Any collection of strings
 * @param special @type Boolean - UI Rich Component
 */
const Dropdown = ({name, data, special, selectedData}) => {

    const [ option, setOption ] = useState(data[0])
    const [ expand, setExpand ] = useState(false)

    return (special ? <>
        <div className="relative border w-fit rounded pl-2 border-blue-500">
            <div className="absolute text-sm text-blue-500 w-fit bg-white ml-[0.5px] px-1 -mt-3">{ name }</div>
            <div className="flex w-fit justify-between text-sm px-1 pt-1 cursor-pointer" onClick={() => setExpand(!expand)}>
                { option }&nbsp;&nbsp;&nbsp;
                <Icon name={`expand_${expand ? "less" : "more"}`}/>
            </div>
            <ul className={`absolute mt-1 z-10 bg-white px-3 -ml-2 border-blue-500 py-1 w-fit ${expand ? "" : "hidden"}`}>
            {
                data.map((ele, idx) => <li onClick={() => { setOption(data[idx]); selectedData(data[idx]); setExpand(false) }} className={`text-sm cursor-pointer text-slate-400 hover:text-opacity-80 rounded p-1 my-1 hover:bg-blue-50 hover:text-blue-500 ${option == data[idx] && "text-blue-500 bg-blue-50"}`}>{ ele }</li>)
            }
            </ul>
        </div></> :
        <div>
            <div className="text-sm font-semibold pl-3 mb-2">{ name }</div>
            <div className="flex w-fit justify-between text-slate-400 text-sm pl-3 cursor-pointer" onClick={() => setExpand(!expand)}>
                { option }&nbsp;&nbsp;
                <Icon name={`expand_${expand ? "less" : "more"}`}/>
            </div>
            <ul className={`absolute z-20 px-2 py-1 w-fit rounded-md shadow-md ${expand ? "" : "hidden"}`}>
            {
                data.map((ele, idx) => <li onClick={() => { setOption(data[idx]); selectedData(data[idx]); setExpand(false); }} className={`text-sm cursor-pointer text-slate-400 hover:text-opacity-80 rounded p-1 my-1 hover:bg-blue-50 hover:text-blue-500 ${option == data[idx] && "text-blue-500 bg-blue-50"}`}>{ ele }</li>)
            }
            </ul>
        </div>
    )     
}

export default Dropdown