import { GET_RECORDS_CRM, CRM_LOADING,GET_TASKS_CALLING,ADD_TASK,GET_ALL_TASKS,GET_SELECT_FILTER,GET_FILTER_TASKS,GET_PAGE_TASKS,GET_WAITING_LISTS,ADD_WAITING_LIST,GET_WAITING_CATS } from "../actions/types";

const initialState = {
    items: {},
    tasksCalling:{},
    allTasks:{},
    selectFilter:{},
    waitingCats:{},
    waitinglists:{},
    filterResultTasks:{},
    loading: false,
    success:''
}

export default function (state = initialState, action){
    switch (action.type) {
        case GET_RECORDS_CRM:
            return {
                ...state,
                items: action.payload.records,
                loading: false
            }
        case CRM_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_TASKS_CALLING:
            return {
                ...state,
                tasksCalling: action.payload,
        }
        case ADD_TASK:
            return {
            ...state,
            loading: true
        }
        case GET_ALL_TASKS:
            return {
                ...state,
                allTasks: action.payload.tasks,
            }
        case GET_PAGE_TASKS:
            return {
                ...state,
                allTasks: action.payload.tasks,
            }
        case GET_SELECT_FILTER:
            return {
            ...state,
                selectFilter: action.payload,
        }
        case GET_WAITING_LISTS:
        return {
          ...state,
              waitinglists: action.payload.list,
      }
        case GET_FILTER_TASKS:
            return {
            ...state,
            filterResultTasks: action.payload.tasks,
        }
        case ADD_WAITING_LIST:
            return {
            ...state
        }
        case GET_WAITING_CATS:
            return {
            ...state,
            waitingCats: action.payload.doctors,
        }
        default:
            return state;
    }
}
