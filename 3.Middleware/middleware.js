//1. store 생성

const { createStore, compose, applyMiddleware } = require('redux');
const reducer = require('./reducers');
const { logIn, logOut } = require('./actions/user');
const { addPosting } = require('./actions/post');

const initialState = {
    user: {
        isLoggingIn: false,
        data: null,
    },
    posts: [],
};

// next = dispatch
const firstMiddleware = (store) => (next) => (action) => {
    console.log('action logging', action, '\n'); // 추가 기능
    next(action); // 기본 기능
    // console.log('end action', '\n'); // 전 후로 추가 가능 
};

const thunkMiddleware = (store) => (next) => (action) => {
   if (typeof action === 'function') { // 비동기 인 경우
        return action(store.dispatch, store.getState);
   } 
   return next(action); // return 해도 되고 안해도 된다.
}
const enhancer = applyMiddleware(firstMiddleware, thunkMiddleware);


const store = createStore(reducer, initialState, enhancer);

console.log(store.getState(), '\n');

store.dispatch(logIn({
    id: 1,
    name: 'Giyoun',
    admin: true,
}));

console.log('after log-in', store.getState(), '\n');

// store.dispatch(addPosting({
//     useId: 1,
//     id: 1,
//     content: 'Redux ing',
// }));
// console.log('after posting', store.getState(), '\n');

// store.dispatch(addPosting({
//     useId: 1,
//     id: 2,
//     content: 'Second posting',
// }));
// console.log('after posting 2', store.getState(), '\n');

// store.dispatch(logOut());
// console.log('after log-out', store.getState());

