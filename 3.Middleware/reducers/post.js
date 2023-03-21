// reducer 분리되었으므로 initialState도 분리해야 한다.
const initialState = [];

const postReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'ADD_POSTING':
            return [...prevState, action.payload] ;
            // { // posts만 담당 하기 때문에 객체가 아닌 해당 값만 리턴
                // ...prevState,
            // };

        default: // 오타 대비
            return prevState;
    }
};

module.exports = postReducer;