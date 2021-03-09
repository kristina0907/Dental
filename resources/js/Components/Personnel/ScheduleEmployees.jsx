import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import {Box, Grid, SvgIcon} from "@material-ui/core";
import moment, {now} from "moment";
import Moment from "react-moment";
import { connect } from 'react-redux';
import store from "../../store";
import {getDoctorsSchedule} from "../../actions/doctorsScheduleActions";

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import {cutInitials} from "../helpers/helpers";

import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TableMonths = ({ filterData, doctors, schedules, cabinets, date, branches}) => {
    useEffect(() => {
        console.log(branches)
    }, [branches])
    const [showAlert, setShowAlert] = useState(false);
    const hideAlert = () => {
        setShowAlert(false);
        setAlertMessage({"message": "", "type": ""});
    }
    const [alertMessage, setAlertMessage] = useState({"message": "", "type": ""});
    const { register, handleSubmit } = useForm();
    const [modal, setModal] = useState({
       "open": false,
       "el": null,
       "doctor_id": 0,
       "schedule": null,
       "days": []
    });

    const [days, setDays] = useState([]);
    const [getActiveBranch, setActiveBranch] = useState((branches && branches.length) ? branches[0].id : 1);
    useEffect(() => {
        // Generate table data {start}
        moment.locale("ru");
        let month = moment(date).format('MM');
        let year = moment(date).format('YYYY');
        let listDays = [];
        const daysMonth = Array.from(Array(moment(date).daysInMonth()), (_, i) => i + 1);
        daysMonth.map(day => {
            let currentDate = moment(`${year} ${month} ${day}`);
            let title = currentDate.format("ddd");
            listDays = [...listDays, {
                "number": day,
                "title": title,
                "class": title === "вс" || title === "сб" ? "color-red" : "color-inherit",
                "currentDate": currentDate.format("YYYY-MM-DD")
            }]
        });
        setDays(listDays);
        // Generate table data {end}
    }, []);

    const getBgColor = (currentDate, doctorId) => {
        if (currentDate in schedules){
            let recordsFromDate = schedules[currentDate];
            let color = "";
            recordsFromDate.filter(item => item.doctor_id === doctorId).forEach((item) => {
                switch (item.smena){
                    case "1":
                        color += " background-yellow";
                        break;
                    case "2":
                        color += " background-green";
                        break;
                    default:
                        color = " background-inherit";

                }
            });
            return color;
        }
    }
    const getCabinet = (currentDate, doctorId) => {
        if (currentDate in schedules){
            let recordsFromDate = schedules[currentDate];
            let recordsFromFilter = recordsFromDate.filter(item => item.doctor_id === doctorId);
            if (recordsFromFilter.length && "cabinets" in recordsFromFilter[0]){
                return recordsFromFilter[0].cabinets.name;
            }
        }
    }
    const getSchedule = (currentDate, doctorId) => {
        if (currentDate in schedules){
            let recordsFromDate = schedules[currentDate];
            let recordsFromFilter = recordsFromDate.filter(item => item.doctor_id === doctorId);
            if (recordsFromFilter.length){
                return {
                    "branch_id": recordsFromFilter[0].branch_id,
                    "cabinet_id": recordsFromFilter[0].cabinet_id,
                    "smena": recordsFromFilter[0].smena,
                    "comment": recordsFromFilter[0].comment
                }
            } else {
                return null;
            }
        }
    }

    const handleDayClick = (data) => {
        let td = data.el.target.closest('td');
        if (!td) return;

        if (td.classList.contains('active') ){
            // повторное нажатие на элемент
            td.classList.remove('active');

            // Ищем последний активный элемент в стобце
            let selectors = document.querySelectorAll('.days .day.active');

            // Проверяем есть ли активные дни
            if (selectors.length) {
                // Берем последний активный день
                setModal({
                    ...modal,
                    "days": modal.days.filter(date => date !== data.day.currentDate),
                    "el": selectors[selectors.length - 1]
                });
            } else {
                // Активных дней не осталось, все закрываем
                setModal({
                    "open": false,
                    "el": null,
                    "doctor_id": 0,
                    "schedule": null,
                    "days": []
                });
            }
        } else {
            // первое нажатие
            if (data.doctor_id !== modal.doctor_id){
                //То значит кликнули по другому доктору или первый раз, надо очистить прошлые.
                document.querySelectorAll('.days .day.active').forEach((day) => day.classList.remove('active'));

                // Классы почистили, присваиеваем текущему кликнутому элементу активность
                td.classList.add('active');

                // Ищем последний активный элемент в стобце и берем его координаты
                let selectors = document.querySelectorAll('.days .day.active');

                // Записываем текущий кликнутый элемент в state.
                setModal({
                   ...modal,
                   "el": selectors[selectors.length - 1],
                   "doctor_id": data.doctor_id,
                   "schedule": data.schedule,
                   "days": [data.day.currentDate],
                   "open": true
                });
            } else {
                // Так как id доктора не сменился, добаялвляем еще один активный день
                td.classList.add('active');

                // Ищем последний активный элемент в стобце и берем его координаты
                let selectors = document.querySelectorAll('.days .day.active');
                setModal({
                   ...modal,
                   "el": selectors[selectors.length - 1],
                   "days": [...modal.days, data.day.currentDate],
                   "schedule": data.schedule
                });
            }
        }
    }
    const handleSave = (data) => {
        let requestData = {...data, "dates":modal.days}
        axios
            .post(`/api/doctorshedules/create/record`, requestData)
            .then(response => {
                store.dispatch(getDoctorsSchedule(filterData));
                document.querySelectorAll('.days .day.active').forEach((day) => day.classList.remove('active'));
                setModal({"open": false,
                    "el": null,
                    "doctor_id": 0,
                    "schedule": null,
                    "days": []
                });
            })
            .catch(error => {
                let response = error.response.data;
                if ("errors" in response){
                    Object.keys(response.errors).map(index => {
                       let err = response.errors[index];
                        setAlertMessage({
                            message: `${err.smena} смена ${moment(err.date).format("DD.MM.YYYY")}, уже занята!`,
                            type: "error"
                        })
                        setShowAlert(true);
                    });
                }
            });
    }
    const handleDelete = () => {
        axios
            .post(`/api/doctorshedules/delete/record`, {
                "doctor_id": modal.doctor_id,
                "branch_id": modal.schedule.branch_id,
                "cabinet_id": modal.schedule.cabinet_id,
                "dates": modal.days
            })
            .then(response => {
                store.dispatch(getDoctorsSchedule(filterData));
                document.querySelectorAll('.days .day.active').forEach((day) => day.classList.remove('active'));
                setModal({"open": false,
                    "el": null,
                    "doctor_id": 0,
                    "schedule": null,
                    "days": []
                });
            })
            .catch(response => console.log(response));
    }

    const handleBranchChange = (data) => {
        setActiveBranch(parseInt(data));
    }
    return(
        <Grid container>
            <Snackbar open={showAlert} autoHideDuration={5000} onClose={hideAlert}>
                <Alert severity={alertMessage.type}>{alertMessage.message}</Alert>
            </Snackbar>
            <Popper open={modal.open} placement={"right"} modifiers={{
                offset: {
                    enabled: true,
                    offset: "140, 0"
                }
            }} anchorEl={modal.el} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={0}>
                        <Paper className={"schedules-modal"}>
                            <form onSubmit={handleSubmit(handleSave)}>
                                <input type={"hidden"} name={"doctor_id"} value={modal.doctor_id} ref={register}/>
                                {console.log(modal)}
                                <select ref={register({ required: true })} onChange={(e) => handleBranchChange(e.target.value)} defaultValue={modal.schedule !== null && modal.schedule !== undefined && modal.schedule.branch_id !== undefined ? modal.schedule.branch_id : getActiveBranch} name={"branch_id"}>
                                    {branches.map((branch) => {
                                        return(
                                            <option value={branch.id}>{branch.title}</option>
                                        )
                                    })}
                                </select>
                                <select name={"cabinet_id"} defaultValue={modal.schedule !== null && modal.schedule !== undefined ? modal.schedule.cabinet_id : null} ref={register({ required: true })}>
                                    {branches.filter(branch => branch.id === (modal.schedule !== null && modal.schedule !== undefined ? modal.schedule.branch_id : getActiveBranch)).map(filterBranch => {
                                        return(
                                            cabinets.filter(cabinet => cabinet.branch_id === filterBranch.id).map(cabinet => {
                                                return(
                                                    <option value={cabinet.id}>{cabinet.name}</option>
                                                )
                                            })
                                        )
                                    })}
                                </select>
                                <Box className={"time"}>
                                    <Box className={"time_group"}>
                                        <Box className={"group"}>
                                            <input id={"smena_1"} type={"checkbox"} name={"smena[1_smena]"} ref={register}/>
                                            <label htmlFor="#smena_1">I смена</label>
                                        </Box>
                                        <Box className={"group"}>
                                            <input id={"smena_2"} type={"checkbox"} name={"smena[2_smena]"} ref={register}/>
                                            <label htmlFor="#smena_2">II смена</label>
                                        </Box>
                                    </Box>
                            {/*        /!*<span>или</span>*!/*/}
                            {/*        /!*<Box className={"__intervals_group"}>*!/*/}
                            {/*        /!*    <select ref={register} name={"time_start"} onChange={(e) => handleTimeStartChange(e)}>*!/*/}
                            {/*        /!*        {intervals().map(smena => smena.times.map(interval => {*!/*/}
                            {/*        /!*            return(<option value={interval}>{interval}</option>)*!/*/}
                            {/*        /!*        }))}*!/*/}
                            {/*        /!*    </select>*!/*/}
                            {/*        /!*    <select ref={register} name={"time_end"}>*!/*/}
                            {/*        /!*        {intervals(activeTimeStart.smena) ? intervals(activeTimeStart.smena).times.map(interval => {*!/*/}
                            {/*        /!*            return(*!/*/}
                            {/*        /!*                diffDate(moment(interval, "HH:mm"), moment(activeTimeStart.time_start, "HH:mm")) &&*!/*/}
                            {/*        /!*                <option value={interval}>{interval}</option>*!/*/}
                            {/*        /!*            )*!/*/}
                            {/*        /!*        }):null}*!/*/}
                            {/*        /!*    </select>*!/*/}
                            {/*        /!*</Box>*!/*/}
                                </Box>
                                <input ref={register} type={"text"} defaultValue={modal.schedule !== null && modal.schedule !== undefined ? modal.schedule.comment : null} name={"comment"} placeholder={"Комментарий"}/>
                                <Box className={"buttons"}>
                                    <button type={"submit"} className={"button button-save"}>Обновить</button>
                                    {modal.schedule !== null ? <button type={"button"} onClick={() => handleDelete()} className={"button button-clear"}>Удалить</button> : <button type={"reset"} className={"button button-clear"}>Очистить</button>}

                                </Box>
                            </form>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            {doctors && doctors.length ?
                <Grid item style={{maxWidth: "100%", display: "grid"}}>
                    <div className={"schedules-wrapper"}>
                        <table className={"schedules"}>
                        <tr className={"doctors"}>
                            {doctors.map(doctor => {
                                return(
                                    <th className={"doctor"}>
                                        <Box className={"wrapper"}>
                                            <Box className={"fio"}>{cutInitials(doctor.name)}</Box>
                                        </Box>
                                    </th>
                                )
                            })}
                        </tr>
                        {days.map(day => {
                            return(
                                <tr className={"days"}>
                                    {doctors.map(doctor => {
                                        return(
                                            <td
                                                className={`day ${ getBgColor(day.currentDate, doctor.id)}`}
                                                onClick={(e) => handleDayClick({
                                                    "el": e,
                                                    "doctor_id": doctor.id,
                                                    "day": day,
                                                    "schedule": getSchedule(day.currentDate, doctor.id)
                                                })}
                                            >
                                                <Box className={"content-wrapper"}>
                                                    <Box className={"wrapper"}>{getCabinet(day.currentDate, doctor.id)}</Box>
                                                    <Box className={"wrapper"}>
                                                        <Box className={"day-number"}>{day.number}</Box>
                                                        <Box className={`day-title ${day.class}`}>{day.title}</Box>
                                                    </Box>
                                                </Box>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </table>
                    </div>
                </Grid>
            :
                <Grid item xs={12}>
                    <div className={"empty"}>
                        <div className={"img"}>
                            <SvgIcon id="eukv2llk3cuf1" viewBox="0 0 177 200" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                                <defs>
                                    <filter id="eukv2llk3cuf12-filter" x="-400%" width="600%" y="-400%" height="600%">
                                        <feGaussianBlur id="eukv2llk3cuf12-filter-blur-0" stdDeviation="0,0" result="result"/>
                                    </filter>
                                    <filter id="eukv2llk3cuf17-filter" x="-400%" width="600%" y="-400%" height="600%">
                                        <feGaussianBlur id="eukv2llk3cuf17-filter-blur-0" stdDeviation="0,0" result="result"/>
                                    </filter>
                                </defs>
                                <path id="eukv2llk3cuf2" d="M164.816000,200L11.893000,200C5.324480,200,0,194.675000,0,188.107000L0,171.563000L176.709000,139.452000L176.709000,188.107000C176.709000,194.675000,171.384000,200,164.816000,200Z" fill="rgb(176,186,197)" stroke="none" stroke-width="1"/>
                                <rect id="eukv2llk3cuf3" width="176.562000" height="171.875000" rx="32" ry="32" transform="matrix(1 0 0 1 0.07324220000000 16.40620000000000)" opacity="0" fill="rgb(249,243,241)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf4" d="M132.461000,188.107000L11.912800,188.107000C5.333600,188.107000,0,182.773000,0,176.194000L0,28.473300C0,21.894100,5.333600,16.560500,11.912800,16.560500L164.796000,16.560500C171.375000,16.560500,176.708000,21.894100,176.708000,28.473300L176.708000,143.860000C176.708000,147.019000,169.507000,150.049000,167.272000,152.283000L140.885000,178.671000C138.651000,180.905000,135.621000,188.107000,132.461000,188.107000L132.461000,188.107000Z" fill="rgb(249,243,241)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf5" d="M34.829200,96.705400L20.671100,96.705400C19.107100,96.705400,17.839400,95.437600,17.839400,93.873700L17.839400,79.715500C17.839400,78.151600,19.107100,76.883800,20.671100,76.883800L34.829200,76.883800C36.393200,76.883800,37.661000,78.151600,37.661000,79.715500L37.661000,93.873700C37.661000,95.437600,36.393200,96.705400,34.829200,96.705400Z" fill="rgb(176,186,197)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf6" d="M75.232100,96.705400L61.073900,96.705400C59.510000,96.705400,58.242200,95.437600,58.242200,93.873700L58.242200,79.715500C58.242200,78.151600,59.510000,76.883800,61.073900,76.883800L75.232100,76.883800C76.796000,76.883800,78.063800,78.151600,78.063800,79.715500L78.063800,93.873700C78.063800,95.437600,76.796000,96.705400,75.232100,96.705400Z" fill="rgb(176,186,197)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf7" d="M115.635000,96.705400L101.476000,96.705400C99.912600,96.705400,98.644800,95.437600,98.644800,93.873700L98.644800,79.715500C98.644800,78.151600,99.912600,76.883800,101.476000,76.883800L115.635000,76.883800C117.199000,76.883800,118.466000,78.151600,118.466000,79.715500L118.466000,93.873700C118.466000,95.437600,117.199000,96.705400,115.635000,96.705400Z" fill="rgb(176,186,197)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf8" d="M156.037000,96.705400L141.879000,96.705400C140.315000,96.705400,139.048000,95.437600,139.048000,93.873700L139.048000,79.715500C139.048000,78.151600,140.315000,76.883800,141.879000,76.883800L156.037000,76.883800C157.601000,76.883800,158.869000,78.151600,158.869000,79.715500L158.869000,93.873700C158.869000,95.437600,157.601000,96.705400,156.037000,96.705400Z" fill="rgb(176,186,197)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf9" d="M34.829200,133.483000L20.671100,133.483000C19.107100,133.483000,17.839400,132.216000,17.839400,130.652000L17.839400,116.494000C17.839400,114.930000,19.107100,113.662000,20.671100,113.662000L34.829200,113.662000C36.393200,113.662000,37.661000,114.930000,37.661000,116.494000L37.661000,130.652000C37.661000,132.216000,36.393200,133.483000,34.829200,133.483000Z" fill="rgb(176,186,197)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf10" d="M34.829200,133.483000L20.671100,133.483000C19.107100,133.483000,17.839400,132.216000,17.839400,130.652000L17.839400,116.494000C17.839400,114.930000,19.107100,113.662000,20.671100,113.662000L34.829200,113.662000C36.393200,113.662000,37.661000,114.930000,37.661000,116.494000L37.661000,130.652000C37.661000,132.216000,36.393200,133.483000,34.829200,133.483000Z" transform="matrix(1 0 0 1 81 0)" fill="rgb(176,186,197)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf11" d="M75.232100,133.483000L61.073900,133.483000C59.510000,133.483000,58.242200,132.216000,58.242200,130.652000L58.242200,116.494000C58.242200,114.930000,59.510000,113.662000,61.073900,113.662000L75.232100,113.662000C76.796000,113.662000,78.063800,114.930000,78.063800,116.494000L78.063800,130.652000C78.063800,132.216000,76.796000,133.483000,75.232100,133.483000Z" fill="rgb(176,186,197)" stroke="none" stroke-width="1"/>
                                <g id="eukv2llk3cuf12_tr" transform="translate(107.956314,125.347897) rotate(90)">
                                    <g id="eukv2llk3cuf12_ts" transform="scale(0,0)">
                                        <path id="eukv2llk3cuf12" d="M104.234000,136.565000C103.030000,136.565000,101.865000,136.085000,101.009000,135.229000L95.343500,129.564000C94.182400,128.402000,94.182400,126.520000,95.343500,125.359000C96.504700,124.198000,98.387300,124.198000,99.548100,125.359000L104.129000,129.940000L116.165000,115.222000C117.204000,113.951000,119.077000,113.763000,120.348000,114.802000C121.620000,115.842000,121.808000,117.715000,120.768000,118.986000L107.762000,134.892000C106.949000,135.887000,105.745000,136.495000,104.461000,136.559000C104.385000,136.563000,104.310000,136.565000,104.234000,136.565000Z" transform="translate(-107.956314,-125.347897)" filter="url(#eukv2llk3cuf12-filter)" fill="rgb(86,189,91)" stroke="none" stroke-width="1"/>
                                    </g>
                                </g>
                                <path id="eukv2llk3cuf13" d="M156.038000,134.366000L141.880000,134.366000C140.316000,134.366000,139.048000,133.098000,139.048000,131.535000L139.048000,117.376000C139.048000,115.812000,140.316000,114.545000,141.880000,114.545000L156.038000,114.545000C157.602000,114.545000,158.869000,115.812000,158.869000,117.376000L158.869000,131.535000C158.869000,133.098000,157.602000,134.366000,156.038000,134.366000Z" fill="rgb(176,186,197)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf14" d="M75.232100,170.262000L61.073900,170.262000C59.510000,170.262000,58.242200,168.994000,58.242200,167.430000L58.242200,153.272000C58.242200,151.708000,59.510000,150.440000,61.073900,150.440000L75.232100,150.440000C76.796000,150.440000,78.063800,151.708000,78.063800,153.272000L78.063800,167.430000C78.063800,168.994000,76.796000,170.262000,75.232100,170.262000Z" transform="matrix(1 0 0 1 -40 0)" fill="rgb(176,186,197)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf15" d="M75.232100,170.262000L61.073900,170.262000C59.510000,170.262000,58.242200,168.994000,58.242200,167.430000L58.242200,153.272000C58.242200,151.708000,59.510000,150.440000,61.073900,150.440000L75.232100,150.440000C76.796000,150.440000,78.063800,151.708000,78.063800,153.272000L78.063800,167.430000C78.063800,168.994000,76.796000,170.262000,75.232100,170.262000Z" fill="rgb(176,186,197)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf16" d="M115.635000,170.262000L101.476000,170.262000C99.912600,170.262000,98.644800,168.994000,98.644800,167.430000L98.644800,153.272000C98.644800,151.708000,99.912600,150.440000,101.476000,150.440000L115.635000,150.440000C117.199000,150.440000,118.466000,151.708000,118.466000,153.272000L118.466000,167.430000C118.466000,168.994000,117.199000,170.262000,115.635000,170.262000Z" fill="rgb(176,186,197)" stroke="none" stroke-width="1"/>
                                <g id="eukv2llk3cuf17_tr" transform="translate(27.750151,160.351128) rotate(-90)">
                                    <g id="eukv2llk3cuf17_ts" transform="scale(0,0)">
                                        <path id="eukv2llk3cuf17" d="M31.954700,160.351000L39.763200,152.542000C40.924400,151.381000,40.924400,149.498000,39.763200,148.338000C38.602100,147.177000,36.719400,147.177000,35.558700,148.338000L27.750200,156.146000L19.941600,148.338000C18.780500,147.177000,16.897800,147.177000,15.737100,148.338000C14.575900,149.499000,14.575900,151.381000,15.737100,152.542000L23.545600,160.351000L15.737100,168.159000C14.575900,169.320000,14.575900,171.203000,15.737100,172.364000C16.317400,172.944000,17.078600,173.235000,17.839400,173.235000C18.600100,173.235000,19.361300,172.945000,19.941600,172.364000L27.750200,164.555000L35.558700,172.364000C36.139100,172.944000,36.900200,173.235000,37.661000,173.235000C38.421700,173.235000,39.182900,172.945000,39.763200,172.364000C40.924400,171.203000,40.924400,169.320000,39.763200,168.159000L31.954700,160.351000Z" transform="translate(-27.750151,-160.351128)" filter="url(#eukv2llk3cuf17-filter)" fill="rgb(227,76,76)" stroke="none" stroke-width="1"/>
                                    </g>
                                </g>
                                <path id="eukv2llk3cuf18" d="M132.406000,188.107000C135.566000,188.107000,138.596000,186.852000,140.830000,184.618000L173.220000,152.228000C175.454000,149.994000,176.709000,146.964000,176.709000,143.804000L176.709000,138.978000C176.709000,144.369000,172.339000,148.739000,166.948000,148.739000L147.101000,148.739000C141.711000,148.739000,137.341000,153.108000,137.341000,158.499000L137.341000,178.346000C137.341000,183.737000,132.971000,188.107000,127.580000,188.107000L132.406000,188.107000L132.406000,188.107000Z" fill="rgb(223,230,238)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf19" d="M176.707000,28.452000L176.707000,59.048700L0.001465,59.048700L0.001465,28.452000C0.001465,21.887100,5.325550,16.559100,11.894400,16.559100L164.814000,16.559100C171.383000,16.559100,176.707000,21.887100,176.707000,28.452000L176.707000,28.452000Z" fill="rgb(59,128,214)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf20" d="M146.137000,16.560500L146.137000,9.041420C146.137000,7.334780,144.749000,5.946480,143.042000,5.946480L141.677000,5.946480C139.971000,5.946480,138.582000,7.334780,138.582000,9.041420L138.582000,28.276300C138.582000,29.982900,139.971000,31.371200,141.677000,31.371200C143.319000,31.371200,144.650000,32.702500,144.650000,34.344500C144.650000,35.986500,143.319000,37.317700,141.677000,37.317700C136.692000,37.317700,132.636000,33.261800,132.636000,28.276300L132.636000,9.041420C132.636000,4.055900,136.692000,0,141.677000,0L143.042000,0C148.028000,0,152.083000,4.055900,152.083000,9.041420L152.083000,16.560500L146.137000,16.560500Z" fill="rgb(85,78,86)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf21" d="M38.126500,16.560500L38.126500,9.041420C38.126500,7.334780,36.738200,5.946480,35.031600,5.946480L33.666700,5.946480C31.960000,5.946480,30.571700,7.334780,30.571700,9.041420L30.571700,28.276300C30.571700,29.982900,31.960000,31.371200,33.666700,31.371200C35.308700,31.371200,36.639900,32.702500,36.639900,34.344500C36.639900,35.986500,35.308700,37.317700,33.666700,37.317700C28.681100,37.317700,24.625200,33.261800,24.625200,28.276300L24.625200,9.041420C24.625200,4.055900,28.681100,0,33.666700,0L35.031600,0C40.017100,0,44.073000,4.055900,44.073000,9.041420L44.073000,16.560500L38.126500,16.560500Z" fill="rgb(85,78,86)" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf22" d="M33.666400,37.317500C31.398000,37.317500,29.472200,37.316300,27.830900,37.316300C22.843800,37.316300,18.788300,33.260800,18.788300,28.277600L18.788300,16.559100L24.734800,16.559100L24.734800,28.277600C24.734800,29.982300,26.122300,31.369800,27.830900,31.369800C29.472200,31.369800,35.307700,37.317500,33.666400,37.317500Z" fill="rgb(63,74,86)" fill-opacity="0.5" stroke="none" stroke-width="1"/>
                                <path id="eukv2llk3cuf23" d="M141.677000,37.317500C141.677000,37.317500,137.484000,37.316300,135.839000,37.316300C130.856000,37.316300,126.801000,33.260800,126.801000,28.277600L126.801000,16.559100L132.747000,16.559100L132.747000,28.277600C132.747000,29.982300,134.135000,31.369800,135.839000,31.369800C137.484000,31.369800,141.677000,35.676200,141.677000,37.317500Z" fill="rgb(63,74,86)" fill-opacity="0.5" stroke="none" stroke-width="1"/>
                            </SvgIcon>
                        </div>
                        <div className={"title"}>Выберите параметры из фильтра</div>
                    </div>
                </Grid>
            }
        </Grid>
    )
}

function ScheduleEmployees({branches, doctors, schedules, cabinets, filterData, loading}) {
    const [currentDate, setCurrentDate] = useState(now());
    const [scheduleType, setScheduleType] = useState({
        "type": "months",
        "date_format": "MMMM YYYY"
    });

    useEffect(() => {
        if (filterData !== undefined){
            store.dispatch(getDoctorsSchedule(filterData));
        }
    }, [filterData])

    return(
        <Grid container>
            <Grid container className={"schedules-header"} justify={"space-between"} alignItems={"center"}>
                <h2 className={"title"}>Расписание врачей</h2>
                <Box className={"date"}>
                    <Moment locale={"ru"} format={scheduleType.date_format} withTitle date={currentDate} />
                    <Box className={"change"} onClick={() => setCurrentDate(moment(currentDate).subtract(1, scheduleType.type) )} component={NavigateBeforeIcon}/>
                    <Box className={"change"} onClick={() => setCurrentDate(moment(currentDate).add(1, scheduleType.type) )} component={NavigateNextIcon} />
                </Box>
                <Box className={"filter"} style={{"visibility": "hidden"}}>
                    Показать за:
                    <span onClick={() => setScheduleType({"type": "day", "date_format": "DD MMMM YYYY"})} className={`day ${scheduleType.type === "day" && `active`}`}>День</span>
                    <span onClick={() => setScheduleType({"type": "months", "date_format": "MMMM YYYY"})} className={`day ${scheduleType.type === "months" && `active`}`}>Месяц</span>
                </Box>
            </Grid>
            <Grid container>
                {scheduleType.type === "months" && <TableMonths doctors={doctors} filterData={filterData} cabinets={cabinets} schedules={schedules} date={currentDate} branches={branches}/>}
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    doctors: state.doctorsSchedules.result.data.doctors,
    schedules: state.doctorsSchedules.result.data.schedules,
    branches: state.doctorsSchedules.result.data.branches,
    cabinets: state.doctorsSchedules.result.data.cabinets
});
export default connect(mapStateToProps, {getDoctorsSchedule})(ScheduleEmployees);
