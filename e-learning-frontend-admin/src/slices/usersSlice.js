import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { listUsers, deleteUser as deleteUserService } from '../services/userService';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await listUsers();
    return response.data;
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'idle',
        error: null
    },
    reducers: {
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { deleteUser } = usersSlice.actions;

export const deleteUserAsync = (userId) => async (dispatch) => {
    await deleteUserService(userId);
    dispatch(deleteUser(userId));
};

export default usersSlice.reducer;
