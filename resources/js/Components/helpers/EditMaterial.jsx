import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputMask from "react-input-mask";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {useForm} from "react-hook-form";
import {CircularProgress} from "@material-ui/core";
import axios from "axios";
import {connect} from "react-redux";
import {editMaterial} from "../../actions/materialsActions";
import store from "../../store";

function EditMaterialForm({visible, updateMaterial, data,units}) {
    const classes = useStyles();
    const { handleSubmit, register } = useForm();
    const [loaded, setLoaded] = useState(false);
    const [save, setSave] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
    }, []);

    const handleClose = () => {
        document.forms.materialEdit.reset();
        visible(false);
    }
    const onSubmit = async (values) => {
        store.dispatch(editMaterial(values));
        updateMaterial(true);
        visible(false);
    };

    return(
        <div className={`add-new-record myModal ${classes.root} ${(loaded)?classes.alignCenter:''}`}>
            {!error?
                !loaded?
                    <form name={'materialEdit'} onSubmit={handleSubmit(onSubmit)}>
                        <input type={"hidden"} ref={register} name={"id"} value={data.material.id}/>
                        <input type={"hidden"} ref={register} name={"material_category_id"} value={data.material.material_category_id}/>
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

                        <div className="title_modal">Редактирование материала</div>

                        <div className="row">
                            <div className="col-lg-4 input-name">Код</div>
                            <div className="col-lg-8">
                                <input
                                    defaultValue={data.material.code ? data.material.code :''}
                                    ref={register}
                                    name="code"
                                    className="add-new-record-input mb-lg-2"
                                    type="text"
                                    placeholder={data.material.code ? data.material.code :''}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 input-name">Наименование</div>
                            <div className="col-lg-8">
                                <input
                                    defaultValue={data.material.name ? data.material.name :''}
                                    ref={register}
                                    name="name"
                                    className="add-new-record-input mb-lg-2"
                                    type="text"
                                    placeholder={data.material.name ? data.material.name :''}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 input-name">Ед. измерения</div>
                            <div className="col-lg-8">
                                <select required name={`unit`}
                                        ref={register({
                                            required: "Ед.измерения"
                                        })}
                                        className="add-new-record-input mb-lg-2"
                                >
                                    <option value="">Ед.измерения</option>
                                    {units && units.length  ?
                                        (units).map((unit,) => {
                                            return (
                                                <option  value={unit.id}>{unit.name}</option>
                                            )
                                        })
                                        :null}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 input-name">Дорогостоящий</div>
                            <div className="col-lg-8">
                                <div className="input_patient_checkbox expensive_checkbox">
                                    <input
                                        name={`expensive`}
                                        type="checkbox"
                                        ref={register}
                                        value="1"/>
                                </div>
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
    )
}
const mapStateToProps = (state) => ({
    prices: state.prices.items
});

export default connect(mapStateToProps, { editMaterial })(EditMaterialForm);

const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        top: '35%',
        left: 0,
        right: 0,
        bottom: 0,
        width: '450px',
        height:'480px',
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
    }
}))
