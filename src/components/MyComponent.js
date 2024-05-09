import React from "react";
import UserInfor from "./UserInfor.js"

class MyComponent extends React.Component {


    state = {
        name: 'Truong',
        address: '147 Yen Hoa',
        age: 21
    };
    handleClick = (event) => {
        // console.log('my name is ', this.state.name);
        // console.log(`i'm `, this.state.age);
        this.setState({
            name: 'Pham Xuan Truong',
            age: Math.floor((Math.random() * 100) + 1),
        })
    }
    handleOnChangeInput = (event) => {
        this.setState({
            name: event.target.value,
        })
    }
    handleOnSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
    }
    //jsx
    render() {
        return (
            <UserInfor />
        );
    }
}
export default MyComponent;