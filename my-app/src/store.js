import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import rootSaga from './components/sagas'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
}
const persistedReducer = persistReducer(persistConfig, reducer)

/*const store = createStore(reducer, applyMiddleware(sagaMiddleware))*/
let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
let persistor = persistStore(store)
sagaMiddleware.run(rootSaga)

export { store, persistor }
