import React, {useState}  from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Pagination from '@material-ui/lab/Pagination';
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import SearchPatientsForm from "../Appoints/Search/SearchPatientsForm";
import { Link } from "react-router-dom";
import AddNewPatient from "../helpers/AddNewPatient";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {makeStyles} from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
const headCells = [
    { id: "id", numeric: false, label: "Номер" },
    { id: "name", numeric: false, label: "Пациент" },
    { id: "city", numeric: false, label: "Адрес" },
    { id: "born_date", numeric: false, label: "Дата рождения" },
    { id: "phone", numeric: false, label: "Телефон" },
];

export default function TableCards({goToPage, getItdPatient, medicalCards})  {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = [];
    Object.keys(medicalCards).map((key) => {
        let patient = medicalCards[key];
       rows.push({
          "id": patient.id,
          "name": patient.name,
          "city": (patient.adresses[0] !== undefined) ? patient.adresses[0].city : "",
          "born_date": (patient.patient_cards[0] !== undefined) ? patient.patient_cards[0].born_date: "",
          "phone": (patient.contacts[0] !== undefined) ? patient.contacts[0].phone : ""
       });
    });

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [getVisibleAddPatient, setVisibleAddPatient] = useState(false);

    return(
        <div>
            <Grid item xs={12} sm={12}>
                <AddNewPatient getVisible={getVisibleAddPatient} visible={setVisibleAddPatient}/>
            </Grid>
            <Grid container className="searchTable">
                <Grid item xs={12} sm={6}>
                    <SearchPatientsForm search={'clean'}/>
                </Grid>
                <Grid item xs={12} sm={4} className="create_patient_block">
                    <div>
                        <button className="btn_creat_patient" onClick={() => setVisibleAddPatient(true)}>
                            + Добавить нового пациента
                        </button>
                    </div>

                </Grid>
            </Grid>
            <TableContainer className="table_card">
                <Table
                    className="table-card"
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
                            .map((card) => {
                                const patientId = card.id;
                                return (
                                    <TableRow key={card.id} hover component={Link} to={`/cards/${patientId}`}>
                                        <TableCell>{card.id}</TableCell>
                                        <TableCell>{card.name}</TableCell>
                                        <TableCell>{card.city}</TableCell>
                                        <TableCell>{card.born_date}</TableCell>
                                        <TableCell>{card.phone}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <ThemeProvider theme={theme_main}>
            <Pagination
                className={classes.pagination}
                count={Math.ceil((rows.length +1) / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                shape="rounded"
                color="primary"
                variant={"outlined"}
            />
            </ThemeProvider>
        </div>
    )
}
const theme_main = createMuiTheme({
    palette: {
        primary: {
            main: '#3b80d6',
        },
    },
});
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiTableSortLabel-active': {
            color: '#F08786',
        }
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    pagination: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '25px',
        "& .Mui-selected": {
            backgroundColor: '#3b80d6',
            color: '#ffffff'
        },
        "& .MuiPaginationItem-root:hover": {
            backgroundColor: '#3b80d6',
            color: '#ffffff'
        }
    }
}));
