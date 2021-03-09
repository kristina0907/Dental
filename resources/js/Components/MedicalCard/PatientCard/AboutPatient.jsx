import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import Create from '@material-ui/icons/Create';
import LiveTape from '../../Index/LiveTape';
import {Box, CircularProgress} from "@material-ui/core";
import Vector from "../../Appoints/media/Vector";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

export default function RecipeReviewCard({patient,loaded, updated}) {
    const classes = useStyles();
    const mainStyles = useMainStyles();
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
        "block_2": false,
        "block_3": false,
        "block_4": false,
        "block_5": false,
        "block_6": false,
        "block_7": false
    });

    const { handleSubmit, register } = useForm();

    const [expanded, setExpanded] = useState(false);

    const onSubmit = values => {
        axios.post(`/api/patients/update`, values)
            .then((response) => {
                setExpanded(false);
                updated(true);
            });
    };

    return (
        <Grid  item xs={12} className={`container_materials`}>
                <div>
                    <div className="titleTab">
                        Медицинская карта
                        <IconButton aria-label="delete" color={(expanded) ? 'primary' : ''} size="medium" onClick={event => setExpanded(!expanded)}>
                            <Create fontSize="inherit" />
                        </IconButton>
                    </div>
                    {!expanded?
                        <Grid container container spacing={4}>
                            <Grid item xs={12} md={9} lg={9} xl={10}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6}>
                                        <div item className={`contaoner-info`}>
                                            <Grid item className={mainStyles.card_wrapper}>
                                                {hideBtnClicked.block_1 ? null : (
                                                    <div className="hide-shedule-btn">
                                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                                                    </div>
                                                )}

                                                {!hideBtnClicked.block_1 && loaded ? (
                                                    <div className="main-schedule-title">
                                                        <h2 className={`card-title-h2`}>Информация о карте</h2>
                                                        <Grid container className="patient_card_info">
                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Номер медкарты:
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                {patient.patientCards ? patient.patientCards.card_number:null}</Grid>
                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Статус:
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                {patient.patientCards && patient.patientCards.archive_info ? 'Активный':'В архиве'}</Grid>
                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Начальный остаток:
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                0 Р
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Сумма лечения:
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                0 Р
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Первый приём:
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                {patient.patientCards ? patient.patientCards.created_at : ''}</Grid>

                                                        </Grid>
                                                    </div>
                                                ) : (
                                                    <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                        {!loaded ? (
                                                            <div className={`row ${mainStyles.center}`}>
                                                                <div className="col-lg-1">
                                                                    <CircularProgress color="primary" />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className={`row ${mainStyles.center}`}>
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
                                                        )
                                                        }
                                                    </div>
                                                )}
                                            </Grid>
                                        </div>
                                        <div item className={`contaoner-info`}>
                                            {hideBtnClicked.block_2 ? null : (
                                                <div className="hide-shedule-btn">
                                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_2: true})}/>
                                                </div>
                                            )}

                                            {!hideBtnClicked.block_2 && loaded ? (
                                                <div className="main-schedule-title">
                                                    <h2 className={`card-title-h2`}>Персональная информация</h2>
                                                    <Grid container className="patient_card_info">
                                                        <Grid item xs={12} sm={6} className="patient_card_title">
                                                            Фамилия:
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            {patient.patientCards ? patient.patientCards.surname:''}</Grid>
                                                        <Grid item xs={12} sm={6} className="patient_card_title">
                                                            Имя:
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            {patient.patientCards ? patient.patientCards.name:''}</Grid>
                                                        <Grid item xs={12} sm={6} className="patient_card_title">
                                                            Отчество:
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            {patient.patientCards ? patient.patientCards.patronymic:''}</Grid>
                                                        <Grid item xs={12} sm={6} className="patient_card_title">
                                                            Дата рождения:
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            {patient.patientCards ? patient.patientCards.born_date:''}</Grid>
                                                        <Grid item xs={12} sm={6} className="patient_card_title">
                                                            Пол:
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            {patient.patientCards ? patient.patientCards.gender:''}</Grid>
                                                        <Grid item xs={12} sm={6} className="patient_card_title">
                                                            Родитель:
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            {patient.patientCards ? patient.patientCards.parent:''}</Grid>

                                                    </Grid>
                                                </div>
                                            ) : (
                                                <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                    {!loaded ? (
                                                        <div className={`row ${mainStyles.center}`}>
                                                            <div className="col-lg-1">
                                                                <CircularProgress color="primary" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={`row ${mainStyles.center}`}>
                                                            <div className="col-lg-5 left-line">
                                                                <hr />
                                                            </div>
                                                            <div className="col-lg-1 circle-btn">
                                                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_2: false})}>
                                                                    <Vector />
                                                                </button>
                                                            </div>
                                                            <div className="col-lg-5 right-line">
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <div item className={`contaoner-info`}>
                                            {hideBtnClicked.block_3 ? null : (
                                                <div className="hide-shedule-btn">
                                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_3: true})}/>
                                                </div>
                                            )}

                                            {!hideBtnClicked.block_3 && loaded ? (
                                                <div className="main-schedule-title">
                                                    <h2 className={`card-title-h2`}>Полисы</h2>
                                                    <Grid container className="patient_card_info">
                                                        {
                                                            (patient.polices) ?
                                                                (patient.polices).map((police) => {
                                                                    return(
                                                                        <Grid container>
                                                                            <Grid item xs={12} sm={3} className="patient_card_title">
                                                                                {police.name}
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={3}>
                                                                                {police.description}
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={3} className="patient_card_title">
                                                                                с {police.date_start}
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={3}>
                                                                                до {police.date_end}
                                                                            </Grid>
                                                                        </Grid>
                                                                    )
                                                                }): null
                                                        }
                                                    </Grid>
                                                </div>
                                            ) : (
                                                <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                    {!loaded ? (
                                                        <div className={`row ${mainStyles.center}`}>
                                                            <div className="col-lg-1">
                                                                <CircularProgress color="primary" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={`row ${mainStyles.center}`}>
                                                            <div className="col-lg-5 left-line">
                                                                <hr />
                                                            </div>
                                                            <div className="col-lg-1 circle-btn">
                                                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_3: false})}>
                                                                    <Vector />
                                                                </button>
                                                            </div>
                                                            <div className="col-lg-5 right-line">
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}  sm={6}>
                                        <div item className={`contaoner-info`}>
                                            {hideBtnClicked.block_4 ? null : (
                                                <div className="hide-shedule-btn">
                                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_4: true})}/>
                                                </div>
                                            )}

                                            {!hideBtnClicked.block_4 && loaded ? (
                                                <div className="main-schedule-title">
                                                    <h2 className={`card-title-h2`}>Контактная информация</h2>
                                                    <Grid container className="patient_card_info">
                                                        {
                                                            (patient.contacts) ?
                                                                (patient.contacts).map((contact) => {
                                                                    return(
                                                                        <Grid container className="patient_card_info">
                                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                                Телефон:
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6}>
                                                                                {contact.phone}</Grid>
                                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                                СМС-рассылка:
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6}>
                                                                                {contact.sms_inform ? "Согласие":"Отказ"}
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                                Email:
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6}>
                                                                                {patient ? patient.email:''}
                                                                            </Grid>
                                                                        </Grid>
                                                                    )
                                                                }):null
                                                        }
                                                    </Grid>
                                                </div>
                                            ) : (
                                                <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                    {!loaded ? (
                                                        <div className={`row ${mainStyles.center}`}>
                                                            <div className="col-lg-1">
                                                                <CircularProgress color="primary" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={`row ${mainStyles.center}`}>
                                                            <div className="col-lg-5 left-line">
                                                                <hr />
                                                            </div>
                                                            <div className="col-lg-1 circle-btn">
                                                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_4: false})}>
                                                                    <Vector />
                                                                </button>
                                                            </div>
                                                            <div className="col-lg-5 right-line">
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <div item className={`contaoner-info`}>
                                            {hideBtnClicked.block_5 ? null : (
                                                <div className="hide-shedule-btn">
                                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_5: true})}/>
                                                </div>
                                            )}

                                            {!hideBtnClicked.block_5 && loaded ? (
                                                <div className="main-schedule-title">
                                                    <h2 className={`card-title-h2`}>Адрес проживания</h2>
                                                    <Grid container className="patient_card_info">
                                                        {
                                                            (patient.adresses) ?
                                                                (patient.adresses).map((adresses) => {
                                                                    return(
                                                                        <Grid container className="patient_card_info">
                                                                            <Grid item xs={12} sm={4} className="patient_card_title">
                                                                                Город:
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={8}>
                                                                                {adresses.city}
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={4} className="patient_card_title">
                                                                                Улица:
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={8}>
                                                                                {adresses.street}
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={3} className="patient_card_title">
                                                                                Дом: {adresses.house}
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={3} className="patient_card_title">
                                                                                Корпус: {adresses.corpus}
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                                Квартира: {adresses.flat}
                                                                            </Grid>
                                                                        </Grid>
                                                                    )
                                                                }):null
                                                        }
                                                    </Grid>
                                                </div>
                                            ) : (
                                                <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                    {!loaded ? (
                                                        <div className={`row ${mainStyles.center}`}>
                                                            <div className="col-lg-1">
                                                                <CircularProgress color="primary" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={`row ${mainStyles.center}`}>
                                                            <div className="col-lg-5 left-line">
                                                                <hr />
                                                            </div>
                                                            <div className="col-lg-1 circle-btn">
                                                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_5: false})}>
                                                                    <Vector />
                                                                </button>
                                                            </div>
                                                            <div className="col-lg-5 right-line">
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <div item className={`contaoner-info`}>
                                            {hideBtnClicked.block_6 ? null : (
                                                <div className="hide-shedule-btn">
                                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_6: true})}/>
                                                </div>
                                            )}

                                            {!hideBtnClicked.block_6 && loaded ? (
                                                <div className="main-schedule-title">
                                                    <h2 className={`card-title-h2`}>Маркетинг</h2>
                                                    <Grid container className="patient_card_info">
                                                        <Grid item xs={12} sm={6} className="patient_card_title">
                                                            Узнал о нас:
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            {patient.patientCards ? patient.patientCards.marketing : ''}
                                                        </Grid>
                                                        {patient.patientCards && patient.patientCards.status === "0" ?
                                                            <Grid container>
                                                                <Grid item xs={12} sm={6} className="patient_card_title">
                                                                    Причина перемещения в архив:
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    {patient.patientCards ?patient.patientCards.archive_info: ''}
                                                                </Grid>
                                                            </Grid>
                                                            : ''}

                                                    </Grid>
                                                </div>
                                            ) : (
                                                <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                    {!loaded ? (
                                                        <div className={`row ${mainStyles.center}`}>
                                                            <div className="col-lg-1">
                                                                <CircularProgress color="primary" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={`row ${mainStyles.center}`}>
                                                            <div className="col-lg-5 left-line">
                                                                <hr />
                                                            </div>
                                                            <div className="col-lg-1 circle-btn">
                                                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_6: false})}>
                                                                    <Vector />
                                                                </button>
                                                            </div>
                                                            <div className="col-lg-5 right-line">
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <div item className={`contaoner-info`}>
                                            {hideBtnClicked.block_7 ? null : (
                                                <div className="hide-shedule-btn">
                                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_7: true})}/>
                                                </div>
                                            )}

                                            {!hideBtnClicked.block_7 && loaded ? (
                                                <div className="main-schedule-title">
                                                    <h2 className={`card-title-h2`}>Прочее</h2>
                                                    <Grid container className="patient_card_info">
                                                        <Grid item xs={12} sm={6} className="patient_card_title">
                                                            Комментарий:
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            {(patient.patientCards) ? patient.patientCards.comment : ''}
                                                        </Grid>

                                                    </Grid>
                                                </div>
                                            ) : (
                                                <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                    {!loaded ? (
                                                        <div className={`row ${mainStyles.center}`}>
                                                            <div className="col-lg-1">
                                                                <CircularProgress color="primary" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={`row ${mainStyles.center}`}>
                                                            <div className="col-lg-5 left-line">
                                                                <hr />
                                                            </div>
                                                            <div className="col-lg-1 circle-btn">
                                                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_7: false})}>
                                                                    <Vector />
                                                                </button>
                                                            </div>
                                                            <div className="col-lg-5 right-line">
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={3} lg={3} xl={2}>
                                <Grid item xs={12}>
                                    <Box>
                                        <Grid item component={LiveTape}/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>:
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={9}>

                                    <Grid container>
                                        <Grid item xs={12} sm={6}>
                                            <Grid item className={`contaoner-info ${mainStyles.card_container_left}`}>
                                                <Grid item className={mainStyles.card_wrapper}>
                                                    {hideBtnClicked.block_1 ? null : (
                                                        <div className="hide-shedule-btn">
                                                            <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                                                        </div>
                                                    )}

                                                    {!hideBtnClicked.block_1 && loaded ? (
                                                        <div className="main-schedule-title">
                                                            <h2 className={`card-title-h2`}>Информация о карте</h2>
                                                            <Grid container alignItems={'center'} className="patient_card_info">
                                                                <Grid item xs={12} sm={6} className="patient_card_title">
                                                                    Номер медкарты:
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    {patient.patientCards ? patient.patientCards.card_number:null}
                                                                </Grid>
                                                                <Grid item xs={12} sm={6} className="patient_card_title">
                                                                    Статус:
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    <input
                                                                        name={'archive_info'}

                                                                        defaultValue={patient.patientCards && patient.patientCards.archive_info ? 'Активный':'В архиве'}
                                                                        type="text"
                                                                        ref={register}
                                                                        className="input_record_patient"/>
                                                                </Grid>
                                                                <Grid item xs={12} sm={6} className="patient_card_title">
                                                                    Начальный остаток:
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    <input
                                                                        defaultValue={0}
                                                                        type="text"
                                                                        ref={register}
                                                                        className="input_record_patient"/>
                                                                </Grid>
                                                                <Grid item xs={12} sm={6} className="patient_card_title">
                                                                    Сумма лечения:
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    <input
                                                                        defaultValue={0}
                                                                        type="text"
                                                                        ref={register}
                                                                        className="input_record_patient"/>
                                                                </Grid>
                                                                <Grid item xs={12} sm={6} className="patient_card_title">
                                                                    Первый приём:
                                                                </Grid>
                                                                <Grid item xs={12} sm={6}>
                                                                    <input
                                                                        name={'created_at'}
                                                                        defaultValue={patient.patientCards ? patient.patientCards.created_at : ''}
                                                                        type="date"
                                                                        ref={register}
                                                                        className="input_record_patient"/>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    ) : (
                                                        <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                            {!loaded ? (
                                                                <div className={`row ${mainStyles.center}`}>
                                                                    <div className="col-lg-1">
                                                                        <CircularProgress color="primary" />
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className={`row ${mainStyles.center}`}>
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
                                                            )
                                                            }
                                                        </div>
                                                    )}
                                                </Grid>
                                            </Grid>
                                            <Grid item className={`contaoner-info ${mainStyles.card_container_left}`}>
                                                {hideBtnClicked.block_2 ? null : (
                                                    <div className="hide-shedule-btn">
                                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_2: true})}/>
                                                    </div>
                                                )}

                                                {!hideBtnClicked.block_2 && loaded ? (
                                                    <div className="main-schedule-title">
                                                        <h2 className={`card-title-h2`}>Персональная информация</h2>
                                                        <Grid container alignItems={'center'} className="patient_card_info">
                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Фамилия:
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <input
                                                                    name={'surname'}
                                                                    defaultValue={patient.patientCards ? patient.patientCards.surname:''}
                                                                    type="text"
                                                                    className="input_record_patient"
                                                                    ref={register}
                                                                    placeholder={patient.patientCards ? patient.patientCards.surname:''} />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Имя:
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <input
                                                                    name={'name'}
                                                                    defaultValue={patient.patientCards ? patient.patientCards.name:''}
                                                                    type="text"
                                                                    className="input_record_patient"
                                                                    ref={register}
                                                                    placeholder={patient.patientCards ? patient.patientCards.name:''} />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Отчество:
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <input
                                                                    name={'patronymic'}
                                                                    defaultValue={patient.patientCards ? patient.patientCards.patronymic:''}
                                                                    type="text"
                                                                    className="input_record_patient"
                                                                    ref={register}
                                                                    placeholder={patient.patientCards ? patient.patientCards.patronymic:''} />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Дата рождения:
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <InputMask
                                                                    required
                                                                    className="input_record_patient"
                                                                    inputRef={register}
                                                                    name={`born_date`}
                                                                    defaultValue={patient.patientCards ? patient.patientCards.born_date:''}
                                                                    mask="99.99.9999"
                                                                    className="input_record_patient"
                                                                    type="text"
                                                                    placeholder={patient.patientCards ? patient.patientCards.born_date:''}/>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Пол:
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <div className="form_radio gender_patient">
                                                                    <input id="radio-1"
                                                                           defaultChecked={patient.patientCards && patient.patientCards.gender == 'муж' ? true:false}
                                                                           name={`gender`}
                                                                           type="radio"
                                                                           ref={register}
                                                                           value="муж"/>
                                                                    <label htmlFor="radio-1">Муж</label>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <div className="form_radio gender_patient">
                                                                    <input id="radio-2"
                                                                           defaultChecked={patient.patientCards && patient.patientCards.gender == 'жен' ? true:false}
                                                                           name={`gender`}
                                                                           type="radio"
                                                                           ref={register}
                                                                           value="жен"/>
                                                                    <label htmlFor="radio-2">Жен</label>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Родитель:
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <input
                                                                    name={'parent'}
                                                                    defaultValue={patient.patientCards ? patient.patientCards.parent:''}
                                                                    type="text"
                                                                    className="input_record_patient"
                                                                    ref={register}
                                                                    placeholder={patient.patientCards ? patient.patientCards.parent:''} />
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                ) : (
                                                    <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                        {!loaded ? (
                                                            <div className={`row ${mainStyles.center}`}>
                                                                <div className="col-lg-1">
                                                                    <CircularProgress color="primary" />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className={`row ${mainStyles.center}`}>
                                                                <div className="col-lg-5 left-line">
                                                                    <hr />
                                                                </div>
                                                                <div className="col-lg-1 circle-btn">
                                                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_2: false})}>
                                                                        <Vector />
                                                                    </button>
                                                                </div>
                                                                <div className="col-lg-5 right-line">
                                                                    <hr />
                                                                </div>
                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item className={`contaoner-info ${mainStyles.card_container_left}`}>
                                                {hideBtnClicked.block_3 ? null : (
                                                    <div className="hide-shedule-btn">
                                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_3: true})}/>
                                                    </div>
                                                )}

                                                {!hideBtnClicked.block_3 && loaded ? (
                                                    <div className="main-schedule-title">
                                                        <h2 className={`card-title-h2`}>Полисы</h2>
                                                        <Grid container className="patient_card_info">
                                                            {
                                                                (patient.polices) ?
                                                                    (patient.polices).map((police) => {
                                                                        return(
                                                                            <Grid container>
                                                                                <Grid item xs={12} sm={3} className="patient_card_title">
                                                                                    {police.name}
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={3}>
                                                                                    {police.description}
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={3} className="patient_card_title">
                                                                                    с {police.date_start}
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={3}>
                                                                                    до {police.date_end}
                                                                                </Grid>
                                                                            </Grid>
                                                                        )
                                                                    }): null
                                                            }
                                                        </Grid>
                                                    </div>
                                                ) : (
                                                    <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                        {!loaded ? (
                                                            <div className={`row ${mainStyles.center}`}>
                                                                <div className="col-lg-1">
                                                                    <CircularProgress color="primary" />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className={`row ${mainStyles.center}`}>
                                                                <div className="col-lg-5 left-line">
                                                                    <hr />
                                                                </div>
                                                                <div className="col-lg-1 circle-btn">
                                                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_3: false})}>
                                                                        <Vector />
                                                                    </button>
                                                                </div>
                                                                <div className="col-lg-5 right-line">
                                                                    <hr />
                                                                </div>
                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}  sm={6}>
                                            <Grid item className={`contaoner-info ${mainStyles.card_container_right}`}>
                                                {hideBtnClicked.block_4 ? null : (
                                                    <div className="hide-shedule-btn">
                                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_4: true})}/>
                                                    </div>
                                                )}

                                                {!hideBtnClicked.block_4 && loaded ? (
                                                    <div className="main-schedule-title">
                                                        <h2 className={`card-title-h2`}>Контактная информация</h2>

                                                        <input type={"hidden"} ref={register} name={'patient_id'} value={patient ? patient.id : ''}/>
                                                        <input type={"hidden"} ref={register} name={'patient_card_id'} value={patient.patientCards? patient.patientCards.id : ''}/>
                                                        <Grid container alignItems={'center'} className="patient_card_info">
                                                            {
                                                                (patient.contacts) ?
                                                                    (patient.contacts).map((contact, key) => {
                                                                        return(
                                                                            <Grid container alignItems={'center'} className="patient_card_info">
                                                                                <input type={"hidden"} ref={register} name={`contacts[${key}][id]`} value={contact.id}/>
                                                                                <Grid item xs={12} sm={6} className="patient_card_title">
                                                                                    Телефон:
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={6}>
                                                                                    <InputMask
                                                                                        required
                                                                                        inputRef={register}
                                                                                        defaultValue={contact.phone}
                                                                                        name={`contacts[${key}][phone]`}
                                                                                        className="input_record_patient"
                                                                                        type="text"
                                                                                        mask="+7(999)999-99-99"
                                                                                        placeholder={contact.phone}/>
                                                                                </Grid>
                                                                                {/*<Grid item xs={12} sm={6} className="patient_card_title">*/}
                                                                                {/*    СМС-рассылка:*/}
                                                                                {/*</Grid>*/}
                                                                                {/*<Grid item xs={12} sm={6}>*/}
                                                                                {/*    <input*/}
                                                                                {/*        name={`contacts[${key}][sms_inform]`}*/}
                                                                                {/*        defaultValue={contact.sms_inform ? "Согласие":"Отказ"}*/}
                                                                                {/*        type="text"*/}
                                                                                {/*        className="input_record_patient"*/}
                                                                                {/*        ref={register}*/}
                                                                                {/*        placeholder={contact.sms_inform ? "Согласие":"Отказ"}/>*/}
                                                                                {/*</Grid>*/}
                                                                                <Grid item xs={12} sm={6} className="patient_card_title">
                                                                                    Email:
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={6}>
                                                                                    <input
                                                                                        name={`email`}
                                                                                        defaultValue={patient ? patient.email:''}
                                                                                        type="text"
                                                                                        className="input_record_patient"
                                                                                        ref={register}
                                                                                        placeholder={patient ? patient.email:''}/>
                                                                                </Grid>
                                                                            </Grid>
                                                                        )
                                                                    }):null
                                                            }
                                                        </Grid>
                                                    </div>
                                                ) : (
                                                    <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                        {!loaded ? (
                                                            <div className={`row ${mainStyles.center}`}>
                                                                <div className="col-lg-1">
                                                                    <CircularProgress color="primary" />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className={`row ${mainStyles.center}`}>
                                                                <div className="col-lg-5 left-line">
                                                                    <hr />
                                                                </div>
                                                                <div className="col-lg-1 circle-btn">
                                                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_4: false})}>
                                                                        <Vector />
                                                                    </button>
                                                                </div>
                                                                <div className="col-lg-5 right-line">
                                                                    <hr />
                                                                </div>
                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item className={`contaoner-info ${mainStyles.card_container_right}`}>
                                                {hideBtnClicked.block_5 ? null : (
                                                    <div className="hide-shedule-btn">
                                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_5: true})}/>
                                                    </div>
                                                )}

                                                {!hideBtnClicked.block_5 && loaded ? (
                                                    <div className="main-schedule-title">
                                                        <h2 className={`card-title-h2`}>Адрес проживания</h2>
                                                        <Grid container alignItems={'center'} className="patient_card_info">
                                                            {
                                                                (patient.adresses) ?
                                                                    (patient.adresses).map((adresses, key) => {
                                                                        return(
                                                                            <Grid container alignItems={'center'} className="patient_card_info">
                                                                                <Grid item xs={12} sm={4} className="patient_card_title">
                                                                                    Город:
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={8}>
                                                                                    <input type={"hidden"} ref={register} name={`adresses[${key}][id]`} value={adresses.id}/>
                                                                                    <input
                                                                                        name={`adresses[${key}][city]`}

                                                                                        defaultValue={adresses.city}
                                                                                        type="text"
                                                                                        className="input_record_patient"
                                                                                        ref={register}
                                                                                        placeholder={adresses.city}/>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={4} className="patient_card_title">
                                                                                    Улица:
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={8}>
                                                                                    <input
                                                                                        name={`adresses[${key}][street]`}

                                                                                        defaultValue={adresses.street}
                                                                                        type="text"
                                                                                        className="input_record_patient"
                                                                                        ref={register}
                                                                                        placeholder={adresses.street}/>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={3} alignItems={'center'} className={`${mainStyles.flex} ${mainStyles.mright} patient_card_title`}>
                                                                                    Дом: <input
                                                                                    name={`adresses[${key}][house]`}
                                                                                    defaultValue={adresses.house}
                                                                                    type="text"
                                                                                    className="input_record_patient adress_input_patient"
                                                                                    ref={register}
                                                                                    placeholder={adresses.house}/>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={3} alignItems={'center'} className={`${mainStyles.flex} ${mainStyles.mright} patient_card_title`}>
                                                                                    Корпус: <input
                                                                                    name={`adresses[${key}][corpus]`}
                                                                                    defaultValue={adresses.corpus}
                                                                                    type="text"
                                                                                    className="input_record_patient adress_input_patient"
                                                                                    ref={register}
                                                                                    placeholder={adresses.corpus}/>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={4} alignItems={'center'} className={`${mainStyles.flex} ${mainStyles.mright} patient_card_title`}>
                                                                                    Квартира: <input
                                                                                    name={`adresses[${key}][flat]`}
                                                                                    defaultValue={adresses.flat}
                                                                                    type="text"
                                                                                    className="input_record_patient adress_input_patient"
                                                                                    ref={register}
                                                                                    placeholder={adresses.flat}/>
                                                                                </Grid>
                                                                            </Grid>
                                                                        )
                                                                    }):null
                                                            }
                                                        </Grid>
                                                    </div>
                                                ) : (
                                                    <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                        {!loaded ? (
                                                            <div className={`row ${mainStyles.center}`}>
                                                                <div className="col-lg-1">
                                                                    <CircularProgress color="primary" />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className={`row ${mainStyles.center}`}>
                                                                <div className="col-lg-5 left-line">
                                                                    <hr />
                                                                </div>
                                                                <div className="col-lg-1 circle-btn">
                                                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_5: false})}>
                                                                        <Vector />
                                                                    </button>
                                                                </div>
                                                                <div className="col-lg-5 right-line">
                                                                    <hr />
                                                                </div>
                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item className={`contaoner-info ${mainStyles.card_container_right}`}>
                                                {hideBtnClicked.block_6 ? null : (
                                                    <div className="hide-shedule-btn">
                                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_6: true})}/>
                                                    </div>
                                                )}

                                                {!hideBtnClicked.block_6 && loaded ? (
                                                    <div className="main-schedule-title">
                                                        <h2 className={`card-title-h2`}>Маркетинг</h2>
                                                        <Grid container alignItems={'center'} className="patient_card_info">
                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Узнал о нас:
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <input
                                                                    name={`marketing`}
                                                                    defaultValue={patient.patientCards ? patient.patientCards.marketing : ''}
                                                                    type="text"
                                                                    className="input_record_patient"
                                                                    ref={register}
                                                                    placeholder={patient.patientCards ? patient.patientCards.marketing : ''}/>
                                                            </Grid>

                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Причина перемещения в архив:
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <input
                                                                    name={`archive_info`}
                                                                    defaultValue={patient.patientCards ?patient.patientCards.archive_info: ''}
                                                                    type="text"
                                                                    className="input_record_patient"
                                                                    ref={register}
                                                                    placeholder={patient.patientCards ?patient.patientCards.archive_info: ''}/>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                ) : (
                                                    <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                        {!loaded ? (
                                                            <div className={`row ${mainStyles.center}`}>
                                                                <div className="col-lg-1">
                                                                    <CircularProgress color="primary" />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className={`row ${mainStyles.center}`}>
                                                                <div className="col-lg-5 left-line">
                                                                    <hr />
                                                                </div>
                                                                <div className="col-lg-1 circle-btn">
                                                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_6: false})}>
                                                                        <Vector />
                                                                    </button>
                                                                </div>
                                                                <div className="col-lg-5 right-line">
                                                                    <hr />
                                                                </div>
                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                )}
                                            </Grid>
                                            <Grid item className={`contaoner-info ${mainStyles.card_container_right}`}>
                                                {hideBtnClicked.block_7 ? null : (
                                                    <div className="hide-shedule-btn">
                                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_7: true})}/>
                                                    </div>
                                                )}

                                                {!hideBtnClicked.block_7 && loaded ? (
                                                    <div className="main-schedule-title">
                                                        <h2 className={`card-title-h2`}>Прочее</h2>
                                                        <Grid container alignItems={'center'} className="patient_card_info">
                                                            <Grid item xs={12} sm={6} className="patient_card_title">
                                                                Комментарий:
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <input
                                                                    name={'comment'}
                                                                    defaultValue={(patient.patientCards) ? patient.patientCards.comment : ''}
                                                                    type="text"
                                                                    className="input_record_patient"
                                                                    ref={register}
                                                                    placeholder={(patient.patientCards) ? patient.patientCards.comment : ''}/>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                ) : (
                                                    <div className={`show-shedule-btn ${(loaded)?'pb-4':''}`}>
                                                        {!loaded ? (
                                                            <div className={`row ${mainStyles.center}`}>
                                                                <div className="col-lg-1">
                                                                    <CircularProgress color="primary" />
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className={`row ${mainStyles.center}`}>
                                                                <div className="col-lg-5 left-line">
                                                                    <hr />
                                                                </div>
                                                                <div className="col-lg-1 circle-btn">
                                                                    <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_7: false})}>
                                                                        <Vector />
                                                                    </button>
                                                                </div>
                                                                <div className="col-lg-5 right-line">
                                                                    <hr />
                                                                </div>
                                                            </div>
                                                        )
                                                        }
                                                    </div>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <div>
                                        <button onClick={event => setExpanded(!expanded)} className={`canclel`}>Отмена</button>
                                    </div>
                                    <div>
                                        <button type={"submit"} className={`save`}>Сохранить</button>
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                    }
                </div>
            </Grid>
    );
}

const useMainStyles = makeStyles(() => ({
    flex: {
        display: 'flex',
    },
    mright: {
      marginRight: '25px',
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    grid: {
        margin: '10px 0',
    },
    paperLeft: {
        padding: '0 15px 0 0',
    },
    paperRight: {
        padding: '0 0 0 15px',
    },
    rpaper: {
        display: 'flex',
        justifyContent: 'center',
    },
    inputGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '30px 0 0 0 !important',
    },
    textArea: {
        minHeight: '60px',
    },
    textLabel: {
        fontSize: '.9rem',
    },
    buttonSave: {
        marginTop: '30px',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#F6F7F8',
        background: '#3B80D6',
        borderRadius: '25px',
        border: 'none',
        padding: '8px 13px',
    },
    buttonGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '40px !important',
    },

    card_container_left: {
        margin: '0 25px 25px 0',
    },
    card_container_right: {
        margin: '0 0 25px 25px',
    }
}));

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight:35,
        marginBottom:35,
        padding:15
    },
    root1: {
        marginRight:15,
        marginBottom:35,
        padding:15
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));
