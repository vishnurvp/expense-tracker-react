import { createSlice } from "@reduxjs/toolkit";

const initialPremState = {
  isPremium: false,
  darkTheam: false,
};

const premSlice = createSlice({
  name: "premium",
  initialState: initialPremState,
  reducers: {
    setPremium(state, action) {
      state.isPremium = action.payload;
    },
    setDarkTheam(state, action) {
        state.darkTheam = action.payload;
    }
  },
});

export const premActions = premSlice.actions;
export default premSlice.reducer;
