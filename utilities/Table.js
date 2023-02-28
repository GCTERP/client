/**
 * Table UI Component
 * @param data @type [Object] - Any collection of Objects
 */
const Table = ({ data }) => {

    const fields = data && data[0] ? Object.keys(data[0]) : [];

    return (
        data &&
        <div className="relative p-1.5 w-fit inline-block align-middle">
            <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
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
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={index}>{row[key]}</td> ))
                                }
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;