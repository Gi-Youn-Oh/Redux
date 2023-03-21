
const addPosting = (payload) => {
    return {
        type: 'ADD_POSTING',
        payload,
    }
};

module.exports = {
    addPosting,
}