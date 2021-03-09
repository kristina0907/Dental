import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputMask from "react-input-mask";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {useForm} from "react-hook-form";
import {Box, CircularProgress, Grid,TextField} from "@material-ui/core";
import axios from "axios";
import { connect } from 'react-redux';
import {getWaitinglistsCats,addWaitinglists} from "../../actions/crmAction";
import store from "../../store";

function ScheduleAppointment({getVisible, visible,waitingCats, update,livePatient}) {
    const styles = useStyles();
    const { handleSubmit, register } = useForm();
    const [loaded, setLoaded] = useState(false);
    const [save, setSave] = useState(false);
    const [error, setError] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [getPatient, setPatient] = useState();
    const [getPatientID, setPatientID] = useState();
    useEffect(() => {
      store.dispatch(getWaitinglistsCats());
    }, []);

    const handleChangeInput = (q) => {
      setPatient();
      setPatientID();
        if (q.length >= 3) {
            setIsFocus(true);
            setIsLoading(true);

            clearTimeout(timer);
            const timer = setTimeout(() => {
                axios
                    .post(`/api/patients/search`, {"search": q})
                    .then((response) => {
                        setSearchResults(response.data);
                        setIsLoading(false);
                    })
            }, 200);
        } else {
            setIsFocus(false);
            setIsLoading(false);
            setSearchResults([]);
        }
    }
    const handleClickItem = (patient) => {
        setPatient(patient.users[0].name);
        setPatientID(patient.users[0].id);
        setIsFocus(false);
    }
    const handleClose = () => {
        document.forms.categoryCreate.reset();
        visible(false);
    }
    const onSubmit = async (values) => {
      if(livePatient){
        values["patient_id"] = livePatient.id;
      }else{
        values["patient_id"] = getPatientID;
      }
        store.dispatch(addWaitinglists(values));
        if(update){
          update(true);
        }
        setPatient();
        setPatientID();
         visible(false);
    };

    return(
        (getVisible?
            <div className={`add-new-record ${styles.root} ${(loaded)?styles.alignCenter:''}`}>
                {!error?
                    !loaded?
                        <form name={'categoryCreate'} onSubmit={handleSubmit(onSubmit)}>
                            <div className="closeModal">
                                <IconButton
                                    disableFocusRipple={true}
                                    disableRipple={true}
                                    onClick={handleClose}
                                    aria-haspopup="false"
                                    edge="end"
                                    size={'small'}
                                    className={styles.close}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </div>


                            <div className="title_modal">Запланировать приём</div>
                            <div className="row">
                                <div className="col-lg-4 input-name">Пациент</div>
                                <div className="col-lg-8">
                                {livePatient? <div className={styles.namePatient}>{livePatient.name}</div> :
                                  <div className={"container_search_crm"}>
                                  <input
                                      name="code"
                                      className="add-new-record-input mb-lg-2"
                                      type="text"
                                      placeholder=""
                                      required
                                      multiline
                                      value={getPatient}
                                      onChange={(event) => handleChangeInput(event.target.value)}
                                  />
                                  {isFocus &&
                                      <Grid container xs={12} className={`${styles.searchResults} searchResults`}>
                                          {isLoading ?
                                              <Grid item xs={12} sm={12} className={styles.center}>
                                                  <CircularProgress color="primary" />
                                              </Grid>
                                              :searchResults.length ?
                                                  <Grid container>
                                                      {(searchResults).map((item, index) => {
                                                          return(
                                                                  <Grid item xs={12} className={styles.item} key={index} onClick={() => handleClickItem(item)}>
                                                                      <Box className={styles.itemFullName}>{item.name} {item.patronymic} {item.surname}</Box>
                                                                  </Grid>
                                                          )
                                                      })}
                                                  </Grid>
                                                  :<Grid item xs={12} className={styles.emptyResults}>
                                                      <Box>Совпадений не найдено</Box>
                                                  </Grid>}
                                      </Grid>
                                  }
                                      </div>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 input-name">Время</div>
                                <div className="col-lg-8">
                                    <TextField
                                        inputRef={register}
                                        name={`time`}
                                        id="datetime-local"
                                        type="time"
                                        defaultValue=""
                                        className={[styles.textField,"select_dateTime"]}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 input-name">Продолжительность</div>
                                <div className="col-lg-8">
                                    <TextField
                                        inputRef={register}
                                        name={`duration`}
                                        id="datetime-local"
                                        type="time"
                                        defaultValue=""
                                        className={[styles.textField,"select_dateTime"]}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 input-name">Врач</div>
                                <div className="col-lg-8">
                                <select required name={`doctor_id`}
                                        ref={register({
                                            required: "Не выбрано"
                                        })}
                                        className="add-new-record-input mb-lg-2"
                                >
                                    <option value="">Не выбрано</option>
                                    {waitingCats && waitingCats.length  ?
                                        (waitingCats).map((doctor) => {
                                            return (
                                                <option  value={doctor.id}>{doctor.name}</option>
                                            )
                                        })
                                        :null}
                                </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 input-name">Актуально до</div>
                                <div className="col-lg-8">
                                    <TextField
                                        inputRef={register}
                                        name={`date_to`}
                                        id="datetime-local"
                                        type="date"
                                        defaultValue=""
                                        className={[styles.textField,"select_dateTime"]}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 input-name">Комментарий</div>
                                <div className="col-lg-8">
                                    <textarea ref={register} name={`comment`} className="helper_textarea add-new-record-input mb-lg-2"></textarea>
                                </div>
                            </div>
                            <div className="btnModal">
                                <button
                                    className="save-button"
                                    type="submit"
                                >
                                    Сохранить
                                </button>
                            </div>


                        </form>
                        :<CircularProgress color="primary" />
                    :<CircularProgress color="secondary" />}
            </div>
            :null)
    )
}
const mapStateToProps = (state) => ({
    waitingCats: state.crm.waitingCats
});

export default connect(mapStateToProps, { getWaitinglistsCats,addWaitinglists })(ScheduleAppointment);

const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        top: '15%',
        left: 0,
        right: 0,
        bottom: 0,
        width: '400px',
        height:'550px',
        display: 'flex',
        margin: '0 auto',
        zIndex: 999999,
        textAlign:'left',
        padding:'52px',
    },
    namePatient:{
      paddingTop:"10px"
    },
    headers: {
        marginTop: 0,
        marginBottom: '25px',
    },
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        position: "relative"
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        background: "#FFFFFF",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.15)",
        borderRadius: "3px",
        width: "100%",
        height: "70px",
        border: "none",
        padding: "20px",
        textTransform: "capitalize"
    },
    searchIcon: {
        position: "absolute",
        top: "20px",
        right: "15px"
    },
    searchResults: {
        position: "absolute",
        background: "#FFFFFF",
        left: 0,
        right: 0,
        padding: "10px",
        zIndex:1
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
        margin: "10px 15px",
        cursor: "pointer",
        fontFamily: "Myriad"
    },
    button_patientRecord: {
        background: "#3B80D6"
    },
    emptyResults: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    itemsHeader: {
        color: "#494949",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        display: "flex",
        flexWrap: "nowrap",
        padding: "15px"
    },
    item: {
        width: "100%",
        display: "flex",
        flexWrap: "nowrap",
        padding: "15px",
        borderBottom: "1px solid #F6F7F8",
        cursor: "pointer",
        textDecoration: "none",
        color: "inherit",
        fontSize: "12px",
        "&:hover": {
            textDecoration: "none",
            color: "inherit",
            background: "#F4F7FA"
        }
    },
    itemCard: {
        width: "20%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    itemFullName: {
        overflow: "hidden",
        whiteSpace: "pre-line"
    },
    itemBornDate: {
        width: "20%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    itemContacts: {
        width: "20%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    textField: {
        fontSize:"12px",
        background: "#ffffff",
        border: "1px solid #dfe6ee",
        borderRadius: "4px",
        padding: "12px",
        width: "100%",
        color: "#B0BAC5",
        marginBottom: "3px"
    }
}))
