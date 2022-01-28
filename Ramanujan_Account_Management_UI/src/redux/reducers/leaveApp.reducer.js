//update_student_notify_list

const initialState = {
    leaveApplications: [],
    leaveappInfo:{
        standard:"",
        section:"",
        student:""
    },
    leaveAppStudentsList:[]
    
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case "leave_application_created_student":
        state = {
          ...state,
          leaveApplications: action.payload,
        };
        break;
  
      case "get_leave_applications":
        state = {
          ...state,
          leaveApplications: action.payload,
        };
        break;
      case "update_leave_application":
        state = {
          ...state,
          leaveApplications: action.payload,
        };
        break;
      case "handle_change_info":
        state = {
          ...state,
          leaveappInfo: action.payload,
        };
        break;
      case "update_student_leaveApp_list":
        state = {
          ...state,
          leaveAppStudentsList: action.payload,
        };
        break;
    //   case "delete_notification_Success":
    //     state = {
    //       ...state,
    //       allNotifications: action.payload,
    //     };
    //     break;
    
}
  
    return state;
  };
  