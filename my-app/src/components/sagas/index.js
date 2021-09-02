import { call, put,  takeLatest, all } from 'redux-saga/effects';
import firebase from "firebase/app";
import "firebase/auth";


function fetchAuthorization(action) {
    return firebase.auth().signInWithEmailAndPassword(action.value.email, action.value.password)
        .then(response => ({ response }))
        .catch(error => ({ error }));
}

function fetchRegistration(action) {
    return firebase.auth().createUserWithEmailAndPassword(action.value.email, action.value.password)
        .then(response => ({ response }))
        .catch(error => ({ error }));
}

function* fetchUserAuthorization(action) {
    const { response, error } = yield call(() => fetchAuthorization(action));
         if(response) {
             yield put({ type: 'FETCH_MESSAGES_SUCCESS'});
         }
         if(error){
            yield put({ type: 'FETCH_MESSAGES_FAILURE', error});
         }
}

function* fetchUserRegistration(action) {
    const { response, error } = yield call(() => fetchRegistration(action));
    if(response) {
        yield put({ type: 'FETCH_MESSAGES_SUCCESS'});
    }
    if(error){
        yield put({ type: 'FETCH_MESSAGES_FAILURE', error});
    }
}

function* FETCH_Authorization() {
    yield takeLatest('FETCH_Authorization_REQUEST', fetchUserAuthorization);
}

function* FETCH_Registration() {
    yield takeLatest('FETCH_Registration_REQUEST', fetchUserRegistration);
}


export default function* rootSaga() {
    yield all([
        FETCH_Authorization(),
        FETCH_Registration()
    ]);
}
