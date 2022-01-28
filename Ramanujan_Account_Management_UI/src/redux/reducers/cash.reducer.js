//update_student_notify_list

const initialState = {
  studentFeeInfo: null,
  previousPayment: [],
  balanceFeeStudent: [],
  wait: false,
};
export default (state = initialState, action) => {
  
  switch (action.type) {
    case "fee_student_get":
      
      state = {
        ...state,
        studentFeeInfo: action.payload.info,
        previousPayment: action.payload.payment,
      };
      break;

      case "delete_prev_data":
      
      state = {
        ...state,
        previousPayment: action.payload,
      };
      break;


      case "delete_other_data":
      
      state = {
        ...state,
        previousPayment: action.payload,
      };
      break;
      
    case "update_tution_fee":
      state = {
        ...state,
        previousPayment: action.payload,
      };
      break;

    case "initFeeInfo":
      state = {
        ...state,
        studentFeeInfo: null,
      };
      break;

    case "balance_student_get":
      state = {
        ...state,
        balanceFeeStudent: action.payload,
      };
      break;

    case "update_tution_fee_req":
      state = {
        ...state,
        wait: true,
      };
      break;
    case "update_tution_fee_done":
      state = {
        ...state,
        previousPayment: action.payload.payment,
        studentFeeInfo:action.payload.info,
        wait:false,
      };
      break;
    case "update_tution_fee_fail":
      state = {
        ...state,
        previousPayment: action.payload,
        wait:false
      };
      break;
    case "otherfee_student_req":
      state = {
        ...state,
        wait: true,
      };
      break;
    case "otherfee_student_success":
      state = {
        ...state,
        wait: false,
      };
      break;
    case "otherfee_student_error":
      state = {
        ...state,
        wait: false,
      };
      break;
  }

  return state;
};
