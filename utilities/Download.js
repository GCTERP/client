import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"

import download from "../assets/download.png"
import Icon from "./Icon"

/**
 * Default download file component
 * @param url @type String - URL for Server Endpoint
 * @param ids @type [String] - Collection of doc _ids
 * @param name @type String - Name of downloaded file
 */

const Download  = ({ url, ids, name = "data" }) => {

    const [ closed, setClosed ] = useState(true)
    const [ blob, setBlob ] = useState(null)

    useEffect(() => {

        if(!closed)
            axios.get(url, { params: { ids }, responseType: "blob" })
                .then(response => setBlob(response.data)).catch(err => console.log(err.message))

    }, [ closed ])

    return (
        closed ? 
        <div className="p-2 border cursor-pointer flex rounded-lg text-sm w-fit group" onClick={() => setClosed(false)}>
            <Icon name="download"/>
            <div className="mt-0.5 ease-in duration-150 h-0 w-0 opacity-0 pointer-events-none group-hover:h-fit group-hover:w-fit group-hover:opacity-100 group-hover:ml-2">Download</div>
        </div> : blob &&
        <div className="absolute w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
            <div className="relative m-2 border shadow rounded-lg">
                <div className="absolute text-slate-400 hover:text-red-500 top-2 right-2" onClick={() => setClosed(true)}>
                    <Icon name="close"/>
                </div>
                <a onClick={() => setClosed(true)} href={URL.createObjectURL(blob)} download={name + '.xlsx'} className="block text-center cursor-pointer hover:text-blue-500 text-sm pt-5">
                    <div className="m-auto w-fit mb-3">
                        <Image src={download} width="50" height="50" alt="File Image"/>
                    </div>
                    <div className="hover:text-blue-500 m-auto w-fit pb-5">
                        Download
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Download