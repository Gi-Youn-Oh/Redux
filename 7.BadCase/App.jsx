import React, { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit'; //reselect

const { logIn } = require('./actions/user'); // 비동기는 action에서
const { addPost } = require('./actions/post'); // 비동기는 action에서
const userSlice = require('./reducers/userSlice'); // 동기는 reducer에서

// 컴포넌트보다 상위에서 
// 순수 함수는 밖으로 뺄 수 있음
const PriceSelector = (state)=>state.user.prices;
// export 재사용 xxxx 함수로 한번 더 감싸서 사용
const sumPriceSelector = createSelector( // memoization 
  PriceSelector, // 캐싱의 기준 prices가 바뀌면 다시 계산
  (prices) => prices.reduce((a, c) => a + c, 0)
);


// export const makesumPriceSelector = () => createSelector( 
//   PriceSelector, 
//   (prices) => prices.reduce((a, c) => a + c, 0)
// );

// const sumPriceSelector = makesumPriceSelector();

const App = () => {
  const totalPrice = useSelector(sumPriceSelector);
  const [email, setEmail] = useState('');
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

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  // 불필요한 연산을 덜해도 되지만, prices값을 매번 비교를 해야함
  // const totalPrice = useMemo(() => {
  //   console.log("usememo");
  //   return prices.reduce((a, c) => a + c, 0)}, [prices]
  // );

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
      <div>
        {/* email 값을 입력받을 때마다 리렌더링 -> 계산이 반복적으로 이루어짐 */}
        <b>{totalPrice}원</b>
      </div>
      <button onClick={addPosting}>포스팅하기</button>
      <input type="email" value={email} onChange={onChangeEmail} />
    </div>

  );
};

export default App;
