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
            <label htmlFor={name.toLowerCase()} className={`absolute ease-in duration-150 px-1 left-2 group-focus-within:text-${color}-500 group-focus-within:font-bold group-focus-within:-top-2 top-2 group-focus-within:text-xs group-focus-within:bg-white text-sm ${value != "" && "-top-2 text-xs bg-white"}`}>{name}</label>
            <input name={name.toLowerCase()} type={type} value={value} onChange={(e) => update(e.target.value)} className={`rounded border group-focus-within:border-${color}-500 w-full p-2 pl-3 focus:outline-none text-sm`} autoComplete="off" required={required} disabled={disabled}/>
        </div>
    );
}
 
export default Input;