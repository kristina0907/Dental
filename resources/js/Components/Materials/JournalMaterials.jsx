import React, {useEffect, useState} from "react";
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
import Vector from "../Appoints/media/Vector";
import NavigationMaterials from "./NavigationMaterials";
import Search from "../helpers/Search";
import {Box} from "@material-ui/core";
import Header from "../helpers/Header";
import HeaderRight from "../helpers/HeaderRight";
import IncomingCall from "../IncomingCall";
import {connect} from "react-redux";
import { getCabinetInvoices, getSelectProvider,getfilterJournal} from "../../actions/materialsActions";
import store from "../../store";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
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
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, type } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
                <TableCell />
                {type == "2" &&<TableCell
                    key={"invoiceNumber"}
                    sortDirection={orderBy === "invoiceNumber" ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === "invoiceNumber"}
                        direction={orderBy === "invoiceNumber" ? order : 'asc'}
                        onClick={createSortHandler("invoiceNumber")}
                    >
                        Номер накладной
                        {orderBy === "invoiceNumber" ? (
                            <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                        ) : null}
                    </TableSortLabel></TableCell>}
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
                {type == "2" &&<TableCell
                    key={"sum"}
                    sortDirection={orderBy === "sum" ? order : false}
                >
                    <TableSortLabel
                        active={orderBy === "sum"}
                        direction={orderBy === "sum" ? order : 'asc'}
                        onClick={createSortHandler("sum")}
                    >
                        Сумма
                        {orderBy === "sum" ? (
                            <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                        ) : null}
                    </TableSortLabel></TableCell>}
            </TableRow>
        </TableHead>
    );
}

const headCells = [
    { id: "date", numeric: false, label: "Дата" },
    { id: "whence", numeric: false, label: "Откуда" },
    { id: "where", numeric: false, label: "Куда" },
    // { id: "invoice_number", numeric: false, label: "Номер накладной" },
    { id: "responsible", numeric: false, label: "Ответственный" },
    { id: "description", numeric: false, label: "Описание" },
    // { id: "sum", numeric: false, label: "Сумма" },

];

function Row(props) {
    const { row,type } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {type == "2" &&<TableCell>{row.invoiceNumber}</TableCell>}
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.whence}</TableCell>
                <TableCell>{row.where}</TableCell>
                <TableCell>{row.responsible}</TableCell>
                <TableCell>{row.description}</TableCell>
                {type == "2" && <TableCell>{row.sum}</TableCell>}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={0}>
                            <Table className={"table_children_jornalMaterial"} size="small" aria-label="purchases">
                                <TableHead>
                                    <TableCell>Название</TableCell>
                                    <TableCell>Колличество</TableCell>
                                    <TableCell>Сумма</TableCell>
                                </TableHead>
                                <TableBody>
                                    {(row.items).map((item) => (
                                        <TableRow>
                                            <TableCell>{item.materials.name}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.base_price}</TableCell>
                                        </TableRow>
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


function JournalMaterial({itemsCabinetInvoices,selectsProvider,filterResult})  {
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
    const [getTypeDocument, setTypeDocument] = useState("1")
    const [getSelectDocument, setSelectDocument] = useState()

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    useEffect(() => {
        store.dispatch(getCabinetInvoices());
    },[]);
    useEffect(() => {
        store.dispatch(getSelectProvider());
    },[]);
    const { handleSubmit, register } = useForm();
    const onSubmit = async (values) => {
        store.dispatch(getfilterJournal(values));
    };
    const clearFilters =() =>{
        filterResult = null;
    }
    useEffect(() => {
    },[filterResult]);
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
                                <form name={'filterJournalMaterials'} onSubmit={handleSubmit(onSubmit)}>
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
                                    <select onChange={(e)=>setSelectDocument(e.target.value)} name="type" ref={register}>
                                        <option value="">Тип документа</option>
                                        <option value="cabinet">Перемещение</option>
                                        <option value="branch">Накладная</option>
                                    </select>
                                    {getSelectDocument && getSelectDocument == "cabinet"?
                                        <select name={`provider_id`}
                                                ref={register({
                                                    required: "Поставщик"
                                                })} >
                                            <option value="">Поставщик</option>
                                            {selectsProvider && selectsProvider.providers && selectsProvider.providers.length? (
                                                (selectsProvider.providers).map((provider) => {
                                                    return (
                                                        <option value={provider.id}>{provider.name}</option>
                                                    )
                                                })
                                            ): (null)}
                                        </select>
                                    :null
                                    }
                                    <select required name={`branch_id`}
                                            ref={register({
                                                required: "Склад"
                                            })} >
                                        <option value="">Склад</option>
                                        {selectsProvider && selectsProvider.storages && selectsProvider.storages.length? (
                                            (selectsProvider.storages).map((storage) => {
                                                return (
                                                    <option value={storage.id}>{storage.name}</option>
                                                )
                                            })
                                        ): (null)}
                                    </select>
                                    <select required name={`user_id`}
                                            ref={register({
                                                required: "Ответственный"
                                            })} >
                                        <option value="">Ответственный</option>
                                        {selectsProvider && selectsProvider.users && selectsProvider.users.length? (
                                            (selectsProvider.users).map((user) => {
                                                return (
                                                    <option value={user.id}>{user.name}</option>
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
                <Grid item xs={12} className={classes.wrapper_component}>
                        <NavigationMaterials />
                        <div className="add_list">
                            <div className={`item_add_list ${getTypeDocument && getTypeDocument === "1" ? 'active' : ''}`} onClick={()=>setTypeDocument("1")}>Перемещения</div>
                            <div className={`item_add_list ${getTypeDocument && getTypeDocument === "2" ? 'active' : ''}`} onClick={()=>setTypeDocument("2")}>Накладные</div>
                        </div>
                        <Grid item className={`contaoner-info container_materials`}>
                            {hideBtnClicked.block_1 ? null : (
                                <div className="hide-shedule-btn">
                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                                </div>
                            )}
                            {!hideBtnClicked.block_1? (
                                <>
                                    <div className="title_material_table">Выбрано для перемещения</div>
                                    <Grid container>
                                        {/*<Grid item xs={12} sm={6}>*/}
                                        {/*    <Search fields={["name"]} rows={rows}/>*/}
                                        {/*</Grid>*/}
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
                                                type={getTypeDocument}
                                                onRequestSort={handleRequestSort}
                                                rowCount={rows.length}
                                            />
                                            {filterResult ? (
                                               <>
                                                   {
                                                       (filterResult.branch_invoices && filterResult.branch_invoices.length)?
                                                           (filterResult.branch_invoices).map((item) => {
                                                               rows.push({
                                                                   "id": item.id,
                                                                   "invoiceNumber":item.invoice_number,
                                                                   "date":item.invoice_date,
                                                                   "whence": item.providers.name,
                                                                   "where":item.storages.name,
                                                                   "responsible":item.kladovshik.name,
                                                                   "description":item.comment,
                                                                   "items":item.items,
                                                                   "sum":item.invoice_summ
                                                               })
                                                           }):null
                                                   }
                                                   {
                                                       (filterResult.cabinet_invoices && filterResult.cabinet_invoices.length)?
                                                           (filterResult.cabinet_invoices).map((item) => {
                                                               rows.push({
                                                                   "id": item.id,
                                                                   "invoiceNumber":item.invoice_number,
                                                                   "date":item.invoice_date,
                                                                   "whence": item.branch_storages?item.branch_storages.name:"",
                                                                   "where":item.storages.name,
                                                                   "responsible":item.kladovshik.name,
                                                                   "description":item.comment,
                                                                   "items":item.items,
                                                                   "sum":item.invoice_summ
                                                               })
                                                           }):null
                                                   }
                                               </>
                                            ):(
                                                <>
                                                    {
                                                        getTypeDocument == "2" &&
                                                        (itemsCabinetInvoices && itemsCabinetInvoices.branch_invoices && itemsCabinetInvoices.branch_invoices.length)?
                                                            (itemsCabinetInvoices.branch_invoices).map((item) => {
                                                                rows.push({
                                                                    "id": item.id,
                                                                    "invoiceNumber":item.invoice_number,
                                                                    "date":item.invoice_date,
                                                                    "whence": item.branch_from,
                                                                    "where":item.storages.name,
                                                                    "responsible":item.kladovshik.name,
                                                                    "description":item.comment,
                                                                    "items":item.items,
                                                                    "sum":item.invoice_summ
                                                                })
                                                            }):null
                                                    }
                                                    {
                                                        getTypeDocument == "1" &&
                                                        (itemsCabinetInvoices && itemsCabinetInvoices.cabinet_invoices && itemsCabinetInvoices.cabinet_invoices.length)?
                                                            (itemsCabinetInvoices.cabinet_invoices).map((item) => {
                                                                rows.push({
                                                                    "id": item.id,
                                                                    "invoiceNumber":item.invoice_number,
                                                                    "date":item.invoice_date,
                                                                    "whence": item.branch_from,
                                                                    "where":item.storages.name,
                                                                    "responsible":item.kladovshik.name,
                                                                    "description":item.comment,
                                                                    "items":item.items,
                                                                    "sum":item.invoice_summ
                                                                })
                                                            }):null
                                                    }
                                                </>
                                            )}

                                            <TableBody>
                                                {stableSort(rows, getComparator(order, orderBy))
                                                    .slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
                                                    .map((card) => {
                                                        return (
                                                            <Row key={card.name} type={getTypeDocument} row={card} />
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
    itemsCabinetInvoices: state.materials.itemsCabinetInvoices.output,
    selectsProvider: state.materials.selectsProvider,
    filterResult:state.materials.filterJournal.output
});

export default connect(mapStateToProps, { getCabinetInvoices,getSelectProvider, getfilterJournal })(JournalMaterial);

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
