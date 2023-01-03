import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';

const ShiftEmployees = (props) => {

    const { shiftEmployees, removeId } = props;

    const shiftEmployeesGrid = shiftEmployees.map((a, i) => {
        return { id: a.idtyöntekijä, etunimi: a.etunimi, sukunimi: a.sukunimi, nimike: a.nimike }
    });

    const shiftEmployeesColumns = [
        // { field: 'id', headerName: 'Id', width: 70 },
        { field: 'etunimi', headerName: 'Etunimi', width: 170, headerClassName:"header" },
        { field: 'sukunimi', headerName: 'Sukunimi', width: 170, headerClassName:"header" },
        { field: 'nimike', headerName: 'Nimike', width: 170, headerClassName:"header" },
        {
            field: 'a',
            headerName: 'Poista',
            width: 160,
            headerClassName:"header",
            renderCell: (cell) => (
                <button onClick={() => removeId(cell.getValue('id'))}>
                    <DeleteIcon />
                </button>
            )
        }
    ];
    
    return (
        <div className="datagrids" style={{ height: 300, width: '42em' }}>
            <DataGrid rows={shiftEmployeesGrid} columns={shiftEmployeesColumns} pageSize={15} />
        </div>
    );
}

export default ShiftEmployees;