//1. store 생성

const { createStore } = require('redux');

// 3. reducer 생성, state를 변경하는 함수, 순수함수여야 한다. (이전 state를 변경하지 않고, 새로운 state를 만들어서 반환한다.)
const reducer = (prevState, action) => {
    switch (action.type) {
        case 'CHANGE_STRING':
            return {
                ...prevState, // 기존의 state를 복사
                string: action.payload,
            };
        case 'CHANGE_NUMBER':
            return {
                ...prevState,
                number: action.payload,
            };
        case 'CHANGE_BOOLEAN':
            return {
                ...prevState,
                boolean: action.payload,
            };
        default: // 오타 대비
            return prevState;
    }
};

const initialState = {
    string: 'hello',
    number: 1,
    boolean: true,
};

const store = createStore(reducer, initialState);

store.subscribe(() => { // state가 변경될 때마다 호출된다. react-redux에 들어 있음.
    console.log('changed');
});

console.log(store.getState()); 

//2. action 생성, 구체적 보다는 추상적으로 만드는 것이 확장성이 좋다.
// Bad Case
// const chageString = {
//     type: 'CHANGE_STRING',
//     payload: 'bye',
// }

// Good Case
const changeString = (payload) => { // action creator
    return { // action
        type: 'CHANGE_STRING',
        payload,
    }
};

const changeNumber = (payload) => {
    return {
        type: 'CHANGE_NUMBER',
        payload,
    }
};

const changeBoolean = (payload) => {
    return {
        type: 'CHANGE_BOOLEAN',
        payload,
    }
};

store.dispatch(changeString('bye'));
console.log('after change string',store.getState()); 

store.dispatch(changeNumber(2));
console.log('after change number',store.getState()); 

store.dispatch(changeBoolean(false));
console.log('after change boolean',store.getState()); 
