import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import GeneralPrice from './GeneralPrice';
import { connect } from 'react-redux';
import {getPrices} from "../../actions/pricesActions";
import store from "../../store";
import {getOneEmployee} from "../../actions/employeActions";
import {NavLink, useParams} from "react-router-dom";
import Header from "../helpers/Header";
import HeaderRight from "../helpers/HeaderRight";
import IncomingCall from "../IncomingCall";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            className={`tabpanel`}
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}


function Prices({prices}) {
    const styles = useStyles();
    const [value, setValue] = React.useState(0);
    const [getUpdated,setUpdated] = useState(false);
    let { priceId } = useParams();
    useEffect(() => {
        store.dispatch(getPrices());
    },[]);
    useEffect(() => {
        if(getUpdated){
            store.dispatch(getPrices());
            setUpdated(false);
        }
    },[getUpdated]);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={3} lg={3} xl={2}>
                <Grid item xs={12} className={styles.wrapper_component}>
                    <IncomingCall />
                </Grid>
            </Grid>
            <Grid item xs={12} md={9} lg={9} xl={10}>
                <Grid item xs={12} className={"wrapper_component"}>
                    <Grid item xs={12} md={9} xl={9}>
                        <Box>
                            <Header breadcrumb={
                                {
                                    "pageTitle": "Прейскурант",
                                    "links":[
                                        {"url": "/", "title": "Главная"},
                                        {"url": "/prices", "title": "Прейскурант"}
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
                    <div className={styles.root}>
                        <AppBar position="static"  className="tab_price" color="default">
                            <Tabs
                                className="med-directions-menu ui-block"
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example"
                            >

                                {prices ? (
                                    Object.keys(prices).map((item) => {
                                        let allPrice = prices[item];
                                        return (
                                            <Tab className="btn_tab_patient" key={item} label={allPrice.name} {...a11yProps(allPrice.id)} />
                                        )
                                    })
                                ): (null)
                                }
                            </Tabs>
                        </AppBar>
                        {prices ? (
                            Object.keys(prices).map((item,i) => {
                                return (
                                    <TabPanel className="content_tab_panel" key={item} value={value} index={i}>
                                        <GeneralPrice updated={setUpdated} priceList={prices[item]}/>
                                    </TabPanel>
                                )
                            })
                        ): (null)
                        }
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
    prices: state.prices.items
});

export default connect(mapStateToProps, { getPrices })(Prices);


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',

    },
    wrapper_component: {
        marginBottom: "20px"
    }
}));
