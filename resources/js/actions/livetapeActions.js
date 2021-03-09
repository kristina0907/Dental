import axios from 'axios';
import {LIVETAPE_LOADING, GET_LIVETAPE} from "./types";

export const getLiveTape = () => dispatch => {
    dispatch(setLiveTapeLoading());
    axios
        .get(`/api/shedule/get/livefeed`)
        .then(response =>
            dispatch({
                type: GET_LIVETAPE,
                payload: response.data
            })
        )
}

export const setLiveTape = (data) => dispatch => {
    dispatch(setLiveTapeLoading());
    dispatch({
        type: GET_LIVETAPE,
        payload: data
    })
}

export const setLiveTapeLoading = () => {
    return {
        type: LIVETAPE_LOADING
    }
}

