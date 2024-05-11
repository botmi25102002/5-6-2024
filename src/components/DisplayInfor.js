import React from "react";

class DisplayInfor extends React.Component {

    state = {
        isShowListUser: true,
    }

    hideShowList = () => {
        this.setState({ isShowListUser: !this.state.isShowListUser });
    }

    render() {
        const { listUsers } = this.props;
        return (
            <div>
                <span onClick={() => { this.hideShowList() }}>
                    {this.state.isShowListUser === true ? "ẨN" : "HIỆN"}
                </span>
                {this.state.isShowListUser &&
                    <div>
                        {listUsers.map((user, index) => {

                            return (
                                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                                    <div>My name's {user.name}</div>
                                    <div>My age's {user.age}</div>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>

        )
    }
}
export default DisplayInfor;