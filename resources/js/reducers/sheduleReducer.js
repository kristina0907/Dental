import {
    SHEDULE_GET,
    SHEDULE_LOADING,
    CALENDAR_GET,
    CALENDAR_LOADING,
    BRANCHES_GET,
    BRANCHES_LOADING,
    FILTER_LOADING,
    FILTER_GET,
    DOCTORS_SCHEDULE_GET,
    DOCTORS_SCHEDULE_LOADING
} from "../actions/types";

const initialState = {
    shedule: {},
    calendar: [],
    branches: [],
    filter: [],
    filterLoading: false,
    loading: false,
    doctors: [],
    doctorsSchedule: {},
    doctorsScheduleLoading: false,
    professions: []
}

export default function (state = initialState, action){
    switch (action.type) {
        case SHEDULE_GET:
            return {
                ...state,
                shedule: action.payload.smena,
                loading: false
            }
        // case DOCTORS_SCHEDULE_GET:
        //     return {
        //         ...state,
        //         doctors: action.payload.doctors,
        //         professions: action.payload.professions,
        //         doctorsSchedule: action.payload.shedules,
        //         doctorsScheduleLoading: false
        //     }
        case DOCTORS_SCHEDULE_LOADING:
            return {
                ...state,
                doctorsScheduleLoading: true
            }
        case CALENDAR_GET:
            return {
                ...state,
                calendar: action.payload,
                loading: false
            }
        case BRANCHES_GET:
            return {
                ...state,
                branches: action.payload.branches,
                loading: false
            }
        case BRANCHES_LOADING:
            return {
                ...state,
                loading: true
            }
        case SHEDULE_LOADING:
            return {
                ...state,
                loading: true
            }
        case CALENDAR_LOADING:
            return {
                ...state,
                loading: true
            }
        case FILTER_LOADING:
            return {
                ...state,
                filterLoading: true
            }
        case FILTER_GET:
            return {
                ...state,
                filter: action.payload,
                filterLoading: false
            }
        default:
            return state;
    }
}
