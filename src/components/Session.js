import React from "react";

class Session extends React.Component {
    render() {
        return (
            <div className="d-flex flex-column">
                <p id="session-label">Session Length</p>
                <div className="d-flex justify-content-evenly">
                    <i 
                        className="bi bi-arrow-up-square" 
                        id="session-increment"
                        onClick={() => this.props.handleIncrement("session")}
                    />
                    <p id="session-length">
                        {this.props.countSession}
                    </p>
                    <i 
                        className="bi bi-arrow-down-square"
                        id="session-decrement"
                        onClick={() => this.props.handleDecrement("session")}
                    />
                </div>
            </div>
        );
    }
}

export default Session;