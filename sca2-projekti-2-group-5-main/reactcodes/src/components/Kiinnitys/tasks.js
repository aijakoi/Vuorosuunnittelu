import { DataGrid } from '@material-ui/data-grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Tasks = (props) => {

    const { tasks, taskid } = props

    const tasksGrid = tasks.map((a, i) => {
        return { id: a.idtehtävä, tehtava: a.tehtävä, paikka: a.paikka, nimike: a.nimike, maara: a.määrä, lisaamatta: a.määrä - a.lisäämättä }
    });

    const tasksColumns = [
        // { field: 'id', headerName: 'Id', width: 70 },
        { field: 'tehtava', headerName: 'Tehtävä', width: 140, headerClassName:"header"},
        { field: 'paikka', headerName: 'Paikka', width: 140, headerClassName:"header" },
        { field: 'nimike', headerName: 'Nimike', width: 140, headerClassName:"header" },
        { field: 'maara', headerName: 'Määrä', width: 110, headerClassName:"header" },
        { 
            field: 'lisaamatta', 
            headerName: 'Lisäämättä', 
            width: 140,
            headerClassName:"header",
            renderCell: (cell) => (
                cell.getValue('lisaamatta') == 0 ? <CheckCircleIcon /> : null
            )
        }
    ];
    return (
            <div className="datagrids" style={{ height: 300, width: '42em' }}>
                        
                        <DataGrid rows={tasksGrid} columns={tasksColumns} pageSize={15} onRowSelected={(e) => taskid(e.data.id)}/>
            </div>
    );
}
export default Tasks;