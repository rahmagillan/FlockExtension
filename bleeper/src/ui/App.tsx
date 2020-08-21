import React, { useEffect, useState, useContext } from "react";
import Banner from "./Components/Banner";

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
        <div className="overall">helloe</div>
        </>
    );
};

export default App;