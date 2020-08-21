import React, { useEffect, useState, useContext } from "react";
import Banner from "./Components/Banner";
import Content from "./Components/Content";

const App = () => {
    const handleMessage = (request) => {
        switch (request.message) {
          case "something":
            break;
          default:
            break;
        }
    };
    
    useEffect(()=>{
        chrome.runtime.onMessage.addListener(handleMessage);
    });
    
    return (
        <>
        <Banner/>
        <Content/>
        </>
    );
};

export default App;