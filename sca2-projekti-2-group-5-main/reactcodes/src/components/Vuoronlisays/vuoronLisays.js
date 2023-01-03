import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import {Tyovuorot} from './tyovuorot'
import Datetimepicker from '../Datepicker/datetimepicker';
import Button from '@material-ui/core/Button';

//KANNASTA MUUTETTU TARVETAULUKOSTA FOREIGN KEY 'fk_tarve_tehtävä1' ON DELETE CASCADE!
//Sallii tehtävän poistamisen 

const VuoronLisays = () => {
    const [data, setData] = useState("");
    const [errormsg, setErrormsg] = useState("");
    const [added, setAdded] = useState(0);
    const [addStartTime, setAddStartTime] = useState("");
    const [addEndTime, setaddEndTime] = useState("");

    useEffect(() => {
        const addWorkShift = async () => {
            let response = await fetch("http://localhost:3000/api/lisaaTyovuoro", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            let error = await response.json();
            setErrormsg(error.msg);
            setAdded(added + 1);
            if(error.status != "NOT OK") {
                alert("Vuoro lisätty");
            }
        }
        if (data != "") addWorkShift();
    }, [data]);

    const refreshData = () => {
        setData({
            alkaa: addStartTime,
            loppuu: addEndTime
        });
    }

    const handleStart = (addStartTime) => {
        setAddStartTime(addStartTime);
    }
    const handleEnd = (addEndTime) => {
        setaddEndTime(addEndTime);
    }


    return (
        <div className="shiftAdding">
            <h1>Lisää työvuoro</h1>
            <div style={{display: "inline-flex"}}>
            <Datetimepicker handleStart={handleStart} handleEnd={handleEnd} />
            <Button style={{margin: "1em"}} variant="contained" color="primary" onClick={() => refreshData()}>Lisää</Button>
            </div>
            <h4>{errormsg}</h4>
            {/* Viedään propsina tieto, kun työvuoro on lisätty */}
            <Tyovuorot shiftAdded={added} />
        </div>
    )
}

export {VuoronLisays}