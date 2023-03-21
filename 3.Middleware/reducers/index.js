// reducer는 함수 이기 때문에 원래는 분할 할 수 없다. => combineReducers를 사용하면 분할 할 수 있다.
const { combineReducers } = require('redux'); 
const userReducer = require('./user');
const postReducer = require('./post');

module.exports = combineReducers({
    user: userReducer,
    posts: postReducer,
});