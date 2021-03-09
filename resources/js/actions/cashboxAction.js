import axios from 'axios';
import { GET_DEVICES, CASHBOX_LOADING } from "./types";
import { returnErrors } from "./errorActions";

export const getDevices = () => dispatch => {
    dispatch(setCashBoxLoading());
    axios
        .get(`/api/kassa/get/devices/?branch_id=1`)
        .then(response =>
            dispatch({
                type: GET_DEVICES,
                payload: response.data
            })
        )
}

export const setCashBoxLoading = () => {
    return {
        type: CASHBOX_LOADING
    }
}
