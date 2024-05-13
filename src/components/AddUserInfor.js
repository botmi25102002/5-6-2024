import React from "react";

class AddUserInfor extends React.Component {


    state = {
        name: '',
        address: '147 Yen Hoa',
        age: ""
    };
    handleClick = (event) => {
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
    handleOnChangeAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }
    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + "-random",
            name: this.state.name,
            age: this.state.age
        });
    }

    render() {
        return (
            <div>
                My name is {this.state.name}
                My address is {this.state.address} and my age is {this.state.age} years old
                <button onClick={(event) => { this.handleClick() }}>Click</button>
                <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
                    <label> Your name: </label>
                    <input
                        value={this.state.name}
                        onChange={(event) => { this.handleOnChangeInput(event) }}
                        type="text"
                    />
                    <label> Your age: </label>
                    <input
                        value={this.state.age}
                        onChange={(event) => { this.handleOnChangeAge(event) }}
                        type="text"
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
export default AddUserInfor;