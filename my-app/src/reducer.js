const initialState = {
    loading: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_MESSAGES_REQUEST':
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
        default:
            return state;
    }
}
export default reducer;