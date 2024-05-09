import React from "react";
import UserInfor from "./UserInfor.js"
import DisplayInfor from "./DisplayInfor.js";
class MyComponent extends React.Component {

    //jsx
    render() {
        const Dem = [1, 2, 3, 4]
        const [one, two] = Dem;
        return (
            <div>
                <UserInfor />
                <DisplayInfor name="Pham Xuan Truong" age='21' dem={two} />
                <DisplayInfor name="TruongPX" age='20+1' dem={one} />
            </div>

        );
    }
}
export default MyComponent;