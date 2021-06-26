import {combineReducers} from 'redux';
import fetchBooksReducer from './reducer/books';

const RootReducer = combineReducers({
    bookState: fetchBooksReducer,
})

export default RootReducer;