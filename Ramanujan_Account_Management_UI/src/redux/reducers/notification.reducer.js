//update_student_notify_list

const initialState = {
  studentList: [],
  stuffList: [],
  allNotifications: [],
  selectedNotification: [],
  personSelected: [],
  wait:false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "update_student_notify_list":
      state = {
        ...state,
        studentList: action.payload,
      };
      break;
    
    case "update_stuff_notify_list":
      state = {
        ...state,
        stuffList: action.payload
      }
      break;

    case "get_all_notification":
      state = {
        ...state,
        allNotifications: action.payload,
      };
      break;
    case "new_notifications_list":
      state = {
        ...state,
        allNotifications: action.payload,
        wait:false,
      };
      break;
      case "notification_fail":
      state = {
        ...state,
        wait:false,
      };
      break;
      case "notification_req":
      state = {
        ...state,
        wait:true,
      };
      break;
    case "notification_selected":
      state = {
        ...state,
        selectedNotification: action.payload,
      };
      break;
    case "person_selected":
      state = {
        ...state,
        personSelected: action.payload,
      };
      break;
    case "delete_notification_Success":
      state = {
        ...state,
        allNotifications: action.payload,
      };
      break;
  }

  return state;
};
