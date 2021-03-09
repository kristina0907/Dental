import React, {useState, useEffect} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {Box, Grid} from "@material-ui/core";

import {
    useRouteMatch
} from "react-router-dom";

import { connect } from 'react-redux';
import store from "../../store";

import LiveTape from "./LiveTape";
import Calendar from "./Calendar";
import SheduleFilter from "./SheduleFilter";
import Shedule from "./Shedule"
import Header from "../helpers/Header";
import HeaderRight from "../helpers/HeaderRight";
import IncomingCall from "../IncomingCall";

function Index({user}) {
    const styles = useStyles();
    const params = new URLSearchParams(window.location.search);

    const [getCurrentDate, setCurrentDate] = useState(new Date());
    const [getFilterData, setFilterData] = useState();

    return(
        <Grid container spacing={4}>
            <Grid item xs={12} md={3} lg={3} xl={2}>
                <Grid item xs={12} className={styles.wrapper_component}>
                    <IncomingCall />
                </Grid>
                <Grid item xs={12} className={styles.wrapper_component}>
                    <Box>
                        <Calendar dateNow={getCurrentDate} dateCurrent={setCurrentDate} />
                    </Box>
                </Grid>
                <Grid item xs={12} className={styles.wrapper_component}>
                    <Box>
                        <SheduleFilter
                            filterData={setFilterData}
                            currentDate={getCurrentDate}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={8}>
                <Grid item xs={12} className={styles.wrapper_component}>
                    <Box>
                        <Header breadcrumb={
                            {
                                "pageTitle": "Запись на прием",
                                "links":[
                                    {"url": "/", "title": "Главная"}
                                ]
                            }
                        }/>
                    </Box>
                </Grid>
                <Grid item xs={12} className={styles.wrapper_component}>
                    <Box>
                        <Shedule filterData={getFilterData} currentDate={getCurrentDate}/>
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12} md={3} lg={3} xl={2}>
                <Grid item xs={12} className={styles.wrapper_component}>
                    <Box>
                        <HeaderRight />
                    </Box>
                </Grid>
                <Grid item xs={12} className={styles.wrapper_component}>
                    <Box>
                        <Grid item component={LiveTape} className={styles.wrapper_component}/>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}
const mapStateToProps = (state) => ({
    user: state.auth.user
});
export default connect(mapStateToProps)(Index)

const useStyles = makeStyles((theme) => ({
    wrapper_component: {
        marginBottom: "20px"
    }
}));

