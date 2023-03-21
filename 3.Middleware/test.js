function firstMiddleware(store) {
    console.log('first middleware');
    return function (next) {
        console.log('second middleware');
        return function (action) {
            console.log('third middleware');
        }
    }
};

const second = firstMiddleware();
second();
const third = second();
third();

