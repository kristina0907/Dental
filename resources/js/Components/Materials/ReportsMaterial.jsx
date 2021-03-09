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
import Vector from "../Appoints/media/Vector";
import NavigationMaterials from "./NavigationMaterials";
import Search from "../helpers/Search";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Calendar from "../Index/Calendar";
import SheduleFilter from "../Index/SheduleFilter";
import Shedule from "../Index/Shedule";
import LiveTape from "../Index/LiveTape";
import Header from "../helpers/Header";
import HeaderRight from "../helpers/HeaderRight";
import IncomingCall from "../IncomingCall";

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
              <TableCell/>
              <TableCell/>
                {headCells.map((headCell) => (
                  <>
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
                    </>
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
    { id: "date", numeric: false, label: "Стоимость материалов" },
    { id: "whence", numeric: false, label: "Выручка без скидки" },
    { id: "where", numeric: false, label: "Выручка со скидкой" },

];
function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: 'Без категории', customerId: '882 089 Р', amount: "2 951 110 Р 29,89%",amount1: "2 951 110 Р 29,89%" },
      { date: 'Склад', customerId: '882 089 Р', amount: "2 951 110 Р 29,89%",amount1: "2 951 110 Р 29,89%" },
      { date: 'Склад № 2', customerId: '882 089 Р', amount: "2 951 110 Р 29,89%",amount1: "2 951 110 Р 29,89%" },
      { date: 'Склад № 3', customerId: '882 089 Р', amount: "2 951 110 Р 29,89%",amount1: "2 951 110 Р 29,89%" },
    ],
  };
}
function СhildrenRow(items){
  let item = items.items;
  const [open, setOpen] = React.useState(false);
  return(
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton className="child_keyboard" aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            {item.date}
          </IconButton>
        </TableCell>
        <TableCell >{item.customerId}</TableCell>
        <TableCell >{item.amount}</TableCell>
        <TableCell >{item.amount1}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Table size="small" aria-label="purchases">
                <TableBody>
                <TableRow>
                    <TableCell>
                      Викрил
                    </TableCell>
                    <TableCell>
                      12 х 2 550 Р
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const rows = [
    { date: 'Без категории', customerId: '882 089 Р', amount: "2 951 110 Р 29,89%",amount1: "2 951 110 Р 29,89%" },
    { date: 'Склад', customerId: '882 089 Р', amount: "2 951 110 Р 29,89%",amount1: "2 951 110 Р 29,89%" },
    { date: 'Склад № 2', customerId: '882 089 Р', amount: "2 951 110 Р 29,89%",amount1: "2 951 110 Р 29,89%" },
    { date: 'Склад № 3', customerId: '882 089 Р', amount: "2 951 110 Р 29,89%",amount1: "2 951 110 Р 29,89%" },
  ];
  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell >{row.calories}</TableCell>
        <TableCell >{row.fat}</TableCell>
        <TableCell >{row.carbs}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table className="children_table" size="small" aria-label="purchases">
                <TableBody>
                  {rows.map((historyRow) => (
                  <СhildrenRow key={historyRow.name} items={historyRow} />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};
const rows = [
  createData('Сентябрь 2020', "882 089 Р", "2 951 110 Р 29,89%", "2 951 110 Р 29,89%"),
  createData('Август 2020', "882 089 Р", "2 951 110 Р 29,89%", "2 951 110 Р 29,89%"),
  createData('Июль 2020', "882 089 Р", "2 951 110 Р 29,89%", "2 951 110 Р 29,89%"),
  createData('Июнь 2020', "882 089 Р", "2 951 110 Р 29,89%", "2 951 110 Р 29,89%"),
  createData('Май 2020', "882 089 Р", "2 951 110 Р 29,89%", "2 951 110 Р 29,89%"),
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
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
        "block_2": false,
    });


    // Object.keys(medicalCards).map((key) => {
    //     let patient = medicalCards[key];
    //    rows.push({
    //       "id": patient.id,
    //       "name": patient.name,
    //       "city": (patient.adresses[0] !== undefined) ? patient.adresses[0].city : "",
    //       "born_date": (patient.patient_cards[0] !== undefined) ? patient.patient_cards[0].born_date: "",
    //       "phone": (patient.contacts[0] !== undefined) ? patient.contacts[0].phone : ""
    //    });
    // });
    const [open, setOpen] = React.useState(false);
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
                                    <div className="title_filter">Итоги по уровням</div>
                                    <select name="" id="">
                                        <option value="1">Первый</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Второй</option>
                                    </select>
                                    <div className="title_filter">Прочие</div>
                                    <select name="" id="">
                                        <option value="1">Направления</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="1">Причины</option>
                                    </select>
                                    <div className="container_btn_filter">
                                        <button type={"submit"} className="btn_filter">Сохранить</button>
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
                                    "pageTitle": "Материалы",
                                    "links":[
                                        {"url": "/", "title": "Главная"},
                                        {"url": "/materials/journal", "title": "Материалы"}
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
                        <NavigationMaterials />
                        <div className="add_list">
                            <div className="item_add_list active">По материалам</div>
                            <div className="item_add_list">По оборотам и остаткам</div>
                        </div>
                        <Grid item className={`contaoner-info container_materials`}>
                            {hideBtnClicked.block_1 ? null : (
                                <div className="hide-shedule-btn">
                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                                </div>
                            )}
                            {!hideBtnClicked.block_1? (
                                <>
                                    <div className="title_material_table">Отчет</div>
                                    <Grid container>
                                        <Grid item xs={12} sm={6}>
                                            <Search fields={["name"]} rows={rows}/>
                                        </Grid>
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
    wrapper_component: {
        marginBottom: "20px"
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
