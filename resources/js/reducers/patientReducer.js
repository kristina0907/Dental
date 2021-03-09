import {
    GET_PATIENTS,
    DELETE_PATIENT,
    ADD_PATIENT,
    PATIENTS_LOADING,
    GET_HISTORY,
    GET_ORDER,
    GET_ALL_IMAGES,
    IMAGES_UPLOAD
} from "../actions/types";

const initialState = {
    items: [],
    order:[],
    allImages:[],
    history:{},
    loading: false
}

export default function (state = initialState, action){
    switch (action.type) {
        case GET_PATIENTS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case DELETE_PATIENT:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
                // Метод не тестился
            }
        case ADD_PATIENT:
            return {
                ...state,
                items: [action.payload, ...state.items]
                // Метод не тестился
            }
        case GET_HISTORY:
            return {
                ...state,
                history: action.payload.history,
            }
        case GET_ORDER:
            return {
                ...state,
                order: action.payload,
            }
        case GET_ALL_IMAGES:
            return {
                ...state,
                allImages: action.payload,
            }
        case IMAGES_UPLOAD:
            return {
                ...state,
            }
        case PATIENTS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
