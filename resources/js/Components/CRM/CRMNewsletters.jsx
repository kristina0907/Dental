import React, {useState}  from "react";
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
    { id: "date", numeric: false, label: "Дата" },
    { id: "employee", numeric: false, label: "Сотрудник" },
    { id: "name", numeric: false, label: "Название" },
    { id: "number", numeric: false, label: "Количество получателей" },
    { id: "sent", numeric: false, label: "Отправлено" },
    { id: "delivered", numeric: false, label: "Доставлено" },
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
            <TableRow >
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    {row.date}
                </TableCell>
                <TableCell>{row.employee}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.number}</TableCell>
                <TableCell>{row.sent}</TableCell>
                <TableCell>{row.delivered}</TableCell>
            </TableRow>
            <TableRow className={"table_row_comment"}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                           <div className="container_info_newsletters_table">
                               <div>
                                   <div className={"title_info_newsletters_table"}>Доставлено</div>
                                   <div>41</div>
                               </div>
                               <div>
                                   <div className={"title_info_newsletters_table"}>Отклонено</div>
                                   <div>17</div>
                               </div>
                               <div>
                                   <div className={"title_info_newsletters_table"}>Ошибка доставки</div>
                                   <div>7</div>
                               </div>
                           </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}



export default function CRMHistory({})  {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = [
        {"id":"1","date":"29.09.2020", "employee":"Шульгинская Л.А.", "name":"СМС оповещение о приёмах","number":"57", "sent":"71,93%", "delivered":"71,93%"},
        {"id":"2","date":"29.09.2020", "employee":"Шульгинская Л.А.", "name":"СМС оповещение о приёмах","number":"57", "sent":"71,93%", "delivered":"71,93%"},
        {"id":"3","date":"29.09.2020", "employee":"Шульгинская Л.А.", "name":"СМС оповещение о приёмах","number":"57", "sent":"71,93%", "delivered":"71,93%"},
        {"id":"4","date":"29.09.2020", "employee":"Шульгинская Л.А.", "name":"СМС оповещение о приёмах","number":"57", "sent":"71,93%", "delivered":"71,93%"},
        {"id":"5","date":"29.09.2020", "employee":"Шульгинская Л.А.", "name":"СМС оповещение о приёмах","number":"57", "sent":"71,93%", "delivered":"71,93%"},
        {"id":"6","date":"29.09.2020", "employee":"Шульгинская Л.А.", "name":"СМС оповещение о приёмах","number":"57", "sent":"71,93%", "delivered":"71,93%"},
        {"id":"7","date":"29.09.2020", "employee":"Шульгинская Л.А.", "name":"СМС оповещение о приёмах","number":"57", "sent":"71,93%", "delivered":"71,93%"},
        {"id":"8","date":"29.09.2020", "employee":"Шульгинская Л.А.", "name":"СМС оповещение о приёмах","number":"57", "sent":"71,93%", "delivered":"71,93%"},
        {"id":"9","date":"29.09.2020", "employee":"Шульгинская Л.А.", "name":"СМС оповещение о приёмах","number":"57", "sent":"71,93%", "delivered":"71,93%"},
        {"id":"10","date":"29.09.2020", "employee":"Шульгинская Л.А.", "name":"СМС оповещение о приёмах","number":"57", "sent":"71,93%", "delivered":"71,93%"},
        {"id":"11","date":"29.09.2020", "employee":"Шульгинская Л.А.", "name":"СМС оповещение о приёмах","number":"57", "sent":"71,93%", "delivered":"71,93%"},
        {"id":"12","date":"29.09.2020", "employee":"Шульгинская Л.А.", "name":"СМС оповещение о приёмах","number":"57", "sent":"71,93%", "delivered":"71,93%"},
    ];
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
        "block_2": false,
        "block_3": false,
    });

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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
                                <div className="title_filter">Фильтр</div>
                                <form action="">
                                    <input type="date" placeholder={"Дата от"}/>
                                    <input type="date" placeholder={"Дата до"}/>
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
                <Grid item xs={12}>
                    <NavigationCRM />
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={9}className={classes.wrapper_component}>
                            <Grid item className={`contaoner-info container_materials`}>
                                {hideBtnClicked.block_1 ? null : (
                                    <div className="hide-shedule-btn">
                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                                    </div>
                                )}
                                {!hideBtnClicked.block_1? (
                                    <>
                                        <div className="title_material_table">История оповещений</div>
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
                                                <TableBody>
                                                    <TableRow className={"date_call_table"}>
                                                        <TableCell colspan="3" />
                                                        <TableCell>
                                                            Итого:
                                                        </TableCell>
                                                        <TableCell>
                                                            203
                                                        </TableCell>
                                                        <TableCell>
                                                            78%
                                                        </TableCell>
                                                        <TableCell>
                                                            69,95%
                                                        </TableCell>
                                                    </TableRow>
                                                    {stableSort(rows, getComparator(order, orderBy))
                                                        .slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
                                                        .map((card) => {
                                                            return (
                                                                <Row key={card.id} row={card} />
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
                        <Grid item xs={12} md={3}className={classes.wrapper_component}>
                            <div className="balance">
                                {hideBtnClicked.block_3 ? null : (
                                    <div className="hide-shedule-btn">
                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_3: true})}/>
                                    </div>
                                )}
                                {!hideBtnClicked.block_3? (
                                    <div>
                                        <div className="title_filter">Баланс</div>
                                        <div className="sum_balance">1000 Р</div>
                                        <button className="btn_filter">Пополнить</button>
                                    </div>
                                ) : (
                                    <div className={`show-shedule-btn`}>
                                        <div className={`row ${classes.center}`}>
                                            <div className="col-lg-5 left-line">
                                                <hr />
                                            </div>
                                            <div className="col-lg-1 circle-btn">
                                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_3: false})}>
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
                </Grid>
            </Grid>
        </Grid>
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
