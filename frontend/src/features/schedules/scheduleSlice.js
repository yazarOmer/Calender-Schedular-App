import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import scheduleService from "./scheduleService";

const initialState = {
    schedules: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// create schedule
export const createSchedule = createAsyncThunk('schedules/create', async (scheduleData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await scheduleService.createSchedule(scheduleData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSchedule.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createSchedule.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.schedules.push(action.payload)
            })
            .addCase(createSchedule.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = scheduleSlice.actions
export default scheduleSlice.reducer