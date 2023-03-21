//1. store 생성

const { createStore } = require('redux');
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

const store = createStore(reducer, initialState);

console.log(store.getState(), '\n'); 

store.dispatch(logIn({
    id: 1,
    name: 'Giyoun',
    admin: true,
}));
console.log('after log-in', store.getState(), '\n');

store.dispatch(addPosting({
    useId: 1,
    id: 1,
    content: 'Redux ing',
}));
console.log('after posting', store.getState(), '\n');

store.dispatch(addPosting({
    useId: 1,
    id: 2,
    content: 'Second posting',
}));
console.log('after posting 2', store.getState(), '\n');

store.dispatch(logOut());
console.log('after log-out', store.getState());
