const initialState = {
    image_temp:"",
    oneStudent:null,
    studentList:[],
    reportListStudent:[],
    tot:0,
    wait:false,
    phoneNo:[]
};
export default (state = initialState, action) => {
  switch (action.type) {

    case "student_temp_pic":
      state = {
        ...state,
        image_temp:action.payload,
      };
      break;
      case "oneStudent_data":
        state = {
          ...state,
          wait:false,
          oneStudent:action.payload,
        };
        break; 
      case "update_student_list":
        state = {
          ...state,
          studentList:action.payload,
        };
        break;
      case "tot_student":
        state = {
          ...state,
          tot:action.payload,
        };
        break; 
      case "get_student_report":
          state = {
            ...state,
            reportListStudent:action.payload,
          };
        break;   
        //
    case "new_student_Add_req":
      state = {
        ...state,
        wait:true,
      };
    break;   
    case "new_student_Add_success":
      state = {
        ...state,
        wait:false,
      };
    break;   
    case "new_student_Add_fail":
      state = {
        ...state,
        wait:false,
      };
    break;
    //
    case "oneStudent_data_req":
      state = {
        ...state,
        wait:true,
      };
    break;   
    case "oneStudent_data_err":
      state = {
        ...state,
        wait:false,
      };
    break;       
    case "setMobileNo":
      state = {
        ...state,
        phoneNo:action.payload,
      };
    break;        
        
  }

  return state;
};
