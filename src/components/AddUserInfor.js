import React, { useState } from "react";

// class AddUserInfor extends React.Component {


//     state = {
//         name: '',
//         address: '147 Yen Hoa',
//         age: ""
//     };
//     handleClick = (event) => {
//         this.setState({
//             name: 'Pham Xuan Truong',
//             age: Math.floor((Math.random() * 100) + 1),
//         })
//     }
//     handleOnChangeInput = (event) => {
//         this.setState({
//             name: event.target.value,
//         })
//     }
//     handleOnChangeAge = (event) => {
//         this.setState({
//             age: event.target.value
//         })
//     }
//     handleOnSubmit = (event) => {
//         event.preventDefault();
//         this.props.handleAddNewUser({
//             id: Math.floor((Math.random() * 100) + 1) + "-random",
//             name: this.state.name,
//             age: this.state.age
//         });
//     }

//     render() {
//         return (
//             <div>
//                 My name is {this.state.name}
//                 My address is {this.state.address} and my age is {this.state.age} years old
//                 <button onClick={(event) => { this.handleClick() }}>Click</button>
//                 <form onSubmit={(event) => { this.handleOnSubmit(event) }}>
//                     <label> Your name: </label>
//                     <input
//                         value={this.state.name}
//                         onChange={(event) => { this.handleOnChangeInput(event) }}
//                         type="text"
//                     />
//                     <label> Your age: </label>
//                     <input
//                         value={this.state.age}
//                         onChange={(event) => { this.handleOnChangeAge(event) }}
//                         type="text"
//                     />
//                     <button>Submit</button>
//                 </form>
//             </div>
//         );
//     }
// }
// export default AddUserInfor;


const AddUserInfor = (props) => {



    const [name, setName] = useState('');
    const [address, setAddress] = useState('147 Yen Hoa');
    const [age, setAge] = useState('')
    const handleClick = (event) => {
        setName('Pham Xuan Truong');
        setAge(Math.floor((Math.random() * 100) + 1));
    }
    const handleOnChangeInput = (event) => {

        setName(event.target.value)

    }
    const handleOnChangeAge = (event) => {

        setAge(event.target.value)

    }
    const handleOnSubmit = (event) => {
        event.preventDefault();
        props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + "-random",
            name: name,
            age: age
        });
        setName('')
        setAge('')
    }

    return (
        <div>
            My name is {name}
            My address is {address} and my age is {age} years old
            <button onClick={(event) => { handleClick() }}>Click</button>
            <form onSubmit={(event) => { handleOnSubmit(event) }}>
                <label> Your name: </label>
                <input
                    value={name}
                    onChange={(event) => { handleOnChangeInput(event) }}
                    type="text"
                />
                <label> Your age: </label>
                <input
                    value={age}
                    onChange={(event) => { handleOnChangeAge(event) }}
                    type="text"
                />
                <button>Submit</button>
            </form>
        </div>
    );

}
export default AddUserInfor;