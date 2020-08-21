import React, { useEffect, useState, useContext } from "react";
import { FormControlLabel, Switch } from "@material-ui/core";

const Content = () => {
    const [yes, setYes] = useState(false);
    useEffect( () => {
    });
    
    const handleChange = e => {
        setYes(!yes);
    };
    
    return (
        <>
        <div className="">Bleeper</div>
        <div className="switchWrapper">
        <FormControlLabel
          control={<Switch checked={yes} onChange={handleChange} name="onoff" />}
          label={!!yes ? "On" : "Off"}
        />
        </div>
        </>
    );
};

export default Content;