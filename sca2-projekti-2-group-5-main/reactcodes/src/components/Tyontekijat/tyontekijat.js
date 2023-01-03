import { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './tyontekijat.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';


const Tyontekijat = () => {
    const [workers, setWorkers] = useState([]);
    const [worker, setWorker] = useState("");
    const [addNew, setAddNew] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [idToModify, setIdToModify] = useState("");

    //haetaan kaikki työntekijät
    useEffect(() => {
        const fetchWorkers = async () => {
            let response = await fetch('http://localhost:3000/api/tyontekijat');
            let data = await response.json()
            setWorkers(data);
        }
        fetchWorkers();
        // aina kun lisätään, muokataan tai poistetaan päivitetään refresh-muuttuujaa, joka laukaisee työntekijöiden haun
    }, [refresh]);

    // haetaan yksittäisen työntekijän tiedot
    useEffect(() => {
        const fetchWorker = async () => {
            let response = await fetch('http://localhost:3000/api/tyontekija/' + idToModify);
            setWorker(await response.json());
        }
        if(idToModify != "") fetchWorker();
    }, [idToModify]);

    // piilotetaan lisäysvalikko
    const cancelAdd = () => {
        setAddNew(!addNew)
    }

    // näytetään muokkausvalikko
    // tuodaan Tyontekijalista komponentilta id ja annetaan se idtomodify muuttujaan
    const editShow = (id) => {
        setEditVisible(true);
        setIdToModify(id);
    }

    // piilotetaan muokkausvalikko
    const editHidden = () => {
        setEditVisible(false);
    }

    // Aina kun poistetaan, muokataan tai lisätään, kutsutaan tätä funktiota
    const infoChanged = () => {
        setRefresh(refresh + 1);
    }

    const styles = {
        marginLeft: '1em',
        marginTop: '1em'
    }

    return (
        <div>
            {/* Tyontekijalista komponentti näyttää työntekijöiden listan */}
            <Tyontekijalista workers={workers} editShow={editShow} infoChanged={infoChanged}/>
                        {/* addnew muuttuja määrittelee näkyykö lisäysvalikko vai nappi joka avaa lisäysvalikon */}
                        {addNew ? <AddWorker cancel={cancelAdd} infoChanged={infoChanged}/> :
                <Button variant="contained" color="primary" style={styles} onClick={() => setAddNew(!addNew)}>Lisää työntekijä</Button>
             }
            
             {/* editvisible muuttuja määrittelee näkyykö muokkausvalikko vai ei mitään */}
            {editVisible ? <EditWorker editHidden={editHidden} worker={worker[0]} infoChanged={infoChanged} /> : null}
        </div>
    )
}

const Tyontekijalista = (props) => {
    // tuodaan propseina kaikki työntekijät ja muokkausvalikon avausfunktio ja tietojen päivitysfunktio
    const { workers, editShow, infoChanged} = props;

    const [idToRemove, setIdToRemove] = useState("");

    // Poista napissa otetaan kiinni poistettava id, ja kun se muuttuu suoritetaan työntekijän poisto kannasta
    useEffect(() => {
        const deleteWorker = async () => {
            let response = await fetch("http://localhost:3000/api/tyontekija/" + idToRemove, {
                method: 'DELETE'
            });
            infoChanged();
        }
        if(idToRemove != "") deleteWorker();
    }, [idToRemove]);
    
    // mapataan työntekijät taulukkoon sopivaksi
    const rows = workers.map((a, i) => {
        return (
            <tr key={i}>
                <td>{a.etunimi}</td>
                <td>{a.sukunimi}</td>
                <td>{a.puhelin}</td>
                <td>{a.email}</td>
                <td>{a.nimike}</td>
                <td><Button onClick={() => editShow(a.idtyöntekijä)}><EditIcon /></Button></td>
                <td><Button onClick={() => { if (window.confirm(`Haluatko varmasti poistaa työntekijän ${a.etunimi} ${a.sukunimi}?`)) setIdToRemove(a.idtyöntekijä)}}><DeleteIcon /></Button></td>
            </tr>)
    });


    return (
        <div className="tablediv">
            <TableContainer>
                <Table className="table">
                    <TableHead className="tablehead">
                        <TableRow>
                            <TableCell>ETUNIMI</TableCell>
                            <TableCell>SUKUNIMI</TableCell>
                            <TableCell>PUHELIN</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>NIMIKE</TableCell>
                            <TableCell>MUOKKAA</TableCell>
                            <TableCell>POISTA</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

        

    )
}

const AddWorker = (props) => {
    // tuodaan propseina lisäysvalikon piilotusfunktio ja tietojen päivitysfunktio
    const { cancel, infoChanged } = props;

    const [etunimi, setEtunimi] = useState('');
    const [sukunimi, setSukunimi] = useState('');
    const [puhelin, setPuhelin] = useState('');
    const [email, setEmail] = useState('');
    const [titles, setTitles] = useState([]);
    const [title, setTitle] = useState("-1");
    const [data, setData] = useState('');

    // lisätään uusi työntekijä kantaan
    useEffect(() => {
        const addWorker = async () => {
            let response = await fetch("http://localhost:3000/api/tyontekija", {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            cancel();
            infoChanged();
            return response.json(); // parses JSON response into native JavaScript objects
        }

        if (data != "") addWorker();

    }, [data]);

    useEffect(() => {
        const fetchTitle = async () => {
            let response = await fetch("http://localhost:3000/api/nimike");
            setTitles([{ idnimike: "", nimike: "Valitse" }, ...await response.json()]);
        }
        fetchTitle();
    }, []);

    // lisää nappia painamalla määritellään datamuuttuja sopivaksi bodylohkoon
    const addClicked = () => {
        setData({
            etunimi: etunimi,
            sukunimi: sukunimi,
            puhelin: puhelin,
            email: email,
            nimike: title
        });
        
    }

    const options = titles.map((a, i) => {
        return <MenuItem key={i} value={a.idnimike}>{a.nimike}</MenuItem>
    });

    return (
        <div className="add">
            <fieldset>
                <h3>LISÄÄ TYÖNTEKIJÄ</h3>

            <InputLabel>Etunimi</InputLabel>
          <TextField type="text" value={etunimi} onChange={(e) => setEtunimi(e.target.value)} />

            <InputLabel>Sukunimi</InputLabel>
          <TextField type="text" value={sukunimi} onChange={(e) => setSukunimi(e.target.value)} />

            <InputLabel>Puhelin</InputLabel>
          <TextField type="text" value={puhelin} onChange={(e) => setPuhelin(e.target.value)} />

            <InputLabel>Email</InputLabel>
          <TextField type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputLabel>Nimike</InputLabel>
                            <Select
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                                {options}
                            </Select>
                            <br></br>
            <div className="addButtons">
                <Button variant="contained" color="primary" onClick={() => addClicked()}>Lisää</Button>
                <Button variant="contained" color="secondary" onClick={() => cancel()}>Peruuta</Button>
            </div>

            </fieldset>
        </div>
    )
}

const EditWorker = (props) => {
    // tuodaan propseina muokkausvalikon piilotusfunktio, yhden työntekijän tiedot ja tietojen päivitysfunktio
    const { editHidden, worker, infoChanged} = props;

    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [titles, setTitles] = useState([]);
    const [title, setTitle] = useState("-1");
    const [editedData, setEditedData] = useState("");

    // annetaan muuttujille arvot propsina tuodun työntekijän tiedoilla
    useEffect( () => {
        if ( worker ) {
            setId(worker.idtyöntekijä);
            setFirstName(worker.etunimi);
            setLastName(worker.sukunimi);
            setPhone(worker.puhelin);
            setEmail(worker.email);
            setTitle(worker.nimike)
        }
    }, [worker]);

    useEffect(() => {
        const editWorker = async () => {
            let response = await fetch("http://localhost:3000/api/tyontekija", {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedData) // body data type must match "Content-Type" header
            });
            editHidden();
            infoChanged();
            return response.json(); // parses JSON response into native JavaScript objects
        }

        if (editedData != "") editWorker();

    }, [editedData]);


    // muokkausnappia painamalla annetaan editeddata muuttujalle arvot mitkä löytyvät tekstikentistä. Kun editedData muuttuu käynnistyy yllä oleva efekti
    const edit = () => {
        setEditedData({
            id: id,
            etunimi: firstName,
            sukunimi: lastName,
            puhelin: phone,
            email: email,
            nimike: title

        });
        
    }
    const options = titles.map((a, i) => {
        return <MenuItem key={i} value={a.idnimike}>{a.nimike}</MenuItem>
    });

    return (
        <div className="edit">
            <fieldset>
                <h3 className="header">MUOKKAA TYÖNTEKIJÄÄ</h3>
                <InputLabel>Etunimi</InputLabel>
          <TextField type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <InputLabel>Sukunimi</InputLabel>
          <TextField type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <InputLabel>Puhelin</InputLabel>
          <TextField type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <InputLabel>Email</InputLabel>
          <TextField type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputLabel>Nimike</InputLabel>
                            <Select
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                                {options}
                            </Select>
          <br></br>
            <Button variant="contained" color="primary" onClick={() => edit()}>Muuta tietoja</Button>
            <Button variant="contained" color="secondary" onClick={() => editHidden()}>Peruuta</Button>
            </fieldset>
        </div>
    )
}



export { Tyontekijat }