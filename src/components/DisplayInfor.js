import React from "react";

class DisplayInfor extends React.Component {


    render() {
        const { listUsers } = this.props;
        return (
            <div>
                {listUsers.map((user, index) => {
                    return (
                        <div key={user.id}>
                            <div>My name's {user.name}</div>
                            <div>My age's {user.age}</div>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default DisplayInfor;