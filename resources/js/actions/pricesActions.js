import axios from 'axios';
import { GET_PRICES,  ADD_CATEGORY_PRICE, ADD_PRODUCT_PRICE, EDIT_PRODUCT, EDIT_CATEGORY, DELETE_PRODUCT, DELETE_CATEGORY, PRICES_LOADING } from "./types";
import { returnErrors } from "./errorActions";

export const getPrices = () => dispatch => {
    dispatch(setPricesLoading());
    axios
        .get(`/api/prices/get`)
        .then(response =>
            dispatch({
                type: GET_PRICES,
                payload: response.data
            })
        )
}

export const deleteProduct = (id) =>dispatch => {
    axios
        .get(`/api/prices/product/delete/${id}`)
        .then(response =>
            dispatch({
                type: DELETE_PRODUCT,
                payload: response.data,
            })
        )
}
export const deleteCategory = (id) =>dispatch => {
    axios
        .get(`/api/prices/category/delete/${id}`)
        .then(response =>
            dispatch({
                type: DELETE_CATEGORY,
                payload: response.data,
            })
        )
}

export const addCategory = (values) =>dispatch => {
    axios
        .post(`/api/prices/category/add`, values)
        .then(response =>
            dispatch({
                type: ADD_CATEGORY_PRICE,
                payload: response.data,
            })
        )
}
export const addProduct = (values) =>dispatch => {
    axios
        .post(`/api/prices/product/create`, values)
        .then(response =>
            dispatch({
                type: ADD_PRODUCT_PRICE,
                payload: response.data,
            })
        )
}


export const editProduct = (product) =>dispatch => {
    axios
        .post(`/api/prices/product/update`, product, )
        .then(response =>
            dispatch({
                type: EDIT_PRODUCT,
                payload: response.data,
            })
        )
}

export const editCategory = (category) =>dispatch => {
    axios
        .post(`/api/prices/category/update`, category, )
        .then(response =>
            dispatch({
                type: EDIT_CATEGORY,
                payload: response.data,
            })
        )
}

export const setPricesLoading = () => {
    return {
        type: PRICES_LOADING
    }
}
