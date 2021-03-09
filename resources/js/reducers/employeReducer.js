import { GET_EMPLOYERS, GET_ONE_EMPLOYEE, ADD_EMPLOYERS, EDIT_EMPLOYERS, EMPLOYERS_LOADING,GET_SELECT,ERROR_ADD } from "../actions/types";

const initialState = {
    items: [],
    loading: false,
    selects: [],
    success:''
}

export default function (state = initialState, action){
    switch (action.type) {
        case GET_EMPLOYERS:
            return {
                ...state,
                items: action.payload.employers,
                loading: false
            }
        case GET_ONE_EMPLOYEE:
            return {
                ...state,
                items: action.payload.user,
                loading: false
            }
        case GET_SELECT:
            return {
                ...state,
                selects: action.payload,
                loading: false
            }
        case ERROR_ADD:
        case ADD_EMPLOYERS:
            return {
                ...state,
                success: action.success
               
            }
        case EDIT_EMPLOYERS:
            return {
                ...state,
                success: action.success
            }
        case EMPLOYERS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
