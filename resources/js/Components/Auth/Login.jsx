import React, { useState, useEffect, useCallback } from 'react';
import Grid from "@material-ui/core/Grid";
import rolesIcon from "../media/json/rolesIcon.json";
import {SvgIcon} from "@material-ui/core";

import { connect } from 'react-redux';
import {loadUser, login} from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import store from "../../store";
import {getAccounts} from "../../actions/accountActions";
import {makeStyles} from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

const Login = ({ isAuthenticated, error, login, clearErrors, accounts }) => {
    const classes = useMainStyles();
    const [msg, setMsg] = useState(null);
    const handleToggle = useCallback(() => {
        // Clear errors
        clearErrors();
    }, [clearErrors]);

    useEffect(() => {
        // Check for login error
        (error.id === 'LOGIN_FAIL') ? setMsg(error.msg.message) : setMsg(null);
        // If authenticated
        (isAuthenticated) ? handleToggle() : null;
    }, [error, handleToggle, isAuthenticated]);

    useEffect(() => {
        store.dispatch(getAccounts());
    },[])

    const handleOnSubmit = (values) => {
        login(values);
    };

    const { handleSubmit, register } = useForm();
    const [getActiveRole, setActiveRole] = useState('doctor');
    const handleOnRole = (id) => {
        setActiveRole(id)
    }

    return (
        <div className="body_login">
            <div className="content_login">
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <div className="logo_authorization">
                            <img src="/media/biglogo.png" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="container_login">
                            <div className="title_login">Авторизация в системе</div>
                            <div className="select_post">
                                <div className="title_select_post">Выберите учетную запись</div>
                                <div className="container_item_post">
                                    <div className={classes.roles_group}>
                                        {
                                            Object.keys(accounts).map((id) => {
                                                let role = accounts[id];
                                                let icon_data = rolesIcon[id];

                                                return(
                                                    role.name !== 'Пациент' && icon_data && icon_data.viewBox ?
                                                        <div className={classes.role} key={role.name} onClick={() => handleOnRole(id)}>
                                                            <div className={classes.image}>
                                                                <SvgIcon className={`${classes.image_svg} ${(id === getActiveRole)?classes.image_svg_active:null}`} viewBox={icon_data.viewBox}>
                                                                    {
                                                                        Object.keys(icon_data.icon).map((path) => {
                                                                            let vector_data = icon_data.icon[path];
                                                                            return(
                                                                               <path key={path} d={vector_data.d} fill={vector_data.fill}/>
                                                                            )
                                                                        })
                                                                    }
                                                                </SvgIcon>
                                                            </div>
                                                            <div className={`${classes.title} ${(id === getActiveRole)?classes.title_active:null}`}>{role.name}</div>
                                                        </div>:null
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(handleOnSubmit)} className="form_login">
                                <Grid container>
                                    <Grid item xs={12} sm={6}>
                                        <div>Выберите пользователя</div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <div>
                                            <select ref={register} name="email">
                                                {accounts[getActiveRole] && 'users' in accounts[getActiveRole] && accounts[getActiveRole].users.length ?
                                                    Object.keys(accounts[getActiveRole].users).map((id) => {
                                                        let user = accounts[getActiveRole].users[id];
                                                        return(
                                                            <option key={user.id} value={user.email}>{user.name}</option>
                                                        )
                                                    }):<option disabled selected>Не заполнено</option>}
                                            </select>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <div><input  ref={register} defaultValue={'qwerty'} name={"password"} type="text" placeholder={"Введите пароль"}/></div>
                                    </Grid>
                                </Grid>
                                <div className="btn_login">
                                    <button type={'submit'}>Войти</button>
                                </div>
                                <div>{msg}</div>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

const useMainStyles = makeStyles(() => ({
    roles_group: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    role: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        cursor: 'pointer'
    },
    image: {

    },
    image_svg: {
      width: 'auto',
      height: '32px'
    },
    title: {
        marginTop: '5px',
        fontSize: '12px',
        color: '#868789'
    },
    title_active: {
        fontSize: '14px',
        color: '#3B80D6'
    },
    image_svg_active: {
        height: '40px',
        '& path':{
            fill: '#3B80D6'
        }
    }
}));

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    accounts: state.accounts.roles
});
export default connect(mapStateToProps, { login, clearErrors, getAccounts })(Login);

