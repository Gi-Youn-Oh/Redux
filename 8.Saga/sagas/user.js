// 이외에도 race, cancel, select, throttle, debounce 등도 자주 쓰인다.
// effect에서 next함수 자동 실행
import { all, fork, call, put, take, delay, takeLatest, takeEvery } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../reducers/user';

// call 동기적 호출, fork 비동기적 호출, put = action dispatch

const HELLO_SAGA = 'HELLO_SAGA';

function loginAPI() { // 서버 요청 api

}

function* logIn() {
    try {
        yield fork(logger) // 10초이상 걸리는 로깅 함수라면 비동기로 
        yield call(loginAPI); // 로그인 요청이들어오면 loginAPI를 호출
        yield put({ // put = dispatch
            type: LOG_IN_SUCCESS,
        })
    } catch (e) {
        console.log(e);
        yield put({
            type: LOG_IN_FAILURE,
        })
    }
}

function* watchLogin() { // 한번 함수 실행하면 끝
    yield take(LOG_IN, logIn); // 로그인 액션이 실행되면 login success 액션을 실행
    yield put({
        type: LOG_IN_SUCCESS,
    })
}

function* watchLogin() {
    while (true) {
        yield take(LOG_IN, logIn); // 로그인 액션이 실행되면 login success 액션을 실행
        yield put({
            type: LOG_IN_SUCCESS,
        })
    }
}

// while true 거의 99% 사용
function* watchLogin() {
    while (true) {
        yield take(LOG_IN, logIn); // 로그인 액션이 실행되면 login success 액션을 실행
        delay(2000); // 2초 딜레이
        yield put({
            type: LOG_IN_SUCCESS,
        })
    }
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP, signUp);
}

function* helloSaga() {
    console.log('before');
    yield take(HELLO_SAGA); // yield 중단 , HELLO_SAGA 액션이 들어오면 재개
    console.log('hello saga');
    // 비동기 요청, 타이머
}

// 만약 HELLO_SAGA를 3번 호출해도 1번만 실행 helloSaga() 함수가 실행 종료되기 때문! => generator 무한반복문
function* watchHello() {
    console.log('before');
    while (true) {
        yield take(HELLO_SAGA); // yield 중단 , HELLO_SAGA 액션이 들어오면 재개
        console.log('hello saga');
    }
}

//반복문 컨트롤
function* watchHello() {
    console.log('before');
    for (let i = 0; i < 5; i++) { // 5번 반복 (for문
        yield take(HELLO_SAGA);
        console.log('hello saga');
    }
}

// takeEvery, while true 없이 무한반복
function* watchHello() {
    yield takeEvery(HELLO_SAGA, function*() {
        yield put({
            type: 'BYE_SAGA'
        })
    })
}

// takeLatest : 마지막으로 실행된 액션만 실행 HELLO_SAGA를 3번 호출해도 1번만 실행 
// 이전 요청이 끝나지 않은게 있다면 이전 요청을 취소한다.
function* watchHello() {
    yield takeLatest(HELLO_SAGA, function*() {
        yield delay(1000);
        yield put({
            type: 'BYE_SAGA'
        })
    })
}


function* watchHello() {
    while(true) {
        yield take(HELLO_SAGA);
        console.log('1');
        console.log('2');
        console.log('3');
        console.log('4');
    }
}

// call, fork 는 둘다 함수를 실행하는데 call은 동기호출 fork는 비동기 호출
export default function* userSaga() {
    yield all([
        fork(watchLogin),
        watchLogin(), //안붙여도 상관없음
        fork(watchHello),
        fork(watchSignUp),
    ])
}

// pattern = userSaga에 action 등록  실행 함수 에서 takeEvery, takeLatest 등으로 실행