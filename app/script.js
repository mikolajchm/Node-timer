import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const startTimer = () => {
    if (status === 'off') {
      setTime(1200); 
      setStatus('work');
    }

    setTimer(setInterval(() => {
      setTime(prevTime => {
        if (prevTime === 0) {
          clearInterval(timer);
          setStatus(prevStatus => {
            if (prevStatus === 'work') {
              setTime(20); 
              return 'rest'; 
            } else {
              setTime(1200);
              return 'work'; 
            }
          });
        } else {
          return prevTime - 1;
        }
      });
    }, 1000));
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTime(0);
    setStatus('off');
  };

  const closeApp = () => {
    window.close()
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      {status === 'work' && (<img src="./images/work.png" alt="Work" />)}
      {status === 'rest' && (<img src="./images/rest.png" alt="Rest" />)}
      {status !== 'off' && (
        <div className="timer">
          {formatTime(time)}
        </div>
      )}
      {status === 'off' && (
        <button className="btn" onClick={startTimer}>
          Start
        </button>
      )}
      {status !== 'off' && (
        <button className="btn" onClick={stopTimer}>
          Stop
        </button>
      )}
      <button className="btn btn-close" onClick={closeApp}>
        X
      </button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));