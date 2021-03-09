import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputMask from "react-input-mask";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {useForm} from "react-hook-form";
import {CircularProgress} from "@material-ui/core";
import AddNewPatientSaved from "./AddNewPatientSaved";

export default function AddNewPatient({getVisible, visible}) {
    const classes = useStyles();
    const { handleSubmit, register } = useForm();
    const [loaded, setLoaded] = useState(false);
    const [save, setSave] = useState(false);
    const [error, setError] = useState(false);
    const [getPatient, setPatient] = useState(false);


    const handleClose = () => {
        setSave(false);
        setError(false);
        setPatient(false);
        visible(false);
    }

    const onSubmit = async (values) => {
        setLoaded(true);
        let request = await axios.post(
            '/api/shedule/addrecord',
            values
        ).then((response) => {
            let requestResponse = response.data;
            if (requestResponse.type !== 'ok' ){
                setError(true);
            } else {
                setPatient(requestResponse.patient);
                setSave(true);
            }
            setLoaded(false);
        });
    };

    return(
        (getVisible?
            <div className={`${(!save) ? 'add-new-record':''} ${classes.root} ${(loaded || error || save)?classes.alignCenter:''}`}>
                {!error?
                    !loaded?
                        !save ?
                            <form name={'patientCreate'} onSubmit={handleSubmit(onSubmit)}>
                                <div className="col-lg-12">
                                    <div className="container">
                                        <div className="col-lg-12">
                                            <div className="row">
                                                <div className="col-lg-1 offset-lg-11">
                                                    <IconButton
                                                        disableFocusRipple={true}
                                                        disableRipple={true}
                                                        onClick={handleClose}
                                                        aria-haspopup="false"
                                                        edge="end"
                                                        size={'small'}
                                                        className={classes.close}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`row mt-lg-3 mb-lg-3 ${classes.headers}`}/>
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
                                                            placeholder=""
                                                            required
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
                                                            placeholder=""
                                                            required
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
                                                            placeholder=""
                                                            required
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
                                                            placeholder=""
                                                            required
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
                                                            placeholder=""
                                                            required
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
                                                                    placeholder=""
                                                                    required
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
                                                                    placeholder=""
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
                                                            placeholder=""
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
                                                            placeholder=""
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
                                                                placeholder=""
                                                                required
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
                                                            placeholder=""
                                                            required
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
                                                            placeholder=""
                                                            required
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
                                                            placeholder=""
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
                                                            placeholder=""
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
                                                            placeholder=""
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
                                                            placeholder=""
                                                            required
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
                                                            placeholder=""
                                                            required
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
                                                            placeholder=""
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
                            :<AddNewPatientSaved close={handleClose} visible={visible} patient={getPatient}/>
                    :<CircularProgress color="primary" />
                :<CircularProgress color="secondary" />}
            </div>
        :null)
    )
}
const useStyles = makeStyles(() => ({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '800px',
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        zIndex: 999999,
    },
    close: {
        marginTop: '25px',
    },
    headers: {
        marginTop: 0,
        marginBottom: '25px',
    },
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}))
