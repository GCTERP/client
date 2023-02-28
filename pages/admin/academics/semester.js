import Icon from "../../../utilities/Icon";
import { numberToRoman } from "../../../utilities/helpers";
import Input from "../../../utilities/Input";
import Button from "../../../utilities/Button";
import { useState, useEffect } from "react";

let batchData = [
  { batch: 2024, sem: 1, status: 0 },
  { batch: 2023, sem: 3, status: 1 },
  { batch: 2022, sem: 5, status: 2 },
  { batch: 2021, sem: 7, status: 3 },
];

var semesters = [1, 2, 3,];


const CreateForm = ({ setOpen }) => {
  const [sem, setSem] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [batch, setBatch] = useState("");
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit) {
      let data = { endDate, startDate, sem, status, batch };
      batchData.push(data);
    }
  }, [submit]);

  //   useEffect(() => {
  //     if (submit) {
  //       let data = { branch, launchDate: launch, code, name, key, capacity: cap };
  //       axios
  //         .post("http://192.168.146.175:5000/admin/branch/manage", data)
  //         .then((response) => {
  //           setSubmit(false);
  //           setOpen(false);
  //         })
  //         .catch((err) => console.log(err.message));
  //     }
  //   }, [submit]);

  return (
    <div className="absolute z-10 w-fit bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div
        className="absolute text-slate-400 hover:text-red-500 top-4 right-2"
        onClick={() => setOpen(false)}
      >
        <Icon name="close" />
      </div>
      <div className="text-xl font-bold w-fit m-auto my-4">Add Batch</div>
      <hr />
      <div className="flex space-x-4 justify-center w-fit m-4">
        <Input
          name="Semester"
          type="number"
          color="blue"
          value={sem}
          update={setSem}
        />
        <Input
          name="Batch"
          type="number"
          color="blue"
          value={batch}
          update={setBatch}
        />
        <Input
          name="Status"
          type="number"
          color="blue"
          value={status}
          update={setStatus}
        />
      </div>
      <div className="flex items-center space-x-4 justify-center w-fit mx-auto m-5">
        <label className="text-sm">Start Date</label>
        <Input
          name=""
          type="date"
          color="blue"
          value={startDate}
          update={setStartDate}
        />
      </div>
      <div className="flex items-center space-x-4 justify-center w-fit mx-auto m-5">
        <label className="text-sm ">End Date</label>
        <Input
          name=""
          type="date"
          color="blue"
          value={endDate}
          update={setEndDate}
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

const Batch = ({ batch, sem = 1, status = 0, days = 1 }) => {
  return (
    <div
      className={`w-fit p-2 border rounded-lg cursor-pointer ${
        status == 1 && "border-red-500"
      } hover:bg-${status == 1 ? "red" : "slate"}-50`}
    >
      <div className="flex justify-between mb-4">
        <div className="flex text-slate-400 text-sm">Batch</div>
        <div className="text-sm">{batch + " - " + (parseInt(batch) + 4)}</div>
      </div>
      <div className="flex justify-between space-x-4">
        <div>
          <span className="text-slate-400 text-xs">Semester&nbsp;</span>
          <span className="text-xs">{numberToRoman(sem)}</span>
        </div>
        <div
          className={`text-${
            status == 0 ? "blue" : status == 1 ? "red" : "slate"
          }-500 text-xs pt-1`}
        >
          {status == 0
            ? "Ongoing"
            : status == 1
            ? "Add Sem"
            : status == 2
            ? "Starts"
            : "Ends"}
          {status > 1 && " in " + days + (days > 1 ? " days" : " day")}
        </div>
      </div>
    </div>
  );
};

const BatchHolder = () => {
  const [create, setCreate] = useState(0);
  return (
    <>
      <div className="flex space-x-4 p-2">
        <div className="w-[160px] border border-dashed rounded-lg cursor-pointer hover:bg-slate-50">
          <div
            onClick={() => setCreate(1)}
            className="flex h-full justify-center items-center space-x-2 text-slate-400"
          >
            <Icon name="add" />
            Create
          </div>
        </div>
        {batchData.map((doc, idx) => (
          <Batch
            key={idx}
            batch={doc.batch}
            sem={doc.sem}
            status={doc.status}
          />
        ))}
      </div>
      <div>{create && <CreateForm setOpen={setCreate} />}</div>
    </>
  );
};

const Cutter = ({ title }) => {
  return (
    <div className="flex ml-2 space-x-2 justify-center items-center">
      <div className="text-sm text-slate-500 font-bold">{title}</div>
      <div className="h-[1px] mt-1 bg-slate-200 w-full"></div>
    </div>
  );
};

const Semester = () => {
  const [addSem, setAddSem] = useState(false);

  useEffect(() => {
    if (addSem && semesters[semesters.length-1]<8) {
      semesters.push(semesters[semesters.length - 1] + 1);
      setAddSem(false);
    }
  }, [addSem]);

  return (
    <>
      <BatchHolder />
      <div className="text-dark font-bold mt-2 ml-2">Semester</div>
      <div className="flex space-x-5 p-2 my-3">
        {semesters.map((sem) => (
          <div className="border px-3 py-2 w-12 text-center rounded cursor-pointer hover:bg-slate-50">
            {numberToRoman(sem)}
          </div>
        ))}
        <div
          onClick={() => setAddSem(true)}
          className="border px-3 pt-2 w-12 rounded text-white bg-blue-500 cursor-pointer hover:bg-blue-600"
        >
          <Icon name="add" />
        </div>
      </div>
      <Cutter title="Timeline" />
      <div className="p-10  z-0">
        <span className="space-x-4 flex items-center">
          <span className="text-gray-400 text-sm ">Start Date</span>
          <span>
            <Input color={"gray"} name="Date" />
          </span>
          <span className="text-gray-400 text-sm ">Working Days</span>
          <span>
            <Input color={"gray"} name="Day(s)" />
          </span>
          <span className="text-gray-400 text-sm ">End Date</span>
          <span>
            <Input color={"gray"} name="Date" />
          </span>
        </span>
      </div>
      <Cutter title="Internals" />
      <div className="p-10 grid grid-cols-5 ">
        <div className=" col-span-1  space-y-14 my-auto">
          <p className="text-gray-400 text-sm">Unit Test</p>
          <p className="text-gray-400 text-sm ">Assignment</p>
          <p className="text-gray-400 text-sm ">Tutorial</p>
        </div>
        <div className="col-span-1 space-y-10">
          <Input type="number" color={"gray"} size="w-56" name="count" />
          <Input type="number" color={"gray"} size="w-56" name="count" />
          <Input type="number" color={"gray"} size="w-56" name="count" />
        </div>
        <div className="col-span-1 space-y-10">
          <Input type="number" color={"gray"} size="w-56" name="Total" />
          <Input type="number" color={"gray"} size="w-56" name="Total" />
          <Input type="number" color={"gray"} size="w-56" name="Total" />
        </div>
        <div className="col-span-1 space-y-10">
          <Input type="number" color={"gray"} size="w-56" name="Contribution" />
          <Input type="number" color={"gray"} size="w-56" name="Contribution" />
          <Input type="number" color={"gray"} size="w-56" name="Contribution" />
        </div>
        <div className=" col-span-1 space-y-10">
          <Input type="number" color={"gray"} size="w-56" name="Duration" />
        </div>
      </div>
      <div className="ml-10 right-0">
        <Button name="Save" color="blue"></Button>
      </div>
    </>
  );
};

export default Semester;