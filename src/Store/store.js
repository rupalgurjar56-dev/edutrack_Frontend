import {configureStore} from '@reduxjs/toolkit'
import AuthReducer from './AuthSlice'
import studentReducer from './studentSlice'
export const store = configureStore({
    reducer:{
        auth:AuthReducer,
        students:studentReducer,
    }
});