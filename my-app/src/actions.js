export const FETCH_Authorization_REQUEST = (value) => ({type: 'FETCH_Authorization_REQUEST', value});
export const FETCH_AuthorizationViaGoogle_REQUEST = (value) => ({type: 'FETCH_AuthorizationViaGoogle_REQUEST', value});
export const FETCH_Registration_REQUEST = (value) => ({type: 'FETCH_Registration_REQUEST', value});
export const FETCH_MESSAGES_SUCCESS = () => ({type: 'FETCH_MESSAGES_SUCCESS'});
export const FETCH_MESSAGES_FAILURE = (error) => ({type: 'FETCH_MESSAGES_FAILURE', error});
export const REMOVE_FAILURE = () => ({type: 'REMOVE_FAILURE'});
export const RESET_PASSWORD = (data) => ({type: 'RESET_PASSWORD', data});
export const RESET_PASSWORD_SUCCESS = (data) => ({type: 'RESET_PASSWORD_SUCCESS', data});