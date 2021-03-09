import React, {useEffect, useState} from "react";
import {Grid, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, TableSortLabel, IconButton, Collapse, Typography } from "@material-ui/core";
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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getAllTasks,getSelectFilter,getFilterTasks,getpageTasks} from "../../actions/crmAction";
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
    { id: "branch", numeric: false, label: "Филиал" },
    { id: "fio", numeric: false, label: "ФИО пациента" },
    { id: "date", numeric: false, label: "Дата постановки задачи" },
    { id: "deadline", numeric: false, label: "Крайний срок" },
    { id: "responsible", numeric: false, label: "Ответственный" },
    { id: "status", numeric: false, label: "Статус" },
];

function Row(props) {
    const { row, index } = props;
    const menu = userMenuStyles();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <TableRow className={`row_color ${row.status.color}`}>
                <TableCell>
                    {row.status.id == "2" &&
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    }
                    {row.status.id == "4" &&
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    }
                </TableCell>
                <TableCell>
                    {row.branch}
                </TableCell>
                <TableCell>{row.fio}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.deadline}</TableCell>
                <TableCell>{row.responsible}</TableCell>
                <TableCell>{row.status.name}</TableCell>
            </TableRow>
            <TableRow className={"table_row_comment"}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <div className="container_info_newsletters_table">
                                <div>
                                    <div className={"title_info_newsletters_table"}>Дата переноса задачи</div>
                                    <div>25.11.220 12:30</div>
                                </div>
                                <div>
                                    <div className={"title_info_newsletters_table"}>Причина переноса</div>
                                    <div>Телефон недоступен</div>
                                </div>
                                <div>
                                    <div className={"title_info_newsletters_table"}>Комментарий</div>
                                    <div>Телефон пациента был недоступен</div>
                                </div>
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}



function CRMAssignedTask({allTasks,selectFilter,filterResultTasks})  {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const rows = [];
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
        "block_2": false,
        "block_3": false,
    });
    useEffect(() => {
        store.dispatch(getpageTasks(page));
    },[]);

    useEffect(() => {
        store.dispatch(getSelectFilter());
    },[]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
      store.dispatch(getpageTasks(newPage));
        setPage(newPage);
    };


    const { handleSubmit, register } = useForm();
    const onSubmit = (values) => {
        store.dispatch(getFilterTasks(values));
    };

    const [getClear, setClear] = React.useState(false);
    const clearFilters = () => {
      setClear(true);
    };
    useEffect(() => {
    },[filterResultTasks]);

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
                                <form name={'filterCRM'} onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form_radio">
                                        <input id="radio-1"
                                               ref={register}
                                               name={`period`}
                                               type="radio"
                                               value="all"/>
                                        <label htmlFor="radio-1">Весь период</label>
                                    </div>
                                    {/*<div className="form_radio">*/}
                                    {/*    <input id="radio-2"*/}
                                    {/*           ref={register}*/}
                                    {/*           name={`period `}*/}
                                    {/*           type="radio"*/}
                                    {/*           value="1"/>*/}
                                    {/*    <label htmlFor="radio-2">Выборочно</label>*/}
                                    {/*</div>*/}
                                    <div className="form_radio">
                                        <input id="radio-3"
                                               ref={register}
                                               name={`period`}
                                               type="radio"
                                               value="day"/>
                                        <label htmlFor="radio-3">День</label>
                                    </div>
                                    <div className="form_radio">
                                        <input id="radio-4"
                                               ref={register}
                                               defaultChecked={true}
                                               name={`period`}
                                               type="radio"
                                               value="month"/>
                                        <label htmlFor="radio-4">Месяц</label>
                                    </div>
                                    <div className="form_radio">
                                        <input id="radio-5"
                                               ref={register}
                                               name={`period`}
                                               type="radio"
                                               value="year"/>
                                        <label htmlFor="radio-5">Год</label>
                                    </div>
                                    <div className="title_filter">Прочее</div>
                                    <select required name={`branch_id`}
                                            ref={register({
                                                required: "Филиал"
                                            })} >
                                        <option value="">Филиал</option>
                                        {selectFilter && selectFilter.branches && selectFilter.branches.length? (
                                            (selectFilter.branches).map((branche) => {
                                                return (
                                                    <option value={branche.id}>{branche.title}</option>
                                                )
                                            })
                                        ): (null)}
                                    </select>
                                    <select name={`patient_id`} ref={register} >
                                        <option value="">ФИО пациента</option>
                                        {selectFilter && selectFilter.patients && selectFilter.patients.length? (
                                            (selectFilter.patients).map((patient) => {
                                                return (
                                                    <option value={patient.id}>{patient.name}</option>
                                                )
                                            })
                                        ): (null)}
                                    </select>
                                    <select name={`administrator_id`} ref={register}>
                                        <option value="">Ответственный</option>
                                        {selectFilter && selectFilter.administrators && selectFilter.administrators.length? (
                                            (selectFilter.administrators).map((administrator) => {
                                                return (
                                                    <option value={administrator.id}>{administrator.name}</option>
                                                )
                                            })
                                        ): (null)}
                                    </select>
                                    <select name={`status_id`} ref={register}>
                                        <option value="">Статус</option>
                                        {selectFilter && selectFilter.statuses && selectFilter.statuses.length? (
                                            (selectFilter.statuses).map((status) => {
                                                return (
                                                    <option value={status.id}>{status.name}</option>
                                                )
                                            })
                                        ): (null)}
                                    </select>
                                    <div className="container_btn_filter">
                                        <button type={"reset"} onClick={()=>clearFilters()} className="btn_filter_clear">Очистить</button>
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
                <Grid item xs={12}>
                    <NavigationCRM />
                    <div className="add_list">
                        <Link className={`item_add_list`} to={"/crm/tasks"}>Задачи для обзвона</Link>
                        <Link className={`item_add_list active`} to={"/crm/tasks/assigned"}>Поставленные задачи</Link>
                    </div>
                        <Grid item xs={12} className={classes.wrapper_component}>
                            <Grid item className={`contaoner-info container_materials`}>
                                {hideBtnClicked.block_1 ? null : (
                                    <div className="hide-shedule-btn">
                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                                    </div>
                                )}
                                {!hideBtnClicked.block_1? (
                                    <>
                                        <div className="title_material_table">Список пациентов</div>
                                        <TableContainer className="table_card">
                                            <Table
                                                className="crm_history_table"
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
                                                {!getClear && filterResultTasks && filterResultTasks.data ?
                                                    (
                                                        <>
                                                            {filterResultTasks && "data" in  filterResultTasks?
                                                                (filterResultTasks.data).map((item) => {
                                                                    rows.push({
                                                                        "id":item.id,
                                                                        "branch": item.branch? item.branch.title:"",
                                                                        "fio":item.patient? item.patient.name:"",
                                                                        "date":item.created_at,
                                                                        "deadline":item.date,
                                                                        "responsible":item.administrator?item.administrator.name:"",
                                                                        "status":item.status? item.status:"",
                                                                    })
                                                                }):null}
                                                        </>
                                                    )
                                                    :
                                                    (
                                                    <>
                                                        {allTasks && "data" in  allTasks?
                                                            (allTasks.data).map((item) => {
                                                                rows.push({
                                                                    "id":item.id,
                                                                    "branch": item.branch? item.branch.title:"",
                                                                    "fio":item.patient? item.patient.name:"",
                                                                    "date":item.created_at,
                                                                    "deadline":item.date,
                                                                    "responsible":item.administrator?item.administrator.name:"",
                                                                    "status":item.status? item.status:"",
                                                                })
                                                            }):null}
                                                    </>
                                                    )
                                                }
                                                <TableBody>
                                                    {stableSort(rows, getComparator(order, orderBy))
                                                        // .slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
                                                        .map((card) => {
                                                            return (
                                                                <Row key={card.id} row={card} />
                                                            );
                                                        })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <ThemeProvider theme={theme_main}>
                                        {allTasks &&
                                          <Pagination
                                              className={classes.pagination}
                                              count={Math.ceil((allTasks.total) / allTasks.per_page)}
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
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    allTasks: state.crm.allTasks,
    selectFilter:state.crm.selectFilter,
    filterResultTasks:state.crm.filterResultTasks
});

export default connect(mapStateToProps, { getAllTasks,getSelectFilter,getFilterTasks,getpageTasks })(CRMAssignedTask);

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
