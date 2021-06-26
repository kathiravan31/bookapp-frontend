import {
    BOOKS_STATE_REQUEST,
    BOOKS_STATE_SUCCESS,
    BOOKS_STATE_FAILURE,
    OUR_BOOKS_STATE_REQUEST,
    OUR_BOOKS_STATE_SUCCESS,
    OUR_BOOKS_STATE_FAILURE
} from '../constants/index'
import axios from 'axios';
import api from '../../api';



export const fetchBooks = () => {
    return ((dispatch) => {
        dispatch({type:BOOKS_STATE_REQUEST});
        axios({
            method:'GET',
            url:`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=QhbKGUsaP4dhc1cxpTAYNW1ChsUA9Yvx`
        }).then(res=>{
            if(res.data.results){
                const data = res.data.results.books
                dispatch({type:BOOKS_STATE_SUCCESS,payload: data})
            }
        }).catch(error =>{
            const data = error.message
            dispatch({type:BOOKS_STATE_FAILURE,payload: data})
        })
    })
}

export const fetchBooksOur = (token) => {

    return ((dispatch) => {
        dispatch({type:OUR_BOOKS_STATE_REQUEST});
        console.log('fetch books')
        axios({
            method:'GET',
            url:`${api}api/books`,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(res=>{
            if(res.data){
                const data = res.data
                dispatch({type:OUR_BOOKS_STATE_SUCCESS,payload: data})
            }
            else if(res.data.error){
                const data = res.data.error
                dispatch({type:OUR_BOOKS_STATE_FAILURE,payload: data})
            }
        }).catch(error =>{
            const data = error.message
            dispatch({type:OUR_BOOKS_STATE_FAILURE,payload: data})
        })
    })
}