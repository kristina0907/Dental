import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputMask from "react-input-mask";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {useForm} from "react-hook-form";
import {CircularProgress} from "@material-ui/core";
import axios from "axios";
import {connect} from "react-redux";
import {editCategory} from "../../actions/materialsActions";
import store from "../../store";

function EditCategoryMaterial({getVisible, visible,category,updatedCategory}) {
    const classes = useStyles();
    const { handleSubmit, register } = useForm();
    const [loaded, setLoaded] = useState(false);
    const [save, setSave] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {

    }, []);

    const handleClose = () => {
        document.forms.categoryEdit.reset();
        visible(false);
    }
    const onSubmit = async (values) => {
        store.dispatch(editCategory(values));
        updatedCategory(true);
        visible(false);
    };

    return(
        (getVisible?
            <div className={`add-new-record myModal ${classes.root} ${(loaded)?classes.alignCenter:''}`}>
                {!error?
                    !loaded?
                        <form name={'categoryEdit'} onSubmit={handleSubmit(onSubmit)}>
                            <input type={"hidden"} ref={register} name={"id"} value={category.id}/>
                            <input type={"hidden"} ref={register} name={"parent_id"} value={0}/>
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

                            <div className="title_modal">Редактирование категории</div>

                            <div className="row">
                                <div className="col-lg-4 input-name">Код</div>
                                <div className="col-lg-8">
                                    <input
                                        defaultValue={category.code ? category.code :''}
                                        ref={register}
                                        name="code"
                                        className="add-new-record-input mb-lg-2"
                                        type="text"
                                        placeholder={category.code ? category.code :''}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 input-name">Наименование</div>
                                <div className="col-lg-8">
                                    <input
                                        defaultValue={category.name ? category.name :''}
                                        ref={register}
                                        name="name"
                                        className="add-new-record-input mb-lg-2"
                                        type="text"
                                        placeholder={category.name ? category.name :''}
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

export default connect(mapStateToProps, { editCategory })(EditCategoryMaterial);

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
        zIndex: 99999,
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
