/**
 * Icon Component (from Material Symbols)
 * @param name @type String - Name of icon (from Material Symbols)
 * @param fill @type Boolean - Filled of Outlined
 */
const Icon = ({ name, fill }) => {
    return <span className={`material-symbols-outlined ${fill && "filled"}`}>{name}</span>
}
 
export default Icon;