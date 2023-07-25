import React from 'react';

class TimerBreak extends React.Component {
    render() {
        return(
            <>
                <div id='timer' className='d-flex justify-content-around align-items-center flex-column'>
                    <div id='border-timer' className='border d-flex justify-content-center align-items-center flex-column'>
                        <span id="timer-label">Break</span>
                        <p id='time-left'>{this.props.countDownBreak}:{this.props.seconds}</p>
                    </div>
                </div>
                <div id='buttons' className='mt-2 d-flex justify-content-between align-items-center'>
                    <div id="start_stop">
                        <i className="bi bi-play-fill" onClick={() => this.props.handlePlayAndPauseForBreak("button")}/>  
                        <i className="bi bi-pause-fill position-relative" onClick={() => this.props.handlePlayAndPauseForBreak("button")}/>
                    </div>
                    <i id="reset" className="bi bi-arrow-clockwise" onClick={this.props.handleReset}/>
                </div>  
            </>
        )
    }
}

export default TimerBreak;
