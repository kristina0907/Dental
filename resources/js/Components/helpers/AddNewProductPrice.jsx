import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputMask from "react-input-mask";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {useForm} from "react-hook-form";
import {CircularProgress} from "@material-ui/core";
import axios from "axios";
import {connect} from "react-redux";
import {addProduct} from "../../actions/pricesActions";
import store from "../../store";

function AddNewProduct({getVisible, visible,category,updatedProduct,idPriceList}) {
    const classes = useStyles();
    const { handleSubmit, register } = useForm();
    const [loaded, setLoaded] = useState(false);
    const [save, setSave] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {

    }, []);

    const handleClose = () => {
        document.forms.productCreate.reset();
        visible(false);
    }

    const onSubmit = async (values) => {
        store.dispatch(addProduct(values));
        updatedProduct(true);
        visible(false);
        // setLoaded(true);
        // let request = await axios.post(
        //     "/api/prices/product/create",{
        //         'code': values.code,
        //         'name':values.name,
        //         'base_price':values.base_price,
        //         'price_category_id':category.id,
        //         'units_category_id':2,
        //         'price_list_id':idPriceList
        //     }
        // ).then((response) => {
        //
        //     let requestResponse = response.data;
        //     if (requestResponse.success !== 'Product successfully created' ){
        //         setError(true);
        //     } else {
        //         setSave(true);
        //         visible(false);
        //         updated(true);
        //     }
        //     setLoaded(false);
        // });
    };

    return(
        (getVisible?
            <div className={`add-new-record ${classes.root} ${(loaded)?classes.alignCenter:''}`}>
                {!error?
                    !loaded?
                        <form name={'productCreate'} onSubmit={handleSubmit(onSubmit)}>
                                    <input type={"hidden"} ref={register} name={"price_category_id"} value={category.id}/>
                                    <input type={"hidden"} ref={register} name={"price_list_id"} value={idPriceList}/>
                                    <input type={"hidden"} ref={register} name={"units_category_id"} value={2}/>
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

                            <div className="title_modal">Добавить услугу</div>
                            <div className="add_path">
                                <span className="path_span">Путь:</span>
                                <span>Основной</span><span>•</span><span>{category.name}</span>
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
                                    <div className="row">
                                        <div className="col-lg-3 input-name">Цена</div>
                                        <div className="col-lg-9">
                                            <input
                                                ref={register}
                                                name="base_price"
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

export default connect(mapStateToProps, { addProduct })(AddNewProduct);

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
