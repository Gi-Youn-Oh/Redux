import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { logIn } = require('./actions/user'); // 비동기는 action에서
const { addPost } = require('./actions/post'); // 비동기는 action에서
const userSlice = require('./reducers/userSlice'); // 동기는 reducer에서

const App = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassWord] = useState(''); 
  const user = useSelector((state) => state.user);
  const { list } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fulfilled, setFulfilled] = useState(false);

  // 컴포넌트 하나에서만 요청을 보내는 경우 dispatch로 보내는 것보다 낫다.
  // dispatch로 처리하면 코드가 길어진다.
  const onClick = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setFulfilled(false);
    try {
      const response = await axios.post('/api/login');
      setFulfilled(true);
    } catch (e) {
      setError(e);
    } finally{
      setIsLoading(false);
    }
  }, []);

  // const onClick = useCallback(() => {
  //   dispatch(logIn({ // 사용자가 아이디, 패스워드 입력
  //     id: 'Giyoun',
  //     password: '비밀번호',
  //   }));
  // }, []);

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
