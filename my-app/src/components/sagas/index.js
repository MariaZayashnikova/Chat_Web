import { call, put,  takeLatest } from 'redux-saga/effects';
import firebase from "firebase/app";
import "firebase/auth";


function fetch(action) {
    return firebase.auth().signInWithEmailAndPassword(action.value.email, action.value.password)
        .then(response => ({ response }))
        .catch(error => ({ error }));
}
function* fetchUser(action) {
    const { response, error } = yield call(() => fetch(action));
         if(response) {
             yield put({ type: 'FETCH_MESSAGES_SUCCESS'});
         }
         if(error){
            yield put({ type: 'FETCH_MESSAGES_FAILURE', error});
         }
}

function* FETCH_REQUEST() {
    yield takeLatest('FETCH_MESSAGES_REQUEST', fetchUser);
}

export default FETCH_REQUEST;
