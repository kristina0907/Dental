import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import diagnosticList from '../../media/json/diagnosticList.json';
import {CircularProgress} from "@material-ui/core";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'div'}>{children}</Typography>
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    tabs: {
        // borderRight: `1px solid ${theme.palette.divider}`,

    },
    btn_invoice: {
        cursor: 'pointer'
    },
    disabled: {
        pointerEvents: "none",
        backgroundColor: "#DFE6EE",
        color: "#868789"
    }
}));

export default function DiagnosisTab({getDisable, setCreate, setData }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = ({ currentTarget }) => {
        let text = currentTarget.textContent;
        setData(text);
    }
    return (
      <React.Fragment>
        <div className={classes.root}>
            <div className="container_list_diagnosis">
                <div className="main-schedule-title">
                    <h2 className={`card-title-h2`}>Шаблоны Диагноз</h2>
                </div>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    {
                        Object.keys(diagnosticList).map((group) =>{
                            let currentgroup = diagnosticList[group];
                            return(
                                <Tab label={currentgroup.title} {...a11yProps(Number(group))} />
                            )
                        })
                    }
                </Tabs>
            </div>
            <div className="container_tabPanel_diagnisis">
                {
                    Object.keys(diagnosticList).map((group) =>{
                        let currentgroup = diagnosticList[group];
                        return(
                            <TabPanel value={value} index={Number(group)}>
                                <div>
                                    {
                                        Object.keys(currentgroup.list).map((idlist) => {
                                            let currentlist = currentgroup.list[idlist];
                                            return(
                                                <div className="item_description_diagnosis" onClick={handleClick}>
                                                    <span>{currentlist.code} </span>
                                                    {currentlist.title}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </TabPanel>
                        )
                    })
                }
            </div>
        </div>
        <div
            className={`treatment_plan ${classes.btn_invoice} ${getDisable? classes.disabled:""}`}
            onClick={setCreate}>
                {!getDisable ? "Сформировать счет":<CircularProgress color="primary" />}
        </div>
        </React.Fragment>
    );
}
