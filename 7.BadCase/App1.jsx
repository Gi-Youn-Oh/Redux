import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { logIn } = require('./actions/user'); // 비동기는 action에서
const { addPost } = require('./actions/post'); // 비동기는 action에서
const userSlice = require('./reducers/userSlice'); // 동기는 reducer에서

const App = () => {
  // const {email, password} = useSelector((state) => state.user); 
  const [email, setEmail] = useState(''); 
  const [password, setPassWord] = useState(''); 
  // ---------------------------------------
  const user = useSelector((state) => state.user);
  // const { email, password } = useSelector((state) => state.user); 비구조화 해서 하위 컴포넌트 렌더링 최소화 but 객체 쓰는 건 별로 안좋은 습관 but 또 다 풀어서 쓰면 너무 길어짐 적당히 타협 
  // const email = useSelector((state) => state.user.email);
  // const password = useSelector((state) => state.user.password);
  // ---------------------------------------
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

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassWord(e.target.value);
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(userSlice.actions.setLoginForm({
      email,
      password,
    }))
  },[dispatch, email, password]);

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
        <form onSubmit={onSubmit}>
          <input type="email" value={email} onChange={onChangeEmail}/>
          <input type="password" value={password} onChange={onChangePassword} />
        </form>
    </div>
    
  );
};

export default App;
