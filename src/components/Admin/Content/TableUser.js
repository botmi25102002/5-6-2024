
const TableUser = (props) => {
    const { listUser, handleClickBtnUpdate, handleClickViewDataUser, handleClickBtnDelete } = props;

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
        </>
    )


}
export default TableUser;