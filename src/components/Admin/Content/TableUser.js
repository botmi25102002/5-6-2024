import { useState, useEffect } from "react";
import { getAllUsers } from "../../../services/apiServices";

const TableUser = (props) => {


    const [listUser, setListUser] = useState([

    ]);
    useEffect(() => {
        fetchListUsers();
    }, []);
    const fetchListUsers = async () => {
        let res = await getAllUsers();
        console.log(res);
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <td scope="col">No</td>
                        <td scope="col">UserName</td>
                        <td scope="col">Email</td>
                        <td scope="col">Role</td>
                        <td scope="col">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((item, index) => {
                        return (
                            <tr key={`table-users-${index}`}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className="btn btn-secondary">View</button>
                                    <button className="btn btn-warning mx-3">Update</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>)
                    })}

                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>
                                Not found data
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )


}
export default TableUser;