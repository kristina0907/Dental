import React, {useState,useEffect}  from "react";
import {Grid, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, TableSortLabel, IconButton, Menu, MenuItem, Divider  } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Vector from "../Appoints/media/Vector";
import NavigationCRM from "./NavigationCRM";
import {Box} from "@material-ui/core";
import Header from "../helpers/Header";
import HeaderRight from "../helpers/HeaderRight";
import IncomingCall from "../IncomingCall";
import MoreIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";
import ScheduleAppointment from "../helpers/ScheduleAppointment";
import {getWaitinglists} from "../../actions/crmAction";
import {connect} from "react-redux";
import store from "../../store";
import {useForm} from "react-hook-form";



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
    const { classes, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
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
                <TableCell />
            </TableRow>
        </TableHead>
    );
}
EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};
const headCells = [
    { id: "date", numeric: false, label: "Дата добавления" },
    { id: "fio", numeric: false, label: "ФИО" },
    { id: "phone", numeric: false, label: "Телефона" },
    { id: "doctor", numeric: false, label: "Врач" },
    { id: "reception", numeric: false, label: "Приём" },
    { id: "duration", numeric: false, label: "Длительность" },
    { id: "description", numeric: false, label: "Описание" },
    { id: "actualUntil", numeric: false, label: "Актуально до" },


];

function CRMWaitingList({waitinglists})  {
    const classes = useStyles();
    const [getVisibleScheduleAppointment, setVisibleScheduleAppointment] = useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [getUpdated,setUpdated] = useState(false);
    const rows = [];
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
        "block_2": false,
    });
    const menu = userMenuStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        store.dispatch(getWaitinglists(page));
    },[]);
    useEffect(() => {
        if(getUpdated){
            store.dispatch(getWaitinglists(page));
            setUpdated(false);
        }
    },[getUpdated]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        store.dispatch(getWaitinglists(newPage));
        setPage(newPage);
    };
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;

    return(
        <Grid container spacing={4}>
            <Grid item xs={12} md={3} lg={3} xl={2}>
                <Grid item xs={12} className={classes.wrapper_component}>
                    <IncomingCall />
                </Grid>
                <Grid item xs={12} className={classes.wrapper_component}>
                    <div className="filter_material">
                        {hideBtnClicked.block_2 ? null : (
                            <div className="hide-shedule-btn">
                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_2: true})}/>
                            </div>
                        )}
                        {!hideBtnClicked.block_2? (
                            <div>
                                <div className="title_filter">Свободные даты</div>
                                <form action="">
                                    <input type="date" placeholder={"дата"}/>
                                    <select name="" id="">
                                        <option value="1">Врач</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Длительность</option>
                                    </select>
                                    <div className="title_filter">Прочее</div>
                                    <select name="" id="">
                                        <option value="1">Длительность</option>
                                    </select>
                                    <div className="container_btn_filter">
                                        <button type={"submit"} className="btn_filter">Применить</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className={`show-shedule-btn`}>
                                <div className={`row ${classes.center}`}>
                                    <div className="col-lg-5 left-line">
                                        <hr />
                                    </div>
                                    <div className="col-lg-1 circle-btn">
                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_2: false})}>
                                            <Vector />
                                        </button>
                                    </div>
                                    <div className="col-lg-5 right-line">
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={12} md={9} lg={9} xl={10}>
                <Grid item xs={12} className={"wrapper_component"}>
                    <Grid item xs={12} md={9} xl={9}>
                        <Box>
                            <Header breadcrumb={
                                {
                                    "pageTitle": "CRM",
                                    "links":[
                                        {"url": "/", "title": "Главная"},
                                        {"url": "/crm/history", "title": "CRM"}
                                    ]
                                }
                            }/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3} xl={3}>
                        <Box>
                            <HeaderRight />
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.wrapper_component}>
                    <NavigationCRM />
                    <Grid item className={`contaoner-info container_materials`}>
                        {hideBtnClicked.block_1 ? null : (
                            <div className="hide-shedule-btn">
                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                            </div>
                        )}
                        {!hideBtnClicked.block_1? (
                            <>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={8}><div className="title_material_table">Лист ожидания</div></Grid>
                                <Grid item xs={12} md={4}>
                                    <div className="btn_top_table">
                                        <button className="btn_new_category" type="button" onClick={() => setVisibleScheduleAppointment(true)}>
                                            Запланировать приём
                                        </button>
                                    </div>
                                </Grid>
                            </Grid>
                                <ScheduleAppointment update={setUpdated} getVisible={getVisibleScheduleAppointment} visible={setVisibleScheduleAppointment}/>
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
                                        {console.log(waitinglists)}
                                        {waitinglists && "data" in  waitinglists?
                                            (waitinglists.data).map((item) => {
                                                rows.push({
                                                    "id":item.id,
                                                    "date": item.created_at,
                                                    "fio":item.patient? item.patient.name : "",
                                                    "phone":item.patient && item.patient.contacts.length? item.patient.contacts[0].phone : "",
                                                    "doctor":item.doctor? item.doctor.name : "",
                                                    "reception":"",
                                                    "duration":item.duration,
                                                    "actualUntil":item.date_to,
                                                    "description":item.comment,
                                                })
                                            }):null}
                                        <TableBody>
                                            {stableSort(rows, getComparator(order, orderBy))
                                                .map((card,index) => {
                                                    const isItemSelected = isSelected(card.id);
                                                    const labelId = `enhanced-table-checkbox-${index}`;
                                                    return (
                                                        <TableRow>
                                                            <TableCell>{card.date}</TableCell>
                                                            <TableCell>{card.fio}</TableCell>
                                                            <TableCell>{card.phone}</TableCell>
                                                            <TableCell>{card.doctor}</TableCell>
                                                            <TableCell>{card.reception}</TableCell>
                                                            <TableCell>{card.duration}</TableCell>
                                                            <TableCell>{card.description}</TableCell>
                                                            <TableCell>{card.actualUntil}</TableCell>
                                                            <TableCell align="right">
                                                                <div>
                                                                    <IconButton onClick={handleClickMenu} aria-haspopup="true"  edge="end">
                                                                        <MoreIcon />
                                                                    </IconButton>
                                                                    <Menu
                                                                        id={`menu-${index}`}
                                                                        anchorEl={anchorEl}
                                                                        keepMounted
                                                                        open={Boolean(anchorEl)}
                                                                        onClose={handleClose}
                                                                        className={menu.root}
                                                                    >
                                                                        <Grid container justify="flex-end">
                                                                            <IconButton
                                                                                disableFocusRipple={true}
                                                                                disableRipple={true}
                                                                                onClick={handleClose}
                                                                                aria-haspopup="false"
                                                                                edge="end"
                                                                                size={'small'}
                                                                            >
                                                                                <CloseIcon />
                                                                            </IconButton>
                                                                        </Grid>
                                                                        <MenuItem onClick={handleClose}>Записаться на приём</MenuItem>
                                                                        <MenuItem onClick={handleClose}>Изменить</MenuItem>
                                                                        <MenuItem onClick={handleClose}>Удалить</MenuItem>
                                                                        <Divider />
                                                                        <MenuItem onClick={handleClose}>К карточке</MenuItem>
                                                                        <MenuItem onClick={handleClose}>К приёму в расписании</MenuItem>
                                                                    </Menu>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <ThemeProvider theme={theme_main}>
                                {waitinglists &&
                                  <Pagination
                                      className={classes.pagination}
                                      count={Math.ceil((waitinglists.total) / waitinglists.per_page)}
                                      page={page}
                                      onChange={handleChangePage}
                                      shape="rounded"
                                      color="primary"
                                      variant={"outlined"}
                                  />
                                }
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
            </Grid>
        </Grid>
    )
}


const mapStateToProps = (state) => ({
    waitinglists: state.crm.waitinglists,
});

export default connect(mapStateToProps, { getWaitinglists })(CRMWaitingList);

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

const userMenuStyles = makeStyles({
    root: {
        '& ul': {
            padding: '0 20px 20px 20px',
        },
        '& li': {
            fontSize: '12px',
            textAlign:'center',
            color: '#3B80D6',
            display: 'block',
        }
    }
});
