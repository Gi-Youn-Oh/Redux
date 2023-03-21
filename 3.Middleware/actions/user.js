const logIn = (payload) => { // async action
    return (dispatch, getState) => { // 함수를 리턴
        dispatch(logInRequest(payload));
        try {
        setTimeout(() => {
            dispatch(logInSuccess({
                userId: 1,
                nickname: 'Giyoun',
            }));
        }, 2000);
        } catch (err) {
            dispatch(logInFailure(err));
        }
    }
}

const logInRequest = (payload) => {
    return {
        type: 'LOG_IN_REQUEST',
        payload,
    }   
}

const logInSuccess = (payload) => {
    return {
        type: 'LOG_IN_SUCCESS',
        payload,
    }
}

const logInFailure = (error) => {
    return {
        type: 'LOG_IN_FAILURE',
        error,
    }
};

const logOut = () => {
    return {
        type: 'LOG_OUT',
    }
};

module.exports = {
    logIn,
    logOut,
}