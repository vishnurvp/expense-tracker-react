import { createSlice } from "@reduxjs/toolkit";

const initialExpState = {
  expenses: {},
  totalExpense: 0,
};

const expSlice = createSlice({
  name: "expenses",
  initialState: initialExpState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    setTotalExpense(state, action){
      state.totalExpense = action.payload;
    }
  },
});

export const expActions = expSlice.actions;
export default expSlice.reducer;
