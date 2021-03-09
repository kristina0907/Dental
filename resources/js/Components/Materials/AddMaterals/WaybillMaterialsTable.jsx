import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer,TableRow, TableHead,TableSortLabel,IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import store from "../../../store";
import {getSelectProvider,createInvoice} from "../../../actions/materialsActions";
import {useForm} from "react-hook-form";
import {connect} from "react-redux";

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
    { id: "code", numeric: false, label: "№" },
    { id: "name", numeric: false, label: "Название" },
    { id: "quantity", numeric: false, label: "Количество" },
    { id: "unit", numeric: false, label: "Ед. измерения" },
    { id: "base_price", numeric: false, label: "Стоимость" },

];

function WaybillMaterialsTable({moving, deleteMaterial, deleteAll, selectsProvider})  {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { handleSubmit, register } = useForm();

    useEffect(() => {}, [moving])

    useEffect(() => {
        store.dispatch(getSelectProvider());
    },[]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const onSubmit = (values) => {
        store.dispatch(createInvoice(values));
        deleteAll();
    };


    return(
        <div>
            <form name={'categoryCreate'} onSubmit={handleSubmit(onSubmit)}>
                <div className="table_filter">
                    <div>
                        <input type="text" required ref={register} name="invoice_number" placeholder="Номер накладной"/>
                    </div>
                    <div>
                        <select required name={`provider_id`}
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
                    </div>
                    <div>
                        <select required name={`branch_storage_id`}
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
                    </div>
                    <div>
                        <input type="date" ref={register} required name="invoice_date" placeholder="Дата накладной"/>
                    </div>
                    <div>
                        <input type="date" ref={register} required name="date_of_receiving" placeholder="Дата получения"/>
                    </div>
                    <div>
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
                    </div>
                    <div>
                        <input type="text" ref={register} name="comment" placeholder="Комментарий"/>
                    </div>
                </div>

            <TableContainer className="table_card">
                <Table
                    className="main_table moving_table"
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={moving.length}
                    />
                    <TableBody>
                        {stableSort(moving, getComparator(order, orderBy))
                            .slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
                            .map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{item.code}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <input ref={register} type="hidden" name={`materials[${index}][base_price]`} value={0}/>
                                        <input ref={register} type="hidden" name={`materials[${index}][material_id]`} value={item.id}/>
                                        <TableCell><input ref={register} name={`materials[${index}][quantity]`} defaultValue={1} className="table_input_numeric" type="number"/></TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                        <TableCell><input className="table_input_numeric" ref={register} name={`materials[${index}][base_price]`} defaultValue={0} type="text"/></TableCell>
                                        <TableCell className="icon_table">
                                            <IconButton aria-label="delete" onClick={() =>deleteMaterial(item.id)}>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0)">
                                                        <path d="M16.7317 5.28322L16.2955 3.97595C16.2077 3.71282 15.9614 3.5354 15.684 3.5354H4.31591C4.03852 3.5354 3.79227 3.71286 3.70446 3.97595L3.26825 5.28322C3.16942 5.57939 3.38985 5.88533 3.70208 5.88533H16.2978C16.6101 5.88533 16.8305 5.57939 16.7317 5.28322Z" fill="#868789"/>
                                                        <path d="M5.29746 19.2097C5.34746 19.6596 5.72777 20 6.18051 20H13.7476C14.2004 20 14.5807 19.6596 14.6307 19.2097L15.9809 7.05823H3.94727L5.29746 19.2097Z" fill="#868789"/>
                                                        <path d="M8.82373 1.67961C8.82373 1.39965 9.0515 1.17187 9.33146 1.17187H11.0576C11.3376 1.17187 11.5653 1.39965 11.5653 1.67961V2.36449H12.7372V1.67961C12.7372 0.753477 11.9837 0 11.0576 0H9.33146C8.40533 0 7.65186 0.753477 7.65186 1.67961V2.36449H8.82373V1.67961Z" fill="#868789"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0">
                                                            <rect width="20" height="20" fill="white"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="btn_moving_table">
                <button type="submit" className={"btn_save"}>Сохранить</button>
                <button onClick={()=>deleteAll()} className={"btn_delete"}>Удалить</button>
            </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selectsProvider: state.materials.selectsProvider
});

export default connect(mapStateToProps, { getSelectProvider, createInvoice })(WaybillMaterialsTable);

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

