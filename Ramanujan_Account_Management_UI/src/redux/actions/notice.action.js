import { Toastify } from "../../App";
import axios from "../../helpers/axios";
import { NoticeRegConst } from "../constants";

const {

    NOTICE_API_REQ,
    NOTICE_REG_Success,
    NOTICE_GET_Success, 
    NOTICE_EDIT_Success, 
    NOTICE_DELETE_Success, 
    ONE_NOTICE_GET_Success, 
    NOTICE_FILTER, 
    CLEAR_FILTER, 
    NOTICE_API_FAIL 

} = NoticeRegConst

export const AddNewNotice = (data) => {

    return async (dispatch) => {
         
          try {
             dispatch({ type : NOTICE_API_REQ })

             var formData = new FormData()

        //     Type, Class, Section, Subject, Title, Upload_file

             formData.append("file",data.Upload_file)
             formData.append("upload_preset","uc_upload")
             formData.append("cloud_name","uc")

             fetch("https://api.cloudinary.com/v1_1/dzoknbcnl/image/upload",{

                method:"post",
                body:formData
                
             }).then((res)=>res.json())
             .then(async(result)=>{

                const res = await axios().post('/notice/createNewNotice', {
                    ...data,
                    Upload_file : result.url
                })

                  console.log(res.data)
       
                  if(res.status == 200){
                        
                    dispatch({
                        type :  NOTICE_REG_Success,
                        payload : res.data.data
                    })
                    Toastify("success"," Notice Successfully added! ")
                  }else{

                    dispatch({ type : NOTICE_API_FAIL  })
                    Toastify("error",res.data.message)
                  }   
                }).catch((error)=>{
                    console.log(error)
              
                    dispatch({ type : NOTICE_API_FAIL  })
                    Toastify("error","Notice upload Fail")
                })

          } catch (error) {

             console.log(error)
              
             dispatch({ type : NOTICE_API_FAIL  })
             Toastify("error","Notice upload Fail")
          }
    }
}

export const getAllNotice = (data) => {

    return async (dispatch) => {
         
          try {
             dispatch({ type : NOTICE_API_REQ })
             
             const res = await axios().get('/notice/getAllNotice')

             console.log(res.data)

             if(res.status==200){

                 dispatch({
                    type : NOTICE_GET_Success,
                    payload : res.data.data
                 })
             }else{

                dispatch({ type : NOTICE_API_FAIL  })
                Toastify("error",res.data.message)
             }

          } catch (error) {

             console.log(error)
              
             dispatch({ type : NOTICE_API_FAIL  })
             Toastify("error","Something went wrong!")
          }
    }
}

export const deleteNotice = (id) => {

   //image to be deleted later from cloudinary
   
   return async (dispatch) => {
         
      try {
         dispatch({ type : NOTICE_API_REQ })
         
         const res = await axios().delete(`/notice/delete/${id}`);

         console.log(res.data)

         if(res.status==200){

             dispatch({
                type : NOTICE_DELETE_Success,
                payload : id
             })

             Toastify("success","Deleted successfully!")
         }else{

            dispatch({ type : NOTICE_API_FAIL  })
            Toastify("error",res.data.message)
         }

      } catch (error) {

         console.log(error)
          
         dispatch({ type : NOTICE_API_FAIL  })
         Toastify("error","Something went wrong!")
      }
   }
} 

export const filterNotice = (word) => {
   return async (dispatch)=>{

      dispatch({
         type : NOTICE_FILTER,
         payload : word
      })
   }
}

export const clearNotice = (word) => {
   return async (dispatch)=>{

      dispatch({
         type : CLEAR_FILTER
      })
   }
}