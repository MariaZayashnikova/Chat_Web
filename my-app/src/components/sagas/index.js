import { call, put, takeLatest, all } from 'redux-saga/effects'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { toast } from 'react-toastify'
import { fb } from '../Firebase/componentFirebase'

const notifySuccess = (text) =>
    toast.success(text, {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
const notifyError = (text) =>
    toast.error(text, {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })

function fetchAuthorization(action) {
    return fb
        .auth()
        .signInWithEmailAndPassword(action.value.email, action.value.password)
        .then((response) => ({ response }))
        .catch((error) => ({ error }))
}

function fetchAuthorizationViaGoogle() {
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
    fb.auth().signOut()
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
            uid: response.user.uid,
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
            uid: response.user.uid,
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
            uid: response.user.uid,
        }
        yield put({ type: 'FETCH_MESSAGES_SUCCESS', data })
    }
    if (error) {
        yield put({ type: 'FETCH_MESSAGES_FAILURE', error })
    }
}

function* fetchResetPassword(action) {
    try {
        yield call(() => ResetPassword(action))
        notifySuccess('Письмо отпралено на почту')
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
        .ref('Chats/')
        .once('value')
        .then((snapshot) => ({ snapshot }))
        .catch((error) => ({ error }))
}

function* dataFromDatabase() {
    const { snapshot, error } = yield call(() => fetchDataFromDatabase())
    if (snapshot) {
        const data = snapshot.val()
        yield put({ type: 'Dialogues_From_Database', data })
    }
    if (error) {
        let err = {
            message: 'Что-то пошло не так... Попробуйте позже',
        }
        console.log(error)
        yield put({ type: 'FETCH_MESSAGES_FAILURE', err })
    }
}

function pushNewDialogueInDataBase(action) {
    let post = firebase.database().ref('Chats/')
    let newPost = post.push()
    newPost
        .set(action.value)
        .then(() => console.log('Данные добавлены в базу данных'))
        .catch((err) => console.log(err))
}

function updateDialogueInDataBase(action) {
    firebase
        .database()
        .ref('Chats/' + action.idDialogue)
        .update(action.value)
        .then(() => {
            notifySuccess('Данные успешно обновлены!')
        })
        .catch(() => {
            notifyError('Произошла ошибка при обновлении данных...')
        })
}

function pushNewMessageInDataBase(action) {
    firebase
        .database()
        .ref('Chats/' + action.idDialogue + '/messages/')
        .update(action.value)
        .then()
        .catch(() => {
            notifyError('Произошла ошибка, попробуйте позже...')
        })
}

function* update_Dialogue() {
    yield takeLatest('Update_Dialogue_In_Database', updateDialogueInDataBase)
}

function* pushNewMessage() {
    yield takeLatest('push_NewMessage_In_Database', pushNewMessageInDataBase)
}

function* push_Dialogue() {
    yield takeLatest('push_Dialogue', pushNewDialogueInDataBase)
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
    yield takeLatest('fetch_Dialogues_From_Database', dataFromDatabase)
}

export default function* rootSaga() {
    yield all([
        FETCH_Authorization(),
        FETCH_Registration(),
        FETCH_AuthorizationViaGoogle(),
        FETCH_Reset_Password(),
        Sign_Out_User(),
        fromDatabase(),
        push_Dialogue(),
        update_Dialogue(),
        pushNewMessage(),
    ])
}
