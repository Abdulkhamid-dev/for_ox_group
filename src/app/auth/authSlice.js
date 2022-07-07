import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccount: (state, action) => {
      return initialState;
    },
    updateAccount: (state,action) => {
      return {
        ...state,
        ...action.payload
      };
    },
  },
});

export const { clearAccount, updateAccount } = accountSlice.actions;
export default accountSlice.reducer;
