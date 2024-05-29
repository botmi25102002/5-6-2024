import { useState, useEffect } from 'react';
import ModalCreateUser from './ModalCreateUser.js';
import './ManageUser.scss';
import { CiSquarePlus } from "react-icons/ci";
import TableUser from './TableUser.js';
import { getAllUsers } from "../../../services/apiServices";
import ModalUpdateUser from './ModalUpdateUser.js';
import ModalViewUser from './ModalViewUser.js';
import ModalDeleteUser from './ModalDeleteUser.js';

const ManageUser = (props) => {
    const [show, setShow] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        fetchListUsers();
    }, []);
    const fetchListUsers = async () => {
        const res = await getAllUsers();
        console.log(res);
        if (res && res.EC === 0) {
            setListUser(res.DT)
        }
    }
    const handleClickViewDataUser = (user) => {
        setShowModalViewUser(true);
        setDataUser(user)


    }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        // console.log(user);
        setDataUpdate(user)
    }
    const resetUpdateData = () => {
        setDataUpdate({});
    }
    const resetDataView = () => {
        setDataUser({})
    }
    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
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
                    <TableUser

                        listUser={listUser}
                        handleClickViewDataUser={handleClickViewDataUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                    />

                </div>
                <ModalCreateUser
                    show={show}
                    setShow={setShow}
                    fetchListUsers={fetchListUsers}
                />
                <ModalViewUser
                    showModalViewUser={showModalViewUser}
                    setShowModalViewUser={setShowModalViewUser}
                    dataUpdate={dataUser}
                    resetUpdateData={resetDataView}
                />

                <ModalUpdateUser
                    showModalUpdateUser={showModalUpdateUser}
                    setShowModalUpdateUser={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                />
                <ModalDeleteUser s
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                />
            </div>
        </div>
    )
}
export default ManageUser;