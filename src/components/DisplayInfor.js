import React from "react";

class DisplayInfor extends React.Component {


    render() {
        const { name, age, dem } = this.props;
        return (
            <div>
                My name's {name} <br /> My age's {age} <br /> and {dem}
            </div>
        )
    }
}
export default DisplayInfor;