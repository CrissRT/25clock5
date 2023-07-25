import React from "react";

class Break extends React.Component {
    render() {
        return (
            <div className="d-flex flex-column">
                <p id="break-label">Break Length</p>
                <div className="d-flex justify-content-evenly">
                    <i 
                        className="bi bi-arrow-up-square" 
                        id="break-increment"
                        onClick={() => this.props.handleIncrement("break")}
                    />
                    <p id="break-length">
                        {this.props.countBreak}
                    </p>
                    <i 
                        className="bi bi-arrow-down-square" 
                        id="break-decrement"
                        onClick={() => this.props.handleDecrement("break")}
                    />
                </div>
            </div>
        );
    }
}

export default Break;