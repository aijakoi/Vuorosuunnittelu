import { TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const ShiftSelect = (props) => {
    const { changeDate, changeShift, shifts } = props;

    const options = shifts.map((a, i) => {
        return <MenuItem key={i} value={a.idtyövuoro}>{a.alkaa} - {a.loppuu}</MenuItem>
    });
    return (
        <div style={{display:"flex"}}>
            <div>
            <InputLabel>Päivä</InputLabel>
            <TextField
                type="date"
                format="dd/MM/yyyy"
                onChange={(e) => changeDate(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            </div>
            <div style={{marginLeft:"1em"}}>
            <InputLabel id="demo-simple-select-label">Vuoro</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => changeShift(e.target.value)}
            >
                {options.length < 1 ? <MenuItem>Ei työvuoroja</MenuItem> : null}
                {options}
            </Select>
            </div>
        </div>
    );
}

export default ShiftSelect;