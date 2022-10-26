import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {},
  profile: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {},
});

export const { getUser } = usersSlice.actions;
export default usersSlice.reducer;
