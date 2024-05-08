import React from "react";


class MyComponent extends React.Component {
    //jsx
    render() {
        return (
            <div> my first component
                {Math.random()}
            </div>
        );
    }
}
export default MyComponent;