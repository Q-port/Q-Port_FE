import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const BASE_URL = "http://localhost:3001/answers";

// patch 요청 put으로 수정해야함!

/** questionId를 받아와서 그 질문에 대한 답변글들을 조회하는 함수 */
export const readAnswers = createAsyncThunk(
  "answers/readAnswers",
  async (payload, thunkApi) => {
    try {
      const { data } = await axios.get(`${BASE_URL}?questionId=${payload}`);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

/** userId를 받아와서 그 유저가 남긴 답변글들을 조회하는 함수 */
export const readUserAnswers = createAsyncThunk(
  "answers/readAnswers",
  async (payload, thunkApi) => {
    try {
      const { data } = await axios.get(`${BASE_URL}?userId=${payload}`);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const addAnswer = createAsyncThunk(
  "answers/addAnswer",
  async (payload, thunkApi) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/answers`, payload);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const editAnswer = createAsyncThunk(
  "answers/editAnswer",
  async (payload, thunkApi) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/answers/${payload.id}`,
        payload.body
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const removeAnswer = createAsyncThunk(
  "answers/removeAnswer",
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
  answers: [],
  answer: {},
  isLoading: false,
  error: null,
};

const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {},
  extraReducers: {
    [readAnswers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [readAnswers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.answers = action.payload;
    },
    [readAnswers.rejected]: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    [readUserAnswers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [readUserAnswers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.answers = action.payload;
    },
    [readUserAnswers.rejected]: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    [addAnswer.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addAnswer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.answers.push(action.payload);
    },
    [addAnswer.rejected]: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    [editAnswer.pending]: (state, action) => {
      state.isLoading = true;
    },
    [editAnswer.fulfilled]: (state, action) => {
      state.isLoading = false;
      const target = state.answers.findIndex(
        (answer) => answer.id === action.payload.id
      );
      state.answers[target] = action.payload;
    },
    [editAnswer.rejected]: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    [removeAnswer.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeAnswer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.answers = state.answers.filter(
        (answer) => answer.id !== action.payload
      );
    },
    [removeAnswer.rejected]: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
  },
});

export default answersSlice.reducer;
