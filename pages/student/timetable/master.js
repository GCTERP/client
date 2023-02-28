import Dropdown from "../../../utilities/Dropdown"
import Table from "../../../utilities/Table"
import tabledata from "../../../test/timeTableTest"
import Calendar from "../../../utilities/Calendar"
import Button from "../../../utilities/Button"

const Master = () => {
    const data = tabledata
    const fields = data && data[0] ? Object.keys(data[0]) : [];

    const selectedBranch = (data) => {
        setBranch(data);
    }

    return (
        <>
        <div className="flex">
            <div className="w-9/12">
                
                <div className="flex pt-6 flex-wrap">
                    <div className="relative p-1.5 w-fit inline-block align-middle">
                        <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border w-10/12">
                            <table className="max-w-none min-w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
                                <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                                    <tr>
                                        {
                                            fields.map((heading, index) => (
                                                <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider" key={index}>{heading}</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {
                                        data.map((row, index) => ( 
                                        <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                                            {
                                                fields.map((key, index) => (
                                                    <td className={row[key] === "18IPC701" ? "px-6 py-4 text-sm text-gray-800 whitespace-nowrap bg-green-300" : "px-6 py-4 text-sm text-gray-800 whitespace-nowrap "} key={index}>{row[key]}</td>
                                                 ))
                                            }

                                        </tr>))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-3/12 border-l">
                <div className="ml-6 flex flex-col h-screen">
                    <h4 className="pb-4">Calendar</h4>
                    <Calendar className="ml-2 flex-1" />
                    <div className="flex-6/12 mt-4" >
                    <Dropdown name ={"Select Course Code"} data = {['18IPC701', '18IPS702']} special ={false} />                
                    </div>
                    <div className="flex-6/12 mt-4">
                        <Dropdown name ={"Select Course Name"} data = {['Professional Ethics', 'Data Structures']} special ={false} />                
                    </div>
                    <div className="flex-1 mt-4">
                        <Button color={'blue'} name={"Mark Attendance"} icon={'edit'} outline={false} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Master