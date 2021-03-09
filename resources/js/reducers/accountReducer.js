import {GET_ACCOUNTS, ACCOUNTS_LOADING} from "../actions/types";

const initialState = {
    roles: [],
    loading: false
}

export default function (state = initialState, action){
    switch (action.type) {
        case GET_ACCOUNTS:
            return {
                ...state,
                roles: action.payload.roles,
                loading: false
            }
        case ACCOUNTS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
