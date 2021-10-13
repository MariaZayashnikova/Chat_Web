import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/app/App'
import reportWebVitals from './reportWebVitals'
import { store, persistor } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import { PersistGate } from 'redux-persist/integration/react'
import PubNub from 'pubnub'
import { PubNubProvider } from 'pubnub-react'

const pubnub = new PubNub({
    publishKey: process.env.REACT_APP_PUBNUB_publishKey,
    subscribeKey: process.env.REACT_APP_PUBNUB_subscribeKey,
    uuid: process.env.REACT_APP_PUBNUB_uuid,
})

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <PubNubProvider client={pubnub}>
                <App />
            </PubNubProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)
reportWebVitals()
