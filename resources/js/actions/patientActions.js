import axios from 'axios';
import {GET_PATIENTS, DELETE_PATIENT, ADD_PATIENT, PATIENTS_LOADING, GET_HISTORY, GET_ORDER, GET_ALL_IMAGES,IMAGES_UPLOAD} from "./types";

export const getPatients = () => dispatch => {
    dispatch(setPatientsLoading());
    axios
        .get(`/api/patients/get`)
        .then(response =>
            dispatch({
                type: GET_PATIENTS,
                payload: response.data
            })
        )
}

//Не используется, на будущее
export const deletePatient = id => dispatch => {
    axios
        .delete(`/api/patients/${id}`)
        .then(response =>
            dispatch({
                type: DELETE_PATIENT,
                payload: id
            })
        )
}

//Не используется, на будущее
export const addPatient = patient => {
    axios
        .post(`/api/patients/add`, patient)
        .then(response =>
            dispatch({
                type: ADD_PATIENT,
                payload: response.data
            })
        )
}

export const getHistory = (patientId) => dispatch => {
    axios
        .get(`/api/history/get/user/${patientId}`)
        .then(response =>
            dispatch({
                type: GET_HISTORY,
                payload: response.data
            })
        )
}
export const getOrder = (patientId) => dispatch => {
    axios
        .get(`/api/orders/review/get/${patientId}`)
        .then(response =>
            dispatch({
                type: GET_ORDER,
                payload: response.data
            })
        )
}

export const getAllImages = (values) => dispatch => {
    axios
        .post(`/api/patients/images/get`, values)
        .then(response =>
            dispatch({
                type: GET_ALL_IMAGES,
                payload: response.data
            })
        )
}

export const imagesUpload= (values) => dispatch => {
    axios
        .post(`/api/patients/images/upload`, values)
        .then(response =>
            dispatch({
                type: IMAGES_UPLOAD,
                payload: response.data
            })
        )
}


export const setPatientsLoading = () => {
    return {
        type: PATIENTS_LOADING
    }
}
