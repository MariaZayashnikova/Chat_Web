const initialState = {
    loadingFromState: false,
    errorFromState: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_Authorization_REQUEST':
            return {
                ...state,
                loadingFromState: true
            };
        case 'FETCH_AuthorizationViaGoogle_REQUEST':
            return {
                ...state,
                loadingFromState: true
            };
        case 'FETCH_Registration_REQUEST':
            return {
                ...state,
                loadingFromState: true
            };
        case 'FETCH_MESSAGES_SUCCESS':
            return {
                ...state,
                loadingFromState: false
            };
        case 'FETCH_MESSAGES_FAILURE':
            return {
                loadingFromState: false,
                errorFromState: action.error.message
            };
        case 'REMOVE_FAILURE':
            return {
                ...state,
                errorFromState: false
            };
        default:
            return state;
    }
}
export default reducer;