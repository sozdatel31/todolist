import {setIsLoggedInAC} from "../features/Login/authReducer";
import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState:initialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
type initialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer

export const setIsInitializedAC = slice.actions.setIsInitializedAC
export const setAppErrorAC = slice.actions.setAppErrorAC
export const setAppStatusAC = slice.actions.setAppStatusAC



export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
        }
    })
        .catch(() => {

        })
        .finally(() => {
            dispatch(slice.actions.setIsInitializedAC({isInitialized: true}))
        })
}