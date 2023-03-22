const { createSlice } = require('@reduxjs/toolkit');
const { addPost } = require('../actions/post');
const { logIn } = require('../actions/user');

const initialState = {
  list: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {}, // 동기적 
  // builder를 사용해야 타입스크립트에서 타입 명시할 때 좋다.
  extraReducers: (builder) => builder // 비동기적
    .addCase(addPost.pending, (state, action) => {
      // state = 123; immer를 깨야 하는 경우 명시적으로 리턴 
      // return state;
    })
    .addCase(addPost.fulfilled, (state, action) => {
      state.list.push(action.payload);
    })
    .addCase(addPost.rejected, (state, action) => {

    })

    // .addMatcher((action) => { 공통적인 로직 처리 로딩중일 때는 로딩중이라고 표시
    //   return action.type.includes('/pending');},
    //   (state, action) => {
    //     state.isLoading = true;
    // }
    // )

    // .addDefaultCase((state, action) => {
    //   // default
    // })

//     [logIn.pending]: (state, action) => { // user/logIn/pending
//       state.list = [];
//     },
});

module.exports = postSlice;
