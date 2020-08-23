import React, { useState, useEffect } from "react";
import logo from '../../assets/img/icon-34.png';
import Greetings from '../../containers/Greetings/Greetings';
import { Form, Button, Row, Col } from "react-bootstrap";
import secrets from './secrets.dev.js';
import './Popup.css';
import firebase from 'firebase/app';
import 'firebase/database';
import mp3File from './aaa.mp3';

const firebaseConfig = secrets;
firebase.initializeApp(firebaseConfig);
//console.log(secrets);
const Popup = () => {
  const [roomId, setRoomId] = useState("");
  const [active, setActive] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [currTime, setCurrTime] = useState(0);
  const [workTime, setWorkTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [hour, setHours] = useState(null);
  const [min, setMin] = useState(null);
  const [sec, setSec] = useState(null);
  const [working, setWorking] = useState(true);
  const wakeAudio = new Audio(mp3File);
    
  const handleRoomIdChange = (e) => {
//      alert(e.target.value);
      setRoomId(e.target.value);
  };

  const playSound = audioFile => {
    audioFile.play();
  };
    
  useEffect(() => {
    chrome.storage.sync.get(['startTime'], function(result) {
      if (Object.entries(result).length > 0) setStartTime(result.startTime);
    });  
    chrome.storage.sync.get(['restTime'], function(result) {
      if (Object.entries(result).length > 0) setBreakTime(result.restTime);
    });  
    chrome.storage.sync.get(['workTime'], function(result) {
      if (Object.entries(result).length > 0) setWorkTime(result.workTime);
    });  
    chrome.storage.sync.get(['roomId'], function(result) {
      if (Object.entries(result).length > 0) setRoomId(result.roomId);
    });  
  });

  useEffect(() => {
    if (workTime > 0) setActive(true);
  }, [workTime]);
    
  const handleSubmit = async() => {
      event.preventDefault();
      const db = firebase.database();
      const ref = db.ref("rooms/"+ roomId);
      await ref.once("value", (values) => {
        const v = values.val();
        setStartTime(v.startTime);
        setBreakTime(v.restTime);
        setWorkTime(v.workTime);
        chrome.storage.sync.set({roomId: roomId, startTime: v.startTime, restTime: v.restTime, workTime: v.workTime});
      });
  };
  
  useEffect(() => {
    startTimer();
  }, [startTime]);
    
  const startTimer = () => {
    setInterval(() => {
      if (!!startTime) {
        const elapsed = new Date() - startTime;
        setCurrTime(elapsed);
      }
    }, 1000);
  };
  
  const reset = () => {
    chrome.storage.sync.set({startTime: 0, restTime: 0, workTime: 0, roomId: ""});
    setActive(false);
  };
    
  useEffect(() => {
    setHours(("0" + Math.floor(currTime / 3600000)).slice(-2));
    setMin(("0" + (Math.floor(currTime / 60000) % 60)).slice(-2));
    setSec(("0" + (Math.floor(currTime / 1000) % 60)).slice(-2));
    if (!!breakTime && !!workTime) {
      const newW = !!((parseInt(hour) * 60 + parseInt(min)) % (parseInt(breakTime) + parseInt(workTime)) < workTime);
      if (newW != working){ 
          playSound(wakeAudio);
          if (newW){
              chrome.browserAction.setIcon({
                  "path":'icon-34_g.png'
              });
          }
          else{
              chrome.browserAction.setIcon({
                  "path":'icon-34_r.png'
              });
          }
      }
      setWorking(newW);
    }
  }, [currTime]);
    
  return (
    <div className="App">
      {!active?(<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form onSubmit={handleSubmit}>
        <Form.Control
          value={roomId}
          onChange={handleRoomIdChange}
          placeholder="Room ID"
          required
        ></Form.Control>
        <Button variant="primary" type="submit" id="roomidbutton">
          Submit
        </Button>
        </Form>
      </header>):(
      <>
      <div className="wrapper" style={{backgroundColor:(!!working?"#72db62":"#e25809")}}>
      <div className="roomid">{roomId}</div>
      <div className="clock">{hour + ":" + min + ":" + sec}</div>
      <div className="work">{working? "Work" : "Break"}</div>
      <Button variant="primary" id="roomidbutton" onClick={reset}>
          LogOut
      </Button>
      </div>
      </>
        )
      }
    </div>
  );
};

export default Popup;
