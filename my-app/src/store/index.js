import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'
import PostReducer from './reducers/PostReducer';

const rootReducers = combineReducers({
    AuthReducer,
    PostReducer
})

const middleWares = [thunkMiddleware]

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middleWares)))

export default store