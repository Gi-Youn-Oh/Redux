const { produce } = require('immer');

const initialState = {
  isLoggingIn: false,
  data: null,
};

// export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
// export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
// export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
// export const LOG_OUT = 'LOG_OUT';

// nextState = produce(prevState, (draft) => {}) 기본 코드
// immer => 불변성 유지를 위해 코드가 길어지는 것을 해결해줌
const userReducer = (prevState = initialState, action) => { // 새로운 state 만들어주기
  return produce(prevState, (draft) => {
    switch (action.type) {
      case "LOG_IN_REQUEST":
        draft.data = null;
        draft.isLoggingIn = true;
        break;
      case "LOG_IN_SUCCESS":
        draft.data = action.data;
        draft.isLoggingIn = false;
        break;
      case "LOG_IN_FAILURE":
        draft.data = null;
        draft.isLoggingIn = false;
        break;
      case 'LOG_OUT':
        draft.data = null;
        break;
      default:
        break;
    }
  });
};

module.exports = userReducer;
