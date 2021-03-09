import { combineReducers } from "redux";
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import patientReducer from './patientReducer';
import accountReducer from "./accountReducer";
import employers from "./employeReducer";
import livetapeReducer from "./livetapeReducer";
import sheduleReducer from "./sheduleReducer";
import pricesReducer from "./pricesReducer";
import materialsReduser from "./materialsReduser";
import SettingsReducer from "./SettingsReducer";
import crmReducer from "./crmReducer";
import cashboxReducer from "./cashboxReducer";
import doctorsScheduleReducer from "./doctorsScheduleReducer";


export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    patients: patientReducer,
    accounts: accountReducer,
    employers:employers,
    livetape: livetapeReducer,
    shedule: sheduleReducer,
    prices: pricesReducer,
    materials:materialsReduser,
    settings: SettingsReducer,
    crm:crmReducer,
    cashbox:cashboxReducer,
    doctorsSchedules: doctorsScheduleReducer
})
