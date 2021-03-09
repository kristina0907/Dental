import axios from 'axios';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from "./types";

import { returnErrors } from "./errorActions";

// Проверяем token && так же пользователя
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get(`/api/auth/user`, tokenConfig(getState))
        .then(response =>
            dispatch({
                type: USER_LOADED,
                payload: response.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR,

            })
        })
}

//Логин
export const login = ({ email, password }) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // Request body
    const body = JSON.stringify({ email, password });
    axios
        .post('/api/auth/login', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

//Выход
export const logout = () => (dispatch) => {
    dispatch({
       type: LOGOUT_SUCCESS
    });
}

export const tokenConfig = getState => {
    // Получаем токен из стоража
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //Если токен есть, добавляем к запросу
    if (token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}
