import Dropdown from "../../../utilities/Dropdown";
import { useState } from "react";
import Icon from "../../../utilities/Icon";
import Upload from "../../../utilities/Upload";
import Download from "../../../utilities/Download";

const Branch = [ "ALL", "CIVIL", "MECH", "ECE", "EEE", "EIE", "CSE", "IT", "IBT" ];
const EmploymentType = ["ALL", "Full-Time", "Part-Time"];

const FacutlyForm = ({ setOpen }) => {

    const [branch, setBranch] = useState("");
    const [batch, setBatch] = useState("");
    const [register, setRegister] = useState("");
    const [email, setEmail] = useState("");
    const [submit, setSubmit] = useState(false);

    return (
        <div className="absolute w-fit bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
            className="absolute text-slate-400 hover:text-red-500 top-4 right-2"
            onClick={() => setOpen(false)}
        >
            <Icon name="close" />
        </div>
        <div className="text-xl font-bold w-fit m-auto my-4">
            Add Facutly 
        </div>
        <hr />
        <div className="flex space-x-4 justify-center w-fit m-4">
            <Input
            name="Reg. No."
            type="text"
            color="blue"
            value={register}
            update={setRegister}
            />
            <Input
            name="Branch"
            type="number"
            color="blue"
            value={branch}
            update={setBranch}
            />
        </div>
        <div className="flex space-x-4 justify-center w-fit m-4">
            <Input
            name="Batch"
            type="number"
            color="blue"
            value={batch}
            update={setBatch}
            />
            <Input
            name="Email"
            type="email"
            color="blue"
            value={email}
            update={setEmail}
            />
        </div>
        
        <hr />
        <div
            onClick={() => setSubmit(true)}
            className={`py-2 px-2 rounded-md cursor-pointer font-semibold text-sm m-4 text-center items-center text-white ${
            submit ? "bg-slate-400" : "bg-blue-500"
            }`}
            disabled={submit ? "disabled" : ""}
        >
            Submit
        </div>
        </div>
    );
    };


const Roles = () => {

    const [file, setFile] = useState(null);

    function handleClick(e) {
        for (let id in data) {
        if (data[id]._id === e._id) {
            data[id] = e;
        }
        }
    }

    const CustomTable = ({ data, editable, update, omit = ["_id"] }) => {
        const omitFields = (field) => !omit.some((item) => item == field);

        const fields =
        data && data.length > 0
            ? Object.keys(data[0]).filter((key) => omitFields(key))
            : [];

        const [edit, setEdit] = useState(data.map((item) => 0));
        const [values, setValues] = useState({});
        const [checked, setChecked] = useState({});

        const mutate = (index, state, reset = true) => {
        for (let idx = 0; idx < edit.length; idx++) edit[idx] = reset ? 0 : 2;
        edit[index] = state;
        if (state == 1) setValues({ ...data[index] });
        if (state == 1) setChecked({ ...data[index] });
        setEdit([...edit]);
        };

        const Editor = ({ index, open }) => {
        return open != 1 ? (
            <td
            onClick={() => open == 0 && mutate(index, 1, false)}
            className={`px-4 py-2 text-center text-gray-${
                open == 0 ? "100" : "500"
            } ${open == 0 && "hover:text-blue-500"} whitespace-nowrap`}
            >
            <Icon name="edit" />
            </td>
        ) : (
            open == 1 && (
            <td className="flex space-x-2 px-4 py-2 text-center text-gray-500 whitespace-nowrap">
                <div onClick={() => mutate(index, 0)} className="text-red-500">
                <Icon name="close" />
                </div>
                <div
                onClick={() => {
                    mutate(index, 0);
                    update({ ...values });
                }}
                className="text-blue-500"
                >
                <Icon name="done" />
                </div>
            </td>
            )
        );
        };

        const setSize = (value) => {
        let len = 0;
        if (typeof value == typeof "") len = value.length > 0 ? value.length : 1;
        else len = value.toString().length > 0 ? value.toString().length : 1;
        return len.toString();
        };

        return (
        data &&
        (data.length > 0 ? (
            <div className="max-h-[80%] overflow-auto overscroll-none mr-2 rounded-lg  ">
            <table className="table-auto divide-y divide-gray-200 text-sm border rounded-tr-lg shadow-md rounded-t-lg rounded-b-lg text-left">
                <thead className="bg-gray-100 text-xs uppercase">
                <tr>
                    <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold first:rounded-tl-lg uppercase">
                    sno
                    </th>
                    {fields.map((heading, index) => (
                    <th
                        className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase"
                        key={index}
                    >
                        {heading}
                    </th>
                    ))}
                    {editable && (
                    <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold rounded-tr-lg uppercase">
                        Action
                    </th>
                    )}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {data.map((row, ridx) => (
                    <tr
                    className={`px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap group hover:bg-sky-50`}
                    key={ridx}
                    >
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {ridx + 1}
                    </td>
                    {fields.map((key, kidx) =>
                        edit[ridx] != 1 ? (
                        <td
                            className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                            key={kidx}
                        >
                            {typeof row[key] == typeof ""
                            ? row[key].charAt(0).toUpperCase() + row[key].slice(1)
                            : row[key]}
                        </td>
                        ) : (
                        <td
                            className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                            key={kidx}
                        >
                            {key != "Faculty ID" && key != "Name" ? (
                            <input
                                type="checkbox"
                                name={key}
                                value={checked[key]}
                                checked={values[key]}
                                size={setSize(checked[key])}
                                onClick={(e) => {
                                checked[key] === ""
                                    ? (values[key] = (
                                        <span class="material-symbols-outlined">
                                        done
                                        </span>
                                    ))
                                    : (values[key] = "");

                                setChecked({ ...checked });
                                setValues({ ...values });
                                checked[key] != ""
                                    ? (checked[key] = "")
                                    : checked[key];
                                }}
                                className="group-hover:bg-sky-50 outline-none"
                            />
                            ) : (
                            <input
                                type="text"
                                name={key}
                                size={setSize(values[key])}
                                value={values[key]}
                                onChange={(e) => {
                                values[key] = e.target.value;
                                setValues({ ...values });
                                }}
                                className="group-hover:bg-sky-50 outline-none"
                            />
                            )}
                        </td>
                        )
                    )}
                    {editable && <Editor index={ridx} open={edit[ridx]} />}
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        ) : (
            <div>No Data Here...</div>
        ))
        );
    };


    function handleBranch(e) {
        setData(data.filter((data) => data.Department === e));
    }

    function handleType(e) {
        setData(data.filter((data) => data["Employment Type"] === e));
    }

    const [data, setData] = useState([
    {
        _id: 1,
        "Faculty ID": "191918",
        Name: "Naren Kumar",
        HOD: <span class="material-symbols-outlined">done</span>,
        PC: "",
        TTC: "",
        CFA: "",
        FA: "",
        CI: <span class="material-symbols-outlined ">done</span>,
        
        },
        {
        _id: 2,
        "Faculty ID": "191812",
        Name: "Naren Kumar",
        HOD: <span class="material-symbols-outlined  ">done</span>,
        PC: "",
        TTC: "",
        CFA: "",
        FA: "",
        CI: <span class="material-symbols-outlined">done</span>,
        
        },
        {
        _id: 3,
        "Faculty ID": "191812",
        Name: "Naren Kumar",
        HOD: "",
        PC: "",
        TTC: "",
        CFA: "",
        FA: "",
        CI: <span class="material-symbols-outlined">done</span>,
        },
        {
        _id: 4,
        "Faculty ID": "191812",
        Name: "Naren Kumar",
        HOD: <span class="material-symbols-outlined">done</span>,
        PC: "",
        TTC: "",
        CFA: "",
        FA: "",
        CI: "",
        },
        {
        _id: 5,
        "Faculty ID": "191812",
        Name: "Naren Kumar",
        HOD: "",
        PC: "",
        TTC: <span class="material-symbols-outlined">done</span>,
        CFA: "",
        FA: <span class="material-symbols-outlined">done</span>,
        CI: "",
        },
        {
        _id: 6,
        "Faculty ID": "191812",
        Name: "Naren Kumar",
        HOD: <span class="material-symbols-outlined">done</span>,
        PC: <span class="material-symbols-outlined">done</span>,
        TTC: "",
        CFA: "",
        FA: "",
        CI: <span class="material-symbols-outlined">done</span>,
        },
            ]);
    return (
        <>
        <div className="flex p-4  space-x-12">
            <div className="">
            <Dropdown
                name="Branch"
                data={Branch}
                update={handleBranch}
                special={false}
            ></Dropdown>
            </div>
            <div className>
            <Dropdown
                name="Employment Type"
                data={EmploymentType}
                update={handleType}
                special={false}
            ></Dropdown>
            </div>
        </div>
        <div className="relative pl-4 pt-3">
            <CustomTable editable data={data} update={handleClick}></CustomTable>
        </div>
        <div className="m-4 flex ">
            <Upload file={file} setFile={setFile} />
            <Download
            blob={
                "https://file-examples.com/wp-content/uploads/2018/04/file_example_AVI_480_750kB.avi"
            }
            ></Download>
        </div>
        </>
    );
};

export default Roles;