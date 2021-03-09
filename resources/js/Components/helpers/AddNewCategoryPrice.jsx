import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputMask from "react-input-mask";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {useForm} from "react-hook-form";
import {CircularProgress} from "@material-ui/core";
import axios from "axios";
import { connect } from 'react-redux';
import {addCategory} from "../../actions/pricesActions";
import store from "../../store";

function AddNewPatient({getVisible, visible,idCategory,idPriceList, updatedCategory}) {
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
        store.dispatch(addCategory(values));
        updatedCategory(true);
        visible(false);
        // setLoaded(true);
        // let request = await axios.post(
        //     "/api/prices/category/add",{'code': values.code,'name':values.name,'parent_id':idCategory,'price_list_id':idPriceList}
        // ).then((response) => {
        //     let requestResponse = response.data;
        //     if (requestResponse.success !== 'Category successfully created' ){
        //         setError(true);
        //     } else {
        //         setSave(true);
        //         updated(true);
        //         visible(false);
        //     }
        //     setLoaded(false);
        // });
    };

    return(
        (getVisible?
            <div className={`add-new-record ${classes.root} ${(loaded)?classes.alignCenter:''}`}>
                {!error?
                    !loaded?
                        <form name={'categoryCreate'} onSubmit={handleSubmit(onSubmit)}>
                                            <input type={"hidden"} ref={register} name={"parent_id"} value={idCategory}/>
                                            <input type={"hidden"} ref={register} name={"price_list_id"} value={idPriceList}/>
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


                                    <div className="title_modal">Добавить категорию</div>
                                    <div className="add_path">
                                        <span className="path_span">Путь:</span>
                                        <span>Основной</span><span>•</span><span>Терапия</span>
                                    </div>

                                            <div className="row">
                                                <div className="col-lg-3 input-name">Код</div>
                                                <div className="col-lg-9">
                                                    <input
                                                        ref={register}
                                                        name="code"
                                                        className="add-new-record-input mb-lg-2"
                                                        type="text"
                                                        placeholder=""
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 input-name">Наименование</div>
                                                <div className="col-lg-9">
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

export default connect(mapStateToProps, { addCategory })(AddNewPatient);

const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        top: '35%',
        left: 0,
        right: 0,
        bottom: 0,
        width: '450px',
        height:'400px',
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
