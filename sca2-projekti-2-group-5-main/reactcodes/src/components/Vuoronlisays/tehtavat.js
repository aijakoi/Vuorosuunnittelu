import { useState, useEffect } from 'react';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
    //Tuodaan propsina workShiftId, joten aina kun muuttujan tila vaihtuu haetaan työvuoron tehtävät uudelleen
    const [isExpanded, setIsExpanded] = useState(false);
    const [titles, setTitles] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [idToRemove, setIdToRemove] = useState("");
    const [dataChanged, setDataChanged] = useState(0);
    const [task, setTask] = useState("");
    const [place, setPlace] = useState("");
    const [title, setTitle] = useState("-1");
    const [amount, setAmount] = useState("");
    const [data, setData] = useState("");
    const [errormsg, setErrormsg] = useState("");

    useEffect(() => {
        const fetchTitle = async () => {
            let response = await fetch("http://localhost:3000/api/nimike");
            setTitles([{ idnimike: -1, nimike: "Valitse" }, ...await response.json()]);
        }
        fetchTitle();
    }, []);

    useEffect(() => {
        const deleteTask = async () => {
            let response = await fetch("http://localhost:3000/api/poistaTehtava/" + idToRemove, {
                method: 'DELETE'
            });
            setDataChanged(dataChanged + 1);

        }
        if (idToRemove != "") deleteTask();
    }, [idToRemove]);

    useEffect(() => {
        const fetchShiftTasks = async () => {
            let response = await fetch("http://localhost:3000/api/tyovuoronTehtavat/" + expandComponent);
            setTasks(await response.json());
        }
        if (expandComponent != "") fetchShiftTasks();
    }, [expandComponent, dataChanged]);

    useEffect(() => {
        const addTask = async () => {
            let response = await fetch("http://localhost:3000/api/lisaaTehtava", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            let error = await response.json();
            setErrormsg(error.msg);
            setDataChanged(dataChanged + 1);
            console.log(error);
            if(error.msg == ""){
                setTask("");
                setPlace("");
                setTitle(-1);
                setAmount("");
            }
        }
        if (data != "") addTask();

    }, [data]);


    const options = titles.map((a, i) => {
        return <MenuItem key={i} value={a.idnimike}>{a.nimike}</MenuItem>
    });

    const addTask = () => {
        setData({
            tyovuoroId: expandComponent,
            tehtava: task,
            paikka: place,
            nimikeId: title,
            maara: amount
        });

        // setTask("");
        // setPlace("");
        // setTitle("-1");
        // setAmount("");
    }

    return (
        <>
            <TableRow {...otherProps}>
                <TableCell padding="checkbox">
                    <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {children}
            </TableRow>
            {isExpanded ?

                <React.Fragment>
                    <TableRow >
                        <h2>Lisää tehtävä</h2>
                    </TableRow>
                    <TableRow style={{borderBottom:'3px solid'}}>
                        <TableCell></TableCell>
                        <TableCell>
                            <TextField id="standard-basic" label="Tehtävä" value={task} onChange={(e) => setTask(e.target.value)} />
                        </TableCell>
                        <TableCell>
                            <TextField id="standard-basic" label="Paikka" value={place} onChange={(e) => setPlace(e.target.value)} />
                        </TableCell>
                        <TableCell>
                        <InputLabel>Nimike</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                                {options}
                            </Select>
                        </TableCell>
                        <TableCell>
                            <TextField id="standard-basic" label="Määrä" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </TableCell>
                        <TableCell align="right">
                            <Button variant="contained" color="primary" onClick={() => addTask()}>Lisää tehtävä</Button>
                            <h3>{errormsg}</h3>
                        </TableCell>

                    </TableRow>
                    {tasks.length > 0 ?
                        <React.Fragment>
                            <TableRow>
                                <h2>Lisätyt tehtävät</h2>
                            </TableRow>
                            <TableRow >
                                <TableCell ></TableCell>
                                <TableCell ><h4>Tehtävä</h4></TableCell>
                                <TableCell ><h4>Paikka</h4></TableCell>
                                <TableCell ><h4>Nimike</h4></TableCell>
                                <TableCell ><h4>Määrä</h4></TableCell>
                                <TableCell ><h4>Poista</h4></TableCell>
                            </TableRow>
                            {tasks.map(a => (
                                <TableRow key={a.idtehtävä}>
                                    <TableCell ></TableCell>
                                    <TableCell >{a.tehtävä}</TableCell>
                                    <TableCell >{a.paikka}</TableCell>
                                    <TableCell >{a.nimike}</TableCell>
                                    <TableCell >{a.määrä}</TableCell>
                                    <TableCell ><button onClick={() => { if (window.confirm('Haluatko varmasti poistaa kyseisen tehtävän?')) setIdToRemove(a.idtehtävä) }}>
                                        <DeleteIcon />
                                    </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment> : null}

                </React.Fragment>

                : null}

        </>
    )
}

export { ExpandableTableRow }