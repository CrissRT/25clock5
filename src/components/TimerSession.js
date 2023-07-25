import React from 'react';

class TimerSession extends React.Component {
    render() {
        return(
            <>
                <div id='timer' className='d-flex justify-content-center align-items-center flex-column'>
                    <div id='border-timer' className='border d-flex justify-content-center align-items-center flex-column'>
                        <span id="timer-label">Session</span>
                        <p id='time-left'>{this.props.countDownSession}:{this.props.seconds}</p>
                    </div>
                </div>
                <div id='buttons' className='mt-2 d-flex justify-content-between align-items-center'>
                    <div id="start_stop">
                        <i className="bi bi-play-fill position-relative" onClick={() => this.props.handlePlayAndPauseForSession("button")}/>  
                        <i className="bi bi-pause-fill" onClick={() => this.props.handlePlayAndPauseForSession("button")}/>
                    </div>
                    <i id="reset" className="bi bi-arrow-clockwise" onClick={this.props.handleReset}/>
                </div>  
            </>
        )
    }
}

export default TimerSession;
