import { call, put, takeLatest, all } from 'redux-saga/effects'
import firebase from 'firebase/app'
import 'firebase/auth'
import { toast } from 'react-toastify'
import { fb } from '../Firebase/componentFirebase'

function fetchAuthorization(action) {
    return fb
        .auth()
        .signInWithEmailAndPassword(action.value.email, action.value.password)
        .then((response) => ({ response }))
        .catch((error) => ({ error }))
}

function fetchAuthorizationViaGoogle(action) {
    let provider = new firebase.auth.GoogleAuthProvider()
    return fb
        .auth()
        .signInWithPopup(provider)
        .then((response) => ({ response }))
        .catch((error) => ({ error }))
}

function fetchRegistration(action) {
    return fb
        .auth()
        .createUserWithEmailAndPassword(
            action.value.email,
            action.value.password
        )
        .then((response) => ({ response }))
        .catch((error) => ({ error }))
}

function CheckValidToken(action) {}

function ResetPassword(action) {
    let actionCodeSettings = {
        url: process.env.REACT_APP_url_for_redirect,
        handleCodeInApp: false,
    }
    return fb.auth().sendPasswordResetEmail(action.data, actionCodeSettings)
}

function* fetchUserAuthorization(action) {
    const { response, error } = yield call(() => fetchAuthorization(action))
    if (response) {
        let data = {
            name: response.user.displayName,
            email: response.user.email,
            token: response.user._lat,
        }
        yield put({ type: 'FETCH_MESSAGES_SUCCESS', data })
    }
    if (error) {
        yield put({ type: 'FETCH_MESSAGES_FAILURE', error })
    }
}

function* CheckUserToken(action) {
    const { payload, error } = yield call(() => CheckValidToken(action))
    if (payload) {
        console.log(payload)
    }
    if (error) {
        if (error.code === 'auth/id-token-revoked') {
            console.log(
                'Token has been revoked. Inform the user to reauthenticate or signOut() the user'
            )
        } else {
            console.log('Token is invalid')
        }
    }
}

function* fetchUserAuthorizationViaGoogle(action) {
    const { response, error } = yield call(() =>
        fetchAuthorizationViaGoogle(action)
    )
    if (response) {
        let data = {
            name: response.user.displayName,
            email: response.user.email,
            token: response.user._lat,
        }
        yield put({ type: 'FETCH_MESSAGES_SUCCESS', data })
    }
    if (error) {
        yield put({ type: 'FETCH_MESSAGES_FAILURE', error })
    }
}

function* fetchUserRegistration(action) {
    const { response, error } = yield call(() => fetchRegistration(action))
    if (response) {
        let data = {
            name: response.user.displayName,
            email: response.user.email,
            token: response.user._lat,
        }
        yield put({ type: 'FETCH_MESSAGES_SUCCESS', data })
    }
    if (error) {
        yield put({ type: 'FETCH_MESSAGES_FAILURE', error })
    }
}

function* fetchResetPassword(action) {
    const notify = () =>
        toast.success('Письмо отпралено на почту', {
            position: 'top-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    try {
        yield call(() => ResetPassword(action))
        yield put({ type: 'FETCH_MESSAGES_SUCCESS' })
        notify()
    } catch {
        let error = {
            message: 'Что-то пошло не так... Попробуйте позже',
        }
        yield put({ type: 'FETCH_MESSAGES_FAILURE', error })
    }
}

function* FETCH_Authorization() {
    yield takeLatest('FETCH_Authorization_REQUEST', fetchUserAuthorization)
}

function* FETCH_AuthorizationViaGoogle() {
    yield takeLatest(
        'FETCH_AuthorizationViaGoogle_REQUEST',
        fetchUserAuthorizationViaGoogle
    )
}

function* FETCH_Registration() {
    yield takeLatest('FETCH_Registration_REQUEST', fetchUserRegistration)
}

function* FETCH_Reset_Password() {
    yield takeLatest('RESET_PASSWORD', fetchResetPassword)
}

function* Check_Token() {
    yield takeLatest('Check_Token', CheckUserToken)
}

export default function* rootSaga() {
    yield all([
        FETCH_Authorization(),
        FETCH_Registration(),
        FETCH_AuthorizationViaGoogle(),
        FETCH_Reset_Password(),
        Check_Token(),
    ])
}
