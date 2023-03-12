import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from '../../../utilities/Dropdown';
import Search from '../../../utilities/Search';

const Students = () => {
  
    let omit = [ '_id', 'lastName', 'fullName', 'isCredentialCreated' ];
    const omitFields = (field) => !omit.some((item) => item == field);

    const [ batch, setBatch ] = useState(2018);
    const [ branch, setBranch ] = useState('ALL');
    const [ active, setActive ] = useState('true');
    const [ allChecked, setAllChecked ] = useState();

    const [ filter, setFilter ] = useState(null);
    const [ fields, setFields ] = useState(null);
    const [ search, setSearch ] = useState('');

    const [ data, setData ] = useState(null);
    const [ editedDoc, setEditedDoc ] = useState({});

    useEffect(() => {
        
        axios.get(process.env.NEXT_PUBLIC_URL + '/admin/users/students', { params: { batch } })
            .then((response) => {
                let result = response.data, fields = [];
                if(result.length > 0)
                    fields = Object.keys(result[0]).filter((key) => omitFields(key));
                setFilter(fields[0]);
                setFields(fields);
                setData([...result]);
            }).catch((err) => console.log(err.message));
  
    }, [batch]);

    const filterSearch = (doc) =>
        doc[filter.charAt(0).toLowerCase() + filter.slice(1)]
            .toString()
            .toLowerCase()
            .includes(search.toString().toLowerCase());

    const filterCheck = (doc) =>
        doc.batch == batch &&
        (branch == 'ALL' ? true : doc.branch == branch) &&
        active == 'false' &&
        filterSearch(doc);

    const CustomTable = ({ data, editable, update, omit = ['_id'], indexed }) => {
    
        const omitFields = (field) => !omit.some((item) => item == field);

        const fields =
            data && data.length > 0
                ? Object.keys(data[0]).filter((key) => omitFields(key))
                : [];

        const [ edit, setEdit ] = useState(data.map((item) => 0));
        const [ values, setValues ] = useState({});

        const mutate = (index, state, reset = true) => {
            
            for (let idx = 0; idx < edit.length; idx++) 
                edit[idx] = reset ? 0 : 2;

            edit[index] = state;
            if (state == 1) 
                setValues({ ...data[index] });

            setEdit([...edit]);
        };

        const Editor = ({ index, open }) => {
      
            return open != 1 ? (
                <td onClick={() => open == 0 && mutate(index, 1, false)} className={`px-4 py-2 text-center text-gray-${open == 0 ? '100' : '500'} ${open == 0 && 'hover:text-blue-500'} whitespace-nowrap`}>
                   <Icon name="edit" />
                </td>) : ( open == 1 && (
                <td className="flex space-x-2 px-4 py-2 text-center text-gray-500 whitespace-nowrap">
                    <div onClick={() => mutate(index, 0)} className="text-red-500">
                        <Icon name="close"/>
                    </div>
                    <div onClick={() => { mutate(index, 0); update({ ...values }); }} className="text-blue-500">
                        <Icon name="done" />
                    </div>
                </td>
            ))
        }

        return ( data &&
            (data.length > 0 ? (
            <div className="max-w-min max-h-[80%] overflow-auto overscroll-none mr-2 rounded-b-lg shadow-md align-middle border rounded-t-lg">
                <table className="table-auto divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-gray-100 text-xs uppercase">
                        <tr>
                        {
                            indexed &&
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold first:rounded-tl-lg uppercase">sno</th>
                        }
                        {
                            fields.map((heading, index) =>
                            heading !== 'isActive' ? (
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase" key={index}>
                                { heading }
                            </th>) : (
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold uppercase flex" key={index}>
                                <span className="flex mr-2">ISACTIVE</span>
                                <input type="checkbox" className="group-hover:bg-sky-50 outline-none flex" onClick={console.log('checked')}/>
                            </th>))
                        }
                        {
                            editable && (
                            <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold rounded-tr-lg uppercase">
                                Action
                            </th>)
                        }
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {
                        data.map((row, ridx) => (
                        <tr className={`px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap group hover:bg-sky-50`} key={ridx}>
                        {
                            indexed && (
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {ridx + 1}
                            </td>)
                        }
                        {
                            fields.map((key, kidx) => key === 'isActive' ? (
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap flex justify-center align-middle" key={kidx}>
                                <input type="checkbox" className="group-hover:bg-sky-50 outline-none" onClick={console.log('checked')}/>
                            </td> ) : (
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={kidx}>
                            {   
                                typeof row[key] == typeof ''
                                ? row[key].charAt(0).toUpperCase() + row[key].slice(1)
                                : row[key]
                            }
                            </td>))
                        }
                        { editable && <Editor index={ridx} open={edit[ridx]} /> }
                        </tr>))
                    }
                    </tbody>
                </table>
            </div> ) : ( <div>No Data Here...</div>)))
    }

    return data ? <>
        <div className="mr-2 flex justify-between">
            <div className="flex space-x-6">
                <Dropdown name="Batch" update={setBatch} data={[2018, 2019, 2020, 2021, 2022]}/>
                <Dropdown name="Branch" update={setBranch} data={[ 'ALL', 'CIVIL', 'MECH', 'ECE', 'EEE', 'EIE', 'CSE', 'IT', 'IBT' ]}/>
                <Dropdown name="Active" update={setActive} data={[ 'true', 'false' ]}/>
            </div>
            { data.length > 0 && <Search options={fields} filter={filter} setFilter={setFilter} search={search} update={setSearch}/> }
        </div><br/>
        <CustomTable data={data.filter((doc) => filterCheck(doc))} update={setEditedDoc} omit={omit}/><br/>
    </> : <div>Loading</div>
}

export default Students;
