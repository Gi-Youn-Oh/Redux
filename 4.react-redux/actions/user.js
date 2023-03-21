const logIn = (data) => { // async action creator
  return (dispatch, getState) => { // async action
    dispatch(logInRequest(data));
    try {
      setTimeout(() => {
        dispatch(logInSuccess({
          userId: 1,
          nickname: 'Giyoun'
        }));
      }, 2000);
      // axios.post().then().catch()으로 나중에 대체
    } catch (e) {
      dispatch(logInFailure(e));
    }
  };
};

// 오타방지를 위해 상수로 선언
const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

const logInRequest = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
};

const logInSuccess = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  }
};

const logInFailure = (error) => {
  return {
    type: LOG_IN_FAILURE,
    error,
  }
};

const logOut = () => {
  return { // action
    type: 'LOG_OUT',
  };
};

module.exports = {
  logIn,
  logOut,
};
