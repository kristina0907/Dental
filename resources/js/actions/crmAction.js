import axios from 'axios';
import {GET_RECORDS_CRM, CRM_LOADING, GET_TASKS_CALLING, ADD_TASK,GET_ALL_TASKS,GET_SELECT_FILTER,GET_FILTER_TASKS,GET_PAGE_TASKS,GET_WAITING_LISTS,ADD_WAITING_LIST,GET_WAITING_CATS} from "./types";
import { returnErrors } from "./errorActions";

export const getRecordsCrm = () => dispatch => {
    dispatch(setCRMLoading());
    axios
        .get(`/api/crm/get/records`)
        .then(response =>
            dispatch({
                type: GET_RECORDS_CRM,
                payload: response.data
            })
        )
}

export const getTasksCalling = () => dispatch => {
    axios
        .get(`/api/tasksforcalling/get/patients`)
        .then(response =>
            dispatch({
                type: GET_TASKS_CALLING,
                payload: response.data
            })
        )
}
export const getpageTasks = (page) => dispatch => {
    axios
        .get(`/api/tasksforcalling/get/all?page=${page}`)
        .then(response =>
            dispatch({
                type: GET_PAGE_TASKS,
                payload: response.data
            })
        )
}

export const getAllTasks = () => dispatch => {
    axios
        .get(`/api/tasksforcalling/get/all`)
        .then(response =>
            dispatch({
                type: GET_ALL_TASKS,
                payload: response.data
            })
        )
}

export const addTask = (values) =>dispatch => {
    axios
        .post(`/api/tasksforcalling/create`, values)
        .then(response =>
            dispatch({
                type: ADD_TASK,
                payload: response.data,
            })
        )
}

export const getSelectFilter = () => dispatch => {
    axios
        .get(`/api/crm/get/data/to/filters`)
        .then(response =>
            dispatch({
                type: GET_SELECT_FILTER,
                payload: response.data
            })
        )
}

export const getFilterTasks = (values) =>dispatch => {
    axios
        .post(`/api/crm/get/data/from/filters`, values)
        .then(response =>
            dispatch({
                type: GET_FILTER_TASKS,
                payload: response.data,
            })
        )
}

export const getWaitinglists = (page) => dispatch => {
    axios
        .get(`/api/waitinglists/get/all?page=${page}`)
        .then(response =>
            dispatch({
                type: GET_WAITING_LISTS,
                payload: response.data
            })
        )
}
export const addWaitinglists = (values) =>dispatch => {
    axios
        .post(`/api/waitinglists/create`, values)
        .then(response =>
            dispatch({
                type: ADD_WAITING_LIST,
                payload: response.data,
            })
        )
}
export const getWaitinglistsCats = () => dispatch => {
    axios
        .get(`/api/waitinglists/get/cats`)
        .then(response =>
            dispatch({
                type: GET_WAITING_CATS,
                payload: response.data
            })
        )
}
export const setCRMLoading = () => {
    return {
        type: CRM_LOADING
    }
}
