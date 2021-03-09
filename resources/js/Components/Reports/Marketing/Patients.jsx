import React, {useState}  from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Pagination from '@material-ui/lab/Pagination';
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {makeStyles} from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Vector from "../../Appoints/media/Vector";
import NavigationReports from "../NavigationReports";
import {Box} from "@material-ui/core";
import IncomingCall from  "../../IncomingCall";
import Header from "../../helpers/Header";
import HeaderRight from "../../helpers/HeaderRight";
import {Link} from "react-router-dom";

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
    { id: "number", numeric: false, label: "Номер" },
    { id: "patient", numeric: false, label: "Пациент" },
    { id: "status", numeric: false, label: "Статус" },
    { id: "gender", numeric: false, label: "Пол" },
    { id: "birthday", numeric: false, label: "Дата рождения" },
    { id: "firstVisit", numeric: false, label: "Первый приём" },
    { id: "lastVisit", numeric: false, label: "Последний приём" },
    { id: "allVisit", numeric: false, label: "Все приёмы (успешные)" },
    { id: "percent", numeric: false, label: "% от общего счета" },
    { id: "personaAccount", numeric: false, label: "Личный счет" },
    { id: "sum", numeric: false, label: "Сумма выставленных счетов" },

];

export default function TableCards({goToPage, getItdPatient, medicalCards})  {
    const classes = useStyles();
    const mainStyles = useMainStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = [
        {"id":"1", "number":"4648", "patient":"Шульская Л.А.", "status":"Повторный", "gender":"ж", "birthday":"28.09.1010 (20)","firstVisit":"10.05.2012","lastVisit":"27.09.2020","allVisit":"4(2)","percent":"67%","personaAccount":"4 190","sum":"381 915" },
        {"id":"2", "number":"4648", "patient":"Шульская Л.А.", "status":"Повторный", "gender":"ж", "birthday":"28.09.1010 (20)","firstVisit":"10.05.2012","lastVisit":"27.09.2020","allVisit":"4(2)","percent":"67%","personaAccount":"4 190","sum":"381 915" },
        {"id":"3", "number":"4648", "patient":"Шульская Л.А.", "status":"Повторный", "gender":"м", "birthday":"28.09.1010 (20)","firstVisit":"10.05.2012","lastVisit":"27.09.2020","allVisit":"4(2)","percent":"67%","personaAccount":"4 190","sum":"381 915" },
        {"id":"4", "number":"4648", "patient":"Шульская Л.А.", "status":"Повторный", "gender":"ж", "birthday":"28.09.1010 (20)","firstVisit":"10.05.2012","lastVisit":"27.09.2020","allVisit":"4(2)","percent":"67%","personaAccount":"4 190","sum":"381 915" },
        {"id":"5", "number":"4648", "patient":"Шульская Л.А.", "status":"Повторный", "gender":"ж", "birthday":"28.09.1010 (20)","firstVisit":"10.05.2012","lastVisit":"27.09.2020","allVisit":"4(2)","percent":"67%","personaAccount":"4 190","sum":"381 915" },
        {"id":"6", "number":"4648", "patient":"Шульская Л.А.", "status":"Повторный", "gender":"ж", "birthday":"28.09.1010 (20)","firstVisit":"10.05.2012","lastVisit":"27.09.2020","allVisit":"4(2)","percent":"67%","personaAccount":"4 190","sum":"381 915" },
        {"id":"7", "number":"4648", "patient":"Шульская Л.А.", "status":"Повторный", "gender":"м", "birthday":"28.09.1010 (20)","firstVisit":"10.05.2012","lastVisit":"27.09.2020","allVisit":"4(2)","percent":"67%","personaAccount":"4 190","sum":"381 915" },
        {"id":"8", "number":"4648", "patient":"Шульская Л.А.", "status":"Повторный", "gender":"ж", "birthday":"28.09.1010 (20)","firstVisit":"10.05.2012","lastVisit":"27.09.2020","allVisit":"4(2)","percent":"67%","personaAccount":"4 190","sum":"381 915" },
        {"id":"9", "number":"4648", "patient":"Шульская Л.А.", "status":"Повторный", "gender":"ж", "birthday":"28.09.1010 (20)","firstVisit":"10.05.2012","lastVisit":"27.09.2020","allVisit":"4(2)","percent":"67%","personaAccount":"4 190","sum":"381 915" },
        {"id":"10", "number":"4648", "patient":"Шульская Л.А.", "status":"Повторный", "gender":"ж", "birthday":"28.09.1010 (20)","firstVisit":"10.05.2012","lastVisit":"27.09.2020","allVisit":"4(2)","percent":"67%","personaAccount":"4 190","sum":"381 915" },
        {"id":"11", "number":"4648", "patient":"Шульская Л.А.", "status":"Повторный", "gender":"м", "birthday":"28.09.1010 (20)","firstVisit":"10.05.2012","lastVisit":"27.09.2020","allVisit":"4(2)","percent":"67%","personaAccount":"4 190","sum":"381 915" },
        {"id":"12", "number":"4648", "patient":"Шульская Л.А.", "status":"Повторный", "gender":"ж", "birthday":"28.09.1010 (20)","firstVisit":"10.05.2012","lastVisit":"27.09.2020","allVisit":"4(2)","percent":"67%","personaAccount":"4 190","sum":"381 915" },
    ];
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
        "block_2": false,
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
                                <div className="title_filter">Фильтры</div>
                                <form action="">
                                    <select name="" id="">
                                        <option value="1">Статус</option>
                                    </select>
                                    <div className="form_radio">
                                        <input id="radio-1"
                                               name={`gender`}
                                               type="radio"
                                               value="1"/>
                                        <label htmlFor="radio-1">Мужской</label>
                                    </div>
                                    <div className="form_radio">
                                        <input id="radio-2"
                                               name={`gender`}
                                               type="radio"
                                               value="1"/>
                                        <label htmlFor="radio-2">Женский</label>
                                    </div>
                                    <input type="date" placeholder={"Дата рождения"}/>
                                    <div className="title_filter">Был на приёме</div>
                                    <input type="date" placeholder={"Дата c"}/>
                                    <input type="date" placeholder={"Дата до"}/>
                                    <div className="title_filter">Дополнительно</div>
                                    <select name="" id="">
                                        <option value="1">Откуда узнал</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Причина</option>
                                    </select>
                                    <div className="title_filter">Будущие приёмы</div>
                                    <select name="" id="">
                                        <option value="1">В записи</option>
                                    </select>
                                    <div className="title_filter">ДМС и купоны</div>
                                    <input type="text" placeholder={"Сумма ДМС"}/>
                                    <div className="title_filter">Лечение</div>
                                    <div className="title_filter_level">Первый приём</div>
                                    <input type="date" placeholder={"Дата c"}/>
                                    <input type="date" placeholder={"Дата до"}/>
                                    <div className="title_filter_level">Последний приём</div>
                                    <input type="date" placeholder={"Дата c"}/>
                                    <input type="date" placeholder={"Дата до"}/>
                                    <select name="" id="">
                                        <option value="1">Лечившие врачи</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Не лечившие врачи</option>
                                    </select>
                                    <div className="title_filter_level">Состояние пациента</div>
                                    <select name="" id="">
                                        <option value="1">Терапия</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Ортопедия</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Ортодонтия</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Пародонтология</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Хирургия</option>
                                    </select>
                                    <div className="container_btn_filter">
                                        <button type={"submit"} className="btn_filter">Применить</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className={`show-shedule-btn`}>
                                <div className={`row ${mainStyles.center}`}>
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
                                    "pageTitle": "Отчеты",
                                    "links":[
                                        {"url": "/", "title": "Главная"},
                                        {"url": "/reports/marketing/patient", "title": "Отчеты"}
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
                    <NavigationReports />
                    <div className="add_list">
                        <Link className="item_add_list active" to={"/reports/marketing/patient"}>Пациенты</Link>
                        <Link className="item_add_list" to={"/reports/marketing/discounts"}>Скидки</Link>
                        <Link className="item_add_list" to={"/reports/marketing/adminConversion"}>Конверсия администратора</Link>
                        <Link className="item_add_list" to={"/reports/marketing/advertisingChannels"}>Рекламные каналы и источники</Link>
                    </div>
                    <Grid item className={`contaoner-info container_materials`}>
                        {hideBtnClicked.block_1 ? null : (
                            <div className="hide-shedule-btn">
                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                            </div>
                        )}
                        {!hideBtnClicked.block_1? (
                            <>
                                <div className="title_material_table">Отчет. Пациенты</div>
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
                                        <TableBody>
                                            <TableRow className={"date_call_table"}>
                                                <TableCell colspan="8" />
                                                <TableCell>
                                                    Итого:
                                                </TableCell>
                                                <TableCell>
                                                    381 915 Р
                                                </TableCell>
                                                <TableCell>
                                                    9 310 950 Р
                                                </TableCell>
                                            </TableRow>
                                            {stableSort(rows, getComparator(order, orderBy))
                                                .slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
                                                .map((card) => {
                                                    return (
                                                        <TableRow key={card.id}>
                                                            <TableCell>{card.number}</TableCell>
                                                            <TableCell>{card.patient}</TableCell>
                                                            <TableCell>{card.status}</TableCell>
                                                            <TableCell>
                                                                {card.gender == "ж"?
                                                                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M5.1475 11.2931L5.1475 12.7787L4.25269 12.7787L4.25269 14.6578L5.1475 14.6578L5.1475 16L7.38451 16L7.38451 14.6578L8.36879 14.6578L8.36879 12.7787L7.38451 12.7787L7.38451 11.3091C9.97944 10.8044 12 8.48472 12 5.70608C12 2.55977 9.43281 7.29243e-07 6.2865 4.54184e-07C3.14009 1.79117e-07 0.591512 2.55968 0.591512 5.70608C0.591511 8.45465 2.55256 10.7552 5.1475 11.2931ZM6.27898 2.2371C8.1918 2.2371 9.74805 3.79335 9.74805 5.70617C9.74805 7.61908 8.1918 9.17533 6.27898 9.17533C4.36607 9.17533 2.80982 7.61908 2.80982 5.70617C2.80991 3.79326 4.36607 2.2371 6.27898 2.2371Z" fill="#F08786"/>
                                                                    </svg>
                                                                :
                                                                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M1.46027 7.09803C-0.00244451 9.63153 0.862666 12.8793 3.39623 14.342C5.9298 15.8048 9.19003 14.9388 10.6527 12.4053C11.9452 10.1668 11.3909 7.35524 9.53526 5.74378L10.6996 3.72704L10.9957 4.57596L12.6336 3.9807L11.3666 0.468511L7.62131 1.07593L7.91274 2.80705L8.91847 2.652L7.72565 4.71803C5.38549 3.94595 2.73741 4.88596 1.46027 7.09803ZM8.83646 11.3567C7.94719 12.8969 5.97056 13.4266 4.43023 12.5373C2.88991 11.648 2.36027 9.67133 3.24954 8.13107C4.13885 6.59074 6.11547 6.0611 7.6558 6.95041C9.19613 7.83972 9.72577 9.81635 8.83646 11.3567Z" fill="#3B80D6"/>
                                                                    </svg>
                                                                }
                                                            </TableCell>
                                                            <TableCell>{card.birthday}</TableCell>
                                                            <TableCell>{card.firstVisit}</TableCell>
                                                            <TableCell>{card.lastVisit}</TableCell>
                                                            <TableCell>{card.allVisit}</TableCell>
                                                            <TableCell>{card.percent}</TableCell>
                                                            <TableCell>{card.personaAccount}</TableCell>
                                                            <TableCell>{card.sum}</TableCell>
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
                                <div className={`row ${mainStyles.center}`}>
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
const useMainStyles = makeStyles(() => ({
    flex: {
        display: 'flex',
    },
    mright: {
        marginRight: '25px',
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    grid: {
        margin: '10px 0',
    },
    paperLeft: {
        padding: '0 15px 0 0',
    },
    paperRight: {
        padding: '0 0 0 15px',
    },
    rpaper: {
        display: 'flex',
        justifyContent: 'center',
    },
    inputGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '30px 0 0 0 !important',
    },
    textArea: {
        minHeight: '60px',
    },
    textLabel: {
        fontSize: '.9rem',
    },
    buttonSave: {
        marginTop: '30px',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#F6F7F8',
        background: '#3B80D6',
        borderRadius: '25px',
        border: 'none',
        padding: '8px 13px',
    },
    buttonGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '40px !important',
    },

    card_container_left: {
        margin: '0 25px 25px 0',
    },
    card_container_right: {
        margin: '0 0 25px 25px',
    }
}));
