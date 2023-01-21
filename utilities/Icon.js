const Icon = ({ name, fill }) => {
    return <span className={`material-symbols-outlined ${fill && "filled"}`}>{name}</span>

}
 
export default Icon;