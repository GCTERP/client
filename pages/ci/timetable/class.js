import Button from "../../../utilities/Button"
import Table from "../../../utilities/Table"
import tableDateData from "../../../test/timeDataTest"

const Class = () => {
    return (
        <>
        <div className="flex justify-end m-2 mr-10">
            <div className="pr-10">
                <Button color={'blue'} name={"Swap Classes"} icon={'edit'} outline={true} />
            </div>

            <Button color={'blue'} name={"Extra Class"} icon={'edit'} outline={true} />
        </div>
        <div className="table m-10">
            <Table data={tableDateData} />
        </div>
        <div className="m-10">
            <Button color={'blue'} name={"View Full TimeTable"} icon={'edit'} outline={false} />
        </div>
        
        </>
    )
}

export default Class