const logIn = (payload) => { // action creator
    return { // action
        type: 'LOG_IN',
        payload,
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