const initialState = {
    loading: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_Authorization_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'FETCH_Registration_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'FETCH_MESSAGES_SUCCESS':
            return {
                ...state,
                loading: false
            };
        case 'FETCH_MESSAGES_FAILURE':
            return {
                loading: false,
                error: action.error.message
            };
        case 'REMOVE_FAILURE':
            return {
                ...state,
                error: false
            };
        default:
            return state;
    }
}
export default reducer;