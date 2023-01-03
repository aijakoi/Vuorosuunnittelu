import { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import './vuoronlisays.css';
import {ExpandableTableRow} from './tehtavat'
import Datepicker from '../Datepicker/datepicker'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import generatePDF from './generatePDF';

//npm install @material-ui/icons

const Tyovuorot = (props) => {
    const { shiftAdded } = props;
    //Aina kun shiftAdded muuttuja päivittyy haetaan työvuorot uudestaan

    const [workShifts, setWorkShifts] = useState([]);
    const [shiftAndTasks, setShiftAndTasks] = useState([]);
    const [searchStart, setSearchStart] = useState("");
    const [searchEnd, setSearchEnd] = useState("");
    const [query, setQuery] = useState("");
    const [idToRemove, setIdToRemove] = useState("");
    const [workShiftId, setWorkShiftId] = useState("");


    // Funktiot jotka välitetään propsina datepicker komponentille, että saadaan tuotua datepickerin valuet vuorolista komponentille
    const handleStart = (searchStart) => {
        setSearchStart(searchStart);
    }
    const handleEnd = (searchEnd) => {
        setSearchEnd(searchEnd);
    }

    useEffect(() => {
        const fetchTyovuoro = async () => {
            let response = await fetch("http://localhost:3000/api/tyovuoro" + query);
            setWorkShifts(await response.json());
        }
        if (query != "") fetchTyovuoro();
    }, [query, shiftAdded]);

    useEffect(() => {
        const fetchTyovuoroRaportti = async () => {
            let response = await fetch("http://localhost:3000/api/tyovuoroRaportti" + query);
            setShiftAndTasks(await response.json());
        }
        if (query != "") fetchTyovuoroRaportti();
    }, [query]);

    useEffect(() => {
        const deleteTyovuoro = async () => {
            let response = await fetch("http://localhost:3000/api/poistaTyovuoro/" + idToRemove, {
                method: 'DELETE'
            });
            setQuery(query + " ");
            console.log(response.status);
            if(response.status == 400){
                alert("Et voi poistaa työvuoroa, koska siihen on lisätty tehtävä");
            }
        }
        if (idToRemove != "") deleteTyovuoro();
    }, [idToRemove]);


    const handleFetch = () => {
        if(searchStart != "" && searchEnd != ""){
        let q = "?"
        let searchConditions = [];

        if (searchStart != "") searchConditions.push("alkaa=" + searchStart);
        if (searchEnd != "") searchConditions.push("loppuu=" + searchEnd);

        q += searchConditions.join("&");
        setQuery(q);
        }
        else{
            alert("Valitse päivämäärät");
        }
    }

    console.log("toimiiko?", workShifts)

    return (
        <div>
            <h1>Hae työvuorot</h1>
            <div style={{display: "inline-flex"}}>
            <Datepicker handleStart={handleStart} handleEnd={handleEnd} />
            <Button style={{marginLeft: "1em"}} variant="contained" color="primary" onClick={() => handleFetch()}>Hae</Button>
            </div>
            <div className="report">
            {workShifts.length < 1 ? null : <Button variant="contained" color="primary" onClick={() => generatePDF(shiftAndTasks, searchStart, searchEnd)}>Työvuororaportti</Button>}
            </div>
            <Table >
                <TableHead >
                    {workShifts.length < 1 ? null :
                    <TableRow>
                        <TableCell padding="checkbox" />
                        <TableCell >Alkaa</TableCell>
                        <TableCell >Loppuu</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">Poista</TableCell>
                    </TableRow>
}
                </TableHead>
                <TableBody>
                    {workShifts.map(a => (
                        <ExpandableTableRow
                        key={a.idtyövuoro}
                        style={{backgroundColor:'#bfe6f7'}}
                            
                            expandComponent={a.idtyövuoro}
                        >
                            <TableCell>{a.alkaa}</TableCell>
                            <TableCell>{a.loppuu}</TableCell>
                            <TableCell></TableCell>
                        <TableCell></TableCell>
                            <TableCell align="right"><button onClick={() =>  { if (window.confirm('Haluatko varmasti poistaa kyseisen työvuoron?')) setIdToRemove(a.idtyövuoro) }}>
                                <DeleteIcon />
                            </button>
                            </TableCell>
                        </ExpandableTableRow>
                    ))}
                </TableBody>
            </Table>
            
        </div>
    );
}

export {Tyovuorot}