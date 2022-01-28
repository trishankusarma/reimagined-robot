import { Toastify } from "../../App";
import axios from "../../helpers/axios";
import moment from "moment";

export const searchFeePayment = (department, rollNo) => {
  return async (dispatch) => {
    try {
      let res;
      let departmentName =JSON.parse(localStorage.getItem("user")).adminType.departmentName
      dispatch({ type: "initFeeInfo", payload: null });
      if (departmentName == "Hostel") {
        res = await axios().get(
          `/hostel/student/getStudent/${rollNo}`
        );
        console.log("part1")
      } else {
        res = await axios().get(
          `/student/oneStudentsCollegeForFee/${department}/${rollNo}`
        );
        console.log("part2")
      }

      if (res.status == 200) {

        dispatch({
          type: "fee_student_get",
          payload: {
            info:
              departmentName == "Hostel" ? res.data.data : res.data.data.data,
            payment:
              departmentName == "Hostel"
                ? res?.data?.payment
                : res.data.data.payment,
          },
        });

      } else {
        Toastify("error", "Unable to get student");
      }
    } catch (error) {
      
      if(error.response){
        Toastify("error", error?.response?.data?.message);
      }else{
        Toastify("error", error.message);
      }
      
    }
  };
};

const cashbook_pay = async ( Data )=>{

  console.log( Data , 'Data' );

  try {
    let result = await axios().post("/cashBook/add_to_cashBook", Data);

     console.log( result.data , 'res.data' );

     if( result.status == 200 ){
         
    }else{
         Toastify("success", "Something went wrong in cashbook !");
     }
  } catch (error) {
    Toastify("error", "Something Went Wrong");
  }
}

export const paymentFee = (
  info,
  department,
  student,
  history,
  departmentName
) => {
  return async (dispatch) => {
    try {
      if (info.paymentType == "Admission"||info.paymentType == "Installment") {
        if (info.admissionBalanceAmount - info.payNow < 0) {
          return Toastify(
            "warning",
            "Please review the amount you are about to pay"
          );
        }
        info = {
          ...info,
          admissionBalanceAmount: info.admissionBalanceAmount - info.payNow,
          balanceAmount:info.balanceAmount - info.payNow,
          paidAmount: info.paidAmount + info.payNow,
        };
        //add to admission amount
      } else if (
        info.paymentType == "Monthly"
        
      ) {
        if (info.balanceAmount - info.payNow < 0) {
          return Toastify(
            "warning",
            "Please review the amount you are about to pay"
          );
        }
        info = {
          ...info,
          balanceAmount: info.balanceAmount - info.payNow,
          paidAmount: info.paidAmount + info.payNow,
        };
      }
      if (info.payNow <= 0) {
        Toastify("warning", "Pay now amount must be greater then 0");
        return;
      }
      dispatch({ type: "update_tution_fee_req" });
      let res;
      if (departmentName == "Hostel") {
        res = await axios().post(`/student/studentPayment`, {
          info,
          department,
          student,
          departmentName,
        });
      } else {
        res = await axios().post(`/student/studentPayment`, {
          info,
          department,
          student,
        });
      }

      console.log(res.data, "recieved data");
      if (res.status == 200) {
        dispatch({
          type: "update_tution_fee_done",
          payload: {
            info:res.data.studentInfo,
            payment:res.data.data[0],
          },
        });

        Toastify("success", "Fee payment done");

        const Data = {

          date :  moment().format('YYYY-MM-DD'), 
          receipts : info.payNow, 
          department 
        }

        await cashbook_pay( Data );
      } else {
        if (res.status == 401) {
          Toastify("error", "Unable to get student");
          dispatch({ type: "update_tution_fee_fail" });
        }
      }
    } catch (error) {
      dispatch({ type: "update_tution_fee_fail" });
      Toastify("error", error);
    }
  };
};

export const studentPaymentFee = (info, department, student) => {
  return async (dispatch) => {
    try {
      let res = await axios().post(`/student/studentPayment`, {
        info,
        department,
        student,
      });
      console.log(res.data.data, "res.data.data");
      if (res.status == 200) {
        Toastify("success", "Fee payment done");
        dispatch({
          type: "fee_student_get",
          payload: res.data.data,
        });
      } else {
        if (res.status == 401) {
          Toastify("error", "Unable to get student");
        }
      }
    } catch (error) {
      console.log(error.response.data.message, "error");
      Toastify("error", error.response.data.message);
    }
  };
};

export const otherFeePayment = (
  info,
  department,
  student,
  history,
  departmentName
) => {
  return async (dispatch) => {
    student = {
      ...student,
      paidAmount: parseInt(student.paidAmount) + parseInt(info.amount),
      extraPay: parseInt(student.extraPay) + parseInt(info.amount),
      totalFee: parseInt(student.totalFee) + parseInt(info.amount),
    };
    try {
      dispatch({
        type: "otherfee_student_req",
      });
      let res;
      console.log(departmentName,"departmentName")
      if (departmentName == "Hostel") {
        res = await axios().post(`/student/studentOtherFeePayment`, {
          info,
          department,
          student,
          departmentName,
        });
      } else {
        res = await axios().post(`/student/studentOtherFeePayment`, {
          info,
          department,
          student,
          departmentName:false
        });
      }

      if (res.status == 200) {
        Toastify("success", "other fee  payment done");

        const Data = {

          date :  moment().format('YYYY-MM-DD'), 
          receipts : info.amount, 
          department 
        }

        await cashbook_pay( Data );

        dispatch({
          type: "otherfee_student_success",
        });
        history.push(`/fee-payment?enrollmentNo=${departmentName== "Hostel"?student?.student?.admissionNo:student?.admissionNo}`);
        // window.location.reload();
      } else {
        if (res.status == 401) {
          Toastify("error", "Unable to get student");
          dispatch({
            type: "otherfee_student_error",
          });
        }
      }
    } catch (error) {
      dispatch({
        type: "otherfee_student_error",
      });
      Toastify("error", error);
    }
  };
};

export const DeleteotherFeePayment = (feeId, id) => {
  return async (dispatch) => {

  }
};


export const initFeeInfo = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "initFeeInfo", payload: null });
    } catch (error) {
      console.log(error);
    }
  };
};
export const DeletePrevPayment =(data)=>{
  return async(dispatch)=>{
    try{
      dispatch({type:"delete_prev_data",payload:data})
    }
    catch(error){
      console.log(error);
    }
  }
}

export const DeleteOtherPayment =(data)=>{
  return async(dispatch)=>{
    try{
      dispatch({type:"delete_other_data",payload:data})
    }
    catch(error){
      console.log(error);
    }
  }
}

//  balance
export const getAllStudentBalance = (id,deaprtmentName) => {
  return async (dispatch) => {
    try {
      let res;
      if(deaprtmentName=="Hostel"){
        res = await axios().get(`/student/getAllBalanceStudent/${id}/${deaprtmentName}`);
      }else{
        res = await axios().get(`/student/getAllBalanceStudent/${id}/${false}`);
      }
      console.log(res.data.data.data,"asdasdsd")
      if (res.status == 200) {
        dispatch({
          type: "balance_student_get",
          payload: res.data.data.data,
        });
      } else {
        if (res.status == 401) {
          Toastify("error", "Unable to get student");
        }
      }
    } catch (error) {
      console.log(error, "error");
      Toastify("error", error);
    }
  };
};
