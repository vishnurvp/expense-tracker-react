import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseReducer';
import authReducer from './authReducer';


const store = configureStore({
  reducer: {
    auth: authReducer,
    exp: expenseReducer,
  }
});

export default store;