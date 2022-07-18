import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseReducer';
import authReducer from './authReducer';
import premiumReducer from './premiumReducer';


const store = configureStore({
  reducer: {
    auth: authReducer,
    exp: expenseReducer,
    prem: premiumReducer,
  }
});

export default store;