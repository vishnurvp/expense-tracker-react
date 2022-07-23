import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  apiKey: "AIzaSyCDH1TbzmhnXSFIsJYaiixXeP03MX4rw0Q",
  isAuthenticated: localStorage.getItem("token") ? true : false,
  idToken: localStorage.getItem("token") || "",
  email: localStorage.getItem("email") || "",
  cleanEmail: localStorage.getItem("cleanEmail") || "",
  isEmailVerified: localStorage.getItem("emailVerified") || false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.idToken = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.clear();
    },
    setEmail(state, action) {
      state.email = action.payload;
      localStorage.setItem("email", action.payload);
    },
    setCleanEmail(state, action) {
      state.cleanEmail = action.payload;
      localStorage.setItem("cleanEmail", action.payload);
    },
    setIsEmailVerified(state, action) {
      state.isEmailVerified = action.payload;
      localStorage.setItem("emailVerified", action.payload);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
