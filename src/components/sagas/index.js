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

function auth(action) {
    return fb
        .auth()
        .signInWithEmailAndPassword(action.value.email, action.value.password)
        .then((response) => ({ response }))
        .catch((error) => ({ error }))
}

function* getAuth(action) {
    const { response, error } = yield call(() => auth(action))
    if (response) {
        let data = {
            name: response.user.displayName,
            email: response.user.email,
            photoUrl: response.user.photoURL,
            token: response.user._lat,
            uid: response.user.uid,
        }
        yield put({ type: 'gotUser', data })
    }
    if (error) {
        yield put({ type: 'gotError', error })
    }
}

function authViaGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider()
    return fb
        .auth()
        .signInWithPopup(provider)
        .then((response) => ({ response }))
        .catch((error) => ({ error }))
}

function* getAuthViaGoogle(action) {
    const { response, error } = yield call(() =>
        authViaGoogle(action)
    )
    if (response) {
        let data = {
            name: response.user.displayName,
            email: response.user.email,
            photoUrl: response.user.photoURL,
            token: response.user._lat,
            uid: response.user.uid,
        }
        yield put({ type: 'gotUser', data })
    }
    if (error) {
        yield put({ type: 'gotError', error })
    }
}

function registration(action) {
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

function* getRegistration(action) {
    const { response, error } = yield call(() => registration(action))
    if (response) {
        let data = {
            name: response.user.displayName,
            email: response.user.email,
            photoUrl: response.user.photoURL,
            token: response.user._lat,
            uid: response.user.uid,
        }
        yield put({ type: 'gotUser', data })
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
        yield put({ type: 'gotError', error })
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
        yield put({ type: 'gotError', error })
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
        yield put({ type: 'gotError', error })
    }
}
//получение данных чатов один раз
// function fetchDataFromDatabase() {
//     return firebase
//         .database()
//         .ref('Chats/')
//         .once('value')
//         .then((snapshot) => ({ snapshot }))
//         .catch((error) => ({ error }))
// }

// function* dataFromDatabase() {
//     const { snapshot, error } = yield call(() => fetchDataFromDatabase())
//     if (snapshot) {
//         const data = snapshot.val()
//         yield put({ type: 'gotChats', data })
//     }
//     if (error) {
//         let err = {
//             message: 'Что-то пошло не так... Попробуйте позже',
//         }
//         console.log(error)
//         yield put({ type: 'gotError', err })
//     }
// }

function pushNewDialogueInDataBase(action) {
    let post = firebase.database().ref('Chats/')
    let newPost = post.push()
    newPost
        .set(action.value)
        .then(() => console.log('Данные добавлены в базу данных'))
        .catch((err) => console.log(err))
}

function updateChats(action) {
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

function addNewMessage(action) {
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
        yield put({ type: 'gotError', err })
    }
}

function updateChatSettings(action) {
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
        yield put({ type: 'gotError', err })
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
        yield put({ type: 'gotUser', data })

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
        yield put({ type: 'gotError', err })
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

function* updateChatSettingsInDB() {
    yield takeLatest('updateChatSettings', updateChatSettings)
}

function* updateUserNameInDB() {
    yield takeLatest('updateUserName', updateUserName)
}

function* updateUserPassword() {
    yield takeLatest('updatePassword', updatePassword)
}

function* fetchUpdateChats() {
    yield takeLatest('updateChatsInDB', updateChats)
}

function* pushNewMessage() {
    yield takeLatest('pushNewMessage', addNewMessage)
}

function* pushDialogueInDB() {
    yield takeLatest('pushDialogue', pushNewDialogueInDataBase)
}

function* getAuthUser() {
    yield takeLatest('auth', getAuth)
}

function* getAuthViaGoogleUser() {
    yield takeLatest('authViaGoogle', getAuthViaGoogle)
}

function* getUserRegistration() {
    yield takeLatest('registration', getRegistration)
}

function* fetchResetPasswordUser() {
    yield takeLatest('resetPassword', fetchResetPassword)
}

function* signOut() {
    yield takeLatest('signOutUser', userLoggedOut)
}

export default function* rootSaga() {
    yield all([
        getAuthUser(),
        getUserRegistration(),
        getAuthViaGoogleUser(),
        fetchResetPasswordUser(),
        signOut(),
        pushDialogueInDB(),
        fetchUpdateChats(),
        pushNewMessage(),
        updateUserPassword(),
        updateUserNameInDB(),
        updateChatSettingsInDB(),
        fetchSettingsFromDB(),
        fetchTopicsFromDB(),
        updateAvatar(),
        fetchAvatar()
    ])
}
