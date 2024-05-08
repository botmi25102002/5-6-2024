import React from "react";


class MyComponent extends React.Component {


    state = {
        name: 'Truong',
        address: '147 Yen Hoa',
        age: 21
    };
    //jsx
    render() {
        return (
            <div>
                My name is {this.state.name}
                My address is {this.state.address} and my age is {this.state.age} years old
            </div>
        );
    }
}
export default MyComponent;