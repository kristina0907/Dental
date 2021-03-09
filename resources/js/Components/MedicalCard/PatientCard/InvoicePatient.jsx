import React, {useEffect, useState} from "react";
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    TableSortLabel,
    Collapse,
    FormControlLabel, SvgIcon, Menu, MenuItem
} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Vector from "../../Appoints/media/Vector";
import {Box} from "@material-ui/core";
import {connect} from "react-redux";
import { getOrder} from "../../../actions/patientActions";
import store from "../../../store";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {useParams} from "react-router-dom";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";

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
                <TableCell />
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
            <TableCell/>
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
    { id: "date", numeric: false, label: "Дата" },
    { id: "doctor", numeric: false, label: "Врач" },
    { id: "operation", numeric: false, label: "Операция" },
    { id: "sum", numeric: false, label: "Сумма" },
];
function MoreIcon({index }) {
    return(
        <PopupState variant="popover" popupId={`menu_${index}`}>
            {(popupState) => (
                <React.Fragment>
                    <IconButton disableRipple disableFocusRipple component="div">
                        <SvgIcon width={4} height={16} viewBox={"0 0 4 16"} {...bindTrigger(popupState)}>
                            <circle cx="2" cy="2" r="2" fill="#B0BAC5"/>
                            <circle cx="2" cy="8" r="2" fill="#B0BAC5"/>
                            <circle cx="2" cy="14" r="2" fill="#B0BAC5"/>
                        </SvgIcon>
                    </IconButton>
                    <Menu className={"MoMenu"} {...bindMenu(popupState)}>
                        <MenuItem>К приёму в расписании</MenuItem>
                        <hr/>
                        <MenuItem >Изменить оплату</MenuItem>
                        <MenuItem >Изменить счет</MenuItem>
                        <MenuItem >Изменить материалы</MenuItem>
                        <hr/>
                        <MenuItem >Распечатать</MenuItem>
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    )
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.doctor}</TableCell>
                <TableCell>{row.operation}</TableCell>
                <TableCell>{row.sum}</TableCell>
                <TableCell align="right">
                    <div className="branch-more">
                        <FormControlLabel
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<MoreIcon index={row.id} />}
                        />
                    </div>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={0} width={`70%`}>
                            <div className="content_table_box">
                                <div className="title_history_table">{row.history}</div>
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


function MedicalHistory({orderPatient})  {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = [];
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
        "block_2": false,
    });
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const { patientId } = useParams();
    useEffect(() => {
        store.dispatch(getOrder(patientId));
    },[]);

    console.log(orderPatient);

    return(
        <Grid item xs={12} className={classes.wrapper_component}>
            <Grid item className={`contaoner-info container_materials`}>
                {hideBtnClicked.block_1 ? null : (
                    <div className="hide-shedule-btn">
                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                    </div>
                )}
                {!hideBtnClicked.block_1? (
                    <>
                        <Grid container>
                            <div className="title_material_table">Счета</div>
                        </Grid>
                        <TableContainer className="table_card">
                            <Table
                                className="main_table"
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
                                {
                                    (orderPatient && orderPatient.length)?
                                        (orderPatient).map((item) => {

                                            rows.push({
                                                "id": item.id,
                                                "date":item.updated_at,
                                                "doctor": item.doctor? item.doctor.name : "",
                                                "operation":item.product.name,
                                                "history":item.name,
                                                "sum": item.product.base_price,
                                            })
                                        }):null
                                }
                                <TableBody>
                                    {stableSort(rows, getComparator(order, orderBy))
                                        .slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
                                        .map((card) => {
                                            return (
                                                <Row key={card.name} row={card} />
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
                    </>
                ) : (
                    <div className={`show-shedule-btn`}>
                        <div className={`row ${classes.center}`}>
                            <div className="col-lg-5 left-line">
                                <hr />
                            </div>
                            <div className="col-lg-1 circle-btn">
                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: false})}>
                                    <Vector />
                                </button>
                            </div>
                            <div className="col-lg-5 right-line">
                                <hr />
                            </div>
                        </div>
                    </div>
                )}
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    orderPatient: state.patients.order,
});

export default connect(mapStateToProps, { getOrder })(MedicalHistory);

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
    wrapper_component: {
        marginBottom: "20px"
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
