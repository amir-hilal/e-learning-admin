import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import usersReducer from '../slices/usersSlice';
import classesReducer from '../slices/classesSlice';
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    classes: classesReducer,
  },
  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware().concat(logger);
  },
});

export default store;
