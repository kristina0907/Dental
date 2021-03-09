import React, {useEffect, useState} from "react";
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
    { id: "photo", numeric: false, label: "Фото" },
    { id: "name", numeric: false, label: "ФИО" },
    { id: "subdivisions", numeric: false, label: "Подразделение" },
    { id: "professions", numeric: false, label: "Должность" },
    { id: "phone", numeric: false, label: "Номер телефона" },
    { id: "status", numeric: false, label: "Статус" },
];

export default function TableCards({listemployers})  {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = [];

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

                        {listemployers && listemployers.length ?
                            (listemployers).map((employee) => {
                            rows.push({
                                "id":employee.id,
                                "photo": employee.employer_card ? employee.employer_card.photo : null,
                                "name": employee.name,
                                "subdivisions": (employee.employer_infos !== null && employee.employer_infos.subdivisions.length) ? employee.employer_infos.subdivisions[0].name : "",
                                "professions": (employee.employer_infos !== null && employee.employer_infos.professions.length) ? employee.employer_infos.professions[0].name : "",
                                "phone": employee.employer_card.phone,
                                "status": employee.id
                            })
                        }):null}

                        {rows.length ?
                            stableSort(rows, getComparator(order, orderBy))
                                .slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
                                .map((card) => {
                                    const employeId = card.id;
                                    return (
                                        <TableRow key={card.id} hover component={Link} to={`/personnel/${employeId}`}>
                                            {card.photo !== null ?
                                                <TableCell>
                                                    <div className="photo_person" style={{ backgroundImage: `url(/storage/${card.photo})`}}></div>
                                                </TableCell>
                                                :
                                                <TableCell>
                                                    <div className="photo_person" style={{ backgroundImage: "url(/media/notPhoto.png)"}}></div>
                                                </TableCell>
                                            }

                                            <TableCell>{card.name}</TableCell>
                                            <TableCell>{card.subdivisions}</TableCell>
                                            <TableCell>{card.professions}</TableCell>
                                            <TableCell>{card.phone}</TableCell>
                                            <TableCell><div className="status_person"></div></TableCell>
                                        </TableRow>
                                    );
                                })
                            : null}

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
