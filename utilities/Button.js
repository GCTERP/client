import Icon from "../utilities/Icon.js"

/**
 * Create UI Buttons
 * @param color @type String - Color of the button
 * @param name @type String - name of the button
 * @param icon @type String - Icon name (from Material Symbols)
 * @param outline @type Boolean - Outlined or Filled
 * @param event @type Function - Any method signature
 */
const Button = ({ color, name, icon, outline, event }) => {
    return (
        <div onClick={event} className={`flex w-fit py-2 px-2 rounded-md cursor-pointer font-semibold text-sm items-center ${outline ? "text-" + color + "-500" : "text-white"} border ${outline ? "border" : "bg"}-${color}-500`}>
            { icon && <Icon name={icon}/> }
            <div className="px-1">{ name }</div>
        </div>
    )
}

export default Button