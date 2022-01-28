import { Toastify } from "../../App";
import axios from "../../helpers/axios";
import { authConstant } from "../constants";


export const leaveApplication = (data,history,token) => {

// id, modelOf, reason, From_Date, To_date
    return async (dispatch) => {
      
      try {
        let res = await axios().post("/leaveApp/leaveApplication", { ...data });
        if (res.status == 200) {  
          Toastify("success", "Leave application created !");
          dispatch({type: "leave_application_created_student"});
          history.goBack()
        } else {
            
          if (res.status == 401) {
            Toastify("error", "Unable to create leave application");            
          }

        }
      } catch (error) {
        console.log(error,"error")
        Toastify("error", error.response.data.message);
        dispatch({
          type: "new_student_Add_fail",
          payload: { error: error.response.data.message },
        });
      }
    };
  };
  

  export const getAllLeaveApplication = (modelOf,department,token) => {
    return async (dispatch) => {
      try {
    
        let res = await axios().get(`/leaveApp/getAllLeaveApplication/${modelOf}/${department}`,);    
        if (res.status == 200) {
          dispatch({ type: "get_leave_applications",payload:res.data.data});
        } else {
          Toastify("error", "Unable to get data ");
        }
      } catch (error) {
        console.log(error,"error");
        Toastify("error", error);
      }
    };
  };

  export const deleteLeaveApplication = (id,modelOf,department,token) => {
    console.log(id,modelOf,department,"department")
    return async (dispatch) => {
      try {
        let res = await axios().delete(`/leaveApp/deleteLeaveApplication/${id}/${modelOf}/${department}`);

        if (res.status == 200) {  
          Toastify("success", "Leave application deleted");
          // dispatch({ type: "update_leave_application",payload:res.data.data });
          return res.data.data;
        } else {
          Toastify("error", "Unable to delete leave application");          
        }
      } catch (error) {
        console.log(error,"deleteLeaveApplication")
        Toastify("error", error.response.data.message);
      }
    };
  };

  
  export const updateOneLeaveApplication = (data,token) => {
    return async (dispatch) => {
      try {
    //_id, id, modelOf, reason, From_Date, To_date
        dispatch({ type: authConstant.LOGOUT_REQUEST });
        let res = await axios().patch("/leaveApp/updateOneLeaveApplication",{...data});

        if (res.status == 200) {
          localStorage.clear();
          Toastify("success", "Logout Sucessfully");
          dispatch({ type:"update_leave_application",payload:res.data.data });
        } else {
          Toastify("error", "Unable to Logout");
        }
      } catch (error) {
        console.log(error,"error ")
        Toastify("error", error.response.data.message);
        
      }
    };
  };

  export const handleChangeInfo = (id,data) => {

    return async (dispatch) => {
      try {
        
        // dispatch({ type: "handle_change_info",payload:data});
        let res = await axios().get(`/student/allStudentsCollege/${id}`);
        
        if (res.status == 200) {
          
          let filteredStudents = [];
          // if (
          //   data.section !== "all" &&
          //   data.standard !== "all"
          // ) {
          //   filteredStudents = res.data.data.filter(
          //     (student) =>
          //       student.section == data.section &&
          //       student.standard == data.standard
          //   );
          // } else if (data.section !== "all") {
          //   filteredStudents = res.data.data.filter(
          //     (student) => student.section == data.section
          //   );
          // } else if (data.standard !== "all") {
          //   filteredStudents = res.data.data.filter(
          //     (student) => student.standard == data.standard
          //   );
          // } else {
          //   filteredStudents = res.data.data;
          // }
         
          dispatch({
            type: "update_student_leaveApp_list",
            payload: res.data.data,
          });
        }else{
            Toastify("error", "unable to find students");  
        }
    
      } catch (error) {
        console.log(error,"error ")
        Toastify("error", error.response.data.message);
        
      }
    };
  };

  

//     export const updateOneLeaveApplication = (data,token) => {
//     return async (dispatch) => {
//       try {
//     //_id, id, modelOf, reason, From_Date, To_date
//         dispatch({ type: authConstant.LOGOUT_REQUEST });
//         let res = await axios().patch("/leaveApp/updateOneLeaveApplication",{...data});

//         if (res.status == 200) {
//           localStorage.clear();
//           Toastify("success", "Logout Sucessfully");
//           dispatch({ type:"update_leave_application",payload:res.data.data });
//         } else {
//           Toastify("error", "Unable to Logout");
//         }
//       } catch (error) {
//         console.log(error,"error ")
//         Toastify("error", error.response.data.message);
        
//       }
//     };
//   };
