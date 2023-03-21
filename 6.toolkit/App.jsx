import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { logIn } = require('./actions/user'); // 비동기는 action에서
const { addPost } = require('./actions/post'); // 비동기는 action에서
const userSlice = require('./reducers/userSlice'); // 동기는 reducer에서

const App = () => {
  const user = useSelector((state) => state.user);
  const { list } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(logIn({ // 사용자가 아이디, 패스워드 입력
      id: 'Giyoun',
      password: '비밀번호',
    }));
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userSlice.actions.logOut());
  }, []);


  const addPosting = useCallback(() => {
    dispatch(addPost());
  }, []);

  return (
    <div>
      {user.isLoggingIn
        ? <div>로그인 중</div>
        : user.data
          ? <div>{user.data.nickname}</div>
          : '로그인 해주세요.'}
      {!user.data
        ? <button onClick={onClick}>로그인</button>
        : <button onClick={onLogout}>로그아웃</button>}
        <button onClick = {addPosting}>포스팅하기</button>
    </div>
  );
};

export default App;
