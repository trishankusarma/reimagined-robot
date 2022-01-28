import { StaffRegConst } from '../constants'

const {

    STAFF_API_REQ  ,
    
    STAFF_REG_Success, 
    STAFF_GET_Success, 
    STAFF_EDIT_Success, 
    STAFF_DELETE_Success, 
    ONE_STAFF_GET_Success,
    STUFF_FILTER,
    CLEAR_FILTER,
        
    STAFF_API_FAIL
} = StaffRegConst

const initialState = {
    
     loading : false,
     stuffs : null,
     oneStuff : null ,
     searchStuff : null,
     basicSalaryInfo:{}
}

function startsWith(str, word) {

    if(word.length<=2)
        return false

    return str.lastIndexOf(word, 0) === 0;
}

export default (state = initialState, { type, payload }) => {

    switch (type) {
        
        case STAFF_API_REQ:
            return{
                ...state,
                loading : true
            }
        
        case STAFF_REG_Success:
            return{
                ...state,
                loading : false,
                stuffs : state.stuffs ? [ ...state.stuffs , payload ] : [payload]
            }
        
        case STAFF_GET_Success:
            return{
                ...state,
                loading: false,
                stuffs : payload
            }
            
        case STAFF_EDIT_Success:
            return{
                ...state,
                loading : false,
                stuffs : state.stuffs?.map((stuff)=>stuff._id===payload._id ? payload : stuff) ,
                oneStuff: null
            }
                
        case STAFF_DELETE_Success:
            return{
                ...state,
                loading : false,
                stuffs : state.stuffs.filter((stuff)=>stuff._id !== payload ) 
            }

        case ONE_STAFF_GET_Success:
            return{
                ...state,
                loading : false,
                oneStuff : payload
            }

        case STAFF_API_FAIL:
            return{
                ...state,
                loading : false
            }

        case STUFF_FILTER:

            RegExp.quote = function allowSpecialSymbols(str) {
                return str.replace(/([.?*+^$[\]\\(){}|-])/g, "");
            };
          
            const reg = new RegExp(RegExp.quote(`${payload}`), "gi");

            const searchedStuffs = [];

            state.stuffs.map((stuff)=>{

                if( startsWith( 'male' , payload.toLowerCase() )){

                     if(stuff.gender===1)
                        searchedStuffs.push(stuff)
                     
                }else if( startsWith('female' , payload.toLowerCase())){

                    if(stuff.gender===2)
                        searchedStuffs.push(stuff)

                }else if( startsWith( 'others', payload.toLowerCase())){

                    if(stuff.gender===3)
                        searchedStuffs.push(stuff)

                }else if( startsWith('married' , payload.toLowerCase())){

                    if(stuff.maritial_Status===1)
                          searchedStuffs.push(stuff)

                }else if( startsWith( 'not married' , payload.toLowerCase())){

                    if(stuff.maritial_Status===2)
                          searchedStuffs.push(stuff)

                }else{
                        
                    for(let index = 0; index < Object.keys(stuff).length; index++) {

                            const key = Object.keys(stuff)[index];

                            let value = stuff[key]
                                
                            if(reg.exec(value)){
                                searchedStuffs.push(stuff)
                                break;
                            }
                    } 
                }
            })
            
            return{
                ...state,
                searchStuff:searchedStuffs
            }
        
        case CLEAR_FILTER :
            return{
                ...state,
                searchStuff : null
            }

        case "salary_Infosetup" :
            return{
                ...state,
                basicSalaryInfo :payload
            }     
            
        default :
            return state
    }
}