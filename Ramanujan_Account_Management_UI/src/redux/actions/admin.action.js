import { Toastify } from "../../App";
import axios from "../../helpers/axios";
import { authConstant } from "../constants";

import moment from 'moment';

export const add_to_cashBook = (data) => {
  return async (dispatch) => {
    try {
      let res = await axios().post("/cashBook/add_to_cashBook", data);

       console.log( res.data , 'res.data' );

       if( res.status == 200 ){
                 
            // Toastify("success", "Amount updated in cashbook !");
       }else{
            Toastify("success", "Something went wrong in cashbook !");
       }
    } catch (error) {
      Toastify("error", "Something Went Wrong");
    }
  };
};

export const AddNewAdmin = (data, history, token) => {

  return async (dispatch) => {
    try {
      dispatch({ type: "new_student_Add_req" });
      let res = await axios(token).post("/admin/createOneAdmin", { ...data });
      if (res.status == 200) {
        Toastify("success", "New admin added !");
        history.push('/adminDesh')
        dispatch({ type: "new_student_Add_success" });
      } else {
        if (res.status == 401) {
          Toastify("error", "Unable to Login");
          dispatch({
            type: "new_student_Add_fail",
            payload: {
              error: res.data.error,
            },
          });
        }
      }
    } catch (error) {
      Toastify("error", error.response.data.message);
      dispatch({
        type: "new_student_Add_fail",
        payload: { error: error.message },
      });
    }
  };
};

export const DeleteAdmin = (id, type, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.LOGOUT_REQUEST });
      let res = await axios(token).post("/admin/logoutAll");

      if (res.status == 200) {
        localStorage.clear();
        Toastify("success", "Logout Sucessfully");
        dispatch({ type: authConstant.LOGOUT_SUCCESS });
      } else {
        Toastify("error", "Unable to Logout");
        dispatch({
          type: authConstant.LOGOUT_FAIL,
          payload: {
            error: "Unable to logout",
          },
        });
      }
    } catch (error) {
      Toastify("error", error.response.data.message);
      dispatch({
        type: authConstant.LOGOUT_FAIL,
        payload: { error: error.message },
      });
    }
  };
};

export const updateAdmin = (id, type, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.LOGOUT_REQUEST });
      let res = await axios(token).post("/admin/logoutAll");

      if (res.status == 200) {
        localStorage.clear();
        Toastify("success", "Logout Sucessfully");
        dispatch({ type: authConstant.LOGOUT_SUCCESS });
      } else {
        Toastify("error", "Unable to Logout");
        dispatch({
          type: authConstant.LOGOUT_FAIL,
          payload: {
            error: "Unable to logout",
          },
        });
      }
    } catch (error) {
      Toastify("error", error.response.data.message);
      dispatch({
        type: authConstant.LOGOUT_FAIL,
        payload: { error: error.message },
      });
    }
  };
};

export const getAdmin = (id, type, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.LOGOUT_REQUEST });
      let res = await axios(token).post("/admin/logoutAll");

      if (res.status == 200) {
        localStorage.clear();
        Toastify("success", "Logout Sucessfully");
        dispatch({ type: authConstant.LOGOUT_SUCCESS });
      } else {
        Toastify("error", "Unable to Logout");
        dispatch({
          type: authConstant.LOGOUT_FAIL,
          payload: {
            error: "Unable to logout",
          },
        });
      }
    } catch (error) {
      Toastify("error", error.response.data.message);
      dispatch({
        type: authConstant.LOGOUT_FAIL,
        payload: { error: error.message },
      });
    }
  };
};

export const createDepartment = (type, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.LOGOUT_REQUEST });
      let res = await axios(token).post("/admin/logoutAll");

      if (res.status == 200) {
        localStorage.clear();
        Toastify("success", "Logout Sucessfully");
        dispatch({ type: authConstant.LOGOUT_SUCCESS });
      } else {
        Toastify("error", "Unable to Logout");
        dispatch({
          type: authConstant.LOGOUT_FAIL,
          payload: {
            error: "Unable to logout",
          },
        });
      }
    } catch (error) {
      Toastify("error", error.response.data.message);
      dispatch({
        type: authConstant.LOGOUT_FAIL,
        payload: { error: error.message },
      });
    }
  };
};

export const updateAmin = (type, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.LOGOUT_REQUEST });
      let res = await axios(token).post("/admin/logoutAll");

      if (res.status == 200) {
        localStorage.clear();
        Toastify("success", "Logout Sucessfully");
        dispatch({ type: authConstant.LOGOUT_SUCCESS });
      } else {
        Toastify("error", "Unable to Logout");
        dispatch({
          type: authConstant.LOGOUT_FAIL,
          payload: {
            error: "Unable to logout",
          },
        });
      }
    } catch (error) {
      Toastify("error", error.response.data.message);
      dispatch({
        type: authConstant.LOGOUT_FAIL,
        payload: { error: error.message },
      });
    }
  };
};

export const updateProfile = (type, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.LOGOUT_REQUEST });
      let res = await axios(token).post("/admin/logoutAll");

      if (res.status == 200) {
        localStorage.clear();
        Toastify("success", "Logout Sucessfully");
        dispatch({ type: authConstant.LOGOUT_SUCCESS });
      } else {
        Toastify("error", "Unable to Logout");
        dispatch({
          type: authConstant.LOGOUT_FAIL,
          payload: {
            error: "Unable to logout",
          },
        });
      }
    } catch (error) {
      Toastify("error", error.response.data.message);
      dispatch({
        type: authConstant.LOGOUT_FAIL,
        payload: { error: error.message },
      });
    }
  };
};

export const accessSubmit = (access) => {
  return (dispatch) => {
    Toastify("success", "Access given");
    // access.push({ to: "logoutAll", title: "Logout" });
    dispatch({ type: "save_access", payload: access });
  };
};

// expenditure and event management 

export const getAllExpenditure = (id) => {
  return async (dispatch) => {
    try {
      let res = await axios().get("/admin/getAllExpenditure/" + id);

      if (res.status == 200) {
        dispatch({ type: "get_all_expenditure", payload: res.data.data });
      } else {
        Toastify("error", "Unable to get data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllEvent = (id) => {
  return async (dispatch) => {
    try {
      let res = await axios().get("/admin/getAllEventManagement/" + id);

      if (res.status == 200) {
        dispatch({ type: "get_all_events", payload: res.data.data });
      } else {
        Toastify("error", "Unable to get data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const expenditureCreate = (data, expenditure) => {
  return async (dispatch) => {
    try {
      let res = await axios().post("/admin/expenditureCreate", { ...data });
      console.log(res.data);
      if (res.status == 200) {
        dispatch({ type: "update_expenditure", payload: res.data.data });
        Toastify("success", "Added");

        const DATA = {

          date :  moment( data.date ).format('YYYY-MM-DD'), 
          payments : data.amount, 
          department : data.department
        }

        try {
          let result = await axios().post("/cashBook/add_to_cashBook", DATA);
    
           console.log( result.data , 'res.data' );

           if( result.status == 200 ){
               
                // Toastify("success", "Amount deducted from cashbook !");
           }else{
                Toastify("success", "Something went wrong in cashbook !");
           }
        } catch (error) {
          Toastify("error", "Something Went Wrong");
        }
      } else {
        Toastify("error", "Unable to get data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventCreate = (data, expenditure) => {
  return async (dispatch) => {
    try {
      let res = await axios().post("/admin/eventManagementCreate", { ...data });
      console.log(res.data);
      if (res.status == 200) {
        dispatch({ type: "update_event", payload: res.data.data });

        const Data = {

          date :  moment(data.date).format('YYYY-MM-DD'), 
          payments : data.budgetUsed, 
          department : data.department
        }

        try {
          let result = await axios().post("/cashBook/add_to_cashBook", Data);
    
           console.log( result.data , 'res.data' );

           if( result.status == 200 ){
               
              //  Toastify("success", "Amount deducted from cashbook !");
           }else{
               Toastify("success", "Something went wrong in cashbook !");
           }
        } catch (error) {
          Toastify("error", "Something Went Wrong");
        }

        Toastify("success", "Expenditure added");
      } else {
        Toastify("error", "Unable to get data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const expenditureEdit = (data, id, previousBudget) => {
  return async (dispatch) => {
    try {
      
      let res = await axios().patch("/admin/expenditureEdit/" + id, { ...data });
      if (res.status == 200) {
        dispatch({ type: "update_expenditure", payload: res.data.data });

        console.log(previousBudget)

        const Data = {

          date :  moment( data.date ).format('YYYY-MM-DD'), 
          payments : data.amount - previousBudget, 
          department : data.department
        }

        try {
          let result = await axios().post("/cashBook/add_to_cashBook", Data);
    
          console.log( result.data , 'result.data' );

          if( result.status == 200 ){
             
              // console.log('Amount deducted from cashbook');
              window.location.reload();
          }else{
             console.log('Something went wrong!');
          }
        } catch (error) {
          Toastify("error", "Something Went Wrong");
        }
        Toastify("success", "Updated");
      } else {
        Toastify("error", "Unable to get data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export const eventEdit = (data, id, previousBudget) => {
  return async (dispatch) => {
    try {
 
      let res = await axios().patch("/admin/eventManagementEdit/" + id, { ...data });
      if (res.status == 200) {
        dispatch({ type: "update_event", payload: res.data.data });
        window.location.reload();
        Toastify("success", "Updated");

        console.log(previousBudget)

        const Data = {

          date :  moment( data.date ).format('YYYY-MM-DD'), 
          payments : data.budgetUsed - previousBudget, 
          department : data.department
        }

        try {
          let result = await axios().post("/cashBook/add_to_cashBook", Data);
    
          console.log( result.data , 'result.data' );

          if( result.status == 200 ){
             
              // console.log('Amount deducted from cashbook');
              window.location.reload();
          }else{
             console.log('Something went wrong!');
          }
        } catch (error) {
          Toastify("error", "Something Went Wrong");
        }

      } else {
        Toastify("error", "Unable to get data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const expenditureDelete = (department, id) => {
  return async (dispatch) => {
    try {
      let res = await axios().post("/admin/expenditureDelete/" + id, {
        department: department,
      });
      console.log(res.data, "asdasd");
      if (res.status == 200) {
        dispatch({ type: "update_expenditure", payload: res.data.data });
        Toastify("success", "Deleted");

        const Data = {

          date :  moment(res.data?.deletedData?.date).format('YYYY-MM-DD'), 
          payments : -res.data?.deletedData?.amount, 
          department : res.data?.deletedData?.department
        }

        try {
          let result = await axios().post("/cashBook/add_to_cashBook", Data);
    
           console.log( result.data , 'res.data' );

           if( result.status == 200 ){
               
              //  Toastify("success", "Amount updated to cashbook !");
           }else{
               Toastify("success", "Something went wrong in cashbook !");
           }
        } catch (error) {
          Toastify("error", "Something Went Wrong");
        }
      } else {
        Toastify("error", "Unable to get data");
      }
    } catch (error) {
      console.log(error);
      Toastify("error", "Unable to get data");
    }
  };
};

export const eventDelete = (department, id) => {
  return async (dispatch) => {
    try {
      let res = await axios().post("/admin/eventManagementDelete/" + id, {
        department: department,
      });
      console.log(res.data, "asdasd");
      if (res.status == 200) {
        dispatch({ type: "update_event", payload: res.data?.data });
        Toastify("success", "Event buget created added");

        const Data = {

          date :  moment(res.data?.result?.date).format('YYYY-MM-DD'), 
          payments : -res.data?.result?.budgetUsed, 
          department : res.data?.result?.department
        }

        console.log( Data , 'Data' );

        try {
          let result = await axios().post("/cashBook/add_to_cashBook", Data);
    
           console.log( result.data , 'res.data' );

           if( result.status == 200 ){
               
              //  Toastify("success", "Amount updated to cashbook !");
           }else{
               Toastify("success", "Something went wrong in cashbook !");
           }
        } catch (error) {
          Toastify("error", "Something Went Wrong");
        }
      } else {
        Toastify("error", "Unable to get data");
      }
    } catch (error) {
      console.log(error);
      Toastify("error", "Unable to get data");
    }
  };
};

export const expenditureValueSetup = (values,_id) => {
  return async (dispatch) => {
    
    try {
      let data = {
        date: values.date.split("T")[0],
        particulars: values.particulars,
        amount: values.amount,
        remarks: values.remarks,
        paymentMode:values.paymentMode,
        _id: values._id,
        department:_id
      };
      console.log(data,"values")
      dispatch({ type: "update_expenditure_value", payload: data });
    } catch (error) {
      console.log(error);
      Toastify("error", "Unable to get data");
    }
  };
};

export const eventValueSetup = (values,_id) => {
  return async (dispatch) => {
    
    try {
      let data = {
        event:values.event,
        budgetAllocated:values.budgetAllocated,
        budgetUsed:values.budgetUsed,
        organizer:values.organizer,
        date: values.date,
        remarks: values.remarks,
        _id: values._id,
        department:_id
      };
      dispatch({ type: "update_event_value", payload: data });
    } catch (error) {
      console.log(error);
      Toastify("error", "Unable to get data");
    }
  };
};
