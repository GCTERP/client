import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"

import spreadsheet from "../assets/spreadsheet.png"
import upload from "../assets/upload.png"
import Button from "./Button"
import Icon from "./Icon"

/**
 * Default file upload component
 * @param url @type URL - Server endpoint for upload
 */
const Upload = ({ url }) => {

    const [ sent, isSent ] = useState(false)
    const [ file, setFile ] = useState(null)
    const [ closed, isClosed ] = useState(true)
    const [ trigger, setTrigger ] = useState(false)

    useEffect(() => {

        if(trigger)
            axios.post(url, { data: file }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => { isSent(true)
            }).catch(err => console.log(err.message))

    }, [ trigger ])

    return (
        closed ? 
        <div className="p-2 border cursor-pointer flex rounded-lg text-sm w-fit group" onClick={() => isClosed(false)}>
            <Icon name="upload"/>
            <div className="mt-0.5 ease-in duration-150 h-0 w-0 opacity-0 pointer-events-none group-hover:h-fit group-hover:w-fit group-hover:opacity-100 group-hover:ml-2">Upload</div>
        </div> :
        <div className="absolute w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
            <div className="relative m-2 border shadow rounded-lg">
                <div className="absolute text-slate-400 hover:text-red-500 top-2 right-2" onClick={() => { setFile(null); isClosed(true) }}>
                    <Icon name="close"/>
                </div>
                <label htmlFor="upload" className={`block text-center cursor-pointer hover:text-blue-500 text-sm ${file ? "mt-5" : "m-5"}`}>
                    <div className="m-auto w-fit mb-3">
                        <Image src={file ? spreadsheet : upload} width="50" height="50" alt="File Image"/>
                    </div>
                    { file ? file.name : "Select File (.xls, .xlsx)" }
                </label>
                {   file && 
                    <div className="w-fit m-auto my-3 flex space-x-5">
                        {   !sent ? <>
                            <Button color="blue" name="Send" event={() => setTrigger(true)}/>
                            <Button color="blue" name="Cancel" event={() => isClosed(true)} outline/></> :
                            <div className="bg-slate-400 rounded p-2 border pointer-events-none text-white">Sent</div>
                        }
                    </div> 
                }
                <input id="upload" type="file" onChange={(e) => setFile(e.target.files[0])} className="text-sm border flex h-0 w-0 invisible"/>
            </div>
        </div>
    )
}

export default Upload