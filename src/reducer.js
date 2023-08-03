const initialState = {
    loading: false,
    error: false,
    user: null,
    chats: null,
    valueSearch: null,
    settingsUser: null,
    topics: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'auth':
            return {
                ...state,
                loading: true,
            }
        case 'authViaGoogle':
            return {
                ...state,
                loading: true,
            }
        case 'registration':
            return {
                ...state,
                loading: true,
            }
        case 'gotUser':
            return {
                ...state,
                loading: false,
                user: action.data,
            }
        case 'gotError':
            return {
                ...state,
                loading: false,
                error: action.error.message,
            }
        case 'clearErrors':
            return {
                ...state,
                error: false,
            }
        case 'resetPassword':
            return {
                ...state,
                loading: true,
            }
        case 'userLoggedOut':
            return {
                ...state,
                user: null,
                settingsUser: null,
                topics: null,
                loading: false,
            }
        case 'signOutUser':
            return {
                ...state,
                loading: true,
            }
        case 'getChats':
            return {
                ...state,
                loading: true,
            }
        case 'gotChats':
            return {
                ...state,
                loading: false,
                chats: action.data,
            }
        case 'setValueSearch':
            return {
                ...state,
                valueSearch: action.value,
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
