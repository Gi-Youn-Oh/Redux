const { createSlice } = require('@reduxjs/toolkit');
const { logIn } = require('../actions/user');

const initialState = {
  isLoggingIn: false,
  data: null,
  email: '',
  password: '',
  prices: Array(100).fill().map((v, i) => (i + 1) * 100),
};

// immer 자동적용 in toolkit
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { // userSlice.actions.logOut로 접근 (1)
    logOut(state, action) {// 원래 비동기지만 테스트용으로 동기적으로
      state.data = null;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassWord(state, action) {
      state.password = action.payload;
    },
  },
  // postslice extraReducers에서도 사용 가능 (2)
  extraReducers: (builder) => builder
    .addCase(logIn.pending, (state, action) => { // action 의 data = payload 고정
      state.data = null;
      state.isLoggingIn = true;
    })
    .addCase(logIn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoggingIn = false;
    })
    .addCase(logIn.rejected, (state, action) => {
      state.error = action.payload;
    })
})

module.exports = userSlice;
