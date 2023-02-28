import Dropdown from "../../../utilities/Dropdown";
import Table from "../../../utilities/Table";
import Button from "../../../utilities/Button";
import { useState, useEffect } from "react";
import Icon from "../../../utilities/Icon";
import Input from "../../../utilities/Input";



const data = [
  {
    "_id": 1,
    "Register Number": 1934825,
    Branch: "IT",
    Batch: "2019",
    Email: "nare.1918125@gct.acin",
    "Current Faculty": 1
  },
  { "_id": 2,
    "Register Number": 1934825,
    Branch: "IT",
    Batch: "2019",
    Email: "nare.1918125@gct.acin",
    "Current Faculty": 0
  },
  {
    "_id": 3,
    "Register Number": 1934825,
    Branch: "IT",
    Batch: "2019",
    Email: "nare.1918125@gct.acin",
    "Current Faculty": 1
  },
];

const FacutlyForm = ({ setOpen }) => {
  const [branch, setBranch] = useState("");
  const [batch, setBatch] = useState("");
  const [register, setRegister] = useState("");
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);

    // useEffect(() => {
    //   if (submit) {
    //     let data = { branch, launchDate: launch, code, name, key, capacity: cap };
    //     axios
    //       .post("http://192.168.146.175:5000/admin/branch/manage", data)
    //       .then((response) => {
    //         setSubmit(false);
    //         setOpen(false);
    //       })
    //       .catch((err) => console.log(err.message));
    //   }
    // }, [submit]);

  useEffect(() => {
    if (submit) {
      let temp = {
        "Register Number": register,
        Branch: branch,
        Batch: batch,
        Email: email,
      };
      data.push(temp);
      console.log(data);
    }
  }, [submit]);

  return (
    <div className="absolute w-fit bg-white rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div
        className="absolute text-slate-400 hover:text-red-500 top-4 right-2"
        onClick={() => setOpen(false)}
      >
        <Icon name="close" />
      </div>
      <div className="text-xl font-bold w-fit m-auto my-4">Add Facutly</div>
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
          type="text"
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

const Faculty = () => {
  const [open, setOpen] = useState(false);
function handleClick(e) {
  for (let id in data) {
    if (data[id]._id === e._id) {
      data[id] = e;
    }
  }
}
  return data ? (
    <>
      <div className="flex space-x-10 p-5">
        <Dropdown name={"Regulation"} data={[2018, 2019, 2020]}></Dropdown>
        <Dropdown
          name={"Branch"}
          data={[
            "ALL",
            "CIVIL",
            "MECH",
            "ECE",
            "EEE",
            "EIE",
            "CSE",
            "IT",
            "IBT",
          ]}
        ></Dropdown>
      </div>
      <div className="p-5 ">
        <Table editable data={data} update={handleClick} indexed></Table>
      </div>
      <div className="p-5">
        <Button
          name="Update"
          icon="done"
          color="blue"
          event={() => setOpen(true)}
        />
      </div>
      {open && <FacutlyForm setOpen={setOpen} />}
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Faculty;