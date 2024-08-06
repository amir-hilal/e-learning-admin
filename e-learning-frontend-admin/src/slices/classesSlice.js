import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addClass as addClassService,
  deleteClass as deleteClassService,
  editClass as editClassService,
  listClasses,
} from '../services/classService';

export const fetchClasses = createAsyncThunk(
  'classes/fetchClasses',
  async () => {
    const response = await listClasses();
    return response.data;
  }
);

export const addClass = createAsyncThunk(
  'classes/addClass',
  async (newClass) => {
    const response = await addClassService(newClass);
    return response.data;
  }
);

export const deleteClass = createAsyncThunk(
  'classes/deleteClass',
  async (classId) => {
    await deleteClassService(classId);
    return classId;
  }
);

export const editClass = createAsyncThunk(
  'classes/editClass',
  async ({ id, updatedClass }) => {

    const response = await editClassService(id, updatedClass);
    return response.data;
  }
);

const classesSlice = createSlice({
  name: 'classes',
  initialState: {
    classes: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    removeClass: (state, action) => {
      state.classes = state.classes.filter(
        (classItem) => classItem._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addClass.fulfilled, (state, action) => {
        state.classes.push(action.payload);
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.classes = state.classes.filter(
          (classItem) => classItem._id !== action.payload
        );
      })
      .addCase(editClass.fulfilled, (state, action) => {
        console.log('Class updated:', action.payload); // Debugging statement

        const index = state.classes.findIndex(
          (classItem) => classItem._id === action.payload.data._id
        );


        if (index !== -1) {
          state.classes[index] = action.payload.data;
        }
      });
  },
});

export const { removeClass } = classesSlice.actions;

export default classesSlice.reducer;
