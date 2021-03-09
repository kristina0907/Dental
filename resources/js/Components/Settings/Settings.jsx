import React, {useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from "@material-ui/core/Grid";
import AccessRights from "./AccessRights";
import DocumentTemplates from "./DocumentTemplates";
import Header from "../helpers/Header";
import HeaderRight from "../helpers/HeaderRight";
import IncomingCall from "../IncomingCall";
import Administration from "./Administration";


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
                    <Typography component={'div'} >{children}</Typography>
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


export default function ScrollableTabsButtonAuto() {

    const styles = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <Grid className={"content_main_tab_card"} container spacing={4}>
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
                                                    "pageTitle": "Настройки",
                                                    "links":[
                                                        {"url": "/", "title": "Главная"},
                                                        {"url": "/settings", "title": "Настройки"}
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
                                <AppBar position="static" color="default">
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
                                        <Tab className="btn_tab_patient" label="Права доступа" {...a11yProps(0)} />
                                        <Tab className="btn_tab_patient" label="Шаблоны документов" {...a11yProps(1)} />
                                        {/*<Tab className="btn_tab_patient" label="Интеграции" {...a11yProps(2)} />*/}
                                        <Tab className="btn_tab_patient" label="Администрирование" {...a11yProps(2)} />
                                    </Tabs>
                                </AppBar>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                                <TabPanel value={value} index={0}>
                                    <AccessRights />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                   <DocumentTemplates />
                                </TabPanel>
                                {/*<TabPanel value={value} index={2}>*/}
                                {/*    123*/}
                                {/*</TabPanel>*/}
                                <TabPanel value={value} index={2}>
                                    <Administration />
                                </TabPanel>
                            </Grid>
                        </Grid>

    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',

    },
    wrapper_component: {
        marginBottom: "20px"
    }
}));
