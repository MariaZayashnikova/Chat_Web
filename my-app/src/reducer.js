const initialState = {
    loadingFromState: false,
    errorFromState: false,
    user: null,
    dataFromDatabase: null,
    valueSearch: null,
    valueActiveCases: 5,
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
        case 'fetch_Data_From_Database':
            return {
                ...state,
                loadingFromState: true,
            }
        case 'Data_From_Database':
            return {
                ...state,
                dataFromDatabase: action.data,
                loadingFromState: false,
            }
        case 'Set_Value_Search':
            return {
                ...state,
                valueSearch: action.value,
            }
        case 'push_Data':
            return {
                ...state,
                loadingFromState: true,
            }
        case 'change_Value_Active_Cases':
            return {
                ...state,
                valueActiveCases: state.valueActiveCases + 5,
            }
        default:
            return state
    }
}
export default reducer
