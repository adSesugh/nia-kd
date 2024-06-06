import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from '@/features/slices'

export default combineReducers({
    auth: authReducer
})