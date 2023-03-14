import Icon from "./Icon"
import Button from "./Button"

const defaultMessage = "This is an irreversible action. Caution is needed when performing a one-time operation. Make sure that this action is necessary and will not regret afterwards."

/**
 * Global Popup Confirmation Component
 * @param icon @type String - Name of icon (from Material Symbols)
 * @param theme @type String - Tailwind `color` Specification
 * @param title @type String - Popup Title
 * @param message @type String - Explanatory Message
 * @param success @type String - Success word
 * @param cancel @type String - Cancel word
 * @param close @type Function - React `setState` method signature
 * @param status @type Function - React `setState` method signature
 */
const Popup = ({ icon = "check", theme, title = "Confirm Action", message = defaultMessage, success = "Confirm", cancel = "Cancel", open, status }) => {

    const resolve = (state) => { status(state); open(false) }

    return (<>
        <div className="absolute w-full h-full top-0 left-0 bg-black/75"></div>
        <div className="absolute w-1/5 h-fit top-1/2 left-1/2 p-5 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg border">
            <div className={`flex justify-center items-center rounded-full w-20 h-20 shadow-inner m-auto bg-${theme}-300 text-${theme}-500`}>
                <Icon name={icon}/>
            </div>
            <div className="text-xl font-bold m-auto w-fit my-5 uppercase">{title}</div>
            <hr className={`border border-${theme}-300`}/>
            <div className="text-center my-5 text-sm text-slate-400">
                {message}
            </div><br/>
            <div className="flex space-x-4 w-fit m-auto">
                <Button event={() => resolve(true)} name={success} color={theme}/>
                <Button event={() => resolve(false)} name={cancel} outline/>
            </div>
        </div>
    </>)
}

export default Popup