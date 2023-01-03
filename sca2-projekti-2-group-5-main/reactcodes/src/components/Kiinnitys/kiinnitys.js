import { SettingsEthernetOutlined } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import './kiinnitys.css';

import Tasks from './tasks';
import FreeWorkers from './freeworkers';
import ShiftEmployees from './shiftemployees';
import ShiftSelect from './select'
import Button from '@material-ui/core/Button';
import generatePDF from './generatePDF';

const Kiinnitys = () => {
    const [date, setDate] = useState("");
    const [shifts, setShifts] = useState([]);
    const [shiftId, setShiftId] = useState("");
    const [employees, setEmployees] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [shiftEmployees, setShiftEmployees] = useState([]);
    const [taskId, setTaskId] = useState("");
    const [data, setData] = useState("");
    const [idToRemove, setIdToRemove] = useState("");
    const [dataChanged, setDataChanged] = useState(0);


    useEffect(() => {
        const fetchTyovuoro = async () => {
            let response = await fetch("http://localhost:3000/api/tyovuorot?paiva=" + date);
            setShifts(await response.json());
        }
        if (date != "") fetchTyovuoro();
    }, [date]);

    useEffect(() => {
        const fetchAvailableWorkers = async () => {
            let response = await fetch("http://localhost:3000/api/vapaatTyontekijat/" + shiftId);
            setEmployees(await response.json());
        }
        if (shiftId != "" && shiftId != -1) fetchAvailableWorkers();
    }, [shiftId, dataChanged]);

    useEffect(() => {
        const fetchTyovuoronTehtavat = async () => {
            let response = await fetch("http://localhost:3000/api/tyovuoronTehtavat2/" + shiftId);
            setTasks(await response.json());
        }
        if (shiftId != "") fetchTyovuoronTehtavat();
    }, [shiftId, dataChanged]);

    useEffect(() => {
        const fetchShiftWorkers = async () => {
            let response = await fetch("http://localhost:3000/api/vuoronTyontekijat/" + taskId);
            setShiftEmployees(await response.json());
        }
        if (taskId != "") fetchShiftWorkers();
    }, [taskId, dataChanged]);

    useEffect(() => {
        const addKiinnitys = async () => {
            let response = await fetch("http://localhost:3000/api/lisaaKiinnitys", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setDataChanged(dataChanged + 1);

        }
        if (data != "") addKiinnitys();

    }, [data]);

    useEffect(() => {
        const deleteKiinnitys = async () => {
            let response = await fetch("http://localhost:3000/api/poistaKiinnitys/" + idToRemove + "/" + shiftId, {
                method: 'DELETE'
            });
            setDataChanged(dataChanged + 1);
            setIdToRemove("");
        }
        if (idToRemove != "") deleteKiinnitys();
    }, [idToRemove]);

    // [{ idtyövuoro: -1, alkaa: "valitse" }, ...await response.json()]


    const changeDate = (id) => {
        setDate(id);
        setTaskId(-1);
        setShiftId(-1);
    }

    const changeShift = (id) => {
        setShiftId(id);
        setTaskId(-1);
    }

    // taskid ja removeId funktiot välitetään propseilla Tasks ja ShiftEmployees komponenteille, että sieltä saadaan haettua ja tallennettua id kiinnitys komponentin state muuttujiin
    const taskid = (id) => {
        setTaskId(id);
    }
    const RemoveId = (id) => {
        setIdToRemove(id)
    }

    const addAttachment = (tyontekijaId) => {
        if (taskId != "" && taskId != -1) {
            setData({
                tyontekijaId: tyontekijaId,
                tyovuoroId: shiftId,
                tehtavaId: taskId
            })
        } else {
            alert("Tehtävää ei ole valittu");
        }
    }

    console.log(taskId);

    const employeesGrid = employees.map((a, i) => {
        return { id: a.idtyöntekijä, etunimi: a.etunimi, sukunimi: a.sukunimi, nimike: a.nimike }
    });

    const shift = shifts.filter(a => a.idtyövuoro == shiftId).map(filteredShifts => {
        return { alkaa: filteredShifts.alkaa, loppuu: filteredShifts.loppuu, }
    });

    console.log("KSKSKSK", shift)

    return (
        <div className="attachment">
            <div className="kiinnitys_datagrids">

                <div>
                    <ShiftSelect changeDate={changeDate} changeShift={changeShift} shifts={shifts} />
                </div>
                {shift.length < 1 ? null :
                <div className="shiftReport">
                    <Button color="primary" variant="contained" onClick={() => generatePDF(employeesGrid, date, shifts, shift)} >
                        Vapaiden työntekijöiden raportti
                    </Button>
                </div>
}
            </div>
            <div className="kiinnitys_datagrids">
                <div className="datagrids__row1">
                    <h3>Työvuoron tehtävät</h3>
                    <div className="datagrids__row1__task">
                        <Tasks tasks={tasks} taskid={taskid} />
                    </div>
                    <h3>Työvuoron työntekijät</h3>
                    <div className="datagrids__row2__shift">
                        <ShiftEmployees shiftEmployees={shiftEmployees} removeId={RemoveId} />
                    </div>

                </div>
                <div className="datagrids__row2">
                    <h3>Vapaat työntekijät</h3>
                    <FreeWorkers employees={employees} addAttachment={addAttachment} date={date} shifts={shifts} shiftId={shiftId} />
                </div>
            </div>
        </div>
    )
}

export { Kiinnitys }
