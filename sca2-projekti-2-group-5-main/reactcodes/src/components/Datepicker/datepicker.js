import React from "react";
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import datepicker from './datepicker.css';

// Asenna npm install @material-ui/core

export default function Datepicker(props){
    const {handleStart, handleEnd} = props;

return(
    <div className="datepicker">
            <TextField
                label="Alkaa"
                type="date"
                className="date_alkaa"
                format="dd/MM/yyyy"
                onChange={(e) => handleStart(e.target.value)}
                InputLabelProps={{
                shrink: true,
                }}
                />
            <TextField
               label="Loppuu"
               type="date"
               className="date_loppuu"
               format="dd/MM/yyyy"
               onChange={(e) => handleEnd(e.target.value)}
               InputLabelProps={{
               shrink: true,
               }}
               />
    </div>
);
}