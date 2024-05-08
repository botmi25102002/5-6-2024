import React from "react";


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
    //jsx
    render() {
        return (
            <div>
                My name is {this.state.name}
                My address is {this.state.address} and my age is {this.state.age} years old
                <button onClick={(event) => { this.handleClick() }}>Click</button>
            </div>
        );
    }
}
export default MyComponent;