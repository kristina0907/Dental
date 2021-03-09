import axios from 'axios';
import {
    DOCTORS_SCHEDULE_FILTER,
    DOCTORS_SCHEDULE_FILTER_LOADING,
    DOCTORS_SCHEDULE_GET,
    DOCTORS_SCHEDULE_LOADING
} from "./types";

export const getDoctorsScheduleFilter = (data) => dispatch => {
    dispatch(setDoctorsScheduleFilterLoading());
    axios
        .get('/api/doctorshedules/get/doctors/shedule/from/filters', {params: data})
        .then(response => {
            dispatch({
                type: DOCTORS_SCHEDULE_FILTER,
                payload: response.data
            });
        }).catch(error => {
           console.log('Error: getDoctorsScheduleFilter', error);
        });
}

export const getDoctorsSchedule = (data) => dispatch => {
    dispatch(setDoctorsScheduleLoading());
    axios.get("/api/doctorshedules/get/doctors/shedule/from/filters", {
        params: {
            "current_date": data.current_date,
            "branch_id": data.branch_id,
            "profession_id": data.profession_id,
            "doctor_id": data.doctor_id
        }
    }).then(response => {
        dispatch({
            type: DOCTORS_SCHEDULE_GET,
            payload: response.data
        });
    }).catch(err => {
        console.log("Catched error: " + e.message);
    });
}

export const setDoctorsScheduleFilterLoading = () => {
    return {
        type: DOCTORS_SCHEDULE_FILTER_LOADING
    }
}

export const setDoctorsScheduleLoading = () => {
    return {
        type: DOCTORS_SCHEDULE_LOADING
    }
}
