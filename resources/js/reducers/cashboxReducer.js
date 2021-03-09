import {GET_DEVICES, CASHBOX_LOADING} from "../actions/types";

const initialState = {
    items: {},
    loading: false,
    success:''
}

export default function (state = initialState, action){
    switch (action.type) {
        case GET_DEVICES:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case CASHBOX_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
