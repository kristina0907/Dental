import React, {useEffect, useRef, useState} from 'react';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import {red} from "@material-ui/core/colors";
import {Box, CircularProgress} from "@material-ui/core";
import Vector from "../Appoints/media/Vector";
import {useForm} from "react-hook-form";
import axios from "axios";
import {connect} from "react-redux";
import {getOneEmployee} from "../../actions/employeActions";
import store from "../../store";
import {useParams} from "react-router-dom";
import CreatePersonnelCard from "./CreatePersonnelCard";
import IncomingCall from "../IncomingCall";


const PersonnelCard = ({ employee })=> {
    const styles = useStyles();
    const fileInputRef = useRef();
    const [expanded, setExpanded] = useState(false);
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
        "block_2": false,
        "block_3": false,
        "block_4": false,
        "block_5": false,
        "block_6": false,
        "block_7": false
    });
const [getUpdated,setUpdated] = useState(false);
    let { employeId } = useParams();
    useEffect(() => {
        store.dispatch(getOneEmployee(employeId));
    },[]);

    useEffect(() => {
        if(getUpdated){
            store.dispatch(getOneEmployee(employeId));
            setUpdated(false);
        }
    },[getUpdated]);

    return (
        <div>
             {!expanded?
                 <Grid container spacing={4}>
                     <Grid item xs={12} md={3} lg={3} xl={2}>
                         <Grid item xs={12} className={styles.wrapper_component}>
                             <IncomingCall />
                         </Grid>
                     </Grid>
                     <Grid item xs={12} md={6} lg={6} xl={8}>
                         <Grid container spacing={4}>
                             <Grid item md={6} lg={6} xs={6} className={styles.wrapper_component}>
                                 <div  className={`contaoner-info`}>
                                     {hideBtnClicked.block_1 ? null : (
                                         <div className="hide-shedule-btn">
                                             <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                                         </div>
                                     )}
                                     {!hideBtnClicked.block_1? (
                                         <div className="main-schedule-title">
                                             <h2 className={`card-title-h2`}>Персональная информация</h2>
                                             <Grid container spacing={4}>
                                                 <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
                                                     {employee && employee.employer_card && employee.employer_card.photo !== null?
                                                         <div className="photo_personnel_card" style={{ backgroundImage: `url(/storage/${employee.employer_card.photo})`}}></div>
                                                         :
                                                         <div className="photo_personnel_card" style={{ backgroundImage: `url(/media/notPhoto.png)`}}></div>
                                                     }

                                                 </Grid>
                                                 <Grid item xs={12} sm={12} md={12} lg={12} xl={8}>
                                                     <Grid container spacing={4} className="patient_card_info">
                                                         <Grid item xs={12} sm={6} className="patient_card_title">
                                                             Фамилия:
                                                         </Grid>
                                                         <Grid item xs={12} sm={6}>
                                                             {employee && employee.employer_card ? employee.employer_card.surname:null}
                                                         </Grid>
                                                         <Grid item xs={12} sm={6} className="patient_card_title">
                                                             Имя:
                                                         </Grid>
                                                         <Grid item xs={12} sm={6}>
                                                             {employee && employee.employer_card ? employee.employer_card.first_name:null}
                                                         </Grid>
                                                         <Grid item xs={12} sm={6} className="patient_card_title">
                                                             Отчество:
                                                         </Grid>
                                                         <Grid item xs={12} sm={6}>
                                                             {employee && employee.employer_card ? employee.employer_card.last_name:null}
                                                         </Grid>
                                                         <Grid item xs={12} sm={6} className="patient_card_title">
                                                             Дата рождения:
                                                         </Grid>
                                                         <Grid item xs={12} sm={6}>
                                                             {employee && employee.employer_card ? employee.employer_card.birthday:null}
                                                         </Grid>
                                                         <Grid item xs={12} sm={6} className="patient_card_title">
                                                             Пол:
                                                         </Grid>
                                                         <Grid item xs={12} sm={6}>
                                                             {employee && employee.employer_card ? employee.employer_card.gender:null}
                                                         </Grid>

                                                     </Grid>
                                                 </Grid>
                                             </Grid>
                                         </div>
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
                                 </div>
                                 <div  className={`contaoner-info`}>
                                     {hideBtnClicked.block_3 ? null : (
                                         <div className="hide-shedule-btn">
                                             <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_3: true})}/>
                                         </div>
                                     )}
                                     {!hideBtnClicked.block_3? (
                                         <div className="main-schedule-title">
                                             <h2 className={`card-title-h2`}>Контактная информация</h2>
                                             <Grid container spacing={4} className="patient_card_info">
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Телефон:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_card ? employee.employer_card.phone:null}
                                                 </Grid>
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     E-mail:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_card ? employee.employer_card.email:null}
                                                 </Grid>
                                             </Grid>

                                         </div>
                                     ) : (
                                         <div className={`show-shedule-btn`}>
                                             <div className={`row ${styles.center}`}>
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
                                         </div>
                                     )}
                                 </div>
                                 <div  className={`contaoner-info`}>
                                     {hideBtnClicked.block_5 ? null : (
                                         <div className="hide-shedule-btn">
                                             <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_5: true})}/>
                                         </div>
                                     )}
                                     {!hideBtnClicked.block_5? (
                                         <div className="main-schedule-title">
                                             <h2 className={`card-title-h2`}>Информация о сотруднике</h2>
                                             <Grid container spacing={4} className="patient_card_info">
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Подразделение:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_infos && employee.employer_infos.subdivisions.length ? employee.employer_infos.subdivisions[0].name:null}
                                                 </Grid>
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Профессия:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_infos && employee.employer_infos.professions.length ? employee.employer_infos.professions[0].name:null}
                                                 </Grid>
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Статус:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_infos && employee.employer_infos.status == 1 ? "Работает":"Нет"}
                                                 </Grid>
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Доступ в программу:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_infos && employee.employer_infos.access == 1 ? "Есть":"Нет"}
                                                 </Grid>
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Зароботная плата:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_infos ? employee.employer_infos.salary:null} Р
                                                 </Grid>
                                             </Grid>

                                         </div>
                                     ) : (
                                         <div className={`show-shedule-btn`}>
                                             <div className={`row ${styles.center}`}>
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
                                         </div>
                                     )}
                                 </div>
                             </Grid>
                             <Grid item md={6} lg={6} xs={6} className={styles.wrapper_component}>
                                 <div className={`contaoner-info`}>
                                     {hideBtnClicked.block_2 ? null : (
                                         <div className="hide-shedule-btn">
                                             <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_2: true})}/>
                                         </div>
                                     )}
                                     {!hideBtnClicked.block_2? (
                                         <div className="main-schedule-title">
                                             <h2 className={`card-title-h2`}>Адрес проживания</h2>
                                             <Grid container spacing={4} className="patient_card_info">
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Город:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_card ? employee.employer_card.city:null}
                                                 </Grid>
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Улица:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_card ? employee.employer_card.street:null}
                                                 </Grid>
                                                 <Grid item xs={12} sm={3} className="patient_card_title">
                                                     Дом: {employee && employee.employer_card ? employee.employer_card.house:null}
                                                 </Grid>
                                                 <Grid item xs={12} sm={3} className="patient_card_title">
                                                     Корпус: {employee && employee.employer_card ? employee.employer_card.corpus:null}
                                                 </Grid>
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Квартира: {employee && employee.employer_card ? employee.employer_card.flat:null}
                                                 </Grid>

                                             </Grid>

                                         </div>
                                     ) : (
                                         <div className={`show-shedule-btn`}>
                                             <div className={`row ${styles.center}`}>
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
                                         </div>
                                     )}
                                 </div>
                                 <div className={`contaoner-info`}>
                                     {hideBtnClicked.block_4 ? null : (
                                         <div className="hide-shedule-btn">
                                             <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_4: true})}/>
                                         </div>
                                     )}
                                     {!hideBtnClicked.block_4? (
                                         <div className="main-schedule-title">
                                             <h2 className={`card-title-h2`}>Документы</h2>
                                             <Grid container spacing={4} className="patient_card_info">
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     ИНН:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_documents ? employee.employer_documents.inn:null}
                                                 </Grid>
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Паспорт РФ:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_documents ? employee.employer_documents.series_and_number:null}
                                                 </Grid>
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Выдан:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_documents ? employee.employer_documents.issued:null}
                                                 </Grid>
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Дата выдачи:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_documents ? employee.employer_documents.date_issue:null}
                                                 </Grid>
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Место рождения:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_documents ? employee.employer_documents.born_place:null}
                                                 </Grid>
                                                 <Grid item xs={12} sm={6} className="patient_card_title">
                                                     Место регистрации:
                                                 </Grid>
                                                 <Grid item xs={12} sm={6}>
                                                     {employee && employee.employer_documents ? employee.employer_documents.registration_adress:null}
                                                 </Grid>
                                             </Grid>

                                         </div>
                                     ) : (
                                         <div className={`show-shedule-btn`}>
                                             <div className={`row ${styles.center}`}>
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
                                         </div>
                                     )}
                                 </div>
                             </Grid>
                         </Grid>
                     </Grid>
                     <Grid item xs={12} md={3} lg={3} xl={2}>
                         <Grid item xs={12} className={styles.wrapper_component}>
                             <div>
                                 <button type={"submit"} className={`save`} onClick={event => setExpanded(true)}>Редактировать</button>
                             </div>
                         </Grid>
                     </Grid>
                 </Grid>
            :
            <CreatePersonnelCard employeId={employeId} updated={setUpdated} paramSetExpanded={setExpanded} employeInfo={employee}/> }
        </div>
    );
}


const mapStateToProps = (state) => ({
    employee: state.employers.items
});

export default connect(mapStateToProps, { getOneEmployee })(PersonnelCard);

const useStyles = makeStyles((theme) => ({
    wrapper_component: {
        marginBottom: "20px"
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
}));

