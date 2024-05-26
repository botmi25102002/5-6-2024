import { useState, useEffect } from 'react';
import ModalCreateUser from './ModalCreateUser.js';
import './ManageUser.scss';
import { CiSquarePlus } from "react-icons/ci";
import TableUser from './TableUser.js';
import { getAllUsers } from "../../../services/apiServices";


const ManageUser = (props) => {
    const [show, setShow] = useState(false);
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
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className='btn btn-primary' onClick={() => { setShow(true) }}>  <CiSquarePlus />Add New User</button>
                </div>
                <div className="table-users-container">
                    <TableUser listUser={listUser} />

                </div>
                <ModalCreateUser show={show} setShow={setShow} fetchListUsers={fetchListUsers} />
            </div>
        </div>
    )
}
export default ManageUser;