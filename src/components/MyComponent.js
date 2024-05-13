import React from "react";
import AddUserInfor from "./AddUserInfor.js"
import DisplayInfor from "./DisplayInfor.js";
class MyComponent extends React.Component {
    state = {
        listUsers: [
            { id: 1, name: "Truong", age: '20' },
            { id: 2, name: "Pham Xuan Truong", age: '10' },
            { id: 3, name: "PXT", age: '18' },
            { id: 4, name: "Tom", age: '28' },
            { id: 5, name: "Truong Pham", age: '35' },
        ],
    }
    handleAddNewUser = (objUser) => {

        // const listUsersNew = this.state.listUsers;
        // listUsersNew.unshift(objUser);
        // this.setState({ listUsers: listUsersNew });
        this.setState({
            listUsers: [objUser, ...this.state.listUsers]
        })
    }
    //jsx
    render() {

        return (
            <div>
                <AddUserInfor handleAddNewUser={this.handleAddNewUser} />
                <DisplayInfor listUsers={this.state.listUsers} />

            </div>

        );
    }
}
export default MyComponent;