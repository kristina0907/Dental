import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputMask from "react-input-mask";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {useForm} from "react-hook-form";
import {CircularProgress} from "@material-ui/core";
import axios from "axios";
import { connect } from 'react-redux';
import {addTask} from "../../actions/crmAction";
import store from "../../store";
import TextField from '@material-ui/core/TextField';

function CRMAddTask({getVisible, visible,users,branches, responsible}) {
    const classes = useStyles();
    const { handleSubmit, register } = useForm();
    const [loaded, setLoaded] = useState(false);
    const [save, setSave] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {

    }, []);

    const handleClose = () => {
        document.forms.categoryCreate.reset();
        visible(false);
    }
    const onSubmit = async (values) => {
        values["users_id"]=users;
        store.dispatch(addTask(values));
        visible(false);
    };

    return(
        (getVisible?
            <div className={`add-new-record ${classes.root} ${(loaded)?classes.alignCenter:''}`}>
                {!error?
                    !loaded?
                        <form name={'categoryCreate'} onSubmit={handleSubmit(onSubmit)}>
                            {/*<input type={"hidden"} ref={register} name={"users_id"} value={users}/>*/}
                            <div className="closeModal">
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


                            <div className="title_modal">Новая задача</div>
                            <div className="row">
                                <div className="col-lg-4 input-name">Филиал</div>
                                <div className="col-lg-8">
                                    <select required name={`branch_id`}
                                            ref={register({
                                                required: "Не выбрано"
                                            })}
                                            className="add-new-record-input mb-lg-2"
                                    >
                                        <option value="">Не выбрано</option>
                                        {branches && branches.length  ?
                                            (branches).map((branche) => {
                                                return (
                                                    <option  value={branche.id}>{branche.title}</option>
                                                )
                                            })
                                            :null}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 input-name">Ответственный</div>
                                <div className="col-lg-8">
                                    <select required name={`administrator_id`}
                                            ref={register({
                                                required: "Не выбрано"
                                            })}
                                            className="add-new-record-input mb-lg-2"
                                    >
                                        <option value="">Не выбрано</option>
                                        {responsible && responsible.length  ?
                                            (responsible).map((item) => {
                                                return (
                                                    <option  value={item.id}>{item.name}</option>
                                                )
                                            })
                                            :null}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 input-name">Крайний срок</div>
                                <div className="col-lg-8">
                                    <TextField
                                        inputRef={register}
                                        name={`date`}
                                        id="datetime-local"
                                        type="datetime-local"
                                        defaultValue=""
                                        className={[classes.textField,"select_dateTime"]}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
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
    prices: state.prices.items
});

export default connect(mapStateToProps, { addTask })(CRMAddTask);

const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        top: '25%',
        left: 0,
        right: 0,
        bottom: 0,
        width: '400px',
        height:'420px',
        display: 'flex',
        margin: '0 auto',
        zIndex: 999999,
        textAlign:'left',
        padding:'52px',
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
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        fontSize:"12px",
        background: "#ffffff",
        border: "1px solid #dfe6ee",
        borderRadius: "4px",
        padding: "12px",
        width: "100%",
        color: "#B0BAC5"
    },
}))
