import React, { useRef, useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TableSortLabel } from '@material-ui/core';
import categoryMaterial from "../../media/json/categoryMaterial.json";
import {SvgIcon} from "@material-ui/core";
import { connect } from 'react-redux';
import {getAllMaterials, deleteCategory, deleteMaterial} from "../../../actions/materialsActions";
import store from "../../../store";
import NavigationMaterials from "../NavigationMaterials";
import Vector from "../../Appoints/media/Vector";
import Search from "../../helpers/Search";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../../helpers/Header";
import HeaderRight from "../../helpers/HeaderRight";
import WaybillMaterialsTable from "./WaybillMaterialsTable";
import {Link} from "react-router-dom";
import IncomingCall from "../../IncomingCall";


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
const headCells = [
    { id: 'code', numeric: false, label: 'Код' },
    { id: 'name', numeric: false, label: 'Наименование' },
    { id: 'unit', numeric: false, label: 'Ед. измерения' },
];
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
                    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5474 0L10.1332 0.414258C9.71546 0.831953 9.03565 0.831953 8.61796 0.414258L8.20366 0L7.7894 0.414258C7.37171 0.831953 6.6919 0.831953 6.27421 0.414258L5.85991 0L5.44565 0.414258C4.25046 1.60945 3.85956 2.59465 5.17386 4.14262C6.11179 3.76832 7.13151 3.55641 8.2014 3.55641C9.27284 3.55641 10.2942 3.76871 11.2333 4.14371C12.5496 2.59719 12.1586 1.61121 10.9617 0.414297L10.5474 0Z" fill="#313541"/>
                        <path d="M16.4062 17.0316C16.4062 15.7986 16.107 15.1302 15.8169 14.4842C15.5176 13.8153 15.2344 13.1836 15.2344 11.7582C15.2344 7.98164 12.1715 4.72852 8.20082 4.72852C4.35027 4.72852 1.17188 7.83125 1.17188 11.7582C1.17188 13.1796 0.888047 13.8136 0.588242 14.4853C0.298672 15.1314 0 15.8003 0 17.0316C0 18.758 2.1618 20.0004 4.10156 20.0004H12.3047C14.2445 20.0004 16.4062 18.758 16.4062 17.0316ZM8.20312 11.7582C9.17242 11.7582 9.96094 12.5467 9.96094 13.516C9.96094 14.2789 9.46961 14.9232 8.78906 15.1659V16.4457H7.61719V15.1659C6.93664 14.9232 6.44531 14.2789 6.44531 13.516H7.61719C7.61719 13.8393 7.87984 14.102 8.20312 14.102C8.52641 14.102 8.78906 13.8393 8.78906 13.516C8.78906 13.1927 8.52641 12.9301 8.20312 12.9301C7.23383 12.9301 6.44531 12.1416 6.44531 11.1723C6.44531 10.4094 6.93664 9.76508 7.61719 9.52238V8.24258H8.78906V9.52238C9.46961 9.76508 9.96094 10.4094 9.96094 11.1723H8.78906C8.78906 10.849 8.52641 10.5863 8.20312 10.5863C7.87984 10.5863 7.61719 10.849 7.61719 11.1723C7.61719 11.4955 7.87984 11.7582 8.20312 11.7582Z" fill="#313541"/>
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
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


function MaterialsWaybill({materials}) {
    const classes = useStyles();
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
        "block_2": false,
        "block_3": false,
        "block_4": false,
    });
    const [category, setCategory] = React.useState();
    const [getVisibleEditProduct, setVisibleEditProduct] = useState(false);
    const [getUpdated,setUpdated] = useState(false);
    const [getmovingArray,setmovingArray] = useState([]);

    useEffect(() => {
        store.dispatch(getAllMaterials());
    },[]);

    useEffect(() => {
        if(getUpdated){
            store.dispatch(getAllMaterials());
            setUpdated(false);
        }
    },[getUpdated]);

    const addMovingMaterial = (row) =>{
        let check = getmovingArray.filter(item => item.id === row.id);
        if (!check.length){
            setmovingArray(oldArray => [...oldArray, row]);
        }
    }

    const deleteMovingMaterial = (id) => {
        let check = getmovingArray.filter(item => item.id !== id);
        setmovingArray(check);
    };

    const deleteAllMaterial = () => {
        setmovingArray([]);
    };

    useEffect(() => {
    },[getmovingArray]);

    const setCategoryActive = (activeCategory) => {
        setCategory(activeCategory);
    }

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = [];


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const [result, setResult] = useState([]);
    const [getNotfound, setNotFound] = useState(false);
    const handleSearchChange = (e) => {
        let fields=(["name"]);
        setResult([]);
        let q = e.target.value;
        if (q.length) {
            rows.filter((element) => {
                fields.map((field) => {
                    if (field in element) {
                        if (element[field].toLowerCase().indexOf(q.toLowerCase()) !== -1) {
                            setResult(prevState => [...prevState, element]);
                        }
                    }
                });
            });
            if(q.length <= 1){
                setNotFound(false);
            } else {
                result.length  ? setNotFound(false) : setNotFound(true)
            }
        }
    };

    return(
        <Grid container spacing={4}>
            <Grid item xs={12} md={3} lg={3} xl={2}>
                <Grid item xs={12} className={classes.wrapper_component}>
                    <IncomingCall />
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
                        <Link className="item_add_list" to={"/materials/add/moving"}>Перемещение</Link>
                        <Link className="item_add_list active" to={"/materials/add/waybill"}>Накладную</Link>
                    </div>
                    <div>
                        <div className="contaoner-info container_materials">
                            {hideBtnClicked.block_1 ? null : (
                                <div className="hide-shedule-btn">
                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                                </div>
                            )}
                            {!hideBtnClicked.block_1? (
                                <React.Fragment>
                                    <div className="title_container_block">
                                        Категории
                                    </div>
                                    <Grid container>
                                        {materials ? (
                                            Object.keys(materials).map((item) => {
                                                let material = materials[item];
                                                return (
                                                    <Grid item xs={12} sm={2}>
                                                        <div className={`item_category_price ${category && category === item ? 'active' : ''}`} onClick={() => setCategoryActive(item)}>
                                                            <div className="image_category_price">
                                                                {
                                                                    Object.keys(categoryMaterial).map((group) => {
                                                                        let groupList = categoryMaterial[group];
                                                                        return (
                                                                            <React.Fragment>
                                                                                {groupList.id == material.id?
                                                                                    Object.keys(groupList.buttons).map((id) => {
                                                                                        let button = groupList.buttons[id];
                                                                                        return(
                                                                                            <SvgIcon className="category_svg" viewBox={groupList.viewBox}>
                                                                                                {
                                                                                                    Object.keys(button.icon).map((id) => {
                                                                                                        let icon = button.icon[id];
                                                                                                        return(
                                                                                                            <path d={icon.d} fill={icon.fill}/>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </SvgIcon>
                                                                                        )
                                                                                    }):
                                                                                    null
                                                                                }

                                                                            </React.Fragment>
                                                                        );
                                                                    })
                                                                }

                                                            </div>
                                                            <div className="title_category_price">{material.name}</div>
                                                        </div>
                                                    </Grid>
                                                )
                                            })
                                        ): (null)
                                        }


                                    </Grid>
                                </React.Fragment>

                            ) : (
                                <div className={`show-shedule-btn`}>
                                    <div className={`row`}>
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
                        </div>
                        {materials && category ? (
                            <div className="contaoner-info">
                                {hideBtnClicked.block_2 ? null : (
                                    <div className="hide-shedule-btn">
                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_2: true})}/>
                                    </div>
                                )}
                                {!hideBtnClicked.block_2? (
                                    <React.Fragment>
                                        <div className="title_container_block">
                                            Наличие
                                        </div>
                                        <Grid container className={"search_materials"}>
                                            <Grid item xs={12} sm={6}>
                                                <div className="search_container">
                                                    <input type="text" name="search" className="inputSearch" onChange={(e) => handleSearchChange(e)} placeholder="Поиск" />
                                                    <div className="search_icon">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0)">
                                                                <path d="M4.41768 3.64122C4.18693 3.41028 3.81256 3.41028 3.58181 3.64122C2.72506 4.49797 2.30397 5.69147 2.42634 6.91591C2.45687 7.22094 2.71384 7.44832 3.01393 7.44832C3.03365 7.44832 3.05353 7.44732 3.07325 7.44535C3.39818 7.41285 3.63522 7.12297 3.60272 6.79825C3.51562 5.9281 3.81278 5.082 4.41768 4.47706C4.64862 4.24635 4.64862 3.87194 4.41768 3.64122Z" fill="#868789"/>
                                                                <path d="M6.75863 0C3.03191 0 0 3.03191 0 6.75863C0 10.4853 3.03191 13.5173 6.75863 13.5173C10.4853 13.5173 13.5173 10.4853 13.5173 6.75863C13.5173 3.03191 10.4853 0 6.75863 0ZM6.75863 12.335C3.68375 12.335 1.18228 9.8335 1.18228 6.75863C1.18228 3.68375 3.68375 1.18228 6.75863 1.18228C9.83331 1.18228 12.335 3.68375 12.335 6.75863C12.335 9.8335 9.8335 12.335 6.75863 12.335Z" fill="#868789"/>
                                                                <path d="M15.8268 14.991L11.5312 10.6954C11.3003 10.4645 10.9263 10.4645 10.6954 10.6954C10.4644 10.9262 10.4644 11.3005 10.6954 11.5313L14.991 15.8269C15.1064 15.9423 15.2575 16 15.4089 16C15.5602 16 15.7114 15.9423 15.8268 15.8269C16.0577 15.5961 16.0577 15.2217 15.8268 14.991Z" fill="#868789"/>
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0">
                                                                    <rect width="16" height="16" fill="white"/>
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>

                                        {(category !== undefined?
                                            <React.Fragment>
                                                {
                                                    (materials[category] && materials[category].materials.length)?
                                                        (materials[category].materials).map((item) => {
                                                            rows.push({
                                                                "id": item.id,
                                                                "code":item.code,
                                                                "name": item.name,
                                                                "unit":item.units.name,
                                                                "quantity": 1,
                                                                "base_price": 0,
                                                                "expensive":item.expensive
                                                            })
                                                        }):null
                                                }
                                                <TableContainer className={`material_table_list`}>
                                                    <Table aria-label="collapsible table">
                                                        <EnhancedTableHead
                                                            classes={classes}
                                                            numSelected={selected.length}
                                                            order={order}
                                                            orderBy={orderBy}
                                                            onRequestSort={handleRequestSort}
                                                            rowCount={rows.length}
                                                        />
                                                        <TableBody>
                                                            {stableSort(result.length ? result :  rows, getComparator(order, orderBy))
                                                                .slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)
                                                                .map((row, index) => {
                                                                    return(
                                                                        <TableRow onClick={()=>addMovingMaterial(row)} key={index}>
                                                                            <TableCell>{row.code}</TableCell>
                                                                            <TableCell>{row.name}</TableCell>
                                                                            <TableCell>{row.unit}</TableCell>
                                                                            <TableCell>
                                                                                {row.expensive == 1 ?
                                                                                    <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M0.120528 3.83127C0.0335282 3.9326 -0.00880513 4.0616 0.00152821 4.19494C0.0118615 4.32827 0.0731949 4.4496 0.174862 4.53627L2.64253 6.65161C2.73419 6.72994 2.84786 6.77194 2.9672 6.77194C2.98186 6.77194 2.99686 6.77127 3.01186 6.76994C3.14686 6.75794 3.26853 6.6936 3.35453 6.58927L7.57519 1.45227C7.65986 1.34894 7.69953 1.21894 7.68653 1.08594C7.67319 0.952938 7.60953 0.832938 7.5062 0.747938L6.73353 0.113271C6.52053 -0.0613955 6.20519 -0.0307289 6.02986 0.182271L2.78153 4.13594L1.47619 3.0176C1.26686 2.83894 0.950862 2.8626 0.771195 3.07194L0.120528 3.83127Z" fill="#F7B422"/>
                                                                                    </svg>
                                                                                    :null}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )
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
                                            </React.Fragment>
                                            :null)

                                        }
                                    </React.Fragment>
                                ) : (
                                    <div className={`show-shedule-btn`}>
                                        <div className={`row`}>
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
                            </div>):null}
                    </div>
                </Grid>
                {getmovingArray && getmovingArray.length ?
                    <Grid item className={`contaoner-info`}>
                        {hideBtnClicked.block_4 ? null : (
                            <div className="hide-shedule-btn">
                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_4: true})}/>
                            </div>
                        )}
                        {!hideBtnClicked.block_4? (
                            <>
                                <div className="title_container_block">
                                    Выбрано для перемещения
                                </div>
                                <WaybillMaterialsTable moving={getmovingArray} deleteAll={deleteAllMaterial} deleteMaterial={deleteMovingMaterial}/>
                            </>
                        ) : (
                            <div className={`show-shedule-btn`}>
                                <div className={`row`}>
                                    <div className="col-lg-5 left-line">
                                        <hr />
                                    </div>
                                    <div className="col-lg-1 circle-btn">
                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_4: false})}>
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
                    :null}

            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
    materials: state.materials.items
});

export default connect(mapStateToProps, { getAllMaterials,deleteCategory, deleteMaterial })(MaterialsWaybill);


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiTableSortLabel-active': {
            color: '#F08786',
        },
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        background: "#F6F7F8",
        boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.3)",
        borderRadius: 5,
        padding:52
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

const theme_main = createMuiTheme({
    palette: {
        primary: {
            main: '#3b80d6',
        },
    },
});

