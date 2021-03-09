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
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import {connect} from "react-redux";
import {getRecordsCrm} from "../../actions/crmAction";
import store from "../../store";
import {Link} from "react-router-dom";
import MultiPlayer from "./MultiPlayer";



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
    { id: "date", numeric: false, label: "Дата" },
    { id: "calls", numeric: false, label: "Звонки" },
    { id: "topic_conversation", numeric: false, label: "Тема разговора" },
    { id: "direction", numeric: false, label: "Направление" },
    { id: "date_recording", numeric: false, label: "Дата записи" },
    { id: "doctor", numeric: false, label: "Врач" },
    { id: "еxpectation", numeric: false, label: "Ожидание" },
    { id: "duration", numeric: false, label: "Длительность" },
    { id: "employee", numeric: false, label: "Сотрудник" },

];

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};

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
    const [playing, toggle] = useState();
    const playRecord = (link) =>{
        toggle(link);
        useAudio(link);
        console.log(link);
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
                <TableCell>
                    {row.type == 1 && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                            <path d="M11.5578 8.13812L10.3888 6.96908C10.1087 6.68902 9.73638 6.53484 9.34033 6.53484C8.94509 6.53484 8.5732 6.68856 8.29333 6.9677C8.29269 6.96834 8.29214 6.96889 8.2915 6.96953C8.29131 6.96972 8.29104 6.96999 8.29085 6.97008L7.4829 7.77813L4.24412 4.53926L5.05207 3.7314C5.054 3.72947 5.05592 3.72746 5.05775 3.72554C5.33488 3.44602 5.48741 3.07569 5.48741 2.68183C5.48741 2.28577 5.33314 1.91343 5.05308 1.63337L3.8834 0.463594C3.88056 0.460664 3.87772 0.457734 3.87479 0.454805C3.59492 0.176575 3.22367 0.023407 2.82898 0.023407C2.43476 0.023407 2.06388 0.176209 1.78427 0.453889C1.78107 0.457002 1.77796 0.460115 1.77484 0.463319C1.28119 0.957065 0.74066 1.4975 0.725829 1.51233C-0.0325963 2.27076 -0.203343 3.50105 0.244992 4.97652C0.670348 6.37627 1.60977 7.85247 2.89033 9.13311C4.67231 10.915 6.84148 12.022 8.5516 12.022C9.35946 12.022 10.037 11.7715 10.5106 11.2979C10.525 11.2835 11.0665 10.7421 11.5607 10.2479C11.5635 10.245 11.5663 10.2422 11.5692 10.2393C12.1405 9.6644 12.1424 8.73129 11.5738 8.15396C11.5686 8.14855 11.5633 8.14324 11.5578 8.13812Z" fill="#56BD5B"/>
                            <path d="M10.3282 0.126478C10.2595 0.057813 10.1696 0.0234803 10.0796 0.0234802C9.98971 0.0234802 9.89971 0.057813 9.83114 0.126478L8.51076 1.44667L7.9749 0.910904C7.88326 0.819167 7.74867 0.785476 7.62453 0.823012C7.50047 0.86055 7.40709 0.963363 7.38173 1.09053L6.5973 5.01257C6.57423 5.12783 6.6103 5.24695 6.69343 5.33008C6.77656 5.41321 6.89567 5.44919 7.01094 5.42621L10.9329 4.64178C11.0601 4.61633 11.1629 4.52294 11.2004 4.39889C11.2379 4.27484 11.2042 4.14016 11.1125 4.04843L10.5767 3.51266L11.897 2.19255C11.963 2.12664 11.9999 2.03719 12 1.94399C12 1.8507 11.963 1.76134 11.897 1.69542L10.3282 0.126478Z" fill="#56BD5B"/>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="12" height="12" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>}
                    {row.type == 2 && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                            <path d="M11.5578 8.13815L10.3888 6.96911C10.1087 6.68905 9.73638 6.53487 9.34033 6.53487C8.94509 6.53487 8.5732 6.68859 8.29333 6.96773C8.29269 6.96837 8.29214 6.96892 8.2915 6.96956C8.29131 6.96975 8.29104 6.97002 8.29085 6.97011L7.4829 7.77816L4.24412 4.53929L5.05207 3.73143C5.054 3.7295 5.05592 3.72749 5.05775 3.72557C5.33488 3.44606 5.48741 3.07572 5.48741 2.68186C5.48741 2.2858 5.33314 1.91346 5.05308 1.6334L3.8834 0.463624C3.88056 0.460695 3.87772 0.457765 3.87479 0.454835C3.59492 0.176606 3.22367 0.0234375 2.82898 0.0234375C2.43476 0.0234375 2.06388 0.176239 1.78427 0.45392C1.78107 0.457033 1.77796 0.460145 1.77484 0.46335C1.28119 0.957095 0.74066 1.49753 0.725829 1.51236C-0.0325963 2.27079 -0.203343 3.50108 0.244992 4.97655C0.670348 6.3763 1.60977 7.8525 2.89033 9.13315C4.67231 10.915 6.84148 12.022 8.5516 12.022C9.35946 12.022 10.037 11.7715 10.5106 11.2979C10.525 11.2835 11.0665 10.7421 11.5607 10.2479C11.5635 10.2451 11.5663 10.2422 11.5692 10.2394C12.1405 9.66443 12.1424 8.73132 11.5738 8.15399C11.5686 8.14858 11.5633 8.14327 11.5578 8.13815Z" fill="#3B80D6"/>
                            <path d="M8.2623 5.33003C8.33097 5.3987 8.42087 5.43303 8.51087 5.43303C8.60078 5.43303 8.69077 5.3987 8.75935 5.33003L10.0797 4.00984L10.6156 4.54561C10.7072 4.63734 10.8418 4.67104 10.966 4.6335C11.09 4.59596 11.1834 4.49315 11.2088 4.36598L11.9932 0.443942C12.0163 0.328677 11.9802 0.209567 11.8971 0.126437C11.8139 0.0433064 11.6948 0.00732611 11.5795 0.0303059L7.6576 0.814732C7.53043 0.840184 7.42761 0.933568 7.39008 1.05762C7.35254 1.18168 7.38632 1.31635 7.47797 1.40809L8.01383 1.94386L6.69345 3.26396C6.62753 3.32988 6.59055 3.41932 6.59045 3.51252C6.59045 3.60582 6.62753 3.69517 6.69345 3.76109L8.2623 5.33003Z" fill="#3B80D6"/>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="12" height="12" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>}
                    {row.type == 3 && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                            <path d="M11.5578 8.13812L10.3888 6.96908C10.1087 6.68902 9.73638 6.53484 9.34033 6.53484C8.94509 6.53484 8.5732 6.68856 8.29333 6.9677L8.2915 6.96953L7.4829 7.77813L4.24412 4.53926L5.05207 3.7314C5.054 3.72947 5.05592 3.72746 5.05775 3.72554C5.33488 3.44602 5.48741 3.07569 5.48741 2.68183C5.48741 2.28577 5.33314 1.91343 5.05308 1.63337L3.8834 0.463594C3.88056 0.460664 3.87772 0.457734 3.87479 0.454805C3.59492 0.176575 3.22367 0.023407 2.82898 0.023407C2.43476 0.023407 2.06388 0.176209 1.78427 0.453889C1.78107 0.457002 1.77796 0.460115 1.77484 0.463319C1.28119 0.957065 0.74066 1.4975 0.725829 1.51233C-0.0325962 2.27076 -0.203343 3.50105 0.244992 4.97652C0.670348 6.37627 1.60977 7.85247 2.89033 9.13311C4.67231 10.915 6.84148 12.022 8.5516 12.022C9.35946 12.022 10.037 11.7715 10.5106 11.2979C10.525 11.2835 11.0665 10.7421 11.5607 10.2479C11.5635 10.245 11.5663 10.2422 11.5692 10.2393C12.1405 9.6644 12.1424 8.73129 11.5738 8.15396C11.5686 8.14855 11.5633 8.14324 11.5578 8.13812Z" fill="#E34C4C"/>
                            <path d="M6.92717 3.94288C6.96525 3.98096 7.01511 4 7.06502 4C7.11488 4 7.16479 3.98096 7.20282 3.94288L7.93507 3.21073L8.23224 3.50786C8.28307 3.55873 8.3577 3.57741 8.42655 3.5566C8.49535 3.53578 8.54714 3.47876 8.5612 3.40824L8.99623 1.23317C9.00902 1.16924 8.98902 1.10319 8.94291 1.05709C8.89681 1.01098 8.83076 0.991031 8.76683 1.00378L6.59181 1.4388C6.52129 1.45291 6.46427 1.5047 6.44345 1.5735C6.42264 1.6423 6.44137 1.71699 6.49219 1.76786L6.78937 2.06498L6.05712 2.79708C6.02056 2.83364 6.00005 2.88324 6 2.93493C6 2.98667 6.02056 3.03622 6.05712 3.07278L6.92717 3.94288Z" fill="#E34C4C"/>
                            <path d="M10.6633 3.08059C10.6252 3.04251 10.5754 3.02347 10.5255 3.02347C10.4756 3.02347 10.4257 3.04251 10.3877 3.08059L9.65542 3.81274L9.35824 3.51561C9.30742 3.46474 9.23278 3.44605 9.16393 3.46687C9.09514 3.48769 9.04335 3.5447 9.02928 3.61523L8.59426 5.7903C8.58146 5.85422 8.60147 5.92028 8.64757 5.96638C8.69367 6.01248 8.75973 6.03244 8.82365 6.01969L10.9987 5.58467C11.0692 5.57055 11.1262 5.51876 11.147 5.44997C11.1678 5.38117 11.1491 5.30648 11.0983 5.25561L10.8011 4.95848L11.5334 4.22639C11.5699 4.18983 11.5904 4.14022 11.5905 4.08854C11.5905 4.0368 11.5699 3.98724 11.5334 3.95069L10.6633 3.08059Z" fill="#E34C4C"/>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="12" height="12" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>}
                    <span className={"phone_call_table"}>{row.calls}</span><br/>
                    <span>{row.fio}</span>
                </TableCell>
                <TableCell>{row.topic_conversation}</TableCell>
                <TableCell>{row.direction}</TableCell>
                <TableCell>{row.date_recording}</TableCell>
                <TableCell>{row.doctor}</TableCell>
                <TableCell>{row.еxpectation}</TableCell>
                <TableCell>{row.duration}</TableCell>
                <TableCell>{row.employee}</TableCell>
                <TableCell align="right">
                    <div>
                        <IconButton onClick={handleClick} aria-haspopup="true"  edge="end">
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
                            <div className="title_menu_table">Определение канала по приоритету</div>
                            <div className="item_list_container_table">
                                <span className={"item_list_table_menu"}>1</span>
                                <span><b>UTF метки</b></span>
                                <div className="content_info_table_menu">
                                    <div>Sourse</div>
                                    <div>Medium</div>
                                    <div>Referrer</div>
                                </div>
                                <div className="info_list_menu">
                                    Нет данных
                                </div>
                            </div>
                            <div className="item_list_container_table">
                                <span className={"item_list_table_menu"}>2</span>
                                <span><b>Входящий</b></span>
                                <div className="content_info_table_menu">
                                    <div>Номер</div>
                                    <div>Дата и время</div>
                                </div>
                                <div className="info_list_menu">
                                    Нет данных
                                </div>
                            </div>
                            <div className="item_list_container_table">
                                <span className={"item_list_table_menu"}>3</span>
                                <span><b>Телефон клиники</b></span>
                                <div className="content_info_table_menu">
                                    <div>Номер</div>
                                    <div>Дата и время</div>
                                </div>
                                <div className="info_list_menu">
                                    Нет данных
                                </div>
                            </div>
                            <div className="item_list_container_table">
                                <span className={"item_list_table_menu"}>4</span>
                                <span><b>Рекламный канал</b></span>
                                <div className="info_list_menu">
                                    Поиск
                                </div>
                            </div>
                        </Menu>
                    </div>
                </TableCell>
            </TableRow>
            <TableRow className={"table_row_comment"}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            {row.records && row.records.length ?
                                <MultiPlayer
                                    records={row.records}
                                />

                                : <div className="text_comment">Нет записи</div>}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}



function CRMHistory({records})  {
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

    useEffect(() => {
        store.dispatch(getRecordsCrm());
    },[]);


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
                    <Grid item className={`contaoner-info container_materials`}>
                        {hideBtnClicked.block_1 ? null : (
                            <div className="hide-shedule-btn">
                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                            </div>
                        )}
                        {!hideBtnClicked.block_1? (
                            <>
                                <div className="title_material_table">История сообщений</div>
                                {records && "data" in records?
                                    Object.keys(records.data).map((index) => {
                                        let record = records.data[index];
                                        rows.push({
                                            "id":record.id,
                                            "date": record.created_at,
                                            "calls":record.contact_phone_number,
                                            "fio":record.contact_full_name,
                                            "topic_conversation":"",
                                            "direction":"",
                                            "date_recording":"",
                                            "doctor":"",
                                            "еxpectation":record.wait_time_duration,
                                            "duration":record.talk_time_duration,
                                            "employee":record.employee_full_name,
                                            "records":record.records,
                                            "type":record.type
                                        })
                                    }):null}
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
                                                <TableCell colspan="11">
                                                    Декабрь 2020
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
            </Grid>
        </Grid>
    )
}
const mapStateToProps = (state) => ({
    records: state.crm.items
});

export default connect(mapStateToProps, { getRecordsCrm })(CRMHistory);

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
