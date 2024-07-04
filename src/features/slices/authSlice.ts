
import { AuthPayload } from "@/graphql/__generated__/graphql";
import { createSlice } from "@reduxjs/toolkit";


const userData: AuthPayload = {
    token: '',
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: { userData },
    reducers: {
        setUserData: (state, action) => {
            delete action.payload.__typename
            state.userData = action.payload
        },
        setProfilePhoto: (state, action) => {
            state.userData.user = {...state.userData.user, ...action.payload}
        },
        logOut: (state) => {
            state.userData = {}
        }
    }
})

export const { setUserData, logOut } = authSlice.actions

export default authSlice.reducer