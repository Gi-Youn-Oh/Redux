const initialState = {
    isLoggingIn: false,
    data: null,
};

const userReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...prevState, // 기존의 state를 복사
                user: action.payload,
            };
        case 'LOG_OUT':
            return {
                ...prevState,
                user: null,
            };
        default: // 오타 대비
            return prevState;
    }
};

module.exports = userReducer;