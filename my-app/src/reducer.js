const initialState = {
    loadingFromState: false,
    errorFromState: false,
    user: null,
    dialogues: null,
    valueSearch: null,
    valueActiveCases: 5,
    settingsUser: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_Authorization_REQUEST':
            return {
                ...state,
                loadingFromState: true,
            }
        case 'FETCH_AuthorizationViaGoogle_REQUEST':
            return {
                ...state,
                loadingFromState: true,
            }
        case 'FETCH_Registration_REQUEST':
            return {
                ...state,
                loadingFromState: true,
            }
        case 'FETCH_MESSAGES_SUCCESS':
            return {
                ...state,
                loadingFromState: false,
                user: action.data,
            }
        case 'FETCH_MESSAGES_FAILURE':
            return {
                ...state,
                loadingFromState: false,
                errorFromState: action.error.message,
            }
        case 'REMOVE_FAILURE':
            return {
                ...state,
                errorFromState: false,
            }
        case 'RESET_PASSWORD':
            return {
                ...state,
                loadingFromState: true,
            }
        case 'user_Logged_Out':
            return {
                ...state,
                user: null,
                loadingFromState: false,
            }
        case 'SignOut_User':
            return {
                ...state,
                loadingFromState: true,
            }
        case 'fetch_Dialogues_From_Database':
            return {
                ...state,
            }
        case 'Dialogues_From_Database':
            return {
                ...state,
                dialogues: action.data,
            }
        case 'Set_Value_Search':
            return {
                ...state,
                valueSearch: action.value,
            }
        case 'push_Dialogue':
            return {
                ...state,
            }
        case 'change_Value_Active_Cases':
            return {
                ...state,
                valueActiveCases: state.valueActiveCases + 5,
            }
        case 'Update_Dialogue_In_Database':
            return {
                ...state,
            }
        case 'push_NewMessage_In_Database':
            return {
                ...state,
            }
        case 'Update_Password':
            return {
                ...state,
            }
        case 'fetch_Update_User_Name':
            return {
                ...state,
            }
        case 'Update_User_Name':
            return {
                ...state,
                user: action.value,
            }
        case 'set_New_Settings_Dialogue':
            return {
                ...state,
            }
        case 'fetch_User_Settings':
            return {
                ...state,
            }
        case 'User_Settings':
            return {
                ...state,
                settingsUser: action.data,
            }
        default:
            return state
    }
}
export default reducer
