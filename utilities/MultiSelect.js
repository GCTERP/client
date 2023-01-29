import Select from "react-select"

/**
 * MultiSelect UI Component
 * @param name @type String - Name of multi-select field 
 * @param data @type [String | Integer] - Any selectable collection
 * @param selectedData @type Function - React `setState` method signature
 */
const MultiSelect = ({ name, data, selectedData }) => {

    const options = data.map(ele => ({ value: ele, label: ele }))

    return ( 
        <div className="pl-10 group">
            <div className='flex items-center justify-start pl-2'>
                <div className='-mb-2.5 z-10'>
                    <span className='bg-white text-gray-400 group-focus-within:font-bold group-focus-within:text-blue-500 text-sm px-1'>{name}</span>
                </div>
            </div>
            <Select styles={{
                control: (base) => ({
                    ...base,
                    minHeight: '50px',
                    height: '50px',
                }),
                valueContainer: (base) => ({
                    ...base,
                    overflowX: "unset",
                    flexWrap: 'unset',
                    height: '50px',
                }),
                multiValue: (base) => ({
                    ...base,
                    flex: '0 0 auto',
                })
                }} 
                className="w-6/12 text-sm" 
                maxMenuHeight={250} 
                options={options} 
                isClearable={false} 
                onChange={selectedData} 
                isMulti 
                placeholder="Please enter a tag" 
            />
        </div>
    );
}
 
export default MultiSelect;