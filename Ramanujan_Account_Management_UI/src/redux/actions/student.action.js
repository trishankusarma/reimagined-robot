import { Toastify } from "../../App";
import axios from "../../helpers/axios";
import { authConstant } from "../constants";
import moment from 'moment';


export const studentPic=(pic)=>{
  return(dispatch)=>{
    try{
      console.log(pic,"pic")
      Toastify("success", "save templ save !");
      dispatch({type:"student_temp_pic",payload:pic})
    }
    catch(error){
      Toastify("error", error.response.data.message);
    }
  }
}

export const AddNewStudent = (studentDetails,history,token) => {

    return async (dispatch) => {
      try {
      // console.log(studentDetails,"data");
        dispatch({ type:"new_student_Add_req" });
        let res = await axios(token).post("/student/admission",studentDetails);
        
        if (res.status == 200) {
          Toastify("success", "New studnet added !");
          dispatch({type: "new_student_Add_success"});
          history.push("/StudentList")
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
  

  export const DeleteStudent = (id,department,token) => {
    return async (dispatch) => {
      try {
    
        let res = await axios(token).delete(`/student/deleteOneStudentCollege/${department}/${id}`);

        console.log(res.data, 'res.data');

        if (res.status == 200) {
          Toastify("success", "Deleted Sucessfully");
          dispatch({ type: "update_student_list",payload:res.data.data});
          dispatch({ type: "tot_student",payload:res.data.data.length});

          const data = {

            date :  moment().format('YYYY-MM-DD'), 
            receipts : -res.data.delStudent.paidAmount, 
            department : department
          }

          try {
            let result = await axios().post("/cashBook/add_to_cashBook", data);
      
             console.log( result.data , 'res.data' );

             if( result.status == 200 ){
                 
                  // Toastify("success", "Amount deducted from cashbook !");
             }else{
                  Toastify("success", "Something went wrong in cashbook !");
             }
          } catch (error) {
            Toastify("error", "Something Went Wrong");
          }
          // window.location.reload();
        } else {
          Toastify("error", "Unable to Logout");          
        }
      } catch (error) {
  
        Toastify("error", error.response.data.message);
      
      }
    };
  };

  export const updateStudent = (id,body,history,token) => {
    return async (dispatch) => {
      try {
    
        let res = await axios(token).patch(`/student/updateOneStudentCollege/${id}`,{
          ...body
        });
        dispatch({ type: "oneStudent_data_req"});
        if (res.status == 200) {  
          Toastify("success", "Updated Sucessfully");
          dispatch({ type: "oneStudent_data",payload:res.data.data });
          history.push("/studentList");
          window.location.reload();
        } else {
          Toastify("error", "Unable to Logout");
          dispatch({ type: "oneStudent_data_err"});
        }
      } catch (error) {
        dispatch({ type: "oneStudent_data_err"});
        Toastify("error", error.response.data.message);

      }
    };
  };

  
  export const getOneStudent = (id,token) => {
    return async (dispatch) => {
      try {    
        let res = await axios().get(`/student/oneStudentsCollege/${id}`);
        if (res.status == 200) {
          dispatch({ type: "oneStudent_data",payload:res.data.data });
        } else {
          Toastify("error", "Unable get student");
        }
      } catch (error) {
  
        Toastify("error", error);
        
      }
    };
  };

  
  export const getAllStudent = (id,conditions,token) => {
    return async (dispatch) => {
      try {
    
        let res = await axios(token).get(`/student/allStudentsCollege/${id}`);
     
        if (res.status == 200) {
  
          dispatch({
            type: "update_student_list",
            payload: res.data.data
          });
          dispatch({
            type: "tot_student",
            payload: res.data.data.length
          });
        } else {
          Toastify("error", "Unable to find students");
          dispatch({
            type: "update_student_list",
            payload: null
          });
        }
      } catch (error) {
  
        Toastify("error", error?.response?.data?.message);
        dispatch({
          type: authConstant.LOGOUT_FAIL,
          payload: { error: error?.message },
        });
      }
    };
  };

  export const studentListChange = (name,value,list) => {
    return async (dispatch) => {
      try {
  
        console.log(name,value,list,"name,value,list")
       
        
      } catch (error) {
  
        Toastify("error", error.response.data.message);
        dispatch({
          type: authConstant.LOGOUT_FAIL,
          payload: { error: error.message },
        });
      }
    };
  };
  
/**
 * 
export const updateNotificationStudents = (studentsFiltration, _id) => {
  return async (dispatch) => {
    try {
        let res = await axios().get(`/student/allDepartmentStudents/${_id}`)

        console.log(res.data)
        
      if (res.status == 200) {
        
        let filteredStudents = [];
        if (
          studentsFiltration.section !== "all" &&
          studentsFiltration.standard !== "all"
        ) {
          filteredStudents = res.data.filter(
            (student) =>
              student.section == studentsFiltration.section &&
              student.standard == studentsFiltration.standard
          );
        } else if (studentsFiltration.section !== "all"&&studentsFiltration.standard === "all") {
          filteredStudents = res.data.data.filter(
            (student) => student.section == studentsFiltration.section
          );
        } else if (studentsFiltration.standard !== "all"&&studentsFiltration.section === "all") {
          filteredStudents = res.data.data.filter(
            (student) => student.standard == studentsFiltration.standard
          );
        } else {
          filteredStudents = res.data.data;
        }

        dispatch({
          type: "update_student_notify_list",
          payload: filteredStudents,
        });
      } else {
        Toastify("error", "Unable filter students");
      }
    } catch (error) {
      console.log(error, "error");
      Toastify("error", error);
    }
  };
};

 */
  

  //  fee payment 

  export const getOneStudentFree = (number,department) => {
    return async (dispatch) => {
      try {
    
        dispatch({ type: authConstant.LOGOUT_REQUEST });
        let res = await axios().get(`/admin/logoutAll/${number}/${department}`);

        if (res.status == 200) {
          localStorage.clear();
          dispatch({ type: "getOneStudentFree",payload:res.data.data });
        } else {
          Toastify("error", "Student not found ");
          
        }
      } catch (error) {
        Toastify("error", error.response.data.message);        
      }
    };
  };


  export const getStudentsFeeReport = (details) => {
    return async (dispatch) => {
      try {
        let res = await axios().post("/student/getStudentsFeeReport", details);

        console.log( res.data )

        if (res.status == 200) {
      
          dispatch({ type: "get_student_report",payload:res.data.data });
        } else {
          Toastify("error", "Student not found ");
        }
      } catch (error) {
        Toastify("error", error.response.data.message);        
      }
    };
  };


  export const  setMobileNO=(phoneNo)=>{
    return async (dispatch) => {
      try {
        if(phoneNo.length==0){
          Toastify("error", "Please select at least one student");        
          return
        }
          dispatch({ type: "setMobileNo",payload:phoneNo });
        
      } catch (error) {
        Toastify("error", error.response.data.message);        
      }
    };

  }
  
  