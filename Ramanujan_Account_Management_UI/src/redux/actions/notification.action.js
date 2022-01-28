import { Toastify } from "../../App";
import axios from "../../helpers/axios";
import { authConstant } from "../constants";


export const sendNotification = (people,message,title,departmentId) => {
    return async (dispatch) => {
      try {

        let res = await axios().post(`/notice_mail/sendMessage/${departmentId}`,{people,message,title});
        dispatch({
          type: "notification_req",
        });
        if (res.status == 200) {
            Toastify("success", "Message send successfully");
          dispatch({
            type: "new_notifications_list",
            payload:res.data,
          });
        } else {
          dispatch({
            type: "notification_fail",
          });
          
          Toastify("error", "unable to get notifications");
          
        }
      } catch (error) {
        dispatch({
          type: "notification_fail",
        });
          
        Toastify("error", error?.response?.data?.message);
        
      }
    };
  };
export const getAllNotifications = (departmentId,token) => {
  return async (dispatch) => {
    try {
      
      let res = await axios().get(`/notice_mail/sendMessageAll/${departmentId}`);
      
      if (res.status == 200) {
        dispatch({
          type: "get_all_notification",
          payload:res.data.data,
        });
      } else {
        if (res.status == 401) {
          Toastify("error", "unable to get notifications");
        }
      }
    } catch (error) {
        console.log(error,"error");
      Toastify("error", error);
      
    }
  };
};

export const updateNotificationStudents = (studentsFiltration, _id) => {
  return async (dispatch) => {
    try {
        let res = await axios().get(`/student/allDepartmentStudents/${_id}`)

        console.log(res.data)
        
      if (res.status == 200) {
                
      let filteredStudents = [];
        
      res.data.map((item)=>{
         
          if( (  studentsFiltration.standard == "all"  || studentsFiltration.standard == item.standard  ) 
            && (studentsFiltration.section == "all" || studentsFiltration.section == item.section ) 
            && (studentsFiltration.session == "all" || studentsFiltration.session == item.session )
          )
              filteredStudents.push(item)
      })

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

export const updateNotificationStuff = (_id) => {
  return async (dispatch) => {
    try {
        let res = await axios().get(`/stuff/allDepartmentStuff/${_id}`)

        console.log(res.data)
        
      if (res.status == 200) {

          dispatch({
            type: "update_stuff_notify_list",
            payload: res.data,
          });

      } else {
        Toastify("error", "Some error occured");
      }
    } catch (error) {
      console.log(error, "error");
      Toastify("error", error);
    }
  };
};

export const notificationSelect = (selects,rows) => {
  return async (dispatch) => {
    try {
     
      let selected=[]
      for(let i =0;i<selects.length;i++){
          for(let j=0;j<rows.length;j++){
              if(j==selects[i]-1){
                selected.push(rows[j]);
              }
          }
      }
      dispatch({type:"notification_selected",payload:selected})
    
    } catch (error) {
      
    }
  };
};

export const selectPerson = (selects,rows) => {
    return async (dispatch) => {
      try {
       
        let selected=[]
        for(let i =0;i<selects.length;i++){
            for(let j=0;j<rows.length;j++){
                if(j==selects[i]-1){
                  selected.push(rows[j]);
                }
            }
        }
        dispatch({type:"person_selected",payload:selected})
      
      } catch (error) {
        
      }
    };
  };
export const notificationDelete = (selects,departmentId,allData) => {
    return async (dispatch) => {
      try {
      if(selects.length==0) return Toastify("error", "select atleast one notification");
      
       let ids =[];
       for(let i =0;i<selects.length;i++){
        ids.push(selects[i]._id)
       }
        let res = await axios().delete(`/notice_mail/deleteSendNotificaiton/${departmentId}`,{data:ids})
   
        if(res.status==200){
            Toastify("success", "Deleted successfully");
           dispatch({type:"delete_notification_Success",payload:res.data.data})
        }
        
      
      } catch (error) {
        
      }
    };
  };