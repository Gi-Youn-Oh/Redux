//1. store 생성

const { createStore } = require('redux');

// 3. reducer 생성, state를 변경하는 함수, 순수함수여야 한다. (이전 state를 변경하지 않고, 새로운 state를 만들어서 반환한다.)
const reducer = (prevState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...prevState, // 기존의 state를 복사
                user: action.payload,
            };
        case 'ADD_POSTING':
            return {
                ...prevState,
                posts: [...prevState.posts, action.payload]
            };
        case 'LOG_OUT':
            return {
                ...prevState,
                user: null,
            };
        default: // 오타 대비
            return prevState;
    }
};

const initialState = {
    user: null,
    posts: [],
};

const store = createStore(reducer, initialState);


const logIn = (payload) => { // action creator
    return { // action
        type: 'LOG_IN',
        payload,
    }
};

const logOut = () => {
    return {
        type: 'LOG_OUT',
    }
};

const addPosting = (payload) => {
    return {
        type: 'ADD_POSTING',
        payload,
    }
};
// 위 쪽은 미리 만들어 두기
//--------------------------------------------------------

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
