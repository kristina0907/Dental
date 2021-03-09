import React, {useState}  from "react";
import {Box, Grid} from "@material-ui/core";
import Vector from "./Appoints/media/Vector";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import EditRecordCall from "./helpers/EditRecordCall";
import CancelRecordCall from "./helpers/CancelRecordCall";
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/ru';

export default function IncomingCall({})  {
    const classes = useStyles();
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": true
    });
    const [isRecordEditOpen, setRecordEditIsOpen] = useState(false);
    const [isCancelRecord, setCancelIsRecord] = useState(false);
    const [editRecordData, setEditRecordData] = useState({
        "patient": "",
        "date": "",
        "time_start":"",
        "time_end":""
    });
    const handleEditRecord = ({patient, date, time_start, time_end}) => {
        setEditRecordData({
            "patient": patient,
            "date": date,
            "time_start": time_start,
            "time_end": time_end
            // "date": moment(date).format("DD.MM.YYYY"),
            // "time_start": moment(`${date} ${time_start}`).format("HH:mm"),
            // "time_end": moment(`${date} ${time_end}`).format("HH:mm")

        })
        setRecordEditIsOpen(true);
    }
    const handleCancelRecord = (record) => {
        setCancelIsRecord(true);
    }
    const handleEditRecordClose = () => {
        setRecordEditIsOpen(!isRecordEditOpen);
    }
    const handleCancelRecordClose= () => {
        setCancelIsRecord(!isCancelRecord);
    }
return(
    <>
        {isRecordEditOpen && <EditRecordCall onRequestClose={handleEditRecordClose} data={editRecordData}/>}
        {isCancelRecord && <CancelRecordCall onRequestClose={handleCancelRecordClose} data={editRecordData}/>}
            {!hideBtnClicked.block_1? (
                <div className="filter_material">
                <Grid container spacing={4} className={"wrapper_component"}>
                    <Grid item xs={12} md={6}>
                        <div className="title_call">Текущий звонок</div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className="time_call">15:55</div>
                        <div className="source_call">Источник: Вконтакте</div>
                    </Grid>
                    <Grid item xs={12} md={12} className={"phone_call_container"}>
                        <div className="phone_cal">+7 (123) 456-78-90</div>
                        <div className="line_call">II Линия</div>
                    </Grid>
                    <Grid item xs={12} md={12} className={"phone_call_container"}>
                        <Grid container>
                            <Grid item xs={12} md={3}></Grid>
                            <Grid item xs={12} md={6}>
                                <div className="future">Будущий приём</div>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <div className="btn_call">
                                    <div>
                                        <IconButton  onClick={() => handleEditRecord({
                                            "patient": {patients:{
                                                    "name":"Петров Александр Иванович",
                                                    "id":89
                                                }
                                            },
                                            "date": "26.11.2020",
                                            "time_start": "09:00",
                                            "time_end": "09:30"
                                        })}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0)">
                                                    <path
                                                        d="M14.7067 5.77868L12.4201 3.58668L10.1801 1.34668L1.08673 10.4333L3.31273 12.6587L5.5674 14.914L14.7067 5.77868Z"
                                                        fill="#B0BAC5"/>
                                                    <path
                                                        d="M10.6515 0.87569L12.8915 3.11569L15.1681 5.29769C15.1708 5.30036 15.1721 5.30436 15.1748 5.30702L15.2808 5.20036C15.7468 4.73369 16.0034 4.11436 16.0014 3.45569C16.0001 2.80036 15.7434 2.18569 15.2801 1.72702L14.2748 0.72169C13.8148 0.257023 13.2001 0.000356771 12.5441 -0.000976562C12.5428 -0.000976562 12.5408 -0.000976562 12.5388 -0.000976562C11.8828 -0.000976562 11.2648 0.255023 10.7988 0.721023L10.6475 0.873023C10.6488 0.874357 10.6501 0.874357 10.6515 0.87569Z"
                                                        fill="#B0BAC5"/>
                                                    <path
                                                        d="M0.858817 11.1475L0.0101499 15.4021C-0.0225167 15.5661 0.0281499 15.7354 0.146817 15.8534C0.240817 15.9474 0.368817 15.9994 0.50015 15.9994C0.532817 15.9994 0.565483 15.9961 0.597483 15.9894L4.85215 15.1408L0.858817 11.1475Z"
                                                        fill="#B0BAC5"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0">
                                                        <rect width="16" height="16" fill="white"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </IconButton >
                                    </div>
                                    <div>
                                        <IconButton  onClick={() => handleCancelRecord({
                                            "patient": {patients:{
                                                    "name":"Петров Александр Иванович",
                                                    "id":89
                                                }
                                            },
                                            "date": "26.11.2020",
                                            "time_start": "09:00",
                                            "time_end": "09:30"
                                        })}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0)">
                                                <path d="M4.73182 4.0408C4.45512 4.0408 4.23083 3.81651 4.23083 3.53981V0.500986C4.23083 0.224285 4.45512 0 4.73182 0C5.00852 0 5.23281 0.224285 5.23281 0.500986V3.53981C5.23281 3.81651 5.00852 4.0408 4.73182 4.0408Z" fill="#B0BAC5"/>
                                                <path d="M11.2682 4.0408C10.9915 4.0408 10.7672 3.81651 10.7672 3.53981V0.500986C10.7672 0.224285 10.9915 0 11.2682 0C11.5449 0 11.7692 0.224285 11.7692 0.500986V3.53981C11.7692 3.81651 11.5449 4.0408 11.2682 4.0408Z" fill="#B0BAC5"/>
                                                <path d="M15.2403 5.94856V3.65661C15.2403 2.47823 14.2816 1.51956 13.1032 1.51956H12.7711V3.53995C12.7711 4.3687 12.0969 5.04291 11.2682 5.04291C10.4394 5.04291 9.76522 4.3687 9.76522 3.53995V1.51953H6.2348V3.53992C6.2348 4.36867 5.56059 5.04287 4.73184 5.04287C3.90308 5.04287 3.22888 4.36867 3.22888 3.53992V1.51953H2.89676C1.71837 1.51953 0.759705 2.4782 0.759705 3.65658V5.94853H15.2403V5.94856Z" fill="#B0BAC5"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.759705 13.8628V6.9502H15.2403V13.8628C15.2403 15.0412 14.2816 15.9998 13.1033 15.9998H2.89676C1.71837 15.9998 0.759705 15.0412 0.759705 13.8628ZM5.82744 13.1356C5.50839 13.3564 5.07266 13.128 5.07266 12.74C5.07266 12.5788 5.15342 12.4283 5.28776 12.3392L6.32066 11.6539C6.64124 11.4283 6.92658 11.2497 7.24642 11.06C7.25276 11.0562 7.25666 11.0494 7.25666 11.042C7.25666 11.0345 7.25263 11.0276 7.24614 11.0239C6.91439 10.8339 6.6174 10.6437 6.30866 10.4419L5.28464 9.77577C5.15242 9.68976 5.07266 9.54273 5.07266 9.385C5.07266 9.00713 5.49866 8.78626 5.80748 9.00402L7.14043 9.94392C7.58598 10.2581 8.1794 10.2639 8.63105 9.95862L10.1151 8.95538C10.441 8.73508 10.8807 8.96856 10.8807 9.36192C10.8807 9.52673 10.7979 9.68053 10.6604 9.77137L9.57267 10.4899C9.23995 10.7156 8.91901 10.9061 8.57488 11.1079C8.56856 11.1116 8.56466 11.1184 8.56466 11.1257C8.56466 11.1332 8.56877 11.1401 8.57534 11.1438C8.91906 11.3338 9.22823 11.5242 9.57267 11.7499L10.6633 12.4503C10.7988 12.5373 10.8807 12.6872 10.8807 12.8482C10.8807 13.2303 10.451 13.4547 10.1375 13.2363L8.67378 12.2171C8.2185 11.9001 7.61421 11.8992 7.158 12.2149L5.82744 13.1356Z" fill="#B0BAC5"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0">
                                                    <rect width="16" height="16" fill="white"/>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        </IconButton >
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <div className="date_call">24.04.20</div>
                                <div className="date_call">12:00</div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className="patient_call">Иванов И.И.</div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container>
                            <Grid item xs={12} md={12}>
                                <div className="previous">Предыдущий приём</div>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <div className="date_call">24.04.20</div>
                                <div className="date_time_call">2 мес. назад</div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className="patient_call">Иванов И.И.</div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <div className="call_form">
                            <div>
                                <input type="text" placeholder="Александров А.А."/>
                            </div>
                            <div>
                                <select name="" id="">
                                    <option value="">Тип звонка</option>
                                </select>
                            </div>
                            <div>
                                <select name="" id="">
                                    <option value="">Направление</option>
                                </select>
                            </div>
                            <div>
                                <select name="" id="">
                                    <option value="">Лечащий врач</option>
                                </select>
                            </div>
                            <div>
                                <textarea name="" id="" cols="30" rows="10" placeholder="Комментарий"></textarea>
                            </div>
                        </div>
                        <div className="btn_form_call">
                            <button className="save_form_call">Сохранить</button>
                            <button className="waiting_list_form_call">В лист ожидания</button>
                        </div>
                    </Grid>
                </Grid>
                </div>
            ) : (
                <Box onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: false})} className={"incomings"}>Входящие звонки</Box>
            )}
    </>
)
}
const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));
