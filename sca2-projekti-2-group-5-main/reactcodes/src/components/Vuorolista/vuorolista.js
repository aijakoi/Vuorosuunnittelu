import { useState, useEffect } from 'react';
import Datepicker from '../Datepicker/datepicker'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

import vuorolista from './vuorolista.css';
import generatePDF from './generatePDF';

//npm install @material-ui/data-grid

const Vuorolista = (props) => {
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [query, setQuery] = useState("x");
    const [id, setId] = useState();
    const [shifts, setShifts] = useState([])
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [workers, setWorkers] = useState([]);
    
    useEffect(() => {
      const fetchWorkers = async () => {
        let response = await fetch("http://localhost:3000/api/workers");
        setWorkers(await response.json());
      }
      fetchWorkers();
    }, []);

    useEffect(() => {
        const fetchShifts = async () => {
          let response = await fetch("http://localhost:3000/api/shifts?" + query);
          setShifts(await response.json());
        }
        if (query != "x")fetchShifts();
      }, [query]);

    const handlefetch = () =>{
        let haku = "";
        let hakuehdot = [];

        if (dateStart != "") {
            hakuehdot.push("alkaa=" + dateStart);
        }
        if (dateEnd != "") {
            hakuehdot.push("loppuu=" + dateEnd);
        }
        if (id > 0) {
            hakuehdot.push("id=" + id);
        }

        haku = hakuehdot.join("&");
        setQuery(haku);
    }

        // Funktiot jotka välitetään propsina datepicker komponentille, että saadaan tuotua datepickerin valuet vuorolista komponentille
        const handleStart = (datestart) => {
            setDateStart(datestart);
        }
        const handleEnd = (dateend) => {
            setDateEnd(dateend);
        }
    
        
        const workerInfo = (e) => {
            setId(e.data.idtyöntekijä)
            setFirstName(e.data.etunimi)
            setLastName(e.data.sukunimi)
        }
  
    //App komponentilta propseilla tullut lista työntekijöistä mapataan gridiin sopivaan muotoon
    const work = workers.map((a, i) => {
        return {id: i, etunimi: a.etunimi, sukunimi: a.sukunimi, idtyöntekijä: a.idtyöntekijä}
    });
    const shift = shifts.map((a, i) => {
        return {id: i, alkaa: a.alkaa, loppuu: a.loppuu, tehtävä: a.tehtävä, paikka: a.paikka}
    });

    const columns = [
        { field: 'etunimi', headerName: 'Etunimi', width: 130, headerClassName:"header" },
        { field: 'sukunimi', headerName: 'Sukunimi', width: 130, headerClassName:"header"},
        { field: 'idtyöntekijä', headerName: 'TyöntekijäID', type: 'number', width: 160, headerClassName:"header"},
    ];

    const columnShift = [
        { field: 'alkaa', headerName: 'Alkaa', width: 300, headerClassName:"header" },
        { field: 'loppuu', headerName: 'Loppuu', width: 300, headerClassName:"header" },
        { field: 'tehtävä', headerName: 'Tehtävä', width: 200, headerClassName:"header"},
        { field: 'paikka', headerName: 'Paikka', width: 190, headerClassName:"header"},
    ];


    return (
        <div className="vuorolista">
            <div className="vuorolista__datepicker">
                <Datepicker handleStart={handleStart} handleEnd={handleEnd} />
                <div className="vuorolista__datepicker_hae">
                    <Button variant="contained" color="primary" onClick={() => handlefetch()}>Hae</Button>
                </div>
                <div className="vuorolista__datepicker__raportti">
                    <Button variant="contained" color="primary" onClick={() => generatePDF(shifts, dateStart, dateEnd, firstName, lastName)} >Vuororaportti</Button>
                </div>
            </div>
            <div className="vuorolista__datagrids">
                <div className="vuorolista__datagrids__workers" >
                    <DataGrid rows={work} 
                              columns={columns} 
                              pageSize={15}
                              onRowSelected={(e) => workerInfo(e)}                   
                              />
                </div>
                <div className="vuorolista__datagrids__shifts" style={{ height: 700}}>
                    <DataGrid rows={shift} columns={columnShift} scrollbarSize={2} pageSize={15} />   
                </div>
            </div>
        </div>
    )
}

export { Vuorolista };
