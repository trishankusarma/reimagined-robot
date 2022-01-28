import { Toastify } from "../../App";
import axios from "../../helpers/axios";
import { StaffRegConst } from "../constants";
import moment from "moment";

const {

    STAFF_API_REQ, 
    
    ONE_STAFF_GET_Success,
    STAFF_REG_Success, 
    STAFF_GET_Success, 
    STAFF_EDIT_Success, 
    STAFF_DELETE_Success, 
    STUFF_FILTER,
    CLEAR_FILTER,

    STAFF_API_FAIL, 
    
} = StaffRegConst

const format = (data, url)=>{

     return {
      snap_shot : url,
      idNo : data.IDNo,
      biometric_code : data.biometric,
      DOB : data.DOB,
      name : data.teacherName,
      gender : data.sex,
      address : data.address,
      mobileNo : data.mobileNo,
      email : data.email,
      joining_Date : data.joiningDate,
      designation : data.desination,
      maritial_Status : data.married,
      blood_grp : data.bloodGroup,
     }
}

export const AddNewStaff = (data, history) => {

    return async (dispatch) => {
         
          try {
             dispatch({ type : STAFF_API_REQ })

             var formData = new FormData()

             formData.append("file",data.upload_photo)
             formData.append("upload_preset","uc_upload")
             formData.append("cloud_name","uc")

             fetch("https://api.cloudinary.com/v1_1/dzoknbcnl/image/upload",{

                method:"post",
                body:formData
                
             }).then((res)=>res.json())
             .then(async(result)=>{

                const res = await axios().post('/stuff/createNewStuff', format( data , result.url ))

                  console.log(res.data)
       
                  if(res.status == 200){
                        
                    dispatch({
                        type :  STAFF_REG_Success,
                        payload : res.data.data
                    })
                    Toastify("success","Registration Successful")

                    history.push('/StaffList')
                  }else{

                    dispatch({ type : STAFF_API_FAIL  })
                    Toastify("error",res.data.message)
                  }   
                }).catch((error)=>{
                    console.log(error)
              
                    dispatch({ type : STAFF_API_FAIL  })
                    Toastify("error","Registration Fail")
                })

          } catch (error) {

             console.log(error)
              
             dispatch({ type : STAFF_API_FAIL  })
             Toastify("error","Registration Fail")
          }
    }
}

export const getAllStaff = (id) => {

    return async (dispatch) => {
         
          try {
             dispatch({ type : STAFF_API_REQ })
             
             const res = await axios().get(`/stuff/allDepartmentStuff/${id}`)

             console.log(res.data)

             if(res.status==200){

                 dispatch({
                    type : STAFF_GET_Success,
                    payload : res.data
                 })
             }else{

                dispatch({ type : STAFF_API_FAIL  })
                Toastify("error",res.data.message)
             }

          } catch (error) {

             console.log(error)
              
             dispatch({ type : STAFF_API_FAIL  })
             Toastify("error","Something went wrong!")
          }
    }
}

export const editStuff = (data, id, history) => {
   
   return async (dispatch) => {
         
      try {
         dispatch({ type : STAFF_API_REQ })

         let res;

         if(typeof upload_photo==='string'){
               res = await axios().patch(`/stuff/edit/${id}`, format( data , data.upload_photo ) )

               console.log(res.data)
            
               if(res.status==200){
      
                  dispatch({
                     type : STAFF_EDIT_Success,
                     payload : res.data.data
                  })

                  Toastify("success", "Successfully updated")

                  return history.push('/StaffList')
               }else{
      
                  dispatch({ type : STAFF_API_FAIL  })
                  Toastify("error",res.data.message)
               }
         }else{

            var formData = new FormData()

             formData.append("file",data.upload_photo)
             formData.append("upload_preset","uc_upload")
             formData.append("cloud_name","uc")

             //image to be deleted later from cloudinary

             fetch("https://api.cloudinary.com/v1_1/dzoknbcnl/image/upload",{

                method:"post",
                body:formData
                
             }).then((res)=>res.json())
             .then(async(result)=>{
            
                     res = await axios().patch(`/stuff/edit/${id}`,format( data, result.url ));

                     console.log(res.data)
            
                     if(res.status==200){
            
                        dispatch({
                           type : STAFF_EDIT_Success,
                           payload : res.data.data
                        })

                        Toastify("success", "Successfully updated")

                        return history.push('/StaffList')
                     }else{
            
                        dispatch({ type : STAFF_API_FAIL  })
                        Toastify("error",res.data.message)
                     }
             })
         }

      } catch (error) {

         console.log(error)
          
         dispatch({ type : STAFF_API_FAIL  })
         Toastify("error","Something went wrong!")
      }
   }
} 

export const deleteStuff = (id) => {

   //image to be deleted later from cloudinary
   
   return async (dispatch) => {
         
      try {
         dispatch({ type : STAFF_API_REQ })
         
         const res = await axios().delete(`/stuff/delete/${id}`);

         console.log(res.data)

         if(res.status==200){

             dispatch({
                type : STAFF_DELETE_Success,
                payload : id
             })

             Toastify("success","Deleted successfully!")
         }else{

            dispatch({ type : STAFF_API_FAIL  })
            Toastify("error",res.data.message)
         }

      } catch (error) {

         console.log(error)
          
         dispatch({ type : STAFF_API_FAIL  })
         Toastify("error","Something went wrong!")
      }
   }
} 

export const getOneStuff = (id) => {
    
   return async (dispatch) => {
         
      try {
         dispatch({ type : STAFF_API_REQ })
         
         const res = await axios().get(`/stuff/get/${id}`);

         console.log(res.data)

         if(res.status==200){

             dispatch({
                type : ONE_STAFF_GET_Success,
                payload : res.data.data
             })
         }else{

            dispatch({ type : STAFF_API_FAIL  })
            Toastify("error",res.data.message)
         }

      } catch (error) {

         console.log(error)
          
         dispatch({ type : STAFF_API_FAIL  })
         Toastify("error","Something went wrong!")
      }
   }
}

export const filterStuff = (word) => {
   return async (dispatch)=>{
      dispatch({
         type : STUFF_FILTER,
         payload : word
      })
   }
}

export const clearStuff = (word) => {
   return async (dispatch)=>{

      dispatch({
         type : CLEAR_FILTER
      })
   }
}


export const salarySlip_InfoSet = (employee, month, year) => {
   return async (dispatch)=>{

      dispatch({
         type : "salary_Infosetup",
         payload:{
            employee, month, year
         }
      })
   }
}

export const salarySlipCreate = (data,token) => {
   return async (dispatch)=>{
     try{ let res= await axios().post("/stuff/salarySlipCreate",data)
      if(res.status==200){
         Toastify("success","salary slip created");

         const DATA = {

            date :  moment().format('YYYY-MM-DD'), 
            payments : data.netSalary, 
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

      }else{
         Toastify("error","something went worng");
      }

      // dispatch({ data
      //    type : "salary_Infosetup",
      //    payload:{
      //       employee, month, year
      //    }
      // })}
   }
   catch(error){
      console.log(error)
      Toastify("error","Something went wrong!")
   }
 }
}