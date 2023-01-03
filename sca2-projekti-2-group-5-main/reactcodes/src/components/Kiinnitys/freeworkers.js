import { DataGrid } from '@material-ui/data-grid';
import generatePDF from './generatePDF';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import { useScrollTrigger } from '@material-ui/core';
import { useState, useEffect } from 'react';

const FreeWorkers = (props) => {

    const { employees, addAttachment, date, shifts, shiftId} = props;
    const [lastShift, setLastShift] = useState("a");
    const [workerId, setWorkerId] = useState("");

    useEffect(() => {
        const fetchLastShift = async () => {
            let response = await fetch("http://localhost:3000/api/viimeisinVuoro?idtyontekija=" + workerId + "&paiva=" + date);
            setLastShift(await response.json());
        }
        if (workerId != "") fetchLastShift();
    }, [workerId]);

    useEffect(() => {
        const showLastShift = () => {
            console.log("LASTSHIFT", lastShift.length);
            lastShift.length < 1 ? alert("Viimeisintä työvuoroa ei löydy") : alert("Viimeisin vuoro: " + lastShift[0].alkaa + " - " + lastShift[0].loppuu);
            setWorkerId("");
        }
        if (lastShift != "a") showLastShift();
    }, [lastShift]);

    const employeesGrid = employees.map((a, i) => {
        return { id: a.idtyöntekijä, etunimi: a.etunimi, sukunimi: a.sukunimi, nimike: a.nimike }
    });

    const shift = shifts.filter(a => a.idtyövuoro == shiftId).map(filteredShifts => {
        return { alkaa: filteredShifts.alkaa, loppuu: filteredShifts.loppuu, }
    });


    const employeesColumns = [
        // { field: 'id', headerName: 'Id', width: 70 },
        { field: 'etunimi', headerName: 'Etunimi', width: 157, headerClassName:"header" },
        { field: 'sukunimi', headerName: 'Sukunimi', width: 150, headerClassName:"header" },
        { field: 'nimike', headerName: 'Nimike', width: 150, headerClassName:"header" },
        {
            field: 'e',
            headerName: 'Vie tehtävään',
            width: 150,
            headerClassName:"header",
            renderCell: (cell) => (
                <Button onClick={() => addAttachment(cell.getValue('id'))}>
                    <ArrowBackIcon />
                </Button>
            )
        },
        {
            field: 't',
            headerName: 'Viimeisin vuoro',
            width: 150,
            headerClassName:"header",
            renderCell: (cell) => (
                <Button onClick={() => setWorkerId(cell.getValue('id'))}>
                    <InfoIcon />
                </Button>
            )
        }
    ];
    return (
        <div className="datagrids" style={{ height: '92%', width: '100%' }}>
                        
                        <DataGrid rows={employeesGrid} columns={employeesColumns} pageSize={15} />
                        
        </div>
    );
}

export default FreeWorkers;