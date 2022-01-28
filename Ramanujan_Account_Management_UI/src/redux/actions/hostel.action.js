import { hostelConstants } from "../constants";

import axios from "../../helpers/axios";
import { Toastify } from "../../App";
import moment from "moment";

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

  HOSTEL_API_FAIL,
} = hostelConstants;

//////////////hostel///////////////////

export const addHostel = (formData) => {
  return async (dispatch) => {
    if (!formData) return;

    try {
      dispatch({
        type: HOSTEL_API_REQ,
      });

      const res = await axios().post(
        "hostel/hostel_room/createNewHostelRoom",
        formData
      );

      if (res.status === 200) {
        dispatch({
          type: HOSTEL_REG_Success,
          payload: res.data.hostel,
        });
        Toastify("success", "Hostel successfully registered!");
      } else {
        dispatch({
          type: HOSTEL_API_FAIL,
        });
        Toastify("error", res.data.message);
      }
    } catch (error) {
      dispatch({
        type: HOSTEL_API_FAIL,
      });
      Toastify("error", "Some Error occured!");
    }
  };
};

export const editHostel = (formData, id) => {
  return async (dispatch) => {
    if (!formData) return;

    try {
      dispatch({
        type: HOSTEL_API_REQ,
      });

      const res = await axios().patch(
        `hostel/hostel_room/edit/${id}`,
        formData
      );

      console.log(res.data, "edit data");

      if (res.status === 200) {
        dispatch({
          type: HOSTEL_EDIT_Success,
          payload: res.data.hostel,
        });
        Toastify("success", "Hostel successfully edited!");
      } else {
        dispatch({
          type: HOSTEL_API_FAIL,
        });
        Toastify("error", res.data.message);
      }
    } catch (error) {
      dispatch({
        type: HOSTEL_API_FAIL,
      });
      Toastify("error", "Some Error occured!");
    }
  };
};

export const deleteHostel = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: HOSTEL_API_REQ,
      });

      const res = await axios().delete(`hostel/hostel_room/delete/${id}`);

      if (res.status === 200) {
        dispatch({
          type: HOSTEL_DELETE_Success,
          payload: res.data.hostel,
        });
        Toastify("success", "Hostel successfully deleted!");
      } else {
        dispatch({
          type: HOSTEL_API_FAIL,
        });
        Toastify("error", res.data.message);
      }
    } catch (error) {
      dispatch({
        type: HOSTEL_API_FAIL,
      });
      Toastify("error", "Some Error occured!");
    }
  };
};

export const getAllHostels = (type) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: HOSTEL_API_REQ,
      });

      const res = await axios().get("hostel/hostel_room/getAllHostels");

      console.log(res.data);

      if (res.status === 200) {
        dispatch({
          type:
            type === 1 ? "HOSTEL_GET_Success_With_Rooms" : HOSTEL_GET_Success,
          payload: res.data.hostels,
        });
      } else {
        dispatch({
          type: HOSTEL_API_FAIL,
        });
        Toastify("error", res.data.message);
      }
    } catch (error) {
      dispatch({
        type: HOSTEL_API_FAIL,
      });
      Toastify("error", "Some Error occured!");
    }
  };
};

//////////////rooms/////////////////////
export const getAllRooms = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: HOSTEL_API_REQ,
      });

      const res = await axios().get(`/hostel/hostel/room/getAllRooms/${id}`);

      if (res.status === 200) {
        dispatch({
          type: HOSTEL_GET_ROOM_Success,
          payload: res.data.rooms,
        });
      } else {
        dispatch({
          type: HOSTEL_API_FAIL,
        });
        Toastify("error", res.data.message);
      }
    } catch (error) {
      dispatch({
        type: HOSTEL_API_FAIL,
      });
      Toastify("error", "Some Error occured!");
    }
  };
};

export const createNewRoom = (id, formData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: HOSTEL_API_REQ,
      });

      const res = await axios().post(
        `/hostel/hostel/room/createNewRoom/${id}`,
        formData
      );

      if (res.status === 200) {
        dispatch({
          type: HOSTEL_CREATE_ROOM_Success,
          payload: res.data.room,
        });

        Toastify("success", "New Room created!");
      } else {
        dispatch({
          type: HOSTEL_API_FAIL,
        });
        Toastify("error", res.data.message);
      }
    } catch (error) {
      dispatch({
        type: HOSTEL_API_FAIL,
      });
      Toastify("error", "Some Error occured!");
    }
  };
};

export const editRoom = (id, formData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: HOSTEL_API_REQ,
      });

      const res = await axios().patch(
        `/hostel/hostel/room/edit/${id}`,
        formData
      );

      if (res.status === 200) {
        console.log(res.data.room);

        dispatch({
          type: HOSTEL_EDIT_ROOM_Success,
          payload: res.data.room,
        });

        Toastify("success", "Details updated!");
      } else {
        dispatch({
          type: HOSTEL_API_FAIL,
        });
        Toastify("error", res.data.message);
      }
    } catch (error) {
      dispatch({
        type: HOSTEL_API_FAIL,
      });
      Toastify("error", "Some Error occured!");
    }
  };
};

export const deleteRoom = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: HOSTEL_API_REQ,
      });

      const res = await axios().delete(`/hostel/hostel/room/delete/${id}`);

      if (res.status === 200) {
        dispatch({
          type: HOSTEL_DELETE_ROOM_Success,
          payload: res.data.room,
        });

        Toastify("success", "Room deleted successfully!");
      } else {
        dispatch({
          type: HOSTEL_API_FAIL,
        });
        Toastify("error", res.data.message);
      }
    } catch (error) {
      dispatch({
        type: HOSTEL_API_FAIL,
      });
      Toastify("error", "Some Error occured!");
    }
  };
};

////////////student admission///////////
export const addAdmission = (formData) => {
  return async (dispatch) => {
    try {
        
      let otherFee = 0;
      console.log(formData, "formData ");
      if (
        parseInt(formData.Admission_Fee) < parseInt(formData.admission_paid)
      ) {
        Toastify("error","Check the amount of admission paid and admission fee !");
      } else if (parseInt(formData.Total) < parseInt(formData.Total_paid)) {
        Toastify("error", "Check the amount of total fee paid and total fee !");
      } else {
        otherFee =
          parseInt(formData.Extra_Curricular_Activity_Fees) +
          parseInt(formData.Security_Deposit) +
          parseInt(formData.electricity_Fees) +
          parseInt(formData.food_Fees) +
          parseInt(formData.sport_Fees);

        formData = { ...formData, otherFee };
      }

      dispatch({
        type: HOSTEL_API_REQ,
      });

      const res = await axios().post(
        `/hostel/student/createhostelstudent`,
        formData
      );

      console.log(res.data);

      if (res.status === 200 && !res.data.error) {
        dispatch({
          type: HOSTEL_CREATE_ADMISSION_Success,
          payload: {
            ...res.data,
            name: res.data?.student?.name,
            rollNo: res.data?.student?.rollNo,
            gender: res.data?.student?.gender,
            mobileNo: res.data?.student?.mobileNo,
          },
        });

        Toastify("success", "Admission granted!");

        const Data = {

          date :  moment().format('YYYY-MM-DD'), 
          receipts : formData.Total_paid, 
          department : formData.department
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
        dispatch({
          type: HOSTEL_API_FAIL,
        });
        Toastify("warning", res.data.error);
      }
    } catch (error) {
      dispatch({
        type: HOSTEL_API_FAIL,
      });
      Toastify("error", "Some Error occured!");
    }
  };
};

export const getAllHostelers = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: HOSTEL_API_REQ,
      });

      const res = await axios().get(`/hostel/student/getallstudents`);

      console.log( res.data )

      if (res.status == 200) {
        console.log("students", res.data);

        dispatch({
          type: HOSTEL_GET_ALL_STUDENTS_Success,
          payload: res.data,
        });
      } else {
        dispatch({
          type: HOSTEL_API_FAIL,
        });
        Toastify("error", res.data.name);
      }
    } catch (error) {
      console.log(error);

      dispatch({
        type: HOSTEL_API_FAIL,
      });
      Toastify("error", "Some Error occured!");
    }
  };
};

export const editAdmission = (formData, id, previousPaid) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: HOSTEL_API_REQ,
      });

      const res = await axios().patch(
        `/hostel/student/updateonestudent/${id}`,
        formData
      );

      console.log("edit data", res.data);

      if (res.status === 200) {
        dispatch({
          type: HOSTEL_EDIT_ADMISSION_Success,
          payload: res.data,
        });

        Toastify("success", "Successfully Edited!");

        const Data = {

          date :  moment().format('YYYY-MM-DD'), 
          receipts : formData.Total_paid - previousPaid, 
          department : formData.department
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
        dispatch({
          type: HOSTEL_API_FAIL,
        });
        Toastify("warning", res.data.error);
      }
    } catch (error) {
      dispatch({
        type: HOSTEL_API_FAIL,
      });
      Toastify("error", "Some Error occured!");
    }
  };
};

export const deleteAdmission = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: HOSTEL_API_REQ
      });

      const res = await axios().delete(
        `/hostel/student/deleteonestudent/${id}`
      );

      console.log("delete data", res.data);

      if (res.status === 200) {
        dispatch({
          type: HOSTEL_DELETE_ADMISSION_Success,
          payload: res.data
        });

        Toastify("success", "Successfully Deleted!");

        
        const Data = {

          date :  moment( res.data.Admission_Date ).format('YYYY-MM-DD'), 
          receipts : -res.data?.admissionPaid , 
          department : res.data?.department
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
        dispatch({
          type: HOSTEL_API_FAIL,
        });
        Toastify("warning", res.data.error);
      }
    } catch (error) {
      dispatch({
        type: HOSTEL_API_FAIL,
      });
      Toastify("error", "Some Error occured!");
    }
  };
};

export const filterHostelStudents = (text) => {
  return async (dispatch) => {
    dispatch({
      type: HOSTEL_FILTER_ADMISSION_Success,
      payload: text,
    });
  };
};

export const clearHostelStudents = () => {
  return async (dispatch) => {
    dispatch({
      type: HOSTEL_CLEAR_FILTER_ADMISSION_Success,
    });
  };
};
