import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../shared/apis";

export const rankUser = createAsyncThunk(
  "users/rankUser",
  async (payload, thunkApi) => {
    try {
      const { data } = await api.get("ranks");
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

const initialState = {
  users: [],
  user: {},
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [rankUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.users = action.payload;
    },
  },
});

export const { getUser } = usersSlice.actions;
export default usersSlice.reducer;
