const initialState = {
    loadingFromState: false,
    errorFromState: false,
    user: null,
    dialogues: null,
    valueSearch: null,
    valueActiveCases: 5,
    settingsUser: null,
    topics: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'fetchAuthorization':
            return {
                ...state,
                loadingFromState: true,
            }
        case 'fetchAuthorizationViaGoogle':
            return {
                ...state,
                loadingFromState: true,
            }
        case 'fetchRegistration':
            return {
                ...state,
                loadingFromState: true,
            }
        case 'fetchMessageSuccess':
            return {
                ...state,
                loadingFromState: false,
                user: action.data,
            }
        case 'fetchMessageFailure':
            return {
                ...state,
                loadingFromState: false,
                errorFromState: action.error.message,
            }
        case 'clearErrors':
            return {
                ...state,
                errorFromState: false,
            }
        case 'resetPassword':
            return {
                ...state,
                loadingFromState: true,
            }
        case 'userLoggedOut':
            return {
                ...state,
                user: null,
                loadingFromState: false,
            }
        case 'singnOutUser':
            return {
                ...state,
                loadingFromState: true,
            }
        case 'dialoguesFromDatabase':
            return {
                ...state,
                dialogues: action.data,
            }
        case 'setValueSearch':
            return {
                ...state,
                valueSearch: action.value,
            }
        case 'changeValueActiveCases':
            return {
                ...state,
                valueActiveCases: state.valueActiveCases + 5,
            }
        case 'updatedUserName':
            return {
                ...state,
                user: action.value,
            }
        case 'userSettings':
            return {
                ...state,
                settingsUser: action.data,
            }
        case 'setTopics':
            return {
                ...state,
                topics: action.data,
            }
        default:
            return state
    }
}
export default reducer
