import axios from 'axios';
import { GET_EMPLOYERS, GET_ONE_EMPLOYEE, ADD_EMPLOYERS, EDIT_EMPLOYERS, EMPLOYERS_LOADING, GET_SELECT,ERROR_ADD } from "./types";
import { returnErrors } from "./errorActions";

export const getEmployers = () => dispatch => {
    dispatch(setEmployersLoading());
    axios
        .get(`/api/employee/get/all`)
        .then(response =>
            dispatch({
                type: GET_EMPLOYERS,
                payload: response.data
            })
        )
}

export const getOneEmployee = (employeeId) => dispatch => {
    axios
        .get(`/api/employee/get/user/${employeeId}`)
        .then(response =>
            dispatch({
                type: GET_ONE_EMPLOYEE,
                payload: response.data
            })
        )
}

export const getSelect = () => dispatch => {
    axios
        .get(`/api/employee/get/cats/`)
        .then(response =>
            dispatch({
                type: GET_SELECT,
                payload: response.data
            })
        )
}


export const addEmployers = (employe) =>dispatch => {
    axios
        .post(`/api/employee/create`, employe, {
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(response =>
            dispatch({
                type: ADD_EMPLOYERS,
                payload: response.data,
                success:true
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ERROR_ADD'));
            dispatch({
                type: ERROR_ADD,
                success:false
            });
        })
}

export const editEmployers = (employe) =>dispatch => {
    axios
        .post(`/api/employee/update`, employe, {
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(response =>
            dispatch({
                type: EDIT_EMPLOYERS,
                payload: response.data,
                success:true
            })
        )
        .catch(err => {
            dispatch({
                type: EDIT_EMPLOYERS,
                success:false
            })
        })
}

export const setEmployersLoading = () => {
    return {
        type: EMPLOYERS_LOADING
    }
}
