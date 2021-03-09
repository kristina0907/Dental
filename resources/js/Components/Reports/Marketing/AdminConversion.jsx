import React, {useState}  from "react";
import {Box,Grid,Table,TableBody,TableCell,TableContainer,TableRow,TableHead,IconButton,Typography, Collapse } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Vector from "../../Appoints/media/Vector";
import NavigationReports from "../NavigationReports";
import IncomingCall from  "../../IncomingCall";
import Header from "../../helpers/Header";
import HeaderRight from "../../helpers/HeaderRight";
import {Link} from "react-router-dom";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <div className={"date_records_table"}>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        <span>Октябрь 2020</span>
                    </div>
                </TableCell>
                <TableCell>{row.k1}</TableCell>
                <TableCell>{row.k2}</TableCell>
                <TableCell>{row.k3}</TableCell>
                <TableCell>{row.k4}</TableCell>
                <TableCell>{row.k5}</TableCell>
                <TableCell>{row.k6}</TableCell>
                <TableCell>{row.k7}</TableCell>
                <TableCell>{row.k8}</TableCell>
                <TableCell>{row.k9}</TableCell>
                <TableCell>{row.k10}</TableCell>
                <TableCell>{row.k11}</TableCell>
                <TableCell>{row.k12}</TableCell>
                <TableCell>{row.k13}</TableCell>
                <TableCell>{row.k14}</TableCell>
                <TableCell>{row.k15}</TableCell>
                <TableCell>{row.k16}</TableCell>
                <TableCell>{row.k17}</TableCell>
                <TableCell>{row.k18}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0}} colSpan={19}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{row.fio}</TableCell>
                                        <TableCell>{row.k1}</TableCell>
                                        <TableCell>{row.k2}</TableCell>
                                        <TableCell>{row.k3}</TableCell>
                                        <TableCell>{row.k4}</TableCell>
                                        <TableCell>{row.k5}</TableCell>
                                        <TableCell>{row.k6}</TableCell>
                                        <TableCell>{row.k7}</TableCell>
                                        <TableCell>{row.k8}</TableCell>
                                        <TableCell>{row.k9}</TableCell>
                                        <TableCell>{row.k10}</TableCell>
                                        <TableCell>{row.k11}</TableCell>
                                        <TableCell>{row.k12}</TableCell>
                                        <TableCell>{row.k13}</TableCell>
                                        <TableCell>{row.k14}</TableCell>
                                        <TableCell>{row.k15}</TableCell>
                                        <TableCell>{row.k16}</TableCell>
                                        <TableCell>{row.k17}</TableCell>
                                        <TableCell>{row.k18}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


export default function AdminConversion({})  {
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = [
        {"id":"1", "fio":"Бондаренко Н.Ю.", "k1":"0", "k2":"250", "k3":"244", "k4":"100", "k5":"41%", "k6":"43", "k7":"43%", "k8":"4", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},
        {"id":"2", "fio":"Васильев Н.Ю.", "k1":"0", "k2":"250", "k3":"244", "k4":"100", "k5":"41%", "k6":"4", "k7":"43%", "k8":"4", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},
        {"id":"3", "fio":"Мартюкова Н.Ю.", "k1":"0", "k2":"250", "k3":"24", "k4":"100", "k5":"41%", "k6":"43", "k7":"43%", "k8":"4", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},
        {"id":"4", "fio":"Митянина Н.Ю.", "k1":"0", "k2":"2", "k3":"244", "k4":"100", "k5":"41%", "k6":"43", "k7":"43%", "k8":"6", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},
        {"id":"5", "fio":"Бондаренко Н.Ю.", "k1":"0", "k2":"250", "k3":"244", "k4":"100", "k5":"1%", "k6":"43", "k7":"43%", "k8":"4", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},
        {"id":"6", "fio":"Бондаренко Н.Ю.", "k1":"0", "k2":"250", "k3":"244", "k4":"100", "k5":"41%", "k6":"43", "k7":"43%", "k8":"4", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},
        {"id":"7", "fio":"Бондаренко Н.Ю.", "k1":"0", "k2":"250", "k3":"244", "k4":"100", "k5":"41%", "k6":"43", "k7":"43%", "k8":"4", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},
        {"id":"8", "fio":"Бондаренко Н.Ю.", "k1":"5", "k2":"20", "k3":"244", "k4":"100", "k5":"41%", "k6":"43", "k7":"43%", "k8":"4", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},
        {"id":"9", "fio":"Бондаренко Н.Ю.", "k1":"0", "k2":"250", "k3":"244", "k4":"100", "k5":"41%", "k6":"43", "k7":"43%", "k8":"4", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},
        {"id":"10", "fio":"Бондаренко Н.Ю.", "k1":"0", "k2":"250", "k3":"244", "k4":"100", "k5":"41%", "k6":"43", "k7":"43%", "k8":"4", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},
        {"id":"11", "fio":"Бондаренко Н.Ю.", "k1":"0", "k2":"250", "k3":"244", "k4":"100", "k5":"41%", "k6":"43", "k7":"43%", "k8":"4", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},
        {"id":"12", "fio":"Бондаренко Н.Ю.", "k1":"0", "k2":"250", "k3":"244", "k4":"100", "k5":"41%", "k6":"43", "k7":"43%", "k8":"4", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},
        {"id":"13", "fio":"Бондаренко Н.Ю.", "k1":"0", "k2":"250", "k3":"244", "k4":"100", "k5":"41%", "k6":"43", "k7":"43%", "k8":"4", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},
        {"id":"14", "fio":"Бондаренко Н.Ю.", "k1":"0", "k2":"250", "k3":"244", "k4":"100", "k5":"41%", "k6":"43", "k7":"43%", "k8":"4", "k9":"4%", "k10":"47", "k11":"47%", "k12":"56", "k13":"17", "k14":"30%", "k15":"2", "k16":"4%","k17":"19","k18":"34%"},

    ];
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
        "block_2": false,
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                        <Link className="item_add_list" to={"/reports/marketing/patient"}>Пациенты</Link>
                        <Link className="item_add_list" to={"/reports/marketing/discounts"}>Скидки</Link>
                        <Link className="item_add_list active" to={"/reports/marketing/adminConversion"}>Конверсия администратора</Link>
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
                                <div className="title_material_table">Отчет. Конверсия администратора</div>
                                <TableContainer className="table_card">
                                    <Table
                                        className="main_table"
                                        aria-labelledby="tableTitle"
                                        aria-label="enhanced table"
                                    >
                                        <TableHead>
                                            <TableRow className={"main_title_table_reports"}>
                                                <TableCell/>
                                                <TableCell colSpan={5}>Обращений</TableCell>
                                                <TableCell colSpan={6}>Целевые</TableCell>
                                                <TableCell colSpan={7}>Из них первичные</TableCell>
                                            </TableRow>
                                            <TableRow className={"date_call_table"}>
                                                <TableCell/>
                                                <TableCell className={"border_table_header"}>Пропущ.</TableCell>
                                                <TableCell>Заверш.</TableCell>
                                                <TableCell>Не сотрудн.</TableCell>
                                                <TableCell>Кол-во обращен.</TableCell>
                                                <TableCell>% от общ.</TableCell>
                                                <TableCell className={"border_table_header"}>Записались</TableCell>
                                                <TableCell>%</TableCell>
                                                <TableCell>В лист ожид.</TableCell>
                                                <TableCell>%</TableCell>
                                                <TableCell>Итого</TableCell>
                                                <TableCell>%</TableCell>
                                                <TableCell className={"border_table_header"}>Обращ</TableCell>
                                                <TableCell>На приём</TableCell>
                                                <TableCell>%</TableCell>
                                                <TableCell>В лист ожид.</TableCell>
                                                <TableCell>%</TableCell>
                                                <TableCell>Итого</TableCell>
                                                <TableCell>%</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
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
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));
