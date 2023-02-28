import { useEffect, useState } from "react"
import Select from "react-select"

/**
 * MultiSelect UI Component
 * @param name @type String - Name of multi-select field 
 * @param data @type [String | Integer] - Any selectable collection
 * @param selectedData @type Function - React `setState` method signature
 */
const MultiSelect = ({ name, data, selectedData, values }) => {

    const options = data.map(val => ({ value: val, label: val }))

    const [selectData, setSelectedData] = useState([])

    useEffect(() => {
        setSelectedData(values)
    }, [values])

    const handleChange = (values) => {
        setSelectedData(values)
        selectedData(values)
    }

    return ( 
        <div className="group">
            <div className='flex items-center justify-start pl-2'>
                <div className='-mb-2.5 z-10'>
                    <span className='bg-white text-gray-400 group-focus-within:font-bold group-focus-within:text-blue-500 text-sm px-1'>{name}</span>
                </div>
            </div>
            <Select styles={{
                control: (base) => ({
                    ...base,
                    minHeight: '35px',
                    height: '35px',
                }),
                valueContainer: (base) => ({
                    ...base,
                    overflowX: "unset",
                    flexWrap: 'unset',
                    height: '20px',
                }),
                multiValue: (base) => ({
                    ...base,
                    flex: '0 0 auto',
                })
                }} 
                className="w-9/12 text-sm" 
                maxMenuHeight={250} 
                key={JSON.stringify(values)} 
                options={options} 
                // isClearable={false} 
                // onChange={selectedData}
                onChange={handleChange}
                // value = {selectData}
                defaultValue={selectData}
                // defaultValue={values}
                // value={values}
                isMulti 
                placeholder="Please enter a tag" 
            />
        </div>
    );
}
 
export default MultiSelect;