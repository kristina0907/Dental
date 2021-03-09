import Grid from "@material-ui/core/Grid";
import Vector from "../Appoints/media/Vector";
import React, {useRef, useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import {connect} from "react-redux";
import {editEmployers, addEmployers, getSelect} from "../../actions/employeActions";
import {useForm} from "react-hook-form";
import store from "../../store";
import {IconButton, ListItemText, Select, Checkbox, Input, MenuItem} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import InputMask from "react-input-mask";
import {useHistory} from "react-router-dom"
import {Box} from "@material-ui/core";
import IncomingCall from "../IncomingCall";
import Header from "../helpers/Header";
import HeaderRight from "../helpers/HeaderRight";

const CreatePersonnelCard = ({ updated, error, success, selectCats, employeInfo, employeId, paramSetExpanded })=> {
    const mainStyles = useMainStyles();
    const [imageSave, setimageSave] = useState();
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
        "block_2": false,
        "block_3": false,
        "block_4": false,
        "block_5": false,
        "block_6": false,
        "block_7": false
    });
    let history = useHistory();
    const fileInputRef = useRef();
    const progressRef = useRef();
    const uploadRef = useRef();
    const uploadModalRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const [personName, setPersonName] = React.useState([]);



    /**
     */
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    useEffect(() => {
        store.dispatch(getSelect());
        let filteredArr = selectedFiles.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
        setValidFiles([...filteredArr]);

    }, [selectedFiles]);

    useEffect(() => {
        if(success){
            if(employeInfo){
                paramSetExpanded(false);
            }else{
                history.push("/personnel");
            }
            if(updated){
                updated(true);
            }

        }

    },[success])



    const handleChange = (event) => {
        setPersonName(event.target.value);
    };

    const { register, handleSubmit, errors  } = useForm({ mode: "onBlur" });


    /*
    useEffect(() => {
        register({ name: "subdivisions" }, { required: true });
        register({ name: "professions" }, { required: true});
        register({ name: "role_id" }, { required: true});
        register({ name: "branches" }, { required: true});
    }, []);
    */


    const onSubmit = (values) => {
        let sendData = new FormData();
        if(imageSave){
            sendData.append('image', imageSave.get('image'));
        }

        Object.keys(values).map((id) => {
            if(id !== "image") {
                sendData.append(id, values[id]);
            }
        });

        if(employeInfo && employeId){
            store.dispatch(editEmployers(sendData));
        }else{
            store.dispatch(addEmployers(sendData));
        }

    };


    const preventDefault = (e) => {
        e.preventDefault();
    }

    const dragOver = (e) => {
        preventDefault(e);
    }

    const dragEnter = (e) => {
        preventDefault(e);
    }

    const dragLeave = (e) => {
        preventDefault(e);
    }

    const fileDrop = (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const handleFiles = (files) => {
        for(let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('image', files[i]);
            setimageSave(formData);
            const reader = new FileReader();
            if (validateFile(files[i])) {
                reader.readAsDataURL(files[i]);
                reader.onload = function(e) {
                    setUrlImage(e.target.result)
                }
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                setErrorMessage(null);
            } else {
                setValidFiles(null);
                setErrorMessage('File type not permitted');
            }
        }
    }

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }

        return true;
    }

    const [getEditBranch, setEditBranch] = useState(employeInfo && employeInfo.employer_infos && employeInfo.employer_infos.branch_id?employeInfo.employer_infos.branch_id:null );
    const [getEditRole, setEditRole] = useState(employeInfo && employeInfo.roles && employeInfo.roles['0'] ? employeInfo.roles[0].id:null);
    const [getEditProfession, setEditProfession] = useState(employeInfo && employeInfo.employer_infos && employeInfo.employer_infos.professions && employeInfo.employer_infos.professions[0]  ? employeInfo.employer_infos.professions[0].id:null);

    return(
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

            <Grid container spacing={4}>
                <Grid item xs={12} md={3} lg={3} xl={2}>
                    <Grid item xs={12}>
                        <IncomingCall />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={9} lg={9} xl={10}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} className={"wrapper_component"}>
                            <Grid item xs={12} md={9} xl={9}>
                                <Box>
                                    <Header breadcrumb={
                                        {
                                            "pageTitle": "Сотрудники",
                                            "links":[
                                                {"url": "/", "title": "Главная"},
                                                {"url": "/personnel", "title": "Сотрудники"}
                                            ]
                                        }
                                    }/>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3} xl={3}>
                                <Box>
                                    <HeaderRight />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={9} lg={9} xl={10}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6}>
                                    <div className={`contaoner-info`}>
                                        {hideBtnClicked.block_1 ? null : (
                                            <div className="hide-shedule-btn">
                                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                                            </div>
                                        )}
                                        {!hideBtnClicked.block_1? (
                                            <div className="main-schedule-title">
                                                <h2 className={`card-title-h2`}>Персональная информация</h2>
                                                {employeId?
                                                    <input type={"hidden"} ref={register} name={`id`} value={employeId}/>
                                                    :
                                                    null}

                                                <Grid container spacing={4} className="patient_card_info">
                                                    {validFiles && validFiles.length ?
                                                        <>
                                                            {/* <input type={"hidden"} ref={register} name={`image`} value={imageSave.get('image')}/> */}
                                                            <Grid item xs={12} sm={6}>
                                                                <div className="photo_personnel_card editPhoto">
                                                                    <div className="photo_delite">
                                                                        <IconButton aria-haspopup="true" onClick={() => setValidFiles(null)} edge="end">
                                                                            <DeleteIcon />
                                                                        </IconButton>
                                                                    </div>
                                                                    <img src={urlImage ? urlImage : ""} alt=""/>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12} sm={8}></Grid>
                                                        </>
                                                        :
                                                        <>
                                                            <Grid item xs={12} sm={4} className="patient_card_title">
                                                                <div className="drop-container_patient new_photo_patient"
                                                                     onDragOver={dragOver}
                                                                     onDragEnter={dragEnter}
                                                                     onDragLeave={dragLeave}
                                                                     onDrop={fileDrop}
                                                                     onClick={fileInputClicked}
                                                                >
                                                                    <input
                                                                        ref={fileInputRef}
                                                                        className="file-input"
                                                                        type="file"
                                                                        multiple
                                                                        onChange={filesSelected}
                                                                    />
                                                                </div>

                                                            </Grid>
                                                            <Grid item xs={12} sm={8}>
                                                                <div className="text_save_photo">Перенесите фотографию или нажмите на область с фотоаппаратом, чтобы загрузить фото с устройства.</div>
                                                                {errorMessage?
                                                                    <div className="error_message_photo">Неверный формат изображения</div>
                                                                    :null}
                                                            </Grid>
                                                        </>
                                                    }
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Фамилия:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <input
                                                            required
                                                            name={`surname`}
                                                            defaultValue={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.surname :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.surname:''}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Имя:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <input
                                                            required
                                                            name={`first_name`}
                                                            defaultValue={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.first_name :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.first_name:''}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Отчество:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <input
                                                            required
                                                            name={`last_name`}
                                                            defaultValue={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.last_name :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.last_name:''}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Дата рождения:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <InputMask
                                                            required
                                                            className="input_record_patient"
                                                            inputRef={register}
                                                            name={`birthday`}
                                                            defaultValue={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.birthday :''}
                                                            mask="99.99.9999"
                                                            className="add-new-record-input"
                                                            type="text"
                                                            placeholder={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.birthday:''}/>

                                                    </Grid>
                                                    <Grid item xs={12} sm={4} className="patient_card_title">
                                                        Пол:
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <div className="form_radio">
                                                            <input id="radio-1"
                                                                   defaultChecked={employeInfo?
                                                                       employeInfo.employer_card && employeInfo.employer_card.gender == 'муж' ? true:false
                                                                       :true}
                                                                   name={`gender`}
                                                                   type="radio"
                                                                   ref={register}
                                                                   value="муж"/>
                                                            <label htmlFor="radio-1">Мужской</label>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <div className="form_radio">
                                                            <input id="radio-2"
                                                                   defaultChecked={employeInfo && employeInfo.employer_card && employeInfo.employer_card.gender == 'жен' ? true:false}
                                                                   name={`gender`}
                                                                   type="radio"
                                                                   ref={register}
                                                                   value="жен"/>
                                                            <label htmlFor="radio-2">Женский</label>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ) : (
                                            <div className={`show-shedule-btn`}>
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
                                            </div>
                                        )}
                                    </div>
                                    <div className={`contaoner-info`}>
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
                                                        <InputMask
                                                            required
                                                            inputRef={register}
                                                            defaultValue={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.phone :''}
                                                            name={`phone`}
                                                            className="add-new-record-input mb-lg-2"
                                                            type="text"
                                                            mask="+7(999)999-99-99"
                                                            placeholder={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.phone:''}/>

                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        E-mail:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <input
                                                            required
                                                            name={`email`}
                                                            defaultValue={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.email :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.email:''}/>
                                                    </Grid>
                                                </Grid>

                                            </div>
                                        ) : (
                                            <div className={`show-shedule-btn`}>
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
                                            </div>
                                        )}
                                    </div>
                                    <div className={`contaoner-info`}>
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
                                                        <Select
                                                            labelId="demo-mutiple-checkbox-label"
                                                            className="input_record_patient"
                                                            multiple
                                                            value={personName}
                                                            name={`subdivisions`}
                                                            inputRef={register}
                                                            onChange={handleChange}
                                                            input={<Input name={'subdivisions'} required/>}
                                                            renderValue={(selected) => selected.join(', ')}
                                                            MenuProps={MenuProps}

                                                        >
                                                            {selectCats && "subdivisions" in selectCats && selectCats.subdivisions.length? (
                                                                (selectCats.subdivisions).map((subdivision) => {
                                                                    return (
                                                                        <MenuItem key={subdivision.id} value={subdivision.id}>
                                                                            <Checkbox checked={personName.indexOf(subdivision.id) > -1} />
                                                                            <ListItemText primary={subdivision.name} />
                                                                        </MenuItem>
                                                                    )
                                                                })
                                                            ): (null)}
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Профессия:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <select name={`professions`}
                                                                className="input_record_patient"
                                                                onChange={event => setEditProfession(event.target.value)}
                                                                value={getEditProfession}
                                                                ref={register({
                                                                    required: "Выберите профессию"
                                                                })}  >
                                                            {selectCats && "professions" in selectCats && selectCats.professions.length? (
                                                                (selectCats.professions).map((profession,index) => {
                                                                    if(index === 0 && !employeInfo){
                                                                        return (
                                                                            <option value='' >Выберите профессию</option>
                                                                        )
                                                                    }
                                                                    return (
                                                                        <option value={profession.id}>{profession.name}</option>
                                                                    )
                                                                })
                                                            ): (null)}
                                                        </select>
                                                        {errors.professions && <p style={{color:'red'}}> {errors.professions.message}</p> }
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Роль:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <select name={`role_id`}
                                                                className="input_record_patient"
                                                                onChange={event => setEditRole(event.target.value)}
                                                                value={getEditRole}
                                                                ref={register({
                                                                    required: "Выберите роль"
                                                                })}  >
                                                            {selectCats && "roles" in selectCats && selectCats.roles.length? (

                                                                (selectCats.roles).map((role,index) => {
                                                                    if(index === 0 && !employeInfo){
                                                                        return (
                                                                            <option value=''>Выберите роль</option>
                                                                        )
                                                                    }
                                                                    return (
                                                                        <option
                                                                            // defaultChecked={employeInfo && employeInfo.roles && employeInfo.roles[0].id == role.id? true : false}
                                                                            value={role.id}
                                                                        >{role.name_ru}</option>
                                                                    )
                                                                })
                                                            ): (null)}
                                                        </select>
                                                        {errors.role_id && <p style={{color:'red'}}> {errors.role_id.message}</p> }
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Филиал:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <select name={`branches`}
                                                                className="input_record_patient"
                                                                onChange={event => setEditBranch(event.target.value)}
                                                                value={getEditBranch}
                                                                ref={register({
                                                                    required: "Выберите филиал"
                                                                })} >
                                                            {selectCats && "branches" in selectCats && selectCats.branches.length? (
                                                                (selectCats.branches).map((branche,index) => {

                                                                    if(index === 0 && !employeInfo){
                                                                        return (
                                                                            <option value=''>Выберите филиал</option>
                                                                        )
                                                                    }
                                                                    return (
                                                                        <option value={branche.id}>{branche.title}</option>
                                                                    )
                                                                })
                                                            ): (null)}
                                                        </select>
                                                        {errors.branches && <p style={{color:'red'}}> {errors.branches.message}</p> }
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Пароль для входа:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <input
                                                            name={`password`}
                                                            defaultValue={''}
                                                            type="password"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={''}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12}>
                                                        <div className="input_patient_checkbox">
                                                            <input
                                                                name={`status`}
                                                                defaultChecked={employeInfo?
                                                                    employeInfo.employer_infos && employeInfo.employer_infos.status == '1' ? true:false
                                                                    :true}
                                                                type="checkbox"
                                                                ref={register}
                                                                value="1"/>
                                                            <label>Работает</label>
                                                        </div>
                                                        <input type={"hidden"} ref={register} name={`access`} value={1}/>
                                                        {/*<input type={"hidden"} ref={register} name={`role_id`} value={1}/>*/}
                                                        {/*<div className="input_patient_checkbox">*/}
                                                        {/*    /!*<input*!/*/}
                                                        {/*    /!*    name={`access `}*!/*/}
                                                        {/*    /!*    type="checkbox"*!/*/}
                                                        {/*    /!*    ref={register}*!/*/}
                                                        {/*    /!*    value={1}/>*!/*/}
                                                        {/*    <label>Использует программу</label>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="input_patient_checkbox">*/}
                                                        {/*    <input*/}
                                                        {/*        name={`status`}*/}
                                                        {/*        type="checkbox"*/}
                                                        {/*        ref={register}*/}
                                                        {/*        value="3"/>*/}
                                                        {/*    <label>Может брать деньги из кассы</label>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="input_patient_checkbox">*/}
                                                        {/*    <input*/}
                                                        {/*        name={`status`}*/}
                                                        {/*        type="checkbox"*/}
                                                        {/*        ref={register}*/}
                                                        {/*        value="4"/>*/}
                                                        {/*    <label>Может давать скидку</label>*/}
                                                        {/*</div>*/}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Зароботная плата:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <input
                                                            required
                                                            name={`salary`}
                                                            defaultValue={employeInfo && employeInfo.employer_infos ? employeInfo.employer_infos.salary :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_infos ? employeInfo.employer_infos.salary:''}/>
                                                    </Grid>
                                                </Grid>

                                            </div>
                                        ) : (
                                            <div className={`show-shedule-btn`}>
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
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6}>
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
                                                        <input
                                                            required
                                                            name={`city`}
                                                            defaultValue={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.city :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.city:''}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Улица:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <input
                                                            required
                                                            name={`street`}
                                                            defaultValue={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.street :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.street:''}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={3} className="patient_card_title">
                                                        Дом:
                                                        <input
                                                            required
                                                            name={`house`}
                                                            defaultValue={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.house :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.house:''}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={3} className="patient_card_title">
                                                        Корпус:
                                                        <input
                                                            name={`corpus`}
                                                            defaultValue={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.corpus :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.corpus:''}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Квартира:
                                                        <input
                                                            required
                                                            name={`flat`}
                                                            defaultValue={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.flat :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_card ? employeInfo.employer_card.flat:''}/>
                                                    </Grid>
                                                </Grid>

                                            </div>
                                        ) : (
                                            <div className={`show-shedule-btn`}>
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
                                                        <input
                                                            name={`inn`}
                                                            defaultValue={employeInfo && employeInfo.employer_documents ? employeInfo.employer_documents.inn :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_documents ? employeInfo.employer_documents.inn:''}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <div className="form_radio">
                                                            <input id="radio-3" name={`type`}
                                                                   defaultChecked={employeInfo?
                                                                       employeInfo.employer_documents && employeInfo.employer_documents.type == 'Паспорт РФ' ? true:false
                                                                       :true}
                                                                   type="radio"
                                                                   ref={register}
                                                                   value="Паспорт РФ"/>
                                                            <label htmlFor="radio-3">Паспорт РФ</label>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={8}>
                                                        <div className="form_radio">
                                                            <input id="radio-4" name={`type`}
                                                                   defaultChecked={employeInfo && employeInfo.employer_documents && employeInfo.employer_documents.type == 'Другой' ? true:false}
                                                                   type="radio"
                                                                   ref={register}
                                                                   value="Другой"/>
                                                            <label htmlFor="radio-4">Другой</label>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Серия и номер:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <input
                                                            name={`series_and_number`}
                                                            defaultValue={employeInfo && employeInfo.employer_documents ? employeInfo.employer_documents.series_and_number :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_documents ? employeInfo.employer_documents.series_and_number:''}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Выдан:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <input
                                                            name={`issued`}
                                                            defaultValue={employeInfo && employeInfo.employer_documents ? employeInfo.employer_documents.issued :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_documents ? employeInfo.employer_documents.issued:''}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Дата выдачи:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <InputMask
                                                            className="input_record_patient"
                                                            inputRef={register}
                                                            name={`date_issue`}
                                                            defaultValue={employeInfo && employeInfo.employer_documents ? employeInfo.employer_documents.date_issue :''}
                                                            mask="99.99.9999"
                                                            className="add-new-record-input"
                                                            type="text"
                                                            placeholder={employeInfo && employeInfo.employer_documents ? employeInfo.employer_documents.date_issue:''}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Место рождения:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <input
                                                            name={`born_place`}
                                                            defaultValue={employeInfo && employeInfo.employer_documents ? employeInfo.employer_documents.born_place :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_documents ? employeInfo.employer_documents.born_place:''}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} className="patient_card_title">
                                                        Место регистрации:
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <input
                                                            name={`registration_adress`}
                                                            defaultValue={employeInfo && employeInfo.employer_documents ? employeInfo.employer_documents.registration_adress :''}
                                                            type="text"
                                                            className="input_record_patient"
                                                            ref={register}
                                                            placeholder={employeInfo && employeInfo.employer_documents ? employeInfo.employer_documents.registration_adress:''}/>
                                                    </Grid>
                                                </Grid>

                                            </div>
                                        ) : (
                                            <div className={`show-shedule-btn`}>
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
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={3} lg={3} xl={2}>
                            <Grid item xs={12}>
                                <div>
                                    {employeInfo?
                                        <button onClick={() => paramSetExpanded(false)} className={`canclel`}>Отмена</button>
                                        :
                                        <button onClick={() => history.push("/personnel")} className={`canclel`}>Отмена</button>}

                                </div>
                                <div>
                                    <button type={"submit"} className={`save`}>Сохранить</button>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    )
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

const mapStateToProps = (state) => ({
    selectCats: state.employers.selects,
    success:state.employers.success,
    error: state.error,
});

export default connect(mapStateToProps, { editEmployers,addEmployers, getSelect })(CreatePersonnelCard);
