import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance, { api } from "../../shared/apis";

const BASE_URL = "";

/** questionId를 받아와서 해당 질문글을 조회하는 함수 */
export const readQuestion = createAsyncThunk(
  "questions/readQuestion",
  async (payload, thunkApi) => {
    try {
      const { data } = await api.get(`http://43.201.84.98/api/qnas/${payload}`);
      return thunkApi.fulfillWithValue(data.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

/** 질문글 추가하는 함수 */
export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async (payload, thunkApi) => {
    try {
      const { data } = await instance.post(
        `http://43.201.84.98/api/qnas`,
        payload
      );
      return thunkApi.fulfillWithValue(data.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

/** 질문글 전체를 조회하는 함수*/
export const readQuestions = createAsyncThunk(
  "questions/readQuestions",
  async (payload, thunkApi) => {
    try {
      console.log(process.env.REACT_APP_SERVER_URL);
      const { data } = await api.get("qnas");
      return thunkApi.fulfillWithValue(data.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const removeQuestion = createAsyncThunk(
  "questions/removeQuestion",
  async (payload, thunkApi) => {
    try {
      await axios.delete(`${BASE_URL}/${payload}`);
      return thunkApi.fulfillWithValue(payload);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

const initialState = {
  questions: [],
  question: {},
  isLoading: false,
  error: null,
};
const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: {
    [readQuestion.pending]: (state, action) => {
      state.isLoading = true;
    },
    [readQuestion.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.question = action.payload;
    },
    [readQuestion.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [addQuestion.pending]: (state) => {
      state.isLoding = true;
    },
    [addQuestion.fulfilled]: (state, action) => {
      state.isLoding = false;
      state.questions.push(action.payload);
    },
    [addQuestion.rejected]: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    },
    [readQuestions.pending]: (state) => {
      state.isLoding = true;
    },
    [readQuestions.fulfilled]: (state, action) => {
      state.isLoding = false;
      state.questions = action.payload;
    },
    [readQuestions.rejected]: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    },
    [removeQuestion.pending]: (state) => {
      state.isLoding = true;
    },
    [removeQuestion.fulfilled]: (state, action) => {
      state.isLoding = false;
      state.questions = state.questions.filter(
        (question) => question.id !== action.payload
      );
    },
    [removeQuestion.rejected]: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    },
  },
});

export default questionsSlice.reducer;
