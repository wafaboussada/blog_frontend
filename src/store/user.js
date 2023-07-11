import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
    },
    reducers: {
        loginSucces: (state, action) => {
            return {
                ...state,
                user: action.payload
            }
        }
    }
});

export const { loginSucces } = userSlice.actions;
export default userSlice.reducer;
