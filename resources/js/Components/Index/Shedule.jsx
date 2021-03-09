import React, {useState, useEffect} from "react";
import {createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import {Box,
    Grid,
    AppBar,
    Tabs,
    Tab,
    IconButton,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow} from "@material-ui/core";
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/ru';

import { connect } from 'react-redux';
import { getShedule } from "../../actions/sheduleActions";
import store from "../../store";
import AddNewRecordShedule from "../helpers/AddNewRecordShedule";
import EditRecordShedule from "../helpers/EditRecordShedule";
import Echo from "laravel-echo";
import {getLiveShedule} from "../../actions/sheduleActions";

const PatientRecord = ({color, patient, interval, end, status_id}) => {
    const styles = useStyles();
    return(
        <Grid container className={`${styles.sheduleRecordWrapper} ${end && styles.cellPadding}`}>
            <Box>{(interval) ? <Box className={styles.sheduleDataCabinetIntervalTime}>{interval}</Box>:<Box className={styles.sheduleDataCabinetIntervalTime}/>}</Box>
            <Box className={`${styles.itemsCenter} ${styles.noWrap} record ${color} ${(patient)?'top-radius':null} status_${status_id} ${status_id === 5 && 'blink'} ${(end)?'bottom-radius':null}`}>
                {(patient)? <Box>{patient.patients.name}</Box>:null}
            </Box>
        </Grid>
    )
}

const contains = (currentDate, startDate, endDate) => {
    return currentDate >= startDate && currentDate <= endDate;
}

const isStart = (currentDate, startDate) => {
    moment.defaultFormat = "DD.MM.YYYY HH:mm:ss";
    if(currentDate && currentDate !== undefined && startDate && startDate!== undefined ){
      currentDate.toString();
      startDate.toString();
      let momentCurrentDate = moment(currentDate, moment.defaultFormat).unix();
      let momentStartDate = moment(startDate, moment.defaultFormat).unix();
      return momentCurrentDate === momentStartDate;
    }
    return false;
}

const isEnd = (currentDate, endDate) => {
  moment.defaultFormat = "DD.MM.YYYY HH:mm:ss";
  if(currentDate && currentDate !== undefined && endDate && endDate!== undefined ){
    currentDate.toString();
    endDate.toString();
    let momentCurrentDate = moment(currentDate, moment.defaultFormat).unix();
    let momentEndDate = moment(endDate, moment.defaultFormat).unix();
    return momentCurrentDate === momentEndDate;
  }
  return false;
}

const sheduleCabinet = (cabinet, intervals) => {
    // console.log("cabinet", cabinet, intervals);
    let output = [];
    (intervals).map((interval) => {
        if(cabinet.patients.length) {
            (cabinet.patients).map((patient) => {
               // console.log(patient);
               moment.defaultFormat = "DD.MM.YYYY HH:mm:ss";
               let intervalPer=patient.date+" "+interval;
               let start = patient.date+" "+patient.time_start;
               let end = patient.date+" "+patient.time_end;
               intervalPer.toString();
               start.toString();
               end.toString();

                let intervalDate = moment(intervalPer, moment.defaultFormat).unix();
                let startDate = moment(start, moment.defaultFormat).unix();
                let endDate = moment(end, moment.defaultFormat).unix();

                if(contains(intervalDate, startDate, endDate)){
                    // if(isStart(intervalDate, startDate)){
                        output[interval] = patient;
                    // }

                }
            });
        } else {
            // output[interval] = [];
        }
    });
    let output2 =  [];
    (intervals).map((interval) => {
        output2.push({
            "interval": interval,
            "patient": (output[interval] !== undefined)? output[interval]: "empty"
        });
    });
    return output2;

}

const SheduleData = ({stage, date, intervals, cabinets}) => {
    const styles = useStyles();
    const currentIntervals = intervals[stage];

    const [isAddRecordOpen, setAddRecordIsOpen] = useState(false);
    const [isRecordEditOpen, setRecordEditIsOpen] = useState(false);

    const [addRecordData, setAddRecordData] = useState({
        "doctor_id": "",
        "time_start": "",
        "date": "",
        "intervals": []
    });
    const [editRecordData, setEditRecordData] = useState({
        "patient": "",
        "date": "",
        "time_start":"",
        "time_end":""
    });
    const handleAddRecord = ({doctor, time_start, date}) => {
        setAddRecordData({
            "doctor": doctor,
            "time_start": time_start,
            "date": date,
            "intervals": currentIntervals
        })
        setAddRecordIsOpen(true);
    }
    const handleEditRecord = ({patient, date, time_start, time_end}) => {
        setEditRecordData({
            "patient": patient,
            "date": moment(date).format("DD.MM.YYYY"),
            "time_start": moment(`${date} ${time_start}`).format("HH:mm"),
            "time_end": moment(`${date} ${time_end}`).format("HH:mm")
        })
        setRecordEditIsOpen(true);
    }
    const handleAddRecordClose = () => {
        setAddRecordIsOpen(!isAddRecordOpen);
    };
    const handleEditRecordClose = () => {
        setRecordEditIsOpen(!isRecordEditOpen);
    }
    return(
        <Grid container className={styles.sheduleDataWrapper}>
            {isRecordEditOpen && <EditRecordShedule onRequestClose={handleEditRecordClose} data={editRecordData}/>}
            {isAddRecordOpen && <AddNewRecordShedule onRequestClose={handleAddRecordClose} data={addRecordData}/>}
            <Grid item xs={12}>
                <Box className={styles.sheduleDataTitle}><Moment locale={"ru"} format={"D MMMM YYYY"} withTitle date={date} /> | {stage} смена</Box>
            </Grid>
            <Grid container className={styles.sheduleDataCabinets}>
                <TableContainer component={"div"} className={styles.tableContainer}>
                    <Table className={styles.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {Object.keys(cabinets).map((id, index) => {
                                    let cabinet = cabinets[id]
                                    return (
                                        <TableCell key={index} className={styles.sheduleDataCabinetTitle}>
                                            <Box className={styles.sheduleDataCabinetTitleCabinet}>{cabinet.cabinet_name} | <Box component={"span"} className={`${styles.sheduleDataCabinetTitleDoctor} doctor_color ${cabinet.cabinet_color}`}>{cabinet.doctor_name}</Box></Box>
                                            <Box>ул. Кубанская, 54</Box>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            <TableRow>
                            {Object.keys(cabinets).map((id, index) => {
                                let cabinet = cabinets[id];
                                let shedules = sheduleCabinet(cabinet, currentIntervals);

                                return(
                                    <TableCell width={"280px"} key={index} className={styles.sheduleDataCabinetIntervals} >
                                        {(shedules).map((shedule) => {
                                        return(
                                            <TableRow>
                                            <TableCell className={styles.temptableCell}>
                                            {(shedule.patient === "empty")?
                                                <Grid container className={`${styles.itemsCenter} ${styles.noWrap} ${styles.addRecordBtn}`}>
                                                    <Box className={styles.sheduleDataCabinetIntervalTime}>{shedule.interval}</Box>
                                                    <Box className={styles.sheduleDataCabinetIntervalAdd}>
                                                        <IconButton
                                                            disableRipple
                                                            disableFocusRipple
                                                            aria-label="add"
                                                            onClick={() => handleAddRecord({
                                                                "doctor": {
                                                                    id: cabinet.doctor.id,
                                                                    name: cabinet.doctor.name
                                                                },
                                                                "time_start": shedule.interval,
                                                                "date": date
                                                            })}
                                                        >
                                                            <SvgIcon
                                                                className={cabinet.cabinet_color}
                                                                fill={"#868789"}
                                                                viewBox={"0 0 232 24"}
                                                                height={24}
                                                                width={232}
                                                            >
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M116 24C122.627 24 128 18.6274 128 12C128 5.37258 122.627 0 116 0C109.373 0 104 5.37258 104 12C104 18.6274 109.373 24 116 24ZM116.625 11.375H122.875C123.22 11.375 123.5 11.6548 123.5 12C123.5 12.3452 123.22 12.625 122.875 12.625H116.625V18.875C116.625 19.2202 116.345 19.5 116 19.5C115.655 19.5 115.375 19.2202 115.375 18.875V12.625H109.125C108.78 12.625 108.5 12.3452 108.5 12C108.5 11.6548 108.78 11.375 109.125 11.375H115.375V5.12499C115.375 4.77981 115.655 4.5 116 4.5C116.345 4.5 116.625 4.77981 116.625 5.12499V11.375Z"/>
                                                                <path d="M1 12H91" stroke="#DFE6EE" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5"/>
                                                                <path d="M141 12H231" stroke="#DFE6EE" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 5"/>
                                                            </SvgIcon>
                                                        </IconButton>
                                                    </Box>
                                                </Grid>
                                                :
                                                (isStart(`${shedule.patient.date} ${shedule.interval}`,`${shedule.patient.date} ${shedule.patient.time_start}`))?
                                                    <Box onClick={() => handleEditRecord({
                                                        "patient": shedule.patient,
                                                        "date": shedule.patient.date,
                                                        "time_start": shedule.patient.time_start,
                                                        "time_end": shedule.patient.time_end
                                                    })}><PatientRecord status_id={shedule.patient.status_id} interval={shedule.interval} color={cabinet.cabinet_color} patient={shedule.patient}/></Box>
                                                    :<Box onClick={() => handleEditRecord({
                                                        "patient": shedule.patient,
                                                        "date": shedule.patient.date,
                                                        "time_start": shedule.patient.time_start,
                                                        "time_end": shedule.patient.time_end
                                                    })} ><PatientRecord status_id={shedule.patient.status_id} color={cabinet.cabinet_color} end={(isEnd(`${shedule.patient.date} ${shedule.interval}`,`${shedule.patient.date} ${shedule.patient.time_end}`))}/></Box>}
                                            </TableCell>
                                            </TableRow>

                                            )
                                        })}
                                    </TableCell>
                                )
                            })}
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

function Shedule({currentDate, shedule, professions, user_branch, filterData}) {
    const styles = useStyles();
    const [getTab, setTab] = React.useState(0);

    const intervals = {
        "1": [
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00"
        ],
        "2": [
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30",
            "18:00",
            "18:30",
            "19:00",
            "19:30"
        ]
    }

    const [getChannelData, setChannelData] = useState();
    useEffect(() => {
        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: window.location.hostname + ":" + 6001,
            auth:{
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }

        });

        window.Echo.private('live-shedule-channel')
            .listen('.liveSheduleUpdate', (data) => {
                console.log("socket", data);
                setChannelData(data);
            });
    }, []);
    useEffect(() => {
        if (getChannelData !== undefined){
            store.dispatch(getLiveShedule(getChannelData));
        }
    }, [getChannelData]);

    useEffect(() => {
        moment.locale('ru');
    }, []);

    useEffect(() => {
        if (filterData !== undefined){
            console.log(filterData)
            store.dispatch(getShedule({
                date: moment(currentDate).format("DD.MM.YYYY"),
                branch_id: filterData.branch_id,
                doctor_id: filterData.doctor_id,
                profession_id: filterData.profession_id
            }));
        } else {
            store.dispatch(getShedule({date: moment(currentDate).format("DD.MM.YYYY"), branch_id: user_branch}));
        }
    }, [currentDate, filterData]);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        console.log(professions)
    }, [professions])

    return(
        <Grid container className={styles.component_wrapper}>
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
                    {professions.length ?
                        professions.map(profession => {
                            return(
                                <Tab disableRipple label={profession.name} {...a11yProps(profession.id)} />
                            )
                        })
                        :
                        null
                    }
                </Tabs>
            </AppBar>

            <Grid container>
                {shedule?
                    Object.keys(shedule).map((id, index) => {
                        return(
                            <Grid item style={{maxWidth: "100%"}} key={index}>
                                <SheduleData stage={id} date={currentDate} cabinets={shedule[id].cabinet} intervals={intervals}/>
                            </Grid>
                        )
                    })
                    :null}
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    shedule: state.shedule.shedule,
    user_branch: state.auth.branch,
    professions: state.doctorsSchedules.filter.data.professions
});
export default connect(mapStateToProps, {getShedule})(Shedule);

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    tableContainer : {
        width: "1500px",
        overflowX: "auto",
        maxWidth: "100%",
    },
    table: {tableLayout: "fixed"},
    dflex: { display: "flex" },
    itemsCenter: { alignItems: "center" },
    noWrap: { flexWrap: "nowrap" },
    temptableCell: { border: "none", height: "70px", verticalAlign: "baseline", padding: 0 },
    wrapper_component: {},
    appBar: {
        backgroundColor: "#ffffff",
        height: "80px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        filter: "none",
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
    sheduleDataWrapper: {
        backgroundColor: "#ffffff",
        padding: "50px 35px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        marginTop: "40px"
    },
    sheduleDataTitle: {
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "16px",
        color: "#000000",
        marginBottom: "30px"
    },
    sheduleDataCabinets: {

    },
    sheduleDataCabinet: {

    },
    sheduleDataCabinetTitle: {
        color: "#16181E",
        width: "280px",
        padding: "0 20px",
        fontSize: "12px",
        fontStyle: "normal",
        textAlign: "center",
        fontWeight: "bold",
        marginRight: "50px",
        borderBottom: 0,
        display: "table-cell",
        marginBottom: "20px"
    },
    sheduleDataCabinetTitleCabinet: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        color: "#313541",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden"
    },
    sheduleDataCabinetTitleDoctor: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        textTransform: "capitalize"
    },
    sheduleDataCabinetIntervals: {
        color: "#16181E",
        width: "280px",
        padding: "0 20px",
        fontSize: "12px",
        fontStyle: "normal",
        textAlign: "center",
        fontWeight: "bold",
        marginRight: "50px",
        borderBottom: 0,
        display: "table-cell",
    },
    sheduleDataCabinetInterval: {
        alignItems: "center",
        marginTop: "15px",
        marginBottom: "15px"
    },
    tableCell: {
        marginRight: "60px",
        marginTop: "15px",
        marginBottom: "15px",
        padding: 0,
        border: "none"
    },
    sheduleDataCabinetIntervalTime: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        textAlign: "left",
        color: "#313541",
        width: "50px"
    },
    sheduleDataCabinetIntervalAdd: {
        margin: "0 auto",
        "& .MuiIconButton-root:hover": {
            backgroundColor: "inherit"
        },
        "& button": {
            padding: 0
        }
    },
    sheduleRecordWrapper: {
        flexWrap: "nowrap"
    },
    cellPadding: {
        paddingBottom: "20px"
    },
    addRecordBtn: {
        minHeight: "80px",
        "& svg": {
            width: "100%",
            height: "100%"
        }
    }
}));
