import {combineReducers} from "redux";
import notificationReducer from "./notification.reducer";
import authReducer from "./auth.reducer";
import adminReducer from "./admin.reducer";
import stuff from './staff.reducer';
import hostel from './hostel.reducer';
import notice from './notice.reducer';
import studentReducer from './student.reducer'
import leaveAppReducer from './leaveApp.reducer'
import cashReducer from './cash.reducer'

const combineReducer=combineReducers({
    notification:notificationReducer,
    auth:authReducer,
    admin:adminReducer,
    student:studentReducer,
    leaveApp:leaveAppReducer,
    stuff:stuff,
    hostel:hostel,
    notice:notice,
    cash:cashReducer
})

export default combineReducer;