import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import InputMask from "react-input-mask";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {useForm} from "react-hook-form";
import {CircularProgress} from "@material-ui/core";
import axios from "axios";
import { connect } from 'react-redux';
import {addCategory} from "../../actions/pricesActions";
import store from "../../store";
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

function CRMAddTask({getVisible, visible}) {
    const classes = useStyles();
    const { handleSubmit, register } = useForm();
    const [loaded, setLoaded] = useState(false);
    const [save, setSave] = useState(false);
    const [error, setError] = useState(false);
    const [state, setState] = React.useState({
        checkedC: true,
    });

    useEffect(() => {

    }, []);

    const handleClose = () => {
        document.forms.categoryCreate.reset();
        visible(false);
    }
    const onSubmit = async (values) => {
        // store.dispatch(addCategory(values));
        // updatedCategory(true);
        // visible(false);
    };
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return(
        (getVisible?
            <div className={`add-new-record ${classes.root} ${(loaded)?classes.alignCenter:''}`}>
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
                                    className={classes.close}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </div>


                            <div className="title_modal_cash">Внести денежные средства</div>
                            <div className="form_style_modal">
                                <select name="" id="">
                                    <option value="">Погасить задолженность/Внести аванс</option>
                                </select>
                                <input
                                    ref={register}
                                    name="code"
                                    type="text"
                                    placeholder="Пациент"
                                    required
                                />
                                <select name="" id="">
                                    <option value="">Касса</option>
                                </select>
                                <input
                                    ref={register}
                                    name="code"
                                    type="text"
                                    placeholder="Сумма"
                                    required
                                />
                                <Typography component="div">
                                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                                </Typography>
                            </div>
                            <div className="btnModal_cash">
                                <button
                                    className="save-button_modal"
                                    type="submit"
                                >
                                    Внести
                                </button>
                                <button
                                    className="cancel-button_modal"
                                >
                                    Отменить
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

export default connect(mapStateToProps, { addCategory })(CRMAddTask);

const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        top: '25%',
        left: 0,
        right: 0,
        bottom: 0,
        width: '370px',
        height:'508px',
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
