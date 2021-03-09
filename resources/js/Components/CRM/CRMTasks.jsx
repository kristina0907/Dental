import React, {useEffect, useState} from "react";
import {Grid, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, TableSortLabel, IconButton, Collapse, Typography,Checkbox  } from "@material-ui/core";
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
import CRMAddTask from "../helpers/CRMAddTask";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getTasksCalling} from "../../actions/crmAction";
import store from "../../store";


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
                <TableCell />
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
                <TableCell>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                            <path d="M18.9025 7.82833L17.3358 7.62917C17.2067 7.23167 17.0475 6.84833 16.8617 6.48417L17.8292 5.23833C18.2208 4.73417 18.175 4.0225 17.7275 3.58917L16.415 2.27667C15.9775 1.825 15.2658 1.78 14.7608 2.17083L13.5167 3.13833C13.1525 2.9525 12.7692 2.79333 12.3708 2.66417L12.1717 1.1C12.0967 0.4725 11.5642 0 10.9333 0H9.06667C8.43583 0 7.90333 0.4725 7.82833 1.0975L7.62917 2.66417C7.23083 2.79333 6.8475 2.95167 6.48333 3.13833L5.23833 2.17083C4.735 1.78 4.02333 1.825 3.58917 2.2725L2.27667 3.58417C1.825 4.0225 1.77917 4.73417 2.17083 5.23917L3.13833 6.48417C2.95167 6.84833 2.79333 7.23167 2.66417 7.62917L1.1 7.82833C0.4725 7.90333 0 8.43583 0 9.06667V10.9333C0 11.5642 0.4725 12.0967 1.0975 12.1717L2.66417 12.3708C2.79333 12.7683 2.9525 13.1517 3.13833 13.5158L2.17083 14.7617C1.77917 15.2658 1.825 15.9775 2.2725 16.4108L3.585 17.7233C4.02333 18.1742 4.73417 18.2192 5.23917 17.8283L6.48417 16.8608C6.84833 17.0475 7.23167 17.2067 7.62917 17.335L7.82833 18.8983C7.90333 19.5275 8.43583 20 9.06667 20H10.9333C11.5642 20 12.0967 19.5275 12.1717 18.9025L12.3708 17.3358C12.7683 17.2067 13.1517 17.0475 13.5158 16.8617L14.7617 17.8292C15.2658 18.2208 15.9775 18.175 16.4108 17.7275L17.7233 16.415C18.175 15.9767 18.2208 15.2658 17.8292 14.7608L16.8617 13.5158C17.0483 13.1517 17.2075 12.7683 17.3358 12.3708L18.8992 12.1717C19.5267 12.0967 19.9992 11.5642 19.9992 10.9333V9.06667C20 8.43583 19.5275 7.90333 18.9025 7.82833ZM10 14.1667C7.7025 14.1667 5.83333 12.2975 5.83333 10C5.83333 7.7025 7.7025 5.83333 10 5.83333C12.2975 5.83333 14.1667 7.7025 14.1667 10C14.1667 12.2975 12.2975 14.1667 10 14.1667Z" fill="#16181E"/>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="20" height="20" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </TableCell>
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
    { id: "fio", numeric: false, label: "ФИО" },
    { id: "date_inspection", numeric: false, label: "Дата проф. осмотра" },
    { id: "date_last_appointment", numeric: false, label: "Дата последнего приема" },
    { id: "doctor", numeric: false, label: "Врач" },
    { id: "phone", numeric: false, label: "Номер телефона" }
];

function CRMTasks({tasksCalling, branches, responsible})  {
    const classes = useStyles();
    const [getVisibleAddTask, setVisibleAddTask] = useState(false);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = [];
    useEffect(() => {
        store.dispatch(getTasksCalling());
    },[]);


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
                                <div className="title_filter">Период</div>
                                <form action="">
                                    <div className="form_radio">
                                        <input id="radio-1"
                                               name={`gender`}
                                               type="radio"
                                               value="1"/>
                                        <label htmlFor="radio-1">Весь период</label>
                                    </div>
                                    <div className="form_radio">
                                        <input id="radio-2"
                                               name={`gender`}
                                               type="radio"
                                               value="1"/>
                                        <label htmlFor="radio-2">Выборочно</label>
                                    </div>
                                    <div className="form_radio">
                                        <input id="radio-3"
                                               name={`gender`}
                                               type="radio"
                                               value="1"/>
                                        <label htmlFor="radio-3">День</label>
                                    </div>
                                    <div className="form_radio">
                                        <input id="radio-4"
                                               defaultChecked={true}
                                               name={`gender`}
                                               type="radio"
                                               value="1"/>
                                        <label htmlFor="radio-4">Месяц</label>
                                    </div>
                                    <div className="form_radio">
                                        <input id="radio-5"
                                               name={`gender`}
                                               type="radio"
                                               value="1"/>
                                        <label htmlFor="radio-5">Год</label>
                                    </div>
                                    <div className="title_filter">Вид отчета</div>
                                    <select name="" id="">
                                        <option value="1">Группировка</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Показывать</option>
                                    </select>
                                    <div className="title_filter">Итоги по уровням</div>
                                    <select name="" id="">
                                        <option value="1">Первый</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Второй</option>
                                    </select>
                                    <div className="title_filter">Прочее</div>
                                    <select name="" id="">
                                        <option value="1">Тип обращения</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Тема разговора</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Направление</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Успешность</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Сотрудник</option>
                                    </select>
                                    <div className="title_filter">Контакт</div>
                                    <input type="text" placeholder={"ФИО"}/>
                                    <input type="text" placeholder={"Номер телефона"}/>
                                    <div className="title_filter">Маркетинг</div>
                                    <select name="" id="">
                                        <option value="1">Рекламный канал</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Рекомендации</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Campaign</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Term</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Content</option>
                                    </select>
                                    <div className="container_btn_filter">
                                        <button type={"submit"} className="btn_filter">Сохранить</button>
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
                    <div className="add_list">
                        <Link className={`item_add_list active`} to={"/crm/tasks"}>Задачи для обзвона</Link>
                        <Link className={`item_add_list`} to={"/crm/tasks/assigned"}>Поставленные задачи</Link>
                    </div>
                    <Grid item className={`contaoner-info container_materials`}>
                        {hideBtnClicked.block_1 ? null : (
                            <div className="hide-shedule-btn">
                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                            </div>
                        )}
                        {!hideBtnClicked.block_1? (
                            <>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={8}><div className="title_material_table">Список пациентов</div></Grid>
                                    <Grid item xs={12} md={4}>
                                        <div className="btn_top_table">
                                            <button className={`btn_new_category`}  disabled={selected && selected.length ? false : true} type="button" onClick={() => setVisibleAddTask(true)}>
                                                Добавить задачу
                                            </button>
                                        </div>
                                    </Grid>
                                </Grid>
                                <CRMAddTask branches={branches} responsible={responsible} users={selected} getVisible={getVisibleAddTask} visible={setVisibleAddTask}/>
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
                                        {tasksCalling && "data" in tasksCalling?
                                            Object.keys(tasksCalling.data).map((index) => {
                                                let item = tasksCalling.data[index];
                                                rows.push({
                                                    "id":item.id,
                                                    "fio": item.name,
                                                    "date_inspection":item.review_order ? item.review_order.updated_at:"",
                                                    "date_last_appointment":item.last_shedule_date? item.last_shedule_date.date:"",
                                                    "doctor":item.review_order ? item.review_order.doctor.name:"",
                                                    "phone":item.contacts && item.contacts.length? item.contacts[0].phone:"",
                                                })
                                            }):null}
                                        <TableBody>
                                            {stableSort(rows, getComparator(order, orderBy))
                                                .slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
                                                .map((card,index) => {
                                                    const isItemSelected = isSelected(card.id);
                                                    const labelId = `enhanced-table-checkbox-${index}`;
                                                    return (
                                                        <TableRow
                                                            onClick={(event) => handleClick(event, card.id)}
                                                            role="checkbox"
                                                            aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            key={card.id}
                                                            selected={isItemSelected}
                                                        >
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    checked={isItemSelected}
                                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                                />
                                                            </TableCell>
                                                            <TableCell>{card.fio}</TableCell>
                                                            <TableCell>{card.date_inspection}</TableCell>
                                                            <TableCell>{card.date_last_appointment}</TableCell>
                                                            <TableCell>{card.doctor}</TableCell>
                                                            <TableCell>{card.phone}</TableCell>
                                                            <TableCell/>
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
    tasksCalling: state.crm.tasksCalling.users,
    branches:state.crm.tasksCalling.branches,
    responsible:state.crm.tasksCalling.administrators,
});

export default connect(mapStateToProps, { getTasksCalling })(CRMTasks);

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
