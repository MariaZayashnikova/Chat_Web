import { call, put,  takeLatest, all } from 'redux-saga/effects';
import firebase from "firebase/app";
import "firebase/auth";
import {toast} from "react-toastify";

function fetchAuthorization(action) {
    return firebase.auth().signInWithEmailAndPassword(action.value.email, action.value.password)
        .then(response => ({ response }))
        .catch(error => ({ error }));
}

function fetchAuthorizationViaGoogle(action) {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(response => ({ response }))
        .catch(error => ({ error }));
}

function fetchRegistration(action) {
    return firebase.auth().createUserWithEmailAndPassword(action.value.email, action.value.password)
        .then(response => ({ response }))
        .catch(error => ({ error }));
}

function ResetPassword(action) {
    let actionCodeSettings = {
        url: 'http://localhost:3000',
        handleCodeInApp: false
    };
    return firebase.auth().sendPasswordResetEmail(action.data, actionCodeSettings);
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

function* fetchUserAuthorizationViaGoogle(action) {
    const { response, error } = yield call(() => fetchAuthorizationViaGoogle(action));
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

function* fetchResetPassword(action) {
    const notify = () => toast.success('Письмо отпралено на почту', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    try {
        yield call(() => ResetPassword(action));
        yield put({ type: 'FETCH_MESSAGES_SUCCESS'});
        notify();

    } catch {
        let error = {
            message: 'Что-то пошло не так... Попробуйте позже'
        }
        yield put({ type: 'FETCH_MESSAGES_FAILURE', error});
    }

}

function* FETCH_Authorization() {
    yield takeLatest('FETCH_Authorization_REQUEST', fetchUserAuthorization);
}

function* FETCH_AuthorizationViaGoogle() {
    yield takeLatest('FETCH_AuthorizationViaGoogle_REQUEST', fetchUserAuthorizationViaGoogle);
}

function* FETCH_Registration() {
    yield takeLatest('FETCH_Registration_REQUEST', fetchUserRegistration);
}

function* FETCH_Reset_Password() {
    yield takeLatest('RESET_PASSWORD', fetchResetPassword);
}

export default function* rootSaga() {
    yield all([
        FETCH_Authorization(),
        FETCH_Registration(),
        FETCH_AuthorizationViaGoogle(),
        FETCH_Reset_Password()
    ]);
}
