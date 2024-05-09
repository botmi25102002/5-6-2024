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
            <div>
                My name is {this.state.name}
                My address is {this.state.address} and my age is {this.state.age} years old
                <button onClick={(event) => { this.handleClick() }}>Click</button>
                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <input
                        onChange={(event) => { this.handleOnChangeInput(event) }}
                        type="text"
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
export default MyComponent;