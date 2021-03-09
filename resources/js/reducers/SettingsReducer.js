import {GET_SETTINGS_BRANCHES, CREATE_SETTINGS_BRANCH, CREATE_BRANCH_CABINET,SETTINGS_BRANCHES_LOADING} from "../actions/types";

const initialState = {
    branches: [],
    loading: false
}

export default function SettingsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SETTINGS_BRANCHES:
            return {
                ...state,
                branches: action.payload,
                loading: false
            }
        case CREATE_SETTINGS_BRANCH:
            return {
                ...state,
                branches: [...state.branches, action.payload],
                loading: false
            }
        case CREATE_BRANCH_CABINET:
            return {
                ...state,
                branches: action.payload,
                loading: false
            }
        case SETTINGS_BRANCHES_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}
