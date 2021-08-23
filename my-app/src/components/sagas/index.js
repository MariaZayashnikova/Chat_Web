import { call, put,  takeLatest } from 'redux-saga/effects';

function* fetchUser(action) {
    console.log('work saga');
    /*try {
        const user = yield call(Api.fetchUser, action.payload.userId);
        yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }*/
}

function* fooSagas() {
    yield takeLatest('FETCH_MESSAGES_REQUEST', fetchUser);
}

function* barSagas() {
    yield takeLatest('FETCH_MESSAGES_REQUEST', fetchUser);
}


export default function* rootSaga() {
    yield all([
        fooSagas,
        barSagas
    ]);
}
