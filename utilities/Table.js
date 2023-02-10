import { useEffect, useState } from "react"

import Icon from "./Icon"

/**
 * Table UI Component
 * @param data @type [Object] - Any collection of Objects
 * @param update @type Function - React `setState` method signature
 * @param editable @type Boolean - Can Mutate Data
 */
const Table = ({ data, update, editable, keys }) => {

    const fields = data && data.length > 0 ? Object.keys(data[0]) : []

    const [ edit, setEdit ] = useState(data.map(item => 0))

    const [ values, setValues ] = useState({})

    const mutate = (index, state, reset = true) => {
        for(let idx = 0; idx < edit.length; idx++)
            edit[idx] = reset ? 0 : 2
        edit[index] = state
        if(state == 1)  setValues({...data[index]})
        setEdit([...edit])
    }

    const Editor = ({index, open}) => {

        return ( open != 1
            ? <td onClick={() => open == 0 && mutate(index, 1, false)} className={`px-6 py-4 text-center text-sm text-gray-${open == 0 ? "100" : "500"} whitespace-nowrap`}><Icon name="edit"/></td>
            : open == 1 && <td className="flex space-x-2 px-4 py-4 text-center text-sm text-gray-500 whitespace-nowrap">
                <div onClick={() => mutate(index, 0)} className="text-red-500"><Icon name="close"/></div>
                <div onClick={() => { mutate(index, 0); update({ key: keys[index], value: values })}} className="text-blue-500"><Icon name="done"/></div>
            </td>
        )
    }

    const setSize = (value) => {
        let len = 0
        if(typeof(value) == typeof(""))
            len = value.length > 0 ? value.length : 1
        else 
            len = value.toString().length > 0 ? value.toString().length : 1
        return len.toString()
    }

    return (
        data && (data.length > 0 ?
        <div className="relative p-1.5 w-fit inline-block align-middle">
            <div className="overflow-auto shadow-md sm:rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                    <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                        <tr>
                            {
                                fields.map((heading, index) => (
                                    <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase" key={index}>{heading}</th> ))
                            }
                            {
                                editable && <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase">Action</th>
                            }
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                           data.map((row, ridx) => (
                            <tr className={`px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap group hover:bg-sky-50`} key={ridx}>
                                {
                                    fields.map((key, kidx) => ( edit[ridx] != 1 
                                    ? <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap focus:outline-none border" key={kidx}>{ typeof(row[key]) == typeof("") ? row[key].charAt(0).toUpperCase() + row[key].slice(1) : row[key] }</td>
                                    : <td className="px-6 py-4 text-sm text-gray-800 border whitespace-nowrap" key={kidx}>
                                        <input type="text" name={key} size={setSize(values[key])} value={values[key]} onChange={(e) => { values[key] = e.target.value; setValues({...values}) }} className="group-hover:bg-sky-50 outline-none"/>
                                    </td>
                                    ))
                                }
                                {
                                    editable && <Editor index={ridx} open={edit[ridx]}/>
                                }
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div> : <div>No Data Here...</div>)
    );
}

export default Table;