import React, {useEffect,useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Vector from "../../Appoints/media/Vector";
import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import {Paper, Set,Path,Line} from 'react-raphael';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {SvgIcon} from '@material-ui/core';
import DiagnosisTab from './DiagnosisTab';
import { CircularProgress } from '@material-ui/core';

import toothPathList from '../../media/json/toothPathList.json';
import helpList from '../../media/json/helpList.json';
import helpListChild from '../../media/json/helpListChild.json';
import diagnosticButtonsList from '../../media/json/diagnosticButtonsList.json';
import {connect} from "react-redux";

function InspectionPatient({patient, account}) {
    const [getPatient, setPatient] = useState(patient);
    const [getActiveCard, setActiveCard] = useState('grown');
    const [getActiveTooth, setActiveTooth] = useState(false);

    const [getToothCard, setToothCard] = useState(false);
    const [hideBtnClicked, sethideBtnClicked] = useState(false);

    const [getUpdated, setUpdated] = useState(false);

    const [getValidForm, setValidForm] = useState(false);
    const mainStyles = useMainStyles();

    const [getDiagnos, setDiagnos] = useState('');
    const [getToothForm, setToothForm] = useState(
        {
            "health_status": "",
            "tooth_number": "",
            "toothcards_id": "",
        }
    );

    let opacityList = [18,17,16,26,27,28,48,47,46,36,37,38];

    const getPatientCard = async () => {
        if (getPatient.patientCards !== undefined){
            const response = await axios.get(`/api/patients/get/toothcard/${getPatient.patientCards.id}`);
            const result = response.data;
            if (result.toothcards !== null){
                setToothCard(result)
                setToothForm({...getToothForm, toothcards_id: Number(response.data.toothcards.id)});
                if (getUpdated){
                    setActiveTooth(false);
                    setDiagnos('');

                }
                setUpdated(false);

            }
        }
    }

    const setToothHealthStatus = (health_status) => {
        setToothForm({...getToothForm, health_status: health_status});
    }

    let inputsForm = {
        bite: "",
        complaints: "",
        diseases_history: "",
        diseases_now: "",
        oral_mucosa: "",
        rengen_data: "",
        visual_inspection: ""
    }
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        inputsForm[name] = value;
    };

    const toothSubmit = () => {
        const data = Object.assign({}, inputsForm, getToothForm, {"diagnos": getDiagnos});
        axios.post(`/api/patients/toothcard/save`, data)
            .then((response) => {
                setUpdated(true);
            });
    }

    const [getDisabledBtnInvoice, setDisabledBtnInvoice] = useState(false);
    const createInvoice = () => {
        setDisabledBtnInvoice(true);
        axios.post(`/api/orders/review/create`, {"user_id": getPatient.id, "product_id": 19, "doctor_id": account.id})
            .then((response) => {
                if (response.status === 200){
                    setDisabledBtnInvoice(false);
                }
            });
    }

    useEffect(() => {
        if (!getToothCard){
            getPatientCard();
        }
        if (getUpdated){
            getPatientCard();

        }
        if (getActiveTooth) {
            if (getActiveTooth.attr('class') !== 'tooth active'){
                getActiveTooth.attr({'class': 'tooth active'});
            }
            if (getToothForm.tooth_number !== getActiveTooth.items.toothId){
                setToothForm({...getToothForm,
                    tooth_number: getActiveTooth.items.toothId,
                    health_status: getToothCard.tooths[getActiveTooth.items.toothId] !== undefined ? getToothCard.tooths[getActiveTooth.items.toothId][0].health_status:'not_verified',
                });
            }
        }
    }, [getActiveTooth, getToothForm, getUpdated]);

    useEffect(() => {
        setActiveTooth(false);
    },[getActiveCard]);

    useEffect(() => {
        if (getActiveTooth) {
            getActiveTooth.attr({'class': 'tooth active'});
        }
    },[getDiagnos]);

    return(
        <Grid item xs={12} className={`container_materials`}>
                <div className="contaoner-info">
                    {hideBtnClicked ? null : (
                        <div className="hide-shedule-btn">
                            <button onClick={() => sethideBtnClicked(true)}/>
                        </div>
                    )}

                    {!hideBtnClicked && getToothCard? (
                        <div className={`main-schedule-title tooth-card ${getActiveCard}`}>
                            <h2 className={`card-title-h2`}>Осмотр</h2>
                            <Grid item xs={12} sm={12} className={mainStyles.rpaper}>
                                <Grid item className={mainStyles.flex} alignItems={'center'} direction={'column'} justify={'center'}>
                                    <IconButton className={`custom-btn`} color={getActiveCard === 'children' ? 'primary' : ''} onClick={()=>setActiveCard('children')}>
                                        <SvgIcon>
                                            <path d={"M11.9999 9.54109C14.6344 9.54109 16.7779 7.39807 16.7779 4.76351C16.7779 2.25512 14.8347 0.191835 12.3746 0C12.1368 0.346851 11.4745 1.39289 11.4745 1.78655C11.4797 1.87285 11.6392 2.31187 11.9999 2.31187C12.361 2.31187 12.5205 1.87332 12.5252 1.78327C12.5252 1.36911 12.861 1.03469 13.2756 1.03469C13.6903 1.03469 14.0261 1.37192 14.0261 1.78655C14.0261 2.63269 13.2555 3.81278 11.9999 3.81278C10.7443 3.81278 9.97363 2.63269 9.97363 1.78655C9.97363 1.32549 10.1964 0.759366 10.4717 0.236393C8.58388 0.875217 7.2218 2.66317 7.2218 4.76351C7.2218 7.39807 9.36529 9.54109 11.9999 9.54109Z M18.7061 19.1221C18.068 19.1221 17.508 19.5289 17.3079 20.13L16.6517 22.0981C16.3392 23.0355 17.0409 24 18.0222 24H18.1329C18.7319 24 19.2755 23.6234 19.4861 23.0624C20.2431 21.0434 20.1798 21.3722 20.1798 20.5958C20.1798 19.7834 19.5184 19.1221 18.7061 19.1221Z M6.69182 20.1294C6.54581 19.6913 6.20651 19.3515 5.77673 19.203C4.82042 18.8706 3.81992 19.586 3.81992 20.5956C3.81992 21.3722 3.75871 21.0489 4.51362 23.0622C4.72422 23.6232 5.26783 23.9998 5.86679 23.9998H5.97748C6.95743 23.9998 7.66084 23.0364 7.348 22.0979L6.69182 20.1294Z M17.2031 18.0282V17.8462H6.79706V18.0282C7.48902 18.4329 7.9022 19.0167 8.14694 19.7472H13.2758C13.6905 19.7472 14.0263 20.0835 14.0263 20.4976C14.0263 20.9123 13.6905 21.2481 13.2758 21.2481H8.64693C8.82568 21.7837 9.09223 22.4639 8.79046 23.43C10.8366 24.1895 13.1627 24.1898 15.2097 23.43C15.033 22.8645 15.0262 22.2285 15.228 21.6233L15.8841 19.6553C16.1182 18.9531 16.5952 18.3837 17.2031 18.0282Z M5.29595 17.621V17.0957C5.29595 16.681 5.63178 16.3452 6.0464 16.3452H6.73588L7.44459 13.5118C7.54497 13.1093 7.95256 12.865 8.35452 12.9654C8.75648 13.0662 9.00132 13.4733 8.90048 13.8758L8.28323 16.3452H15.7165L15.0992 13.8758C14.9984 13.4733 15.2432 13.0662 15.6452 12.9654C16.0476 12.865 16.4547 13.1093 16.5551 13.5118L17.2638 16.3452H17.9533C18.3679 16.3452 18.7038 16.681 18.7038 17.0957C18.7038 17.6617 18.7014 17.621 18.7061 17.621C19.0363 17.621 19.3538 17.6749 19.6512 17.7748C19.3132 14.7286 18.2021 10.3793 15.1274 10.206C15.1226 10.206 12.1583 12.1025 8.8714 10.2056C5.79875 10.3652 4.68409 14.7139 4.35272 17.7734C4.65497 17.6723 4.97067 17.621 5.29595 17.621Z"}/>
                                        </SvgIcon>
                                    </IconButton>
                                    <IconButton className={`custom-btn`} color={getActiveCard === 'grown' ? 'primary' : ''} onClick={()=>setActiveCard('grown')}>
                                        <SvgIcon viewBox={'0 0 17 24'}>
                                            <path d={"M13.0373 9.62732V7.55232L13.0634 7.0572C13.0786 6.01093 12.6036 5.0518 11.7608 4.49132C11.5121 4.32326 11.2371 4.19764 10.9473 4.12012C9.43 6.74456 6.82621 8.5604 3.83877 9.07703V9.69098C3.83453 10.9146 4.31749 12.0899 5.18127 12.9568C6.04476 13.824 7.21778 14.3121 8.44173 14.3126H8.46804C10.9974 14.2942 13.0373 12.1921 13.0373 9.62732Z M6.3736 14.774V16.3055C6.3736 17.4454 7.29793 18.3698 8.43785 18.3698C9.57805 18.3698 10.5021 17.4454 10.5021 16.3055V14.7627C9.86296 15.0394 9.17375 15.182 8.47718 15.1817C8.46331 15.1817 8.46812 15.1817 8.45454 15.1817C7.74071 15.1831 7.03395 15.0448 6.3736 14.774Z M13.9066 9.62745C13.9131 10.4989 13.7139 11.3593 13.3257 12.1393C13.9519 11.3499 14.4574 10.543 14.7987 9.72874C15.4913 8.07531 15.5261 6.30559 14.8966 4.74608C14.7766 4.44901 14.1151 2.98145 12.8759 3.27513C12.6569 3.32719 12.4342 3.20327 12.3632 2.98994L12.3332 2.90025C11.8704 1.81748 11.1093 0.981993 10.1309 0.484038C9.09228 -0.0444735 7.91501 -0.142367 6.72699 0.201109C4.75923 0.769796 3.13946 2.08146 2.28332 3.79968C1.77857 4.8253 1.54063 5.96154 1.59184 7.10345C1.6804 9.12922 2.45619 11.0647 3.79189 12.5906C3.25065 11.7206 2.96574 10.7156 2.9697 9.69111V8.803C2.96744 8.50168 3.20566 8.25355 3.5067 8.24365C3.80519 8.21451 7.97895 7.73664 10.3346 3.4248C10.4203 3.26664 10.5952 3.17809 10.7734 3.2027C11.2957 3.27796 11.7942 3.4712 12.2308 3.76771C13.3206 4.49258 13.951 5.727 13.9315 7.07006L13.9066 7.55896V9.62745Z M16.9486 20.4582C16.9486 18.3639 15.2436 16.6123 13.1494 16.6123H11.3839C11.2048 18.0963 9.9455 19.213 8.45051 19.213C6.95552 19.213 5.6962 18.0963 5.51711 16.6123H3.78275C1.68823 16.6123 0 18.3642 0 20.4582V24.0002H16.9486V20.4582Z"}/>
                                        </SvgIcon>
                                    </IconButton>
                                </Grid>

                                <Paper data={{paper: `main`}} width={900} height={350}>
                                    <Set>
                                        <Line x1={446} x2={446} y2={350} stroke={"#868789"} />
                                        <Line x1={0} y1={175} x2={900} y2={175} stroke={"#868789"} />
                                        {
                                            Object.keys(toothPathList).map((id) => {
                                                let currentClass = 'not_verified';
                                                if (getActiveTooth && getActiveTooth.items.toothId === Number(id)){
                                                    currentClass = 'active';
                                                } else if (getToothCard.tooths[Number(id)] !== undefined){
                                                    currentClass = getToothCard.tooths[Number(id)][0].health_status;
                                                }
                                                return (
                                                    <Path
                                                        mousedown={function() { setActiveTooth(this) }}
                                                        attr={{"class": `tooth ${currentClass} ${opacityList.indexOf(Number(id)) !== -1?'opacity':''}`}}
                                                        key={id}
                                                        data={{"toothId": Number(id)}}
                                                        d={toothPathList[id].path}
                                                    />
                                                )
                                            })
                                        }
                                        {
                                            (getActiveCard === 'grown')?
                                                Object.keys(helpList).map((id) => {
                                                    return (
                                                        <Path
                                                            // ref={(path) => {toothItem(path)}}
                                                            // mousedown={function() { return toothClick(id, this) }}
                                                            attr={{"class": `tooth number ${opacityList.indexOf(Number(id)) !== -1?'opacity':''}`}}
                                                            key={id}
                                                            d={helpList[id].path}
                                                        />
                                                    )
                                                }):
                                                Object.keys(helpListChild).map((id) => {
                                                    return (
                                                        <Path
                                                            // ref={(path) => {toothItem(path)}}
                                                            // mousedown={function() { return toothClick(id, this) }}
                                                            attr={{"class": `tooth number ${opacityList.indexOf(Number(id)) !== -1?'opacity':''}`}}
                                                            key={id}
                                                            d={helpListChild[id].path}
                                                        />
                                                    )
                                                })
                                        }
                                    </Set>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={12} className={mainStyles.rpaper}>
                                {
                                    Object.keys(diagnosticButtonsList).map((group) => {
                                        let groupList = diagnosticButtonsList[group];
                                        return (
                                            <Grid item xs={12} sm={groupList.sm} className={mainStyles.buttonGroup}>
                                                {
                                                    Object.keys(groupList.buttons).map((id) => {
                                                        let button = groupList.buttons[id];
                                                        return(
                                                            <IconButton disabled={!getActiveTooth} className={`custom-btn ${getActiveTooth && getToothForm.health_status === button.diagnos ? 'active' : ''}`} onClick={() => setToothHealthStatus(button.diagnos)}>
                                                                <SvgIcon viewBox={"0 0 32 32"}>
                                                                {
                                                                    Object.keys(button.icon).map((id) => {
                                                                        let icon = button.icon[id];
                                                                        return(
                                                                            <path d={icon.d} fill={icon.fill}/>
                                                                        )
                                                                    })
                                                                }
                                                                </SvgIcon>
                                                            </IconButton>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        );
                                    })
                                }
                            </Grid>
                        </div>
                    ) : (
                        <div className="show-shedule-btn pb-4">
                            <div className={`row ${mainStyles.center}`}>
                                <div className="col-lg-5 left-line">
                                    <hr />
                                </div>
                                <div className="col-lg-1 circle-btn">
                                    {!getToothCard ? (
                                        <CircularProgress color="primary" />
                                    ) : (
                                        <button onClick={() => sethideBtnClicked(false)}>
                                            <Vector />
                                        </button>
                                    )
                                    }

                                </div>
                                <div className="col-lg-5 right-line">
                                    <hr />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Grid container spacing={4} className="content_diagnosis">
                    <Grid item xs={12} sm={6} className={mainStyles.grid}>
                        <div className={mainStyles.paperLef}>
                            <div className="contaoner-info">
                                {hideBtnClicked ? null : (
                                    <div className="hide-shedule-btn">
                                        <button onClick={() => sethideBtnClicked(true)}/>
                                    </div>
                                )}

                                {!hideBtnClicked && getToothCard ? (
                                    <div className="main-schedule-title">
                                        <h2 className={`card-title-h2`}>Осмотр зубов</h2>
                                        <Grid container>
                                            <Grid item xs={12} sm={12} className={mainStyles.inputGroup}>
                                                <Grid item xs={12} sm={4}>
                                                    <Typography component={'div'} variant="h6" className={mainStyles.textLabel} gutterBottom>
                                                        Диагноз
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={7}>
                                                    <TextField
                                                        disabled={!getActiveTooth}
                                                        label="Комментарий"
                                                        name={"diagnos"}
                                                        multiline
                                                        value={getDiagnos}
                                                        rowsMax={15}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        onChange={event => setDiagnos(event.target.value)}
                                                        InputProps={{ classes: { input: mainStyles.textArea } }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} className={mainStyles.inputGroup}>
                                                <Grid item xs={12} sm={4}>
                                                    <Typography component={'div'} variant="h6" className={mainStyles.textLabel} gutterBottom>
                                                        Жалобы
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={7}>
                                                    <TextField
                                                        disabled={!getActiveTooth}
                                                        label="Комментарий"
                                                        name={"complaints"}
                                                        multiline
                                                        rowsMax={15}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        onChange={handleChange}
                                                        InputProps={{ classes: { input: mainStyles.textArea } }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} className={mainStyles.inputGroup}>
                                                <Grid item xs={12} sm={4}>
                                                    <Typography component={'div'} variant="h6" className={mainStyles.textLabel} gutterBottom>
                                                        Перенесенные и сопутствующие заболевания
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={7}>
                                                    <TextField
                                                        disabled={!getActiveTooth}
                                                        label="Комментарий"
                                                        name={"diseases_history"}
                                                        multiline
                                                        rowsMax={15}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        onChange={handleChange}
                                                        InputProps={{ classes: { input: mainStyles.textArea } }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} className={mainStyles.inputGroup}>
                                                <Grid item xs={12} sm={4}>
                                                    <Typography component={'div'} variant="h6" className={mainStyles.textLabel} gutterBottom>
                                                        Развитие настоящего заболевания
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={7}>
                                                    <TextField
                                                        disabled={!getActiveTooth}
                                                        label="Комментарий"
                                                        name={"diseases_now"}
                                                        multiline
                                                        rowsMax={15}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        onChange={handleChange}
                                                        InputProps={{ classes: { input: mainStyles.textArea } }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} className={mainStyles.inputGroup}>
                                                <Grid item xs={12} sm={4}>
                                                    <Typography component={'div'} variant="h6" className={mainStyles.textLabel} gutterBottom>
                                                        Данные объективного исследования, внешний осмотр
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={7}>
                                                    <TextField
                                                        disabled={!getActiveTooth}
                                                        label="Комментарий"
                                                        name={"visual_inspection"}
                                                        multiline
                                                        rowsMax={15}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        onChange={handleChange}
                                                        InputProps={{ classes: { input: mainStyles.textArea } }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} className={mainStyles.inputGroup}>
                                                <Grid item xs={12} sm={4}>
                                                    <Typography component={'div'} variant="h6" className={mainStyles.textLabel} gutterBottom>
                                                        Прикус
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={7}>
                                                    <TextField
                                                        disabled={!getActiveTooth}
                                                        label="Комментарий"
                                                        name={"bite"}
                                                        multiline
                                                        rowsMax={15}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        onChange={handleChange}
                                                        InputProps={{ classes: { input: mainStyles.textArea } }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} className={mainStyles.inputGroup}>
                                                <Grid item xs={12} sm={4}>
                                                    <Typography component={'div'} variant="h6" className={mainStyles.textLabel} gutterBottom>
                                                        Состояние слизистой оболочки полости рта, десен, альвеолярных отростков неба
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={7}>
                                                    <TextField
                                                        disabled={!getActiveTooth}
                                                        label="Комментарий"
                                                        name={"oral_mucosa"}
                                                        multiline
                                                        rowsMax={15}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        onChange={handleChange}
                                                        InputProps={{ classes: { input: mainStyles.textArea } }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} className={mainStyles.inputGroup}>
                                                <Grid item xs={12} sm={4}>
                                                    <Typography component={'div'} variant="h6" className={mainStyles.textLabel} gutterBottom>
                                                        Данные рентгеновских и лабораторных исследований
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={7}>
                                                    <TextField
                                                        disabled={!getActiveTooth}
                                                        label="Комментарий"
                                                        name={"rengen_data"}
                                                        multiline
                                                        rowsMax={15}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        onChange={handleChange}
                                                        InputProps={{ classes: { input: mainStyles.textArea } }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item className={mainStyles.flex} alignItems={'center'} justify={'center'} xs={12} sm={12}>
                                            <button disabled={!getActiveTooth} className={mainStyles.buttonSave} onClick={() => toothSubmit()}>
                                                Сохранить
                                            </button>
                                        </Grid>
                                    </div>
                                ) : (
                                    <div className="show-shedule-btn pb-4">
                                        <div className={`row ${mainStyles.center}`}>
                                            <div className="col-lg-5 left-line">
                                                {getToothCard ? (
                                                    <hr />
                                                ) : (null)
                                                }

                                            </div>
                                            <div className="col-lg-1 circle-btn">
                                                {!getToothCard ? (
                                                    <CircularProgress color="primary" />
                                                ) : (
                                                    <button onClick={() => sethideBtnClicked(false)}>
                                                        <Vector />
                                                    </button>
                                                )
                                                }

                                            </div>
                                            <div className="col-lg-5 right-line">
                                                {getToothCard ? (
                                                    <hr />
                                                ) : (null)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} className={mainStyles.grid}>
                        {getToothCard? (
                            <DiagnosisTab getDisable={getDisabledBtnInvoice} setCreate={createInvoice} setData={setDiagnos}/>
                        ) : (
                            <div className="show-shedule-btn pb-4">
                                <div className={`row ${mainStyles.center}`}>
                                    <div className="col-lg-5 left-line">
                                        {/*<hr />*/}
                                    </div>
                                    <div className="col-lg-1 circle-btn">
                                        <CircularProgress color="primary" />
                                    </div>
                                    <div className="col-lg-5 right-line">
                                        {/*<hr />*/}
                                    </div>
                                </div>
                            </div>
                        )

                        }

                    </Grid>
                </Grid>
            </Grid>

    )
}

const mapStateToProps = (state) => ({
    account: state.auth.user
});

export default connect(mapStateToProps, {})(InspectionPatient)

const useMainStyles = makeStyles(() => ({
    flex: {
        display: 'flex',
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
    }
}));
