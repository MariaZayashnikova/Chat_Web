import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from "./reducer";
import FETCH_REQUEST from './components/sagas';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(FETCH_REQUEST);

export default store;