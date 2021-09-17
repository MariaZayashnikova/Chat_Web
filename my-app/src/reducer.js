const initialState = {
    loadingFromState: false,
    errorFromState: false,
    user: null,
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
        case 'SignOut_User':
            return {
                ...state,
                user: null,
            }
        case 'Check_Token':
            return {
                ...state,
            }
        default:
            return state
    }
}
export default reducer
