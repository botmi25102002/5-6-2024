import ReactPaginate from "react-paginate";
import { useState } from "react";


const TableUserWithPaginate = (props) => {
    const { listUser, handleClickBtnUpdate, handleClickViewDataUser, handleClickBtnDelete, pageCount } = props;

    const handlePageClick = (event) => {
        props.fetchListUsersWithPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1);
        // console.log(`User requested page number ${+event.selected + 1}`);

    };
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <td scope="col">ID</td>
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
                                <th scope="row">{item.id}</th>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button onClick={() => handleClickViewDataUser(item)} className="btn btn-secondary">View</button>
                                    <button onClick={() => handleClickBtnUpdate(item)} className="btn btn-warning mx-3">Update</button>
                                    <button onClick={() => handleClickBtnDelete(item)} className="btn btn-danger">Delete</button>
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

            </table >
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Pre"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>

        </>
    )



}
export default TableUserWithPaginate;