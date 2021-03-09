import {DOCTORS_SCHEDULE_FILTER, DOCTORS_SCHEDULE_FILTER_LOADING, DOCTORS_SCHEDULE_GET, DOCTORS_SCHEDULE_LOADING} from "../actions/types";

const initialState = {
    filter: {
        "loading": false,
        "data": {
            "branches": [],
            "doctors": [],
            "cabinets": [],
            "professions": []
        }
    },
    result: {
        "loading": false,
        "data": {
            "branches": [],
            "doctors": [],
            "cabinets": [],
            "professions": [],
            "schedules": []
        }
    }
}

export default function (state = initialState, action){
    switch (action.type) {
        case DOCTORS_SCHEDULE_FILTER_LOADING: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    "loading": true,
                }
            }
        }
        case DOCTORS_SCHEDULE_LOADING: {
            return {
                ...state,
                result: {
                    ...state.result,
                    "loading": true,
                }
            }
        }
        case DOCTORS_SCHEDULE_FILTER: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    "loading": false,
                    "data": {
                        "branches": action.payload.branches,
                        "doctors": action.payload.doctors,
                        "cabinets": action.payload.cabinets,
                        "professions": action.payload.professions
                    }
                }
            }
        }
        case DOCTORS_SCHEDULE_GET: {
            return {
                ...state,
                result: {
                    ...state.result,
                    "loading": false,
                    "data": {
                        "branches": action.payload.branches,
                        "doctors": action.payload.doctors,
                        "cabinets": action.payload.cabinets,
                        "professions": action.payload.professions,
                        "schedules": action.payload.shedules
                    }
                }
            }
        }
        default:
            return state
    }
}
