import React, {useState, useEffect} from "react";
import {Box, Grid, SvgIcon} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Echo from "laravel-echo";
import store from "../../store";
import {getLiveTape, setLiveTape} from "../../actions/livetapeActions";
import {getpageTasks} from "../../actions/crmAction";
import { connect } from 'react-redux';
import Vector from "../Appoints/media/Vector";
import ScheduleAppointment from "../helpers/ScheduleAppointment";

function CalendarCustomIcon(){
    return(
        <SvgIcon viewBox={"0 0 18 18"}>
            <g clip-path="url(#clip0)">
                <path d="M5.32331 4.5459C5.01203 4.5459 4.7597 4.29358 4.7597 3.98229V0.56361C4.7597 0.252321 5.01203 0 5.32331 0C5.6346 0 5.88692 0.252321 5.88692 0.56361V3.98229C5.88692 4.29358 5.6346 4.5459 5.32331 4.5459Z"/>
                <path d="M12.6767 4.5459C12.3654 4.5459 12.1131 4.29358 12.1131 3.98229V0.56361C12.1131 0.252321 12.3654 0 12.6767 0C12.988 0 13.2403 0.252321 13.2403 0.56361V3.98229C13.2403 4.29358 12.988 4.5459 12.6767 4.5459Z"/>
                <path d="M17.1453 6.69213V4.11369C17.1453 2.78801 16.0668 1.70951 14.7411 1.70951H14.3675V3.98244C14.3675 4.91479 13.6091 5.67327 12.6767 5.67327C11.7444 5.67327 10.9859 4.91479 10.9859 3.98244V1.70947H7.01415V3.9824C7.01415 4.91476 6.25568 5.67323 5.32333 5.67323C4.39097 5.67323 3.6325 4.91476 3.6325 3.9824V1.70947H3.25886C1.93318 1.70947 0.854675 2.78797 0.854675 4.11366V6.6921H17.1453V6.69213Z"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.854675 15.5955V7.81885H17.1454V15.5955C17.1454 16.9212 16.0669 17.9997 14.7412 17.9997H3.25886C1.93318 17.9997 0.854675 16.9212 0.854675 15.5955ZM6.55588 14.7774C6.19695 15.0258 5.70676 14.7689 5.70676 14.3324C5.70676 14.151 5.79761 13.9817 5.94875 13.8815L7.11076 13.1105C7.47141 12.8567 7.79241 12.6558 8.15223 12.4423C8.15936 12.4381 8.16376 12.4304 8.16376 12.4221C8.16376 12.4137 8.15922 12.4059 8.15191 12.4017C7.7787 12.188 7.44459 11.9741 7.09726 11.747L5.94524 10.9976C5.79649 10.9009 5.70676 10.7355 5.70676 10.558C5.70676 10.1329 6.186 9.88444 6.53342 10.1294L8.03299 11.1868C8.53423 11.5402 9.20183 11.5468 9.70995 11.2033L11.3795 10.0747C11.7462 9.82686 12.2408 10.0895 12.2408 10.5321C12.2408 10.7175 12.1477 10.8905 11.993 10.9927L10.7693 11.801C10.395 12.055 10.0339 12.2693 9.64675 12.4963C9.63964 12.5004 9.63526 12.5081 9.63526 12.5163C9.63526 12.5248 9.63988 12.5326 9.64727 12.5366C10.034 12.7504 10.3818 12.9646 10.7693 13.2185L11.9962 14.0065C12.1486 14.1043 12.2408 14.273 12.2408 14.4542C12.2408 14.884 11.7574 15.1364 11.4046 14.8908L9.75801 13.7441C9.24583 13.3875 8.56599 13.3865 8.05276 13.7416L6.55588 14.7774Z"/>
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="24" height="24" fill="white"/>
                </clipPath>
            </defs>
        </SvgIcon>
    )
}
function PortfolioCustomIcon(){
    return(
        <SvgIcon  viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.43994 9.6001H12.0399V10.8001H8.43994V9.6001Z" />
            <path d="M16.6149 10.8002H13.2398V11.4002C13.2398 11.7317 12.9714 12.0001 12.6398 12.0001H7.83989C7.50833 12.0001 7.2399 11.7317 7.2399 11.4002V10.8002H3.86479C3.08902 10.8002 2.40293 10.3056 2.15731 9.56971L0 3.09668V16.2001C0 17.1926 0.807488 18.0001 1.79997 18.0001H18.6797C19.6722 18.0001 20.4797 17.1926 20.4797 16.2001V3.09715L18.3222 9.56971C18.0768 10.3056 17.3907 10.8002 16.6149 10.8002Z"/>
            <path d="M12.6397 0H7.83978C6.8473 0 6.03981 0.807488 6.03981 1.79997V2.39997H1.03223L3.29516 9.18971C3.37719 9.43518 3.60625 9.59986 3.86469 9.59986H7.23979V8.99987C7.23979 8.66831 7.50823 8.39988 7.83978 8.39988H12.6397C12.9713 8.39988 13.2397 8.66831 13.2397 8.99987V9.59986H16.6148C16.8732 9.59986 17.1023 9.43518 17.1843 9.18971L19.4474 2.39997H14.4397V1.79997C14.4397 0.807488 13.6322 0 12.6397 0ZM7.23979 2.39997V1.79997C7.23979 1.46889 7.5087 1.19998 7.83978 1.19998H12.6397C12.9708 1.19998 13.2397 1.46889 13.2397 1.79997V2.39997H7.23979Z"/>
        </SvgIcon>
    )
}

function LiveTape({livetape,allTasks}) {
    const styles = useStyles();
    const [getCurrentTab, setCurrentTab] = useState(0);
    const [expanded, setExpanded] = useState('');
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
    });
    const [getVisibleScheduleAppointment, setVisibleScheduleAppointment] = useState(false);
    const [getLivePatient, setLivePatient] = useState();
    const rows = [];
    const handleChangeAccord = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

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

        window.Echo.private('live-feed-channel')
            .listen('.liveFeedUpdate', (data) => {
                setChannelData(data.usersCancelled);
            });
    }, []);

    useEffect(() => {
        store.dispatch(getLiveTape());
    }, []);
    useEffect(() => {
        if (getChannelData !== undefined){
            console.log(getChannelData);
            store.dispatch(setLiveTape(getChannelData));
        }
    }, [getChannelData]);

    useEffect(() => {
        store.dispatch(getpageTasks(1));
    },[]);

    const addListWaiting = (data) =>{
      setVisibleScheduleAppointment(true);
      setLivePatient(data);
    }

    return(
        <Box className={styles.container_live_tape}>
            {hideBtnClicked.block_1 ? null : (
                <div className="hide-shedule-btn">
                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                </div>
            )}
            {!hideBtnClicked.block_1? (
                <Box className={styles.root}>
                    <AppBar position="static" className="live_appBar">
                        <Tabs
                            value={getCurrentTab}
                            onChange={(event,value) => setCurrentTab(value)}
                            variant="scrollable"
                            scrollButtons="off"
                            aria-label="scrollable prevent tabs example"
                            className="live_appBar_tabs"
                            classes={{indicator: styles.tab_indicator}}
                        >
                            <StyledTab icon={<CalendarCustomIcon />} aria-label="phone" {...a11yProps(0)}/>
                            <StyledTab icon={<PortfolioCustomIcon />} aria-label="favorite" {...a11yProps(1)}/>
                            <StyledTab icon={<PhoneIcon />} aria-label="favorite" {...a11yProps(2)}/>
                        </Tabs>
                    </AppBar>
                    <TabPanel className={"live_appBar_container"} value={getCurrentTab} index={0}>
                        {livetape && livetape.length ?
                            (livetape).map((tape) => {
                                return(
                                    <Grid container className={"excellent_receptions"}>
                                        <Grid item xs={12} sm={12} className={`item_life_patient ${tape.cancel_reason}`}>
                                            <Grid item xs={6} sm={6}>
                                                <Box>{tape.user_name}</Box>
                                                <Box>{tape.phone[0]}</Box>
                                                <Box className={"item_cancel"}>
                                                    {/*<Box>Отказ от преёма:</Box>*/}
                                                    <Box>{tape.cancel_reason_detail}</Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Box><b>Дата:</b> <span>{tape.date}</span></Box>
                                                <Box><b>Время:</b> <span>{tape.time}</span></Box>
                                                <Box><b>Врач:</b> <span>{tape.doctor_name}</span></Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            }):null}
                    </TabPanel>
                    <TabPanel className={"live_appBar_container"} value={getCurrentTab} index={1}>
                    {allTasks && "data" in  allTasks?
                        (allTasks.data).map((item) => {
                            rows.push({
                                "id":item.id,
                                "fio":item.patient? item.patient.name:"",
                                "phone":item.phone,
                                "time_new": item.time_new,
                                "date_new":item.date_new,
                                "responsible":item.administrator?item.administrator.name:"",
                                "status":item.status? item.status:"",
                                "patient_id":item.patient_id
                            })
                        }):null}
                        {rows.map((item) => {
                            return (
                              <Accordion className="typography_live" square expanded={expanded === 'panel'+item.id} onChange={handleChangeAccord('panel'+item.id)}>
                                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                      <Grid container className={"item_life_patient"}>
                                          <Grid item xs={6} sm={6}>
                                              <Box>{item.fio}</Box>
                                              <Box>{item.phone}</Box>
                                          </Grid>
                                          <Grid item xs={6} sm={6}>
                                              <Box><b>Дата:</b> <span>{item.date_new}</span></Box>
                                              <Box><b>Время:</b> <span>{item.time_new}</span></Box>
                                              <Box><b>Ответственный:</b> <span>{item.responsible}</span></Box>
                                          </Grid>
                                      </Grid>
                                  </AccordionSummary>
                                  <AccordionDetails className="item_btn_life_patient">
                                      <Grid container justify={"center"}>
                                          <Grid item className={"btn_life_patient"}>
                                              <Box>Оповестить</Box>
                                              <Box>Перенести задачу с оповещание</Box>
                                              <Box onClick={() => addListWaiting({"name":item.fio,"id":item.patient_id})}>Добавить в лист ожидания</Box>
                                              <Box>Отменить приём</Box>
                                              <Box className={"live_link_card"}>К Карточке</Box>
                                          </Grid>
                                      </Grid>
                                  </AccordionDetails>
                              </Accordion>
                            );
                        })}
                        <ScheduleAppointment livePatient={getLivePatient} getVisible={getVisibleScheduleAppointment} visible={setVisibleScheduleAppointment}/>
                    </TabPanel>
                    <TabPanel className={"live_appBar_container"} value={getCurrentTab} index={2}>
                        <Accordion className="typography_live" square expanded={expanded === 'panel'+1} onChange={handleChangeAccord('panel'+1)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Grid container className={"item_life_patient"}>
                                    <Grid item xs={6} sm={6}>
                                        <Box>Абрамов Сергей Петрович</Box>
                                        <Box>+7(999) 999-99-99</Box>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <Box><b>Дата:</b> <span>28.10.2020</span></Box>
                                        <Box><b>Время:</b> <span>13:00</span></Box>
                                        <Box><b>Врач:</b> <span>Ангелина Ильдар Эдуардович</span></Box>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails className="item_btn_life_patient">
                                <Grid container justify={"center"}>
                                    <Grid item className={"btn_life_patient"}>
                                        <Box>Оповестить</Box>
                                        <Box>Отменить приём</Box>
                                        <Box className={"live_link_card"}>К Карточке</Box>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </TabPanel>
                </Box>
            ) : (
                <div className={`show-shedule-btn`}>
                    <div className={`row ${styles.center}`}>
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
        </Box>
    )
}
const mapStateToProps = (state) => ({
    livetape: state.livetape.items,
    allTasks: state.crm.allTasks
});

export default connect(mapStateToProps, { getLiveTape,getpageTasks })(LiveTape);



const StyledTab = withStyles({
    selected: {
        color: "#ffffff",
        background: "#3B80D6"
    }
})(Tab);

const AccordionSummary = withStyles({
    root: {
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
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

const useStyles = makeStyles((theme) => ({
    container_live_tape: {
        background: '#FFFFFF',
        boxShadow: '2px 0px 2px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        padding: '40px 15px !important',
        // marginLeft: '35px',
        width: '100%',
        position:'relative'
    },
    root: {
        flexGrow: 1,
        width: '100%',
    },
    tab_indicator: {
        display: "none",
    },
    tab_btn: {
        backgroundColor: "#000000"
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));
const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);
