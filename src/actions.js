export const fetchAuthorization = (value) => ({
    type: 'fetchAuthorization',
    value,
})
export const fetchAuthorizationViaGoogle = (value) => ({
    type: 'fetchAuthorizationViaGoogle',
    value,
})
export const fetchRegistration = (value) => ({
    type: 'fetchRegistration',
    value,
})
export const fetchMessageSuccess = (data) => ({
    type: 'fetchMessageSuccess',
    data,
})
export const fetchMessageFailure = (error) => ({
    type: 'fetchMessageFailure',
    error,
})
export const clearErrors = () => ({ type: 'clearErrors' })
export const resetPassword = (data) => ({ type: 'resetPassword', data })
export const signOutUser = () => ({ type: 'signOutUser' })
export const userLoggedOut = () => ({ type: 'userLoggedOut' })
export const fetchDialoguesFromDatabase = () => ({
    type: 'fetchDialoguesFromDatabase',
})
export const dialoguesFromDatabase = (data) => ({
    type: 'dialoguesFromDatabase',
    data,
})
export const setValueSearch = (value) => ({ type: 'setValueSearch', value })
export const pushDialogue = (value) => ({ type: 'pushDialogue', value })
export const changeValueActiveCases = (value) => ({
    type: 'changeValueActiveCases',
    value,
})
export const updateDialogueInDatabase = (value, idDialogue) => ({
    type: 'updateDialogueInDatabase',
    value,
    idDialogue,
})
export const pushNewMessageInDatabase = (value, idDialogue) => ({
    type: 'pushNewMessageInDatabase',
    value,
    idDialogue,
})
export const updatePassword = (value) => ({ type: 'updatePassword', value })
export const updateUserName = (value) => ({
    type: 'updateUserName',
    value,
})
export const updatedUserName = (value) => ({
    type: 'updatedUserName',
    value,
})
export const updateSettingsDialogue = (value, userUID) => ({
    type: 'updateSettingsDialogue',
    value,
    userUID,
})
export const fetchUserSettings = (value) => ({
    type: 'fetchUserSettings',
    value,
})
export const userSettings = (value) => ({ type: 'userSettings', value })
export const getTopicsFromDB = () => ({ type: 'getTopicsFromDB' })
export const setTopics = (value) => ({ type: 'setTopics', value })
export const updateUsersAvatar = (value) => ({ type: 'updateUsersAvatar', value })
export const fetchUsersAvatar = (value) => ({ type: 'fetchUsersAvatar', value })
