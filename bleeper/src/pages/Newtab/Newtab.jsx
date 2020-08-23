//import React, { useState, useEffect } from "react";
//import logo from '../../assets/img/icon-34.png';
//import Greetings from '../../containers/Greetings/Greetings';
//import { Form, Button, Row, Col } from "react-bootstrap";
//import secrets from './secrets.dev.js';
//import './Popup.css';
//import firebase from 'firebase/app';
//import 'firebase/database';
//import mp3File from './aaa.mp3';
//
//const firebaseConfig = secrets;
//firebase.initializeApp(firebaseConfig);
////console.log(secrets);
//const Popup = () => {
//  const [roomId, setRoomId] = useState("");
//  const [active, setActive] = useState(false);
//  const [startTime, setStartTime] = useState(0);
//  const [currTime, setCurrTime] = useState(0);
//  const [workTime, setWorkTime] = useState(0);
//  const [breakTime, setBreakTime] = useState(0);
//  const [hour, setHours] = useState(null);
//  const [min, setMin] = useState(null);
//  const [sec, setSec] = useState(null);
//  const [working, setWorking] = useState(true);
//  const wakeAudio = new Audio(mp3File);
//    
//  const handleRoomIdChange = (e) => {
////      alert(e.target.value);
//      setRoomId(e.target.value);
//  };
//
//  const playSound = audioFile => {
//    audioFile.play();
//  };
//    
//  const handleSubmit = async() => {
//      event.preventDefault();
//      const db = firebase.database();
//      const ref = db.ref("rooms/"+ roomId);
//      await ref.once("value", (values) => {
//        const v = values.val();
//        setStartTime(v.startTime);
//        setBreakTime(v.restTime);
//        setActive(true);
//        setWorkTime(v.workTime);
//      });
//  };
//  
//  useEffect(() => {
//    startTimer();
//  }, [startTime]);
//    
//  const startTimer = () => {
//    setInterval(() => {
//      if (!!startTime) {
//        const elapsed = new Date() - startTime;
//        setCurrTime(elapsed);
//      }
//    }, 1000);
//  };
//    
//  useEffect(() => {
//    setHours(("0" + Math.floor(currTime / 3600000)).slice(-2));
//    setMin(("0" + (Math.floor(currTime / 60000) % 60)).slice(-2));
//    setSec(("0" + (Math.floor(currTime / 1000) % 60)).slice(-2));
//    if (!!breakTime && !!workTime) {
//      const newW = !!((parseInt(hour) * 60 + parseInt(min)) % (parseInt(breakTime) + parseInt(workTime)) < workTime);
//      if (newW != working) playSound(wakeAudio);
//      setWorking(newW);
//    }
//  }, [currTime]);
//    
//  return (
//    <div className="App">
//      {!active?(<header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <Form onSubmit={handleSubmit}>
//        <Form.Control
//          value={roomId}
//          onChange={handleRoomIdChange}
//          placeholder="Room ID"
//          required
//        ></Form.Control>
//        <Button variant="primary" type="submit" id="roomidbutton">
//          Submit
//        </Button>
//        </Form>
//      </header>):(
//      <>
//      <div>{hour + ":" + min + ":" + sec}</div>
//      <div>{working? "Work" : "Break"}</div>
//      </>
//        )
//      }
//    </div>
//  );
//};
//
//export default Popup;
