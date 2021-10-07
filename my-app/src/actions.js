export const FETCH_Authorization_REQUEST = (value) => ({
    type: 'FETCH_Authorization_REQUEST',
    value,
})
export const FETCH_AuthorizationViaGoogle_REQUEST = (value) => ({
    type: 'FETCH_AuthorizationViaGoogle_REQUEST',
    value,
})
export const FETCH_Registration_REQUEST = (value) => ({
    type: 'FETCH_Registration_REQUEST',
    value,
})
export const FETCH_MESSAGES_SUCCESS = (data) => ({
    type: 'FETCH_MESSAGES_SUCCESS',
    data,
})
export const FETCH_MESSAGES_FAILURE = (error) => ({
    type: 'FETCH_MESSAGES_FAILURE',
    error,
})
export const REMOVE_FAILURE = () => ({ type: 'REMOVE_FAILURE' })
export const RESET_PASSWORD = (data) => ({ type: 'RESET_PASSWORD', data })
export const SignOut_User = () => ({ type: 'SignOut_User' })
export const user_Logged_Out = () => ({ type: 'user_Logged_Out' })
export const fetch_Dialogues_From_Database = () => ({
    type: 'fetch_Dialogues_From_Database',
})
export const Dialogues_From_Database = (data) => ({
    type: 'Dialogues_From_Database',
    data,
})
export const Set_Value_Search = (value) => ({ type: 'Set_Value_Search', value })
export const push_Dialogue = (value) => ({ type: 'push_Dialogue', value })
export const change_Value_Active_Cases = (value) => ({
    type: 'change_Value_Active_Cases',
    value,
})
export const Update_Dialogue_In_Database = (value, idDialogue) => ({
    type: 'Update_Dialogue_In_Database',
    value,
    idDialogue,
})
export const push_NewMessage_In_Database = (value, idDialogue) => ({
    type: 'push_NewMessage_In_Database',
    value,
    idDialogue,
})
