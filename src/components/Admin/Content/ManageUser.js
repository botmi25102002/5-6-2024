import { useState, useEffect } from 'react';
import ModalCreateUser from './ModalCreateUser.js';
import './ManageUser.scss';
import { CiSquarePlus } from "react-icons/ci";
import TableUser from './TableUser.js';
import { getAllUsers, getUserPaginate } from "../../../services/apiServices";
import ModalUpdateUser from './ModalUpdateUser.js';
import ModalViewUser from './ModalViewUser.js';
import ModalDeleteUser from './ModalDeleteUser.js';
import TableUserWithPaginate from './TableUserWithPaginate.js';

const ManageUser = (props) => {
    const LIMIT_USER = 5;
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listUser, setListUser] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    useEffect(() => {
        fetchListUsersWithPaginate(currentPage);
    }, []);
    const fetchListUsers = async () => {
        const res = await getAllUsers();

        if (res && res.EC === 0) {
            setListUser(res.DT)
        }
    }
    const fetchListUsersWithPaginate = async (page) => {
        const res = await getUserPaginate(page, LIMIT_USER);
        if (res && res.EC === 0) {
            console.log(res.DT);
            setListUser(res.DT.users)
            setPageCount(res.DT.totalPages);
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
                    {/* <TableUser

                        listUser={listUser}
                        handleClickViewDataUser={handleClickViewDataUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserWithPaginate
                        listUser={listUser}
                        handleClickViewDataUser={handleClickViewDataUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                </div>
                <ModalCreateUser
                    show={show}
                    setShow={setShow}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser
                    showModalViewUser={showModalViewUser}
                    setShowModalViewUser={setShowModalViewUser}
                    dataUpdate={dataUser}
                    resetUpdateData={resetDataView}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalUpdateUser
                    showModalUpdateUser={showModalUpdateUser}
                    setShowModalUpdateUser={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}
export default ManageUser;