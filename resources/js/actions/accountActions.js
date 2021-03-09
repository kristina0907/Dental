import axios from 'axios';
import {GET_ACCOUNTS, ACCOUNTS_LOADING} from "./types";

export const getAccounts = () => dispatch => {
    dispatch(setAccountsLoading());
    axios
        .get(`/api/auth/users/all`)
        .then(response =>
            dispatch({
                type: GET_ACCOUNTS,
                payload: response.data
            })
        )
}

export const setAccountsLoading = () => {
    return {
        type: ACCOUNTS_LOADING
    }
}
