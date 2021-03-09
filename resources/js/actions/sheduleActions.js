import axios from 'axios';
import {SHEDULE_GET, SHEDULE_LOADING, SHEDULE_LIVE_GET, CALENDAR_GET, CALENDAR_LOADING, BRANCHES_LOADING, BRANCHES_GET, FILTER_GET, FILTER_LOADING, DOCTORS_SCHEDULE_GET, DOCTORS_SCHEDULE_LOADING} from "./types";
import moment from "moment";

export const getShedule = (data) => dispatch => {
    dispatch(setSheduleLoading());
    axios
        .get(`/api/shedule/get/records`,{params: data})
        .then(response => {
            dispatch({
                type: SHEDULE_GET,
                payload: response.data
            });
        });
}

export const getCalendar = (data) => dispatch => {
    dispatch(setCalendarLoading());
    axios
        .get(`/api/shedule/get/directions`, {params: data})
        .then(response => {
            dispatch({
                type: CALENDAR_GET,
                payload: response.data
            })
        })
}

export const getLiveShedule = (data) => dispatch => {
    dispatch(setSheduleLoading());
    dispatch({
        type: SHEDULE_GET,
        payload: data
    });
}

export const getBranches = () => dispatch => {
    dispatch(setBranchesLoading());
    axios
        .get(`/api/doctorshedules/get/branches`)
        .then(response => {
            dispatch({
                type: BRANCHES_GET,
                payload: response.data
            });
        });
}

export const setSheduleLoading = () => {
    return {
        type: SHEDULE_LOADING
    }
}

export const setCalendarLoading = () => {
    return{
        type: CALENDAR_LOADING
    }
}

export const setBranchesLoading = () => {
    return {
        type: BRANCHES_LOADING
    }
}

export const getScheduleFilter = (data) => dispatch => {
    dispatch(setScheduleFilterLoading());
    axios
        .get('/api/shedule/get/filters', {params: data})
        .then(response => {
           dispatch({
               type: FILTER_GET,
               payload: response.data[0]
           });
        });
}

export const setScheduleFilterLoading = () => {
    return {
        type: FILTER_LOADING
    }
}
