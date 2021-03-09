import { GET_PRICES,  ADD_CATEGORY_PRICE, ADD_PRODUCT_PRICE, EDIT_PRODUCT, EDIT_CATEGORY, DELETE_PRODUCT, DELETE_CATEGORY, PRICES_LOADING } from "../actions/types";

const initialState = {
    items: {},
    loading: false,
    success:''
}

export default function (state = initialState, action){
    switch (action.type) {
        case GET_PRICES:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
            case ADD_CATEGORY_PRICE:
                return {
                    ...state,
                    success: action.success
                }
            case ADD_PRODUCT_PRICE:
                return {
                    ...state,
                    success: action.success
                }
            case DELETE_PRODUCT:
                return {
                    ...state,
                    success: action.success
                }
            case DELETE_CATEGORY:
                return {
                    ...state,
                    success: action.success
                }
            case EDIT_PRODUCT:
                return {
                    ...state,
                    success: action.success
                }
            case EDIT_CATEGORY:
            return {
                ...state,
                success: action.success
            }
            case PRICES_LOADING:
                return {
                    ...state,
                    loading: true
                }
            default:
                return state;
    }
}
