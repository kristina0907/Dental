import React, {useState, useEffect} from "react";
import {Box, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import Close from "../Appoints/media/Close";

import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/ru';
import {makeStyles} from "@material-ui/core/styles";

import LiveSearch from "./LiveSearch";
import InputMask from "react-input-mask";

import {useForm} from "react-hook-form";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import {dictionary} from "../../dictionary";
import {findSmenaFromInterval, getIntervalsAfterTime} from "./helpers";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddNewRecordShedule({onRequestClose, data}) {
    const [showAlert, setShowAlert] = useState(false);
    const hideAlert = () => {
        setShowAlert(false);
        setAlertMessage({"message": "", "type": ""});
    }
    const [alertMessage, setAlertMessage] = useState({"message": "", "type": ""});
    const styles = useStyles();
    const formStyles = formRecordStyles();
    const { handleSubmit, register } = useForm();
    const [patient, setPatient] = useState(false);
    const [timeEnd, setTimeEnd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFormOpening, setFormIsOpening] = useState(false);
    const [isRecordSaved, setRecordIsSaved] = useState(false);

    useEffect(() => {
        moment.locale('ru');
        console.log("input_data", data);
    }, []);

    useEffect(() => {
        if (patient){
            setFormIsOpening(true);
        }
    }, [patient]);

    const handleSubmitAddRecord = (formdata) => {
        setIsLoading(true);
        let sendData = {};
        let url = "/api/shedule/addrecord";
        if (patient){
            sendData['status_id'] = 1;
            sendData['action_id'] = 1;
            sendData['branch_id'] = 1; //Исправить
            sendData['doctor_id'] = data.doctor.id;
            sendData['patient_id'] = patient.user_id;
            sendData['time_start'] = data.time_start;
            sendData['time_end'] = timeEnd;
            sendData['date'] = moment(data.date).format("DD-MM-YYYY");
            url = "/api/shedule/add/record";
        } else {
            sendData['family']              =   formdata.family;
            sendData['name']                =   formdata.name;
            sendData['surname']             =   formdata.surname;
            sendData['city']                =   formdata.city;
            sendData['street']              =   formdata.street;
            sendData['house']               =   formdata.house;
            sendData['building']            =   formdata.building;
            sendData['flat']                =   formdata.flat;
            sendData['comment']             =   formdata.comment;
            sendData['birthday']            =   formdata.birthday;
            sendData['phone']               =   formdata.phone;
            sendData['email']               =   formdata.email;
            sendData['parent']              =   formdata.parent;
            sendData['marketing']           =   formdata.radio;
            sendData['insurance']           =   formdata.insurance;
            sendData['insuranceFrom']       =   formdata.insuranceFrom;
            sendData['insuranceUntill']     =   formdata.insuranceUntill;
            sendData['description']         =   formdata.description;
            sendData['gender']              =   formdata.gender;
            sendData['time_end']            =   timeEnd;
            sendData['time_start']          =   data.time_start;
            sendData['date']                =   moment(data.date).format("DD-MM-YYYY");
            sendData['branch_id']           =   1; //Исправить
            sendData['doctor_id']           =   data.doctor.id;
            sendData['status_id']           = 1;
            sendData['action_id']           = 1;
        }
        axios
            .post(url, sendData)
            .then((response) => {
                setIsLoading(false);
                if ("error" in response.data){
                    setAlertMessage({
                        message: dictionary.intervalError,
                        type: "error"
                    })
                    setShowAlert(true);
                } else {
                    setRecordIsSaved(true);
                    onRequestClose();
                }

            }).catch((response) => {
            setIsLoading(false);
            console.log(response)
        })
    }
    return(
        <Grid container className={styles.root}>
            <Snackbar open={showAlert} autoHideDuration={2000} onClose={hideAlert}>
                <Alert severity={alertMessage.type}>{alertMessage.message}</Alert>
            </Snackbar>
            <Grid item className={styles.wrapper}>
                {isLoading?
                    <Grid item xs={12} sm={12} className={styles.center}>
                        <Grid item xs={12}><Close closeClicked={onRequestClose} /></Grid>
                        <Grid item xs={12}><CircularProgress color="primary" /></Grid>
                    </Grid>
                    :isFormOpening?
                        <Grid item xs={12} className={styles.modalAddRecord}>
                            <Grid item xs={12}><Close closeClicked={onRequestClose} /></Grid>
                            <form name={'patientCreate'} onSubmit={handleSubmit(handleSubmitAddRecord)}>
                                <div className={`col-lg-12 add-new-record ${formStyles.root}`}>
                                    <Grid item xs={12} className={styles.modalHeader}>
                                        <Box component={"p"}>Врач: <strong>{data.doctor.name}</strong></Box>
                                        <Box component={"p"}>Дата: <strong><Moment locale={"ru"} format={"D MMMM YYYY"} withTitle date={data.date} /></strong></Box>
                                        <Box component={"p"} className={styles.transformInitial}>Время начала:{" "}<strong>{data.time_start}</strong></Box>
                                        <Box component={"p"} className={styles.groupInput}>
                                            <label>Время окончания:</label>
                                            <select defaultValue={timeEnd} className={"input"} name={"time_end"} onChange={(event) => setTimeEnd(event.target.value)}>
                                                {getIntervalsAfterTime(data.time_start).map(interval => {
                                                    return(
                                                        <option value={interval}>{interval}</option>
                                                    )
                                                })}
                                            </select>
                                        </Box>
                                    </Grid>
                                    <div className="container">
                                        <div className={`row mt-lg-3 mb-lg-3 ${formStyles.headers}`}/>
                                        <div className="row">
                                            <div className="col-lg-5 left-col">
                                                <div className="row">
                                                    <div className="col-lg-4 input-name">Фамилия</div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            ref={register}
                                                            name="family"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="text"
                                                            placeholder="Александрова"
                                                            required
                                                            disabled={patient}
                                                            defaultValue={patient && "name" in patient? patient.surname : ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4 input-name">Имя</div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            ref={register}
                                                            name="name"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="text"
                                                            placeholder="Александра"
                                                            required
                                                            disabled={patient}
                                                            defaultValue={patient && "name" in patient? patient.name : ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4 input-name">Отчество</div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            ref={register}
                                                            name="surname"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="text"
                                                            placeholder="Александровна"
                                                            required
                                                            disabled={patient}
                                                            defaultValue={patient && "name" in patient? patient.patronymic : ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-lg-2">
                                                    <div className="col-lg-4 input-name">Город</div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            ref={register}
                                                            name="city"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="text"
                                                            placeholder="Краснодар"
                                                            required
                                                            disabled={patient}
                                                            defaultValue={patient && "users" in patient? patient.users[0].adresses[0].city : ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4 input-name">Улица</div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            ref={register}
                                                            name="street"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="text"
                                                            placeholder="Красная"
                                                            required
                                                            disabled={patient}
                                                            defaultValue={patient && "users" in patient? patient.users[0].adresses[0].street : ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row splitted">
                                                    <div className="col-lg-4">
                                                        <div className="row" style={{ marginLeft: "5px" }}>
                                                            <div className="col-lg-4 input-name">Дом</div>
                                                            <div className="col-lg-8">
                                                                <input
                                                                    ref={register}
                                                                    name="house"
                                                                    className="add-new-record-input"
                                                                    type="text"
                                                                    placeholder="209a"
                                                                    required
                                                                    disabled={patient}
                                                                    defaultValue={patient && "users" in patient? patient.users[0].adresses[0].house : ''}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4" style={{ marginLeft: "16px" }}>
                                                        <div className="row">
                                                            <div className="col-lg-5 input-name">Корпус</div>
                                                            <div className="col-lg-7">
                                                                <input
                                                                    ref={register}
                                                                    name="building"
                                                                    className="add-new-record-input"
                                                                    type="text"
                                                                    placeholder="209"
                                                                    disabled={patient}
                                                                    defaultValue={patient && "users" in patient? patient.users[0].adresses[0].corpus : ''}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4 input-name">Квартира</div>
                                                    <div className="col-lg-4">
                                                        <input
                                                            ref={register}
                                                            name="flat"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="text"
                                                            placeholder="208"
                                                            disabled={patient}
                                                            defaultValue={patient && "users" in patient? patient.users[0].adresses[0].flat : ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-lg-2">
                                                    <div className="col-lg-4 input-name">Комментарий</div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            ref={register}
                                                            name="comment"
                                                            className="add-new-record-input comment mb-lg-2"
                                                            type="text"
                                                            placeholder="Информация отсутствует"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-7 right-col">
                                                <div className="col-lg-12 mb-lg-1">
                                                    <div className="row">
                                                        <div className="col-lg-4 input-name">Дата рождения</div>
                                                        <div className="col-lg-8">
                                                            <InputMask
                                                                inputRef={register}
                                                                name="birthday"
                                                                mask="99.99.9999"
                                                                className="add-new-record-input"
                                                                type="text"
                                                                placeholder="дд.мм.гггг"
                                                                required
                                                                disabled={patient}
                                                                defaultValue={patient && "name" in patient? moment(patient.born_date).format("DD.MM.YYYY") : ''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row gender">
                                                    <div className="col-lg-4 input-name">Пол</div>
                                                    <div className="col-lg-8 input-name-row">
                                                        <div className="row">
                                                            <div className="col-lg-4 man">
                                                                <input
                                                                    ref={register}
                                                                    value='М'
                                                                    type="radio"
                                                                    name="gender"
                                                                    id="man"
                                                                    required
                                                                    disabled={patient}
                                                                    defaultChecked={patient && "gender" in patient && patient.gender === "М" && "checked"}
                                                                />
                                                                <span>Мужской</span>
                                                            </div>
                                                            <div className="col-lg-6 woman">
                                                                <input
                                                                    ref={register}
                                                                    value="Ж"
                                                                    type="radio"
                                                                    name="gender"
                                                                    id="woman"
                                                                    disabled={patient}
                                                                    defaultChecked={patient && "gender" in patient && patient.gender === "Ж" && "checked"}
                                                                />
                                                                <span>Женский</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-lg-1">
                                                    <div className="col-lg-4 input-name">Мобильный телефон</div>
                                                    <div className="col-lg-8">
                                                        <InputMask
                                                            inputRef={register}
                                                            name="phone"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="text"
                                                            mask="+7(999)999-99-99"
                                                            placeholder="+7 (***) ***-**-**"
                                                            required
                                                            disabled={patient}
                                                            defaultValue={patient && "users" in patient? patient.users[0].contacts[0].phone : ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4 input-name">Email</div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            ref={register}
                                                            name="email"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="email"
                                                            placeholder="email@examle.com"
                                                            required
                                                            disabled={patient}
                                                            defaultValue={patient && "users" in patient? patient.users[0].email : ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-lg-2">
                                                    <div className="col-lg-4 input-name">Родитель</div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            ref={register}
                                                            name="parent"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="text"
                                                            placeholder="Александрова Алла Игоревна"
                                                            disabled={patient}
                                                            defaultValue={patient && "parent" in patient? patient.parent : ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4 input-name">Откуда узнал</div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            ref={register}
                                                            name="radio"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="text"
                                                            placeholder="рекомендации друзей"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mt-lg-2">
                                                    <div className="col-lg-4 input-name">
                                                        Страховая компания
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            ref={register}
                                                            name="insurance"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="text"
                                                            placeholder="СПАС"
                                                            required
                                                            disabled={patient}
                                                            defaultValue={patient && "users" in patient? patient.users[0].polices[0].name : ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4 input-name">Действителен с</div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            ref={register}
                                                            name="insuranceFrom"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="date"
                                                            placeholder="12.09.2010"
                                                            required
                                                            disabled={patient}
                                                            defaultValue={patient && "users" in patient? moment(patient.users[0].polices[0].date_start).format("DD-MM-YYYY"): ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4 input-name">Действителен до</div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            ref={register}
                                                            name="insuranceUntill"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="date"
                                                            placeholder="12.09.2010"
                                                            required
                                                            disabled={patient}
                                                            defaultValue={patient && "users" in patient? moment(patient.users[0].polices[0].date_end).format("DD-MM-YYYY"): ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-4 input-name">Описание</div>
                                                    <div className="col-lg-8">
                                                        <input
                                                            ref={register}
                                                            name="description"
                                                            className="add-new-record-input mb-lg-2"
                                                            type="text"
                                                            placeholder="пусто"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 offset-lg-4 mt-lg-3">
                                                <button
                                                    className="save-button"
                                                    type="submit"
                                                >
                                                    Сохранить
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Grid>
                        :
                        <Grid item xs={12} className={styles.modalSearch}>
                            <Grid item xs={12}><Close closeClicked={onRequestClose} /></Grid>
                            <Grid item xs={12} className={styles.modalHeader}>
                                <Box component={"p"}>Врач: <strong>{data.doctor.name}</strong></Box>
                                <Box component={"p"}>Дата: <strong><Moment locale={"ru"} format={"D MMMM YYYY"} withTitle date={data.date} /></strong></Box>
                                <Box component={"p"} className={styles.transformInitial}>Время начала:{" "}<strong>{data.time_start}</strong></Box>
                                <Box component={"p"} className={styles.groupInput}>
                                    <label>Время окончания:</label>
                                    <select className={"input"} name={"time_end"} onChange={(event) => setTimeEnd(event.target.value)}>
                                        {getIntervalsAfterTime(data.time_start).map(interval => {
                                            return(
                                                <option value={interval}>{interval}</option>
                                            )
                                        })}
                                    </select>
                                </Box>
                            </Grid>
                            <Grid item xs={12} className={styles.search}>
                                <LiveSearch
                                    shedule
                                    setFormIsOpening={setFormIsOpening}
                                    setPatient={setPatient}
                                    placeholder={"Начните вводить номер карты / Фамилию или номер телефона"}
                                />
                            </Grid>
                            <Grid item xs={12} className={styles.buttons}>
                                <button className={`${styles.button} ${styles.button_patientRecord}`}>Запись на прием</button>
                                <button className={`${styles.button} ${styles.button_patientCreate}`} onClick={() => setFormIsOpening(true)}>Добавить нового пациента</button>
                            </Grid>
                        </Grid>

                }
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles(() => ({
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
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    wrapper: {
        width: '900px',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        background: "#F6F7F8",
        boxShadow: "0px 2px 14px rgba(0, 0, 0, 0.3)",
        borderRadius: "5px",
        position: "relative",
        flexWrap: "wrap",
        padding: "50px",
        minHeight: "150px"
    },
    modalHeader: {
        display: "flex",
        textTransform: "capitalize",
        justifyContent: "space-between",
        marginBottom: "20px",
        alignItems: "center",
        "& p": {
            marginRight: "25px"
        }
    },
    buttons: {
        marginTop: "10px",
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    button: {
        borderRadius: "30px",
        // height: "32px",
        minWidth: "80px",
        color: "#ffffff",
        padding: "10px 15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        margin: "0 15px",
        cursor: "pointer",
        fontFamily: "Myriad"
    },
    button_patientCreate: {
        background: "#FE9841"
    },
    button_patientRecord: {
        background: "#3B80D6"
    },
    search: {
        marginBottom: "40px"
    },
    groupInput: {
        textTransform: "initial",
        "& label": {
            paddingRight: "5px"
        },
        "& .input": {
            background: "#FFFFFF",
            border: "1px solid #DFE6EE",
            boxSizing: "border-box",
            borderRadius: "4px",
            padding: "12px"
        }
    },
    transformInitial: {
        textTransform: "initial"
    }
    // select: {
    //     borderRadius: "4px",
    //     width: "100%",
    //     marginBottom: "15px",
    //     "& label, & div": {
    //         fontSize: "13px"
    //     },
    //     "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //         borderColor: "#3b80d6",
    //         borderWidth: "1px"
    //     },
    //     "& :focus": {
    //         backgroundColor: "rgba(255,255,255, 1)"
    //     }
    // },
}));
const formRecordStyles = makeStyles(() => ({
    root: {
        position: "inherit",
        boxShadow: "none",
        background: "transparent",
        width: "auto",
        height: "auto"
    }
}))
