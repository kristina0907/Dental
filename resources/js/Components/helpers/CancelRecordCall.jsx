import React, {useState, useEffect} from "react";
import {Box, Grid, IconButton, SvgIcon, Divider} from "@material-ui/core";
import {Link} from "react-router-dom";

import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/ru';
import {makeStyles} from "@material-ui/core/styles";
import Close from "../Appoints/media/Close";
import {useForm} from "react-hook-form";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DatePicker from "react-datepicker";
import {now} from "moment";
import {diffDate} from "./helpers";
import {dictionary} from "../../dictionary";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EditRecordShedule({onRequestClose, data}) {
    const { handleSubmit, register } = useForm();
    const styles = useStyles();
    const [showAlert, setShowAlert] = useState(false);
    const hideAlert = () => {
        setShowAlert(false)
    }

    const [recordStatus, setRecordStatus] = useState(data.patient.status_id);
    const [responseResult, setResponseResult] = useState({});
    useEffect(() => {
        if (recordStatus){
            axios.post(`/api/shedule/change/status`, {
                "status_id": recordStatus,
                "record_id": data.patient.id,
                "branch_id": data.patient.branch_id,
                "date": data.date
            }).then((response) => {
                setResponseResult({"success": response.success})
            }).catch((response) => {
                setResponseResult({"error": response.error})
            })
        }
    }, [recordStatus]);

    const [isCancelRecord, setCancelIsRecord] = useState(false);
    const [isEditRecord, setEditRecord] = useState(false);
    const handleCancelRecord = (record) => {
        setCancelIsRecord(true);
    }
    const handleEditRecord = (record) => {
        setEditRecord(true);
    }
    const reasons = {
        "0": {"status": "yellow", "label": "Неизвестна"},
        "1": {"status": "red", "label": "Отказ от приёма",
            "detail": {
                "0": {"value":"Неизвестна", "text": "Неизвестна"},
                "1": {"value":"Недовольство ценой", "text": "Недовольство ценой"},
                "2": {"value":"Недовольство качеством", "text": "Недовольство качеством"},
                "3": {"value":"Переезд", "text": "Переезд"},
            }
        },
        "2": {"status": "red", "label": "Отказ от лечения", "detail": {
                "0": {"value":"Неизвестна", "text": "Неизвестна"},
                "1": {"value":"Недовольство ценой", "text": "Недовольство ценой"},
                "2": {"value":"Недовольство качеством", "text": "Недовольство качеством"},
                "3": {"value":"Переезд", "text": "Переезд"},
            }},
        "3": {"status": "green", "label": "Отменён врачом"},
        "4": {"status": "green", "label": "Ошибка добавления"}
    };
    const [getActiveReason, setActiveReason] = useState();
    const handleReasonChange = (e) => {
        let index = e.target.selectedIndex;
        let optionElement = e.target.childNodes[index]
        let option =  optionElement.getAttribute('id');

        setActiveReason(parseInt(option));
    }
    const onCancelSubmit = (values) => {
        axios
            .post(`/api/shedule/cancelrecord`, {
                ...values,
                "id": data.patient.id,
                "date": data.date,
                "time_start": data.time_start,
                "time_end": data.time_end
            })
            .then(response => {
                setCancelIsRecord(false);
                onRequestClose();
            })
            .catch(error => {
                console.log(error)
            })
    }

    //Update Record
    const [alertMessage, setAlertMessage] = useState({"message": "", "type": ""});
    const onEditSubmit = (values) => {
        axios
            .post(`/api/shedule/updaterecord`, values)
            .then(response => {
                console.log(response);
                if ("error" in response.data) {
                    setAlertMessage({
                        message: dictionary.intervalError,
                        type: "error"
                    });
                    setShowAlert(true);
                } else {
                    onRequestClose()
                }

            })
            .catch(error => console.log("error", error))
    }

    function isDoctors(element){
        let doctors = [];
        Object.entries(element).forEach(([smenaKey, smena]) => {
            Object.entries(smena.cabinet).forEach(([key, cabinet]) => {
                doctors.push({
                    "id": cabinet.doctor.id,
                    "doctor_name": cabinet.doctor_name,
                    "smena": parseInt(smenaKey)
                });
            });
        });
        return doctors;
        // return [...new Map(doctors.map(item => [item['id'], item])).values()];
    }
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
    const [recordUpdateDate, setRecordUpdateDate] = useState(now());
    const [recordUpdateDoctors, setRecordUpdateDoctors] = useState([]);
    const [recordUpdateCurrentSmena, setRecordUpdateCurrentSmena] = useState(1);
    const [recordUpdateTimeEnd, setRecordUpdateTimeEnd] = useState(intervals[recordUpdateCurrentSmena]);

    useEffect(() => {
        let requestData = {"date": moment(recordUpdateDate).format("DD-MM-YYYY"), "branch_id": 1};
        axios
            .get(`/api/shedule/get/records`, {params: requestData})
            .then(response => {
                let responseData = "smena" in response.data? [response.data.smena]: [];
                setRecordUpdateDoctors(isDoctors(responseData[0]));
            })
            .catch(error => console.log(error))
    },[recordUpdateDate]);

    const handleChangeTimeStart = (e) => {
        setRecordUpdateCurrentSmena(intervals[1].filter(interval => interval === e.target.value).length ? 1 : 2);
        setRecordUpdateTimeEnd(intervals[recordUpdateCurrentSmena]);
    }

    return(
        <Grid container className={styles.root}>
            <Snackbar open={showAlert} autoHideDuration={2000} onClose={hideAlert}>
                <Alert severity={alertMessage.type}>{alertMessage.message}</Alert>
            </Snackbar>
            <Grid container className={styles.wrapper}>
                <Grid item xs={12}><Close closeClicked={onRequestClose} /></Grid>
                <form onSubmit={handleSubmit(onCancelSubmit)}>
                    <Grid container className={styles.bshadow}>
                        <Grid item className={styles.lcontent}>
                            {/*<Grid item xs={12} className={`${styles.dFlex} ${styles.aCenter} ${styles.jSpaceBetween}`}>*/}
                            {/*    <Box className={styles.patientName}>{data && "patient" in data && data.patient.patients.name}</Box>*/}
                            {/*    <Box className={styles.date}>{data && "time_start" in data && data.time_start} - {data && "time_end" in data && data.time_end}</Box>*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                <Box component={"div"} className={styles.groupInput}>
                                    <label>Причина:</label>
                                    <select ref={register} className={"input"} name={"reason"} onChange={(e) => handleReasonChange(e)}>
                                        {Object.keys(reasons).map((index) => {
                                            let option = reasons[index]
                                            return(
                                                <option value={option.status} id={index} key={index}>{option.label}</option>
                                            )
                                        })}
                                    </select>
                                </Box>
                            </Grid>
                            {getActiveReason && "detail" in reasons[getActiveReason]?
                                <Grid item xs={12}>
                                    <Box component={"div"} className={styles.groupInput}>
                                        <label>Причина отказа:</label>
                                        <select ref={register} className={"input"} name={"reasonDetails"}>
                                            {"detail" in reasons[getActiveReason] && Object.keys(reasons[getActiveReason].detail).map((index) => {
                                                let detailReasons = reasons[getActiveReason].detail[index]
                                                return(
                                                    <option value={detailReasons.value} key={index}>{detailReasons.text}</option>
                                                )
                                            })}
                                        </select>
                                    </Box>
                                </Grid>
                                :null}
                            <Grid item xs={12}>
                                <Box component={"div"} className={styles.groupTextarea}>
                                    <label>Комментарий:</label>
                                    <textarea ref={register} className={"textarea"} name={"comment"} />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item className={`${styles.rcontent} ${styles.justifyEnd}`}>
                            <button type={"submit"} className={styles.btnSave}>Сохранить</button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}

export default EditRecordShedule;

const useStyles = makeStyles(() => ({
    dFlex: {display: "flex"},
    aCenter: {alignItems: "center"},
    jSpaceBetween: {justifyContent: "space-between"},
    bshadow: {boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"},
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    wrapper: {
        display: "flex",
        flexWrap: "nowrap",
        width: "750px",
        margin: "0 auto",
        position: "relative",
        minHeight: "150px",
        borderRadius: "5px",
        flexDirection: "column"
    },
    lcontent: {
        width: "60%",
        background: "#F6F7F8",
        padding: "20px 40px",
        minHeight: "270px"
    },
    rcontent: {
        width: "40%",
        background: "#FFFFFF",
        padding: "0 55px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "270px"
    },
    patientName: {
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        textAlign: "left",
        color: "#313541",
        marginBottom: "5px"
    },
    date: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        color: "#313541"
    },
    statuses: {
        marginBottom: "20px",
        display: "flex",
        flexWrap: "nowrap",
        marginTop: "15px"
    },
    phones: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "10px",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        color: "#313541"
    },
    comment: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "16px",
        color: "#DBDBDB"
    },
    btnStatus: {
        // boxShadow: "0px 2px 14px 0px rgba(0, 0, 0, 0.3)",
        background:" #FFFFFF",
        boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.3)",
        borderRadius: "8px",
        padding: "15px",
        marginRight: "12px"
    },
    btnGroup: {
        marginRight: "35px"
    },
    linkCard: {
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "13px",
        textAlign: "center",
        color: "#3B80D6",
        margin: "10px 0",
        textDecoration: "none"
    },
    fakeLink: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "20px",
        textAlign: "center",
        color: "#3B80D6",
        margin: "10px 0",
        cursor: "pointer"
    },
    hr: {
        width: "100%"
    },
    justifyEnd: {
        justifyContent: "flex-end"
    },
    btnSave: {
        background: "#3B80D6",
        borderRadius: "30px",
        width: "120px",
        padding: "8px 12px",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "16px",
        lineHeight: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#FFFFFF",
        margin: "20px auto",
        border: "none"
    },
    groupInput: {
        textTransform: "initial",
        display:  "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "30px",
        "& label": {
            padding: 0,
            margin: 0,
            fontSize: "12px",
            color: "#313541",
            fontStyle: "normal",
            fontWeight: "normal"
        },
        "& .input": {
            background: "#FFFFFF",
            border: "1px solid #DFE6EE",
            boxSizing: "border-box",
            borderRadius: "4px",
            padding: "12px",
            fontSize: "12px"
        }
    },
    groupTextarea: {
        textTransform: "initial",
        marginTop: "30px",
        "& label": {
            padding: 0,
            margin: 0,
            fontSize: "12px",
            color: "#313541",
            fontStyle: "normal",
            fontWeight: "normal",
            width: "100%"
        },
        "& .textarea": {
            width: "100%",
            maxWidth: "100%",
            height: "70px",
            maxHeight: "70px",
            minHeight: "70px",
            background: "#FFFFFF",
            border: "1px solid #DFE6EE",
            boxSizing: "border-box",
            borderRadius: "4px",
            padding: "10px",
            fontSize: "12px",
            lineHeight: "16px"
        }
    }
}));
