const { createAsyncThunk, isPending } = require('@reduxjs/toolkit');

const delay = (time, value) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(value);
  }, time);
});

//thunk에서 try / catch를 사용하면 에러가 발생하지 않는다. => 비추 
//에러가 없으면 무조건 성공상태로 감
exports.logIn = createAsyncThunk('user/logIn', async (data, thunkAPI) => {
  // const state = thunkAPI.getState();
  // loading -> pending
  // success -> fulfilled 
  // failure -> rejected 
  console.log(data);
  // throw new Error('비밀번호가 틀렸습니다.');
  return await delay(500,{ // moking data (server) return
    userId: 1,
    nickname: 'Giyoun'
  });
});
