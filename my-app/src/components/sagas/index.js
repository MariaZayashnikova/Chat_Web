import { call, put,  takeLatest } from 'redux-saga/effects';
import { FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, FETCH_MESSAGES_FAILURE } from '../../actions';
import firebase from "firebase/app";
import "firebase/auth";

function* fetchUser(action) {
    try {
        const data = yield call(() => {
            return firebase.auth().signInWithEmailAndPassword(action.value.email, action.value.password)
                .then((userCredential) => {
                    let user = userCredential.user;
                    console.log(user);
                });
        });
        yield put(FETCH_MESSAGES_SUCCESS());

    } catch (e) {
        yield put(FETCH_MESSAGES_FAILURE());
    }
}

function* FETCH_REQUEST() {
    yield takeLatest('FETCH_MESSAGES_REQUEST', fetchUser);
}

export default FETCH_REQUEST;
