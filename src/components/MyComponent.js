import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor.js"
import DisplayInfor from "./DisplayInfor.js";
// class MyComponent extends React.Component {
//     state = {
//         listUsers: [
//             { id: 1, name: "Truong", age: '20' },
//             { id: 2, name: "Pham Xuan Truong", age: '10' },
//             { id: 3, name: "PXT", age: '18' },
//             { id: 4, name: "Tom", age: '28' },
//             { id: 5, name: "Truong Pham", age: '35' },
//         ],
//     }
//     handleAddNewUser = (objUser) => {

//         // const listUsersNew = this.state.listUsers;
//         // listUsersNew.unshift(objUser);
//         // this.setState({ listUsers: listUsersNew });
//         this.setState({
//             listUsers: [objUser, ...this.state.listUsers]
//         })
//     }
//     handleDeleteUser = (userId) => {
//         let listUsersClone = this.state.listUsers;
//         listUsersClone = listUsersClone.filter(item => item.id !== userId)
//         this.setState({ listUsers: listUsersClone })
//     }

//     // this.setState(prevState => ({
//     //     listUsers: prevState.listUsers.filter(item => item.id !== userId)
//     //   }));


//     //jsx
//     render() {

//         return (
//             <div>
//                 <AddUserInfor
//                     handleAddNewUser={this.handleAddNewUser}

//                 />
//                 <DisplayInfor
//                     listUsers={this.state.listUsers}
//                     handleDeleteUser={this.handleDeleteUser}
//                 />

//             </div>

//         );
//     }
// }
// export default MyComponent;

const MyComponent = () => {

    const [listUsers, setListUsers] = useState([
        { id: 1, name: "Truong", age: '20' },
        { id: 2, name: "Pham Xuan Truong", age: '10' },
        { id: 3, name: "PXT", age: '18' },
        { id: 4, name: "Tom", age: '28' },
        { id: 5, name: "Truong Pham", age: '35' },
    ]);

    const handleAddNewUser = (objUser) => {
        setListUsers([objUser, ...listUsers]);
    }
    const handleDeleteUser = (objId) => {
        setListUsers(listUsersClone => listUsersClone.filter(item => item.id !== objId))
    }
    return (
        <div>
            <AddUserInfor handleAddNewUser={handleAddNewUser} />
            <DisplayInfor listUsers={listUsers} handleDeleteUser={handleDeleteUser} />

        </div>

    );

}

export default MyComponent;


// JSON.stringify --> convert obj->string