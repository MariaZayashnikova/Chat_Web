import { call, put, takeLatest, all } from 'redux-saga/effects'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
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

function ResetPassword(action) {
    let actionCodeSettings = {
        url: process.env.REACT_APP_url_for_redirect,
        handleCodeInApp: false,
    }
    return fb.auth().sendPasswordResetEmail(action.data, actionCodeSettings)
}

function user_Logged_Out() {
    return fb.auth().signOut()
}

function* userLoggedOut() {
    try {
        yield call(() => user_Logged_Out())
        yield put({ type: 'user_Logged_Out' })
    } catch {
        let error = {
            message: 'Что-то пошло не так... Попробуйте позже',
        }
        yield put({ type: 'FETCH_MESSAGES_FAILURE', error })
    }
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

function fetchDataFromDatabase() {
    return firebase
        .database()
        .ref()
        .once('value')
        .then((snapshot) => ({ snapshot }))
}

function* dataFromDatabase() {
    try {
        const { snapshot } = yield call(() => fetchDataFromDatabase())
        const data = snapshot.val()
        yield put({ type: 'Data_From_Database', data })
    } catch {
        let error = {
            message: 'Что-то пошло не так... Попробуйте позже',
        }
        yield put({ type: 'FETCH_MESSAGES_FAILURE', error })
    }
}

function pushDataInDataBase(action) {
    let post = firebase.database().ref('Chats/')
    let newPost = post.push()
    newPost
        .set(action.value)
        .then(() => console.log('Данные добавлены в базу данных'))
        .catch((err) => console.log(err))
}

function updateDataInDataBase(action) {
    firebase
        .database()
        .ref('Chats/' + action.idDialogue)
        .update(action.value)
        .then(() => {
            console.log('update')
        })
        .catch(() => {
            console.log('error')
        })
}

function* update_Data() {
    yield takeLatest('Update_Data_In_Database', updateDataInDataBase)
}

function* push_Data() {
    yield takeLatest('push_Data', pushDataInDataBase)
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

function* Sign_Out_User() {
    yield takeLatest('SignOut_User', userLoggedOut)
}

function* fromDatabase() {
    yield takeLatest('fetch_Data_From_Database', dataFromDatabase)
}

export default function* rootSaga() {
    yield all([
        FETCH_Authorization(),
        FETCH_Registration(),
        FETCH_AuthorizationViaGoogle(),
        FETCH_Reset_Password(),
        Sign_Out_User(),
        fromDatabase(),
        push_Data(),
        update_Data(),
    ])
}
