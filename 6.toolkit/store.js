const { configureStore } = require('@reduxjs/toolkit');

const reducer = require('./reducers');

//custom middleware
const firstMiddleware = () => (next) => (action) => {
  console.log('로깅', action);
  next(action);
};

// const store = configureStore({
//   reducer,
//   middleware: [firstMiddleware, ...getDefaultMiddleware()], // custom middleware + basic middleware
// });


const store = configureStore({
  reducer,
  // preloadedState, 서버 사이드 렌더링 전용
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firstMiddleware),
  devTools: process.env.NODE_ENV !== 'production', // 개발용일 때만 사용
});

module.exports = store;
