import axios from 'axios';
import {GET_SETTINGS_BRANCHES, CREATE_SETTINGS_BRANCH, CREATE_BRANCH_CABINET, SETTINGS_BRANCHES_LOADING} from "./types";

export const getBranches = () => dispatch => {
    dispatch(setBranchesLoading());
    axios
        .get('/api/settings/get/branches')
        .then(response => {
            dispatch({
                type: GET_SETTINGS_BRANCHES,
                payload: response.data.branches
            })
        });
}

export const branchCreate = (data) => dispatch => {
    dispatch(setBranchesLoading());
    axios
        .post('/api/settings/branch/create', data)
        .then(response => {
            dispatch({
                type: CREATE_SETTINGS_BRANCH,
                payload: response.data.branch
            });
        })
}

export const cabinetCreate = (data) => dispatch => {
    dispatch(setBranchesLoading());
    axios
        .post('/api/settings/cabinet/create', data)
        .then(response => {
           dispatch({
              type: CREATE_BRANCH_CABINET,
              payload: response.data.cabinet
           });
        });
}

export const setBranchesLoading = () => {
    return {
        type: SETTINGS_BRANCHES_LOADING
    }
}
