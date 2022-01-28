import { authConstant } from "../constants";
import moment from "moment"
const initialState = {
    save_access:[],
    expenditures:[],
    events:[],
    expenditureInitValue:{
          date:moment().format('YYYY-MM-DD'),
          particulars:"",
          amount:"",
          remarks:"",
          _id: "",
          cashMode: 'income',
          paymentMode:'cash'
    },
    eventInitValue:{
      date:"",
      budgetAllocated:"",
      budgetUsed:"",
      organizer:"",
      event:"",
      remarks:"",
      _id: ""
   }
  
};
export default (state = initialState, action) => {
  switch (action.type) {

    case "save_access":
      state = {
        ...state,
        save_access:action.payload,
      };
      break;
    case "get_all_expenditure":
      state = {
        ...state,
        expenditures:action.payload,
      };
      break;      
    case "update_expenditure":
    state = {
      ...state,
      expenditures:action.payload,
    };
    break;  

    case "update_expenditure_value":
    state = {
      ...state,
      expenditureInitValue:action.payload,
    };
    break;  

    case "get_all_events":
      state = {
        ...state,
        events:action.payload,
      };
      break;      
    case "update_event":
    state = {
      ...state,
      events:action.payload,
    };
    break;  

    case "update_event_value":
    state = {
      ...state,
      eventInitValue:action.payload,
    };
    break; 
  }

  return state;
};
