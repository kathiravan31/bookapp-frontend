import {
    BOOKS_STATE_REQUEST,
    BOOKS_STATE_SUCCESS,
    BOOKS_STATE_FAILURE,
    OUR_BOOKS_STATE_REQUEST,
    OUR_BOOKS_STATE_SUCCESS,
    OUR_BOOKS_STATE_FAILURE
} from '../constants/index'

const initialState = {
    loading:false,
    books:[],
    ourBooks:[],
    error:''
}

const check = (book) => {
    books.map(item=>{
        if(item._id === book._id){
            return true
        }
        return false
    })
}

const fetchBooksReducer = (state = initialState, action) =>{
    switch(action.type){
        case BOOKS_STATE_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case BOOKS_STATE_SUCCESS:
            return{
                ...state,
                loading:false,
                books: action.payload,
                error:''
            }
        case BOOKS_STATE_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case OUR_BOOKS_STATE_REQUEST:
            return{
                ...state,
                loading:true
            }
        case OUR_BOOKS_STATE_SUCCESS:
            return{
                ...state,
                loading:false,
                ourBooks: action.payload, 
                error:''
            }
        case OUR_BOOKS_STATE_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export default fetchBooksReducer;