import Icon from "./Icon"

/**
 * Default download file component
 * @param blob @type Blob - File blob from server
 */
const Download = ({ blob }) => {

    return (
        blob && <a href={URL.createObjectURL(blob)} download={blob.name} className="block w-fit mr-2">
            <div className="p-2 border cursor-pointer flex rounded-lg text-sm w-fit group">
                <Icon name="download"/>
                <div className="mt-0.5 ease-in duration-150 h-0 w-0 opacity-0 pointer-events-none group-hover:h-fit group-hover:w-fit group-hover:opacity-100 group-hover:ml-2">Download</div>
            </div>
        </a>
    )
}

export default Download