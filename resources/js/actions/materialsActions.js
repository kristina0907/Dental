import axios from 'axios';
import {
    ADD_CATEGORY_MATERIALS,
    ADD_MATERIAL,
    DELETE_CATEGORY_MATERIAL,
    EDIT_CATEGORY_MATERIALS,
    GET_ALL_MATERIALS,
    MATERIALS_LOADING,
    DELETE_MATERIAL,
    GET_SELECT_PROVIDER,
    CREATE_INVOICE,
    GET_SELECT_CABINET_INVOICES,
    CREATE_CABINET_INVOICE,
    GET_STORAGE_ITEM,
    GET_QUANTITY,
    EDIT_MATERIALS,
    GET_CABINET_INVOICES,
    FILTER_JOURNAL
} from "./types";
import { returnErrors } from "./errorActions";

export const getAllMaterials = () => dispatch => {
    dispatch(setMaterialsLoading());
    axios
        .get(`/api/materialcats/get/all`)
        .then(response =>
            dispatch({
                type: GET_ALL_MATERIALS,
                payload: response.data
            })
        )
}
export const addCategoryMaterials = (values) =>dispatch => {
    axios
        .post(`/api/materialcats/category/create`, values)
        .then(response =>
            dispatch({
                type: ADD_CATEGORY_MATERIALS,
                payload: response.data,
            })
        )
}
export const deleteCategory = (id) =>dispatch => {
    axios
        .get(`/api/materialcats/category/delete/${id}`)
        .then(response =>
            dispatch({
                type: DELETE_CATEGORY_MATERIAL,
                payload: response.data,
            })
        )
}
export const editCategory = (category) =>dispatch => {
    axios
        .post(`/api/materialcats/category/update`, category, )
        .then(response =>
            dispatch({
                type: EDIT_CATEGORY_MATERIALS,
                payload: response.data,
            })
        )
}
export const addMaterial = (values) =>dispatch => {
    axios
        .post(`/api/material/create`, values)
        .then(response =>
            dispatch({
                type: ADD_MATERIAL,
                payload: response.data,
            })
        )
}
export const editMaterial = (value) =>dispatch => {
    axios
        .post(`/api/material/update`, value, )
        .then(response =>
            dispatch({
                type: EDIT_MATERIALS,
                payload: response.data,
            })
        )
}
export const deleteMaterial= (id) =>dispatch => {
    axios
        .get(`/api/material/delete/${id}`)
        .then(response =>
            dispatch({
                type: DELETE_MATERIAL,
                payload: response.data,
            })
        )
}
export const getSelectProvider = () => dispatch => {
    axios
        .get(`/api/branchinvoices/get/cats`)
        .then(response =>
            dispatch({
                type: GET_SELECT_PROVIDER,
                payload: response.data
            })
        )
}

export const createInvoice = (values) =>dispatch => {
    axios
        .post(`/api/branchinvoices/create`, values)
        .then(response =>
            dispatch({
                type: CREATE_INVOICE,
                payload: response.data,
            })
        )
}
export const getSelectCabinetInvoices = () => dispatch => {
    axios
        .get(`/api/cabinetinvoices/get/cats`)
        .then(response =>
            dispatch({
                type: GET_SELECT_CABINET_INVOICES,
                payload: response.data
            })
        )
}

export const createCabinetInvoices = (values) =>dispatch => {
    axios
        .post(`/api/cabinetinvoices/create`, values)
        .then(response =>
            dispatch({
                type: CREATE_CABINET_INVOICE,
                payload: response.data,
            })
        )
}

export const getItemStorage = (values) =>dispatch => {
    axios
        .post(`/api/cabinetinvoices/get/items`, {"branch_storage_id":values})
        .then(response =>
            dispatch({
                type: GET_STORAGE_ITEM,
                payload: response.data,
            })
        )
}

export const getQuantity = (values) =>dispatch => {
    axios
        .post(`/api/cabinetinvoices/get/quantity`, values)
        .then(response =>
            dispatch({
                type: GET_QUANTITY,
                payload: response.data,
            })
        )
}
export const getCabinetInvoices = () => dispatch => {
    axios
        .get(`/api/cabinetinvoices/get/invoices?branch_id=1`)
        .then(response =>
            dispatch({
                type: GET_CABINET_INVOICES,
                payload: response.data
            })
        )
}
export const getfilterJournal = (values) =>dispatch => {
    axios
        .post(`/api/cabinetinvoices/get/invoices/from_filters`, values)
        .then(response =>
            dispatch({
                type: FILTER_JOURNAL,
                payload: response.data,
            })
        )
}

export const setMaterialsLoading = () => {
    return {
        type: MATERIALS_LOADING
    }
}
