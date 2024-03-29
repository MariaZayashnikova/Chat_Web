export const auth = (value) => ({ type: 'auth', value, })
export const authViaGoogle = (value) => ({ type: 'authViaGoogle', value })
export const registration = (value) => ({ type: 'registration', value })
export const gotUser = (data) => ({ type: 'gotUser', data })
export const gotError = (error) => ({ type: 'gotError', error })
export const clearErrors = () => ({ type: 'clearErrors' })
export const resetPassword = (data) => ({ type: 'resetPassword', data })
export const signOutUser = () => ({ type: 'signOutUser' })
export const userLoggedOut = () => ({ type: 'userLoggedOut' })
export const getChats = () => ({ type: 'getChats' })
export const gotChats = (data) => ({ type: 'gotChats', data })
export const pushDialogue = (value) => ({ type: 'pushDialogue', value })
export const updateChatsInDB = (value, idDialogue) => ({ type: 'updateChatsInDB', value, idDialogue })
export const pushNewMessage = (value, idDialogue) => ({ type: 'pushNewMessage', value, idDialogue })
export const updatePassword = (value) => ({ type: 'updatePassword', value })
export const updateUserName = (value) => ({ type: 'updateUserName', value })
export const updatedUserName = (value) => ({ type: 'updatedUserName', value })
export const updateChatSettings = (value, userUID) => ({ type: 'updateChatSettings', value, userUID })
export const fetchUserSettings = (value) => ({ type: 'fetchUserSettings', value })
export const userSettings = (value) => ({ type: 'userSettings', value })
export const getTopicsFromDB = () => ({ type: 'getTopicsFromDB' })
export const setTopics = (value) => ({ type: 'setTopics', value })
export const updateUsersAvatar = (value) => ({ type: 'updateUsersAvatar', value })
export const fetchUsersAvatar = (value) => ({ type: 'fetchUsersAvatar', value })