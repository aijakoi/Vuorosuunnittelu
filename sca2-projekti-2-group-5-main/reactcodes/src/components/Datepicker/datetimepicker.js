import React from "react";
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import datepicker from './datepicker.css';


// Asenna npm install @material-ui/core

export default function Datetimepicker(props){
    const {handleStart, handleEnd} = props;

    let date = new Date();
    let m = (date.getMonth() + 1);
    let d = date.getDate();
    if(m < 10) m = "0" + (date.getMonth() + 1);
    if(d < 10) d = "0" + date.getDate();

    let currentDate = date.getFullYear() + "-" + m + "-" + d + "T00:00";

return(
    <div className="datetimepicker">
            <TextField
                label="Alkaa"
                type="datetime-local"
                className="date_alkaa"
                defaultValue= {currentDate}
                onChange={(e) => handleStart(e.target.value)}
                InputLabelProps={{
                shrink: true,
                }}
                />
                 <TextField
               label="Loppuu"
               type="datetime-local"
               className="date_loppuu"
               defaultValue= {currentDate}
               onChange={(e) => handleEnd(e.target.value)}
               InputLabelProps={{
               shrink: true,
               }}
               />
    </div>
);
}