import { hostelConstants } from "../constants";

const {
    HOSTEL_API_REQ, 
    
    HOSTEL_REG_Success, 
    HOSTEL_GET_Success, 
    HOSTEL_GET_ROOM_Success,
    HOSTEL_EDIT_Success, 
    HOSTEL_DELETE_Success, 

    HOSTEL_CREATE_ROOM_Success, 
    HOSTEL_EDIT_ROOM_Success, 
    HOSTEL_DELETE_ROOM_Success, 

    HOSTEL_CREATE_ADMISSION_Success,
    HOSTEL_EDIT_ADMISSION_Success, 
    HOSTEL_GET_ADMISSION_Success, 
    HOSTEL_DELETE_ADMISSION_Success,
    HOSTEL_GET_ALL_STUDENTS_Success,

    HOSTEL_FILTER_ADMISSION_Success,
    HOSTEL_CLEAR_FILTER_ADMISSION_Success,

    ONE_HOSTEL_GET_Success, 
    HOSTEL_FILTER,
    CLEAR_FILTER, 
    
    HOSTEL_API_FAIL
} = hostelConstants

const initialState = {

    loading:false,
    hostels:null,
    oneHostel:null,
    searchHostel:null,
    hostelRooms : null,
    admittedStudents : null,
    searchAdmittedStudents : null
};

export default (state = initialState, {type, payload}) => {
  switch (type) {

    case HOSTEL_API_REQ:
        return{
            ...state,
            loading:true
        }
    
    case HOSTEL_REG_Success:
        return{
            ...state,
            loading:false,
            hostels: state.hostels ? [ ...state.hostels , payload ] : [ payload ]
        }
    
    case HOSTEL_GET_Success:
        return{
            ...state,
            loading:false,
            hostels:payload?.map((item)=>item.hostel)
        }

    case "HOSTEL_GET_Success_With_Rooms":
        return{
            ...state,
            loading:false,
            hostels:payload
        }
    
    case HOSTEL_GET_ROOM_Success:
        return{
            ...state,
            loading : false,
            oneHostel : payload
        }

    case HOSTEL_EDIT_Success:
        return{
            ...state,
            hostels : state.hostels?.map((hostel)=> hostel._id===payload._id ? payload : hostel),
            loading : false,
        }
    
    case HOSTEL_DELETE_Success:
        return{
            ...state,
            loading : false,
            hostels : state.hostels?.filter((hostel)=> hostel._id!==payload._id )
        }

    case HOSTEL_CREATE_ROOM_Success:
        return{
            ...state,
            loading:false,
            oneHostel: state.oneHostel ? [ ...state.oneHostel , payload ] : [ payload ]
        }

    case HOSTEL_EDIT_ROOM_Success:
        return{
            ...state,
            oneHostel : state.oneHostel?.map((room)=> room._id===payload._id ? payload : room),
            loading : false,
        }
        
    case HOSTEL_DELETE_ROOM_Success:
        return{
            ...state,
            loading : false,
            oneHostel : state.oneHostel?.filter((room)=> room._id!==payload._id )
        }

    case HOSTEL_CREATE_ADMISSION_Success:
        return{
            ...state,
            loading : false,
            admittedStudents : state.admittedStudents ? [ ...state.admittedStudents, payload ] : [ payload ]
        }
    
    case HOSTEL_GET_ALL_STUDENTS_Success:
        return{
            ...state,
            loading : false,
            admittedStudents : payload.map((item)=>{
                  return{
                       ...item,
                       name: item.student?.name,
                       rollNo: item.student?.rollNo,
                       gender: item.student?.gender,
                       mobileNo : item.student?.mobileNo  
                  }
            })
        }
    
    case HOSTEL_EDIT_ADMISSION_Success:
        return{
            ...state,
            loading : false,
            admittedStudents : state.admittedStudents?.map((student)=>student._id===payload._id ? { ...student, room: payload.room, enrollment_no: payload.enrollment_no } : student)
        }

    case HOSTEL_DELETE_ADMISSION_Success:
        return{
            ...state,
            loading : false,
            admittedStudents : state.admittedStudents?.filter((student)=>student._id!==payload._id)
        }

    case HOSTEL_FILTER_ADMISSION_Success:

        RegExp.quote = function allowSpecialSymbols(str) {
            return str.replace(/([.?*+^$[\]\\(){}|-])/g, "");
          };
        
        console.log( state.admittedStudents , payload)
    
        const reg = new RegExp(RegExp.quote(`${payload}`), "gi");

        return {
            ...state,
            searchAdmittedStudents : state.admittedStudents?.filter((student) => student?.student?.name?.match(reg) || student?.enrollment_no==payload),
        }
    
    case HOSTEL_CLEAR_FILTER_ADMISSION_Success:

        return {
            ...state,
            searchAdmittedStudents : null
        }
    
    case HOSTEL_API_FAIL:
        return{
            ...state,
            loading:false
        }

    default:
        return state 
  }
};
