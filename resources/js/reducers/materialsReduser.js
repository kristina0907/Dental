import {
    ADD_CATEGORY_MATERIALS,
    GET_ALL_MATERIALS,
    DELETE_CATEGORY_MATERIAL,
    DELETE_MATERIAL,
    EDIT_CATEGORY_MATERIALS,
    ADD_MATERIAL,
    GET_SELECT_PROVIDER,
    MATERIALS_LOADING,
    CREATE_INVOICE,
    GET_SELECT_CABINET_INVOICES,
    CREATE_CABINET_INVOICE,
    GET_STORAGE_ITEM,
    GET_QUANTITY,
    EDIT_MATERIALS,
    GET_CABINET_INVOICES,
    FILTER_JOURNAL
} from "../actions/types";

const initialState = {
    items: {},
    units:[],
    selectsProvider:[],
    selectsCabinet:[],
    itemsStorage:{},
    itemsQuantity:{},
    itemsCabinetInvoices:{},
    filterJournal:{},
    loading: false,
    success:''
}

export default function (state = initialState, action){
    switch (action.type) {
        case GET_ALL_MATERIALS:
            return {
                ...state,
                items: action.payload.materialcats,
                units:action.payload.units,
                loading: false
            }
        case MATERIALS_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_CATEGORY_MATERIALS:
            return {
                ...state,
                success: action.success
            }
        case DELETE_CATEGORY_MATERIAL:
            return {
                ...state,
                success: action.success
            }
        case EDIT_CATEGORY_MATERIALS:
            return {
                ...state,
                success: action.success
            }
        case ADD_MATERIAL:
            return {
                ...state,
                success: action.success
            }
        case EDIT_MATERIALS:
            return {
                ...state,
                success: action.success
            }
        case DELETE_MATERIAL:
            return {
                ...state,
                success: action.success
            }
        case CREATE_INVOICE:
            return {
                ...state,
                success: action.success
            }
        case GET_SELECT_PROVIDER:
            return {
                ...state,
                selectsProvider: action.payload,
                loading: false
            }
        case GET_SELECT_CABINET_INVOICES:
            return {
                ...state,
                selectsCabinet: action.payload,
                loading: false
            }
        case CREATE_CABINET_INVOICE:
            return {
                ...state,
                success: action.success
            }
        case GET_STORAGE_ITEM:
            return {
                ...state,
                itemsStorage: action.payload.items,
                success: action.success
            }
        case GET_QUANTITY:
            return {
                ...state,
                itemsQuantity: action.payload.material,
                success: action.success
            }
        case GET_CABINET_INVOICES:
            return {
                ...state,
                itemsCabinetInvoices: action.payload,
                success: action.success
            }
        case FILTER_JOURNAL:
            return {
                ...state,
                filterJournal: action.payload,
                success: action.success
            }
        default:
            return state;
    }
}
