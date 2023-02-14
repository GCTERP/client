import { useState } from "react"
import Icon from "./Icon"

/**
 * Search for specific values
 * @param options @type [String] - Collection of any String
 * @param filter @type String - Filter Parameter
 * @param setFilter @type Function - React `setState` method signature
 * @param search @type String - Search argument
 * @param update @type Function - React `setState` method signature
 */
const Search = ({ options, filter, setFilter, search, update }) => {

    // const [ option, setOption ] = useState(options[0])
    const [ open, setOpen ] = useState(false)

    return (
        <div className="flex group">
            <div className="border px-2 py-1 rounded-l-lg group-hover:border-blue-500">
                <div className="flex mt-2 space-x-2 cursor-pointer text-sm" onClick={() => setOpen(!open)}>
                    <div className="pt-0.5">{ filter.charAt(0).toUpperCase() + filter.slice(1) }</div>
                    <Icon name={`expand_${open ? "less" : "more"}`}/>
                </div>
                <ul className={`absolute z-10 bg-white rounded shadow px-2 py-1 -ml-1 mt-2 ${open ? "" : "hidden"}`}>
                    {
                        options.map((choice, idx) => <li onClick={() => { setFilter(choice); setOpen(false) }} key={idx} className={`text-sm p-1 my-1 rounded cursor-pointer ${filter == choice ? "bg-blue-50 text-blue-500" : "text-slate-400"} hover:bg-blue-50 hover:text-blue-500`}>{ choice }</li>)
                    }
                </ul>
            </div>
            <input name="filter" value={search} size={30} onChange={(e) => update(e.target.value)} placeholder="Search field" className="px-2 border-t border-b text-sm group-hover:border-blue-500 focus:outline-none"/>
            <div className="border-y border-r rounded-r-lg group-hover:border-blue-500 pt-3 px-2 cursor-pointer"><Icon name="search"/></div>
        </div>
    )
}

export default Search