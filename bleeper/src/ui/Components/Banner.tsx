import React, { useEffect, useState, useContext } from "react";
import Logo from "./Images/icon48.png";

const Banner = () => {
    const [currUrl, setCurrUrl] = useState(null);
    useEffect( () => {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;
            setCurrUrl(url);
        });
    });
    
    return (
        <>
        <div className="banner">
            <img className="logo" src={Logo} />
            Bleeper 
        </div>
        
        <div>You are on {currUrl}</div>
        </>
    );
};

export default Banner;