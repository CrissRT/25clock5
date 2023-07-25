import React from 'react';
import '../styles/App.css';
import Break from './Break';
import Session from "./Session";
import TimerSession from "./TimerSession";
import TimerBreak from './TimerBreak';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countSession: 25,
      countBreak: 5,
      countDownBreak: "5",
      countDownSession: "25",
      seconds: "00",
      isPlaying: false,
      timerLabel: "Session",
    };

    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handlePlayAndPauseForSession = this.handlePlayAndPauseForSession.bind(this);
    this.handlePlayAndPauseForBreak = this.handlePlayAndPauseForBreak.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handlePlayAndPauseForBreak(caller) {
    switch(caller) {
      case "button":
        if (this.state.isPlaying) {
          clearInterval(this.myInterval);
          this.setState({
            isPlaying: false,
          });
          return;
        }
        else 
          this.setState({
            isPlaying: true,
          });
      break;

      case "function":
        const countBreak = this.state.countBreak;
        this.setState({
          countDownBreak: (countBreak).toString(),
          seconds : "00",
        });
      break;
      default:
        break;
    }
    
    this.myInterval = setInterval(() => {
      if (this.state.countDownBreak === "00" && this.state.seconds === "00") {
        clearInterval(this.myInterval);
        playAudio();
        setTimeout(() => {
          this.setState({
            timerLabel: "Session",
            seconds: "00",
          });
          this.handlePlayAndPauseForSession("function");
        }, getAudioDuration() * 1000);
      } else {
        // Update the countdown time every second
        let second = parseInt(this.state.seconds);
        let minutes = parseInt(this.state.countDownBreak);
        if (second === 0) {
          minutes--;
          second = 59;
        } else {
          second--;
        }
  
        this.setState({
          countDownBreak: parseToTimeString(minutes),
          seconds: parseToTimeString(second),
        });
      }
    }, 1000);
  }  

  handlePlayAndPauseForSession(caller) {
    switch(caller) {
      case "button":
        if (this.state.isPlaying) {
          clearInterval(this.myInterval);
          this.setState({
            isPlaying: false,
          });
          return;
        }
        else 
          this.setState({
            isPlaying: true,
          });
      break;

      case "function":
        const countSession = this.state.countSession;
        this.setState({
          countDownSession: (countSession).toString(),
          seconds : "00",
        });
      break;

      default:
        break;
    }

    this.myInterval = setInterval(() => {
      if (this.state.countDownSession === "00" && this.state.seconds === "00") {
        clearInterval(this.myInterval);
        playAudio();
        setTimeout(() => {
          this.setState({
            timerLabel: "Break",
            seconds: "00",
          });
          this.handlePlayAndPauseForBreak("function");
        }, getAudioDuration() * 1000);
      } else {
        // Update the countdown time every second
        let second = parseInt(this.state.seconds);
        let minutes = parseInt(this.state.countDownSession);
        if (second === 0) {
          minutes--;
          second = 59;
        } else {
          second--;
        }
  
        this.setState({
          countDownSession: parseToTimeString(minutes),
          seconds: parseToTimeString(second),
        });
      }
    }, 1000);
  }

  handleIncrement(prop) {
    if (!this.state.isPlaying) {
      const stringMinutesSession = parseToTimeString(this.state.countSession + 1);
      const stringMinutesBreak = parseToTimeString(this.state.countBreak + 1);
      switch (prop) {
        case "break":
          if (this.state.countBreak >= 60) 
            return;
          this.setState({
            countBreak: this.state.countBreak + 1,
            countDownBreak : stringMinutesBreak,
            seconds : "00",
          });
        break;

        case "session":
          if (this.state.countSession >= 60)
            return;
          this.setState({
            countSession: this.state.countSession + 1,
            countDownSession : stringMinutesSession,
            seconds : "00",
          });
        break;

        default:
          break;
      }
    } 
  }

  handleDecrement(prop) {
    if (!this.state.isPlaying) {
      let stringMinutesSession = parseToTimeString(this.state.countSession - 1);
      let stringMinutesBreak = parseToTimeString(this.state.countBreak - 1);
      switch (prop) {
        case "break":
          if (this.state.countBreak === 1) 
            return;
          this.setState({
            countBreak: this.state.countBreak - 1,
            countDownBreak : stringMinutesBreak,
            seconds : "00",
          });
        break;

        case "session":
          if (this.state.countSession === 1)
            return;
          this.setState({
            countSession: this.state.countSession - 1,
            countDownSession : stringMinutesSession,
            seconds : "00",
          });
        break;

        default:
          break;
      }
    }
  }

  handleReset() {
    stopAudio();
    clearInterval(this.myInterval); // Clear any running timer

    this.setState({
      countSession: 25,
      countBreak: 5,
      countDownBreak: "5",
      countDownSession: "25",
      seconds: "00",
      timerLabel: "Session",
      isPlaying: false,
    })
  }
  
  render() {

    return (
      <>
        <h1 id="title-clock" className='mb-5'>25 + 5 Clock</h1>
        <div className='d-flex justify-content-evenly' id='length'>
          <Break 
            countBreak={this.state.countBreak} 
            handleIncrement={this.handleIncrement}
            handleDecrement={this.handleDecrement}
          />
          <Session 
            countSession={this.state.countSession} 
            handleIncrement={this.handleIncrement}
            handleDecrement={this.handleDecrement}
          />
        </div>
        {this.state.timerLabel === "Session" ? (
            <TimerSession
              countDownSession={this.state.countDownSession}
              seconds={this.state.seconds}
              handlePlayAndPauseForSession={this.handlePlayAndPauseForSession}
              handleReset= {this.handleReset}
            />
          ) : (
            <TimerBreak
              countDownBreak={this.state.countDownBreak}
              seconds={this.state.seconds}
              handlePlayAndPauseForBreak={this.handlePlayAndPauseForBreak}
              handleReset= {this.handleReset}
            />
          )}
          <audio id="beep" src='https://soundbible.com/mp3/Alarm%20Clock-SoundBible.com-437257341.mp3' />
      </>
    );
  }
}

function parseToTimeString(number) {
  if (number === 0) {
    return "00";
  } else if (number >= 1 && number <= 9) {
    return "0".concat(number.toString());
  } else {
    return number.toString();
  }
}

function playAudio() {
  const audioFile = document.getElementById("beep");
  if (audioFile) {
    audioFile.currentTime = 0;
    audioFile.play().catch((error) => {
      console.log('Playback error:', error);
    });
  }
}

function stopAudio() {
  const audioFile = document.getElementById("beep");
  if (audioFile) {
    audioFile.pause();
    audioFile.currentTime = 0;
  }
}

function getAudioDuration() {
  const audioFile = document.getElementById("beep");
  if (audioFile) {
    // Access the duration property of the audio element
    const durationInSeconds = audioFile.duration;

    // Return the duration in seconds
    return durationInSeconds;
  }

  // Return null if the audio element is not found or the duration is not available
  return null;
}


export default App;