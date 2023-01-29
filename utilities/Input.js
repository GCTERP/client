/**
 * Input UI Component
 * @param name @type String - Name of the field 
 * @param type @type String - Input Type
 * @param color @type String - Field status color
 * @param value @type Any - React `state` element
 * @param update @type Function - React `setState` method signature
 * @param size @type String - Tailwind `width` Specification
 * @param required @type Boolean
 * @param disabled @type Boolean
 */
const Input = ({ name, type, color = "stone", value, update, size, required, disabled }) => {
    return ( 
        <div className={`relative group ${size}`}>
            <label htmlFor={name.toLowerCase()} className={`absolute ease-in duration-150 px-1 left-2 group-focus-within:-top-2 top-2 group-focus-within:text-xs text-sm group-focus-within:bg-white text-${color}-400`}>{name}</label>
            <input name={name.toLowerCase()} type={type} value={value} onChange={(e) => update(e.target.value)} className={`rounded border w-full p-2 pl-3 focus:outline-none text-sm border-${color}-400`} autoComplete="off" required={required} disabled={disabled}/>
        </div>
    );
}
 
export default Input;