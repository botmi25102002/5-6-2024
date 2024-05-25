import { useState } from 'react';
import ModalCreateUser from './ModalCreateUser.js';
import './ManageUser.scss';
import { CiSquarePlus } from "react-icons/ci";

const ManageUser = (props) => {
    const [show, setShow] = useState(false);

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
                    table user

                </div>
                <ModalCreateUser show={show} setShow={setShow} />
            </div>
        </div>
    )
}
export default ManageUser;