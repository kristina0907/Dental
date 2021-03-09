import {LIVETAPE_LOADING, GET_LIVETAPE} from "../actions/types";

const initialState = {
    items: [],
    loading: false
}

export default function (state = initialState, action){
    switch (action.type) {
        case GET_LIVETAPE:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        case LIVETAPE_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
