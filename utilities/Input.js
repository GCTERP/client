const Input = ({ name, type, state, value, update, size, required, disabled }) => {
    return ( 
        <div className={`relative group ${size}`}>
            <label htmlFor="email" className={`absolute ease-in duration-150 px-1 left-2 group-focus-within:-top-2 top-2 group-focus-within:text-xs text-sm group-focus-within:bg-white text-${state}-400`}>{name}</label>
            <input name="email" type={type} value={value} onChange={(e) => update(e.target.value)} className={`rounded border w-full p-2 pl-3 focus:outline-none text-sm border-${state}-400`} autoComplete="off" required={required} disabled={disabled}/>
        </div>
    );
}
 
export default Input;