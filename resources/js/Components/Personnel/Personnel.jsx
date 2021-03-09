import Grid from "@material-ui/core/Grid";
import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';

import TablePersonnel from "./TablePersonnel";
import Vector from "../Appoints/media/Vector";

import {getEmployers} from "../../actions/employeActions";
import store from "../../store";

import Search from "../helpers/Search";
import { Link } from "react-router-dom";
import {AppBar, Box, Tab, Tabs} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Header from "../helpers/Header";
import HeaderRight from "../helpers/HeaderRight";
import SheduleEmployees from "./ScheduleEmployees";
import IncomingCall from "../IncomingCall";
import {now} from "moment";
import Skeleton from "@material-ui/lab/Skeleton";
import { useForm } from "react-hook-form";
import moment from "moment";
import DoctorsScheduleFilter from "../helpers/DoctorsScheduleFilter";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

const Employers = ({ employers }) => {
    const styles = useStyles();
    const { register, handleSubmit } = useForm();
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
        "block_2": false

    });
    const [getTab, setTab] = React.useState(0);
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        store.dispatch(getEmployers());
    },[]);

    const [getFilterData, setFilterData]= useState();

    return(
        <Grid container spacing={4}>
            <Grid item xs={12} md={3} lg={3} xl={2}>
                <Grid item xs={12} className={styles.wrapper_component}>
                    <IncomingCall />
                </Grid>

                {/*1 - Расписание*/}
                {getTab === 1 &&
                    <Grid item xs={12} className={styles.wrapper_component}>
                        <DoctorsScheduleFilter filterData={setFilterData}/>
                    </Grid>
                }

            </Grid>
            <Grid item xs={12} md={9} lg={9} xl={10}>
                <Grid item xs={12} className={"wrapper_component"}>
                    <Grid item xs={12} md={9} xl={9}>
                        <Box>
                            <Header breadcrumb={
                                {
                                    "pageTitle": "Сотрудники",
                                    "links":[
                                        {"url": "/", "title": "Главная"},
                                        {"url": "/personnel", "title": "Сотрудники"}
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
                <Grid item xs={12} className={styles.wrapper_component}>
                    <AppBar position="static" color="default" className={styles.appBar}>
                        <Tabs
                            value={getTab}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            className={styles.tabs}
                            classes={{ indicator: styles.indicator }}
                        >
                            <Tab disableRipple label="Список сотрудников" {...a11yProps(0)} />
                            <Tab disableRipple label="Расписание" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>

                    <TabPanel value={getTab} index={0}>
                        <div className="contaoner-info">
                            {hideBtnClicked.block_1 ? null : (
                                <div className="hide-shedule-btn">
                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                                </div>
                            )}
                            {!hideBtnClicked.block_1? (
                                <div className="main-schedule-title">
                                    <Grid container className="searchTable">
                                        <Grid item xs={12} sm={6}>
                                            {employers && employers.length? <Search fields={["name"]} rows={employers}/> :null}

                                        </Grid>
                                        <Grid item xs={12} sm={4} className="create_patient_block">
                                            <div>
                                                <Link className="btn_creat_patient" to={"/personnel/create"}> + Добавить нового сотрудника</Link>
                                            </div>

                                        </Grid>
                                    </Grid>
                                    <TablePersonnel  listemployers={employers} />
                                </div>
                            ) : (
                                <div className="show-shedule-btn pb-4">
                                    <div className="row">
                                        <div className="col-lg-5 offset-lg-1 left-line">
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
                    </TabPanel>
                    <TabPanel value={getTab} index={1}>
                        <div className="contaoner-info">
                            {hideBtnClicked.block_2 ? null : (
                                <div className="hide-shedule-btn">
                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_2: true})}/>
                                </div>
                            )}
                            {!hideBtnClicked.block_2? (
                                <SheduleEmployees filterData={getFilterData} />
                            ) : (
                                <div className="show-shedule-btn pb-4">
                                    <div className="row">
                                        <div className="col-lg-5 offset-lg-1 left-line">
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
                    </TabPanel>
                </Grid>
            </Grid>
        </Grid>
    );
}
function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const mapStateToProps = (state) => ({
    employers: state.employers.items
});

export default connect(mapStateToProps, { getEmployers })(Employers);

const useStyles = makeStyles((theme) => ({
    wrapper_component: {
        marginBottom: "20px"
    },
    dflex: { display: "flex" },
    itemsCenter: { alignItems: "center" },
    noWrap: { flexWrap: "nowrap" },
    temptableCell: { border: "none", height: "70px", verticalAlign: "baseline", padding: 0 },
    appBar: {
        backgroundColor: "#ffffff",
        height: "80px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        marginBottom: "40px",
        filter: "none"
    },
    tabs: {
        height: "80px",
        padding: "0 50px",
        "& .MuiTabs-scrollable": {
            display: "flex"
        },
        "& .MuiTabs-scrollable .MuiButtonBase-root": {
            padding: "0",
            margin: "0 20px",
            minWidth: "0"
        }
    },
    indicator: {
        height: "4px"
    },
}));
