const { createAsyncThunk } = require('@reduxjs/toolkit');

const delay = (time, value) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(value);
  }, time);
});

const addPost = createAsyncThunk('post/add', async () => {
  return await delay(500, {
    id: 1,
    content: 'Hello',
  });
});
module.exports = { addPost, };

// exports.addPost = createAsyncThunk('post/add', async (data, thunkAPI) => {
//   return await delay(500, data);
// });