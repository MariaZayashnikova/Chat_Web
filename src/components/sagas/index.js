import { call, put, takeLatest, all } from 'redux-saga/effects'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { toast } from 'react-toastify'
import uniqid from 'uniqid';
import { fb, storageRef } from '../Firebase/Firebase-config'

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

function* fetchUserAuthorization(action) {
    const { response, error } = yield call(() => fetchAuthorization(action))
    if (response) {
        let data = {
            name: response.user.displayName,
            email: response.user.email,
            photoUrl: response.user.photoURL,
            token: response.user._lat,
            uid: response.user.uid,
        }
        yield put({ type: 'fetchMessageSuccess', data })
    }
    if (error) {
        yield put({ type: 'fetchMessageFailure', error })
    }
}

function fetchAuthorizationViaGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider()
    return fb
        .auth()
        .signInWithPopup(provider)
        .then((response) => ({ response }))
        .catch((error) => ({ error }))
}

function* fetchUserAuthorizationViaGoogle(action) {
    const { response, error } = yield call(() =>
        fetchAuthorizationViaGoogle(action)
    )
    if (response) {
        let data = {
            name: response.user.displayName,
            email: response.user.email,
            photoUrl: response.user.photoURL,
            token: response.user._lat,
            uid: response.user.uid,
        }
        yield put({ type: 'fetchMessageSuccess', data })
    }
    if (error) {
        yield put({ type: 'fetchMessageFailure', error })
    }
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

function setStandardPhrasesUser(uid, phrases) {
    firebase
        .database()
        .ref('ready-madeOperatorPhrases/' + uid)
        .set(phrases)
}

function* fetchUserRegistration(action) {
    const { response, error } = yield call(() => fetchRegistration(action))
    if (response) {
        let data = {
            name: response.user.displayName,
            email: response.user.email,
            photoUrl: response.user.photoURL,
            token: response.user._lat,
            uid: response.user.uid,
        }
        yield put({ type: 'fetchMessageSuccess', data })
        yield call(() =>
            setStandardPhrasesUser(data.uid, {
                phrases: {
                    0: {
                        content: 'Сейчас проверю, одну минуту',
                        id: uniqid()
                    },
                    1: {
                        content: 'Давайте я уточню, с чем это связано, и вернусь ...',
                        id: uniqid()
                    },
                    2: {
                        content: 'Минутку, проверяю ваши данные',
                        id: uniqid()
                    },
                },
            })
        )
    }
    if (error) {
        yield put({ type: 'fetchMessageFailure', error })
    }
}

function ResetPassword(action) {
    let actionCodeSettings = {
        url: process.env.REACT_APP_url_for_redirect,
        handleCodeInApp: false,
    }
    return fb.auth().sendPasswordResetEmail(action.data, actionCodeSettings)
}

function* fetchResetPassword(action) {
    try {
        yield call(() => ResetPassword(action))
        notifySuccess('Письмо отпралено на почту')
    } catch {
        let error = {
            message: 'Что-то пошло не так... Попробуйте позже',
        }
        yield put({ type: 'fetchMessageFailure', error })
    }
}

function user_Logged_Out() {
    fb.auth().signOut()
}

function* userLoggedOut() {
    try {
        yield call(() => user_Logged_Out())
        yield put({ type: 'userLoggedOut' })
    } catch {
        let error = {
            message: 'Что-то пошло не так... Попробуйте позже',
        }
        yield put({ type: 'fetchMessageFailure', error })
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
        yield put({ type: 'dialoguesFromDatabase', data })
    }
    if (error) {
        let err = {
            message: 'Что-то пошло не так... Попробуйте позже',
        }
        console.log(error)
        yield put({ type: 'fetchMessageFailure', err })
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

function updatePassword(action) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let newPassword = action.value

            user.updatePassword(newPassword)
                .then(() => {
                    notifySuccess('Данные успешно обновлены!')
                })
                .catch((error) => {
                    notifyError('Произошла ошибка при обновлении данных...')
                })
        }
    })
}

function updateUserName(action) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            user.updateProfile({
                displayName: `${action.value}`,
            })
                .then(() => {
                    notifySuccess('Данные успешно обновлены!')
                })
                .catch((error) => {
                    notifyError('Произошла ошибка при обновлении данных...')
                })
        }
    })
}

function fetchUserSettings(action) {
    return firebase
        .database()
        .ref('ready-madeOperatorPhrases/' + action.value)
        .once('value')
        .then((snapshot) => ({ snapshot }))
        .catch((error) => ({ error }))
}

function* UserSettings(action) {
    const { snapshot, error } = yield call(() => fetchUserSettings(action))

    if (snapshot) {
        const data = snapshot.val()
        yield put({ type: 'userSettings', data })
    }

    if (error) {
        let err = {
            message: 'Что-то пошло не так... Попробуйте позже',
        }
        console.log(error)
        yield put({ type: 'fetchMessageFailure', err })
    }
}

function updateSettingsUser(action) {
    firebase
        .database()
        .ref('ready-madeOperatorPhrases/' + action.userUID)
        .update(action.value)
        .then(() => {
            notifySuccess('Данные успешно обновлены!')
        })
        .catch((error) => {
            notifyError('Произошла ошибка при обновлении данных...')
        })
}

function fetchTopics() {
    return firebase
        .database()
        .ref('topics/')
        .once('value')
        .then((snapshot) => ({ snapshot }))
        .catch((error) => ({ error }))
}

function* topicsFromDB() {
    const { snapshot, error } = yield call(() => fetchTopics())

    if (snapshot) {
        const data = snapshot.val()
        yield put({ type: 'setTopics', data })
    }

    if (error) {
        let err = {
            message: 'Что-то пошло не так... Попробуйте позже',
        }
        console.log(error)
        yield put({ type: 'fetchMessageFailure', err })
    }
}

function fetchUsersAvatar(action) {
    let image = storageRef.child(`${action.value.user.uid}-avatar.jpeg`);
    return image.getDownloadURL()
        .then((url) => ({ url }))
}

function* usersAvatar(action) {
    const { url } = yield call(() => fetchUsersAvatar(action))

    if (url) {
        let data = {
            name: action.value.user.name,
            email: action.value.user.email,
            photoUrl: url,
            token: action.value.user.token,
            uid: action.value.user.uid,
        }
        yield put({ type: 'fetchMessageSuccess', data })

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                user.updateProfile({
                    photoURL: url,
                })
            }
        })
    }
}

function updateUsersAvatar(action) {
    const metadata = {
        contentType: 'image/jpeg',
    }

    return storageRef.child(`${action.value.user.uid}-avatar.jpeg`).put(action.value.avatar, metadata)
        .then((snapshot) => ({ snapshot }))
        .catch((error) => ({ error }))
}

function* updateAndFetchAvatar(action) {
    let value = {
        user: action.value.user
    }

    const { snapshot, error } = yield call(() => updateUsersAvatar(action))

    if (snapshot) {
        yield put({ type: 'fetchUsersAvatar', value })
    }

    if (error) {
        let err = {
            message: 'Что-то пошло не так... Попробуйте позже',
        }
        yield put({ type: 'fetchMessageFailure', err })
    }
}

function* fetchAvatar() {
    yield takeLatest('fetchUsersAvatar', usersAvatar)
}

function* updateAvatar() {
    yield takeLatest('updateUsersAvatar', updateAndFetchAvatar)
}

function* fetchTopicsFromDB() {
    yield takeLatest('getTopicsFromDB', topicsFromDB)
}

function* fetchSettingsFromDB() {
    yield takeLatest('fetchUserSettings', UserSettings)
}

function* updateSettingsInDB() {
    yield takeLatest('updateSettingsDialogue', updateSettingsUser)
}

function* updateUserNameInDB() {
    yield takeLatest('updateUserName', updateUserName)
}

function* updateUserPassword() {
    yield takeLatest('updatePassword', updatePassword)
}

function* update_Dialogue() {
    yield takeLatest('updateDialogueInDatabase', updateDialogueInDataBase)
}

function* pushNewMessage() {
    yield takeLatest('pushNewMessageInDatabase', pushNewMessageInDataBase)
}

function* pushDialogueInDB() {
    yield takeLatest('pushDialogue', pushNewDialogueInDataBase)
}

function* fetchAuthorizationUser() {
    yield takeLatest('fetchAuthorization', fetchUserAuthorization)
}

function* fetchAuthorizationViaGoogleUser() {
    yield takeLatest(
        'fetchAuthorizationViaGoogle',
        fetchUserAuthorizationViaGoogle
    )
}

function* fetchRegistrationUser() {
    yield takeLatest('fetchRegistration', fetchUserRegistration)
}

function* fetchResetPasswordUser() {
    yield takeLatest('resetPassword', fetchResetPassword)
}

function* signOut() {
    yield takeLatest('signOutUser', userLoggedOut)
}

function* fromDatabase() {
    yield takeLatest('fetchDialoguesFromDatabase', dataFromDatabase)
}

export default function* rootSaga() {
    yield all([
        fetchAuthorizationUser(),
        fetchRegistrationUser(),
        fetchAuthorizationViaGoogleUser(),
        fetchResetPasswordUser(),
        signOut(),
        fromDatabase(),
        pushDialogueInDB(),
        update_Dialogue(),
        pushNewMessage(),
        updateUserPassword(),
        updateUserNameInDB(),
        updateSettingsInDB(),
        fetchSettingsFromDB(),
        fetchTopicsFromDB(),
        updateAvatar(),
        fetchAvatar()
    ])
}
