import React, { Component } from 'react';
import { connect } from 'react-redux';
const { logIn, logOut } = require('./actions/user');

class App extends Component {
  onClick = () => {
    this.props.dispatchLogIn({
      id: 'Giyoun',
      password: '비밀번호',
    });
  };

  onLogout = () => {
    this.props.dispatchLogOut();
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        {user.isLoggingIn
          ? <div>로그인 중</div>
          : user.data
            ? <div>{user.data.nickname}</div>
            : '로그인 해주세요.'}
        {!user.data
          ? <button onClick={this.onClick}>로그인</button>
          : <button onClick={this.onLogout}>로그아웃</button>}
      </div>
    );
  }
}
// 함수 호출될 때 마다 매번 렌더링 => reselect 사용 
// Hook 에서는 사용할 필요 x
const mapStateToProps = (state) => ({
  user: state.user,
  posts: state.posts,
}); // reselect

const mapDispatchToProps = (dispatch) => ({
  dispatchLogIn: (data) => dispatch(logIn(data)),
  dispatchLogOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
