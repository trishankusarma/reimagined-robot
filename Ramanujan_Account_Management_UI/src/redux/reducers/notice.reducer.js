import { NoticeRegConst } from '../constants'

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

const initialState = {
    
     loading : false,
     notices : null,
     searchNotice : null
}

export default (state = initialState, { type, payload }) => {

    switch (type) {
        
        case NOTICE_API_REQ:
            return{
                ...state,
                loading : true
            }
        
        case NOTICE_REG_Success:
            return{
                ...state,
                loading : false,
                notices : state.notices ? [ ...state.notices , payload ] : [payload]
            }
        
        case NOTICE_GET_Success:
            return{
                ...state,
                loading: false,
                notices : payload
            }
            
        case NOTICE_EDIT_Success:
            return{
                ...state,
                loading : false,
                notices : state.notices?.map((stuff)=>stuff._id===payload._id ? payload : stuff) 
            }
                
        case NOTICE_DELETE_Success:
            return{
                ...state,
                loading : false,
                notices : state.notices.filter((stuff)=>stuff._id !== payload ) 
            }

        case NOTICE_API_FAIL:
            return{
                ...state,
                loading : false
            }

        case NOTICE_FILTER:

            RegExp.quote = function allowSpecialSymbols(str) {
                return str.replace(/([.?*+^$[\]\\(){}|-])/g, "");
            };
          
            const reg = new RegExp(RegExp.quote(`${payload}`), "gi");
            
            return{
                ...state,
                searchNotice : state.notices?.filter((notice) => notice?.Title?.match(reg) )
            }
        
        case CLEAR_FILTER :
            return{
                ...state,
                searchNotice : null
            }

        default :
            return state
    }
}