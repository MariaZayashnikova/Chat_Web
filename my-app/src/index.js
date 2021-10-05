import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/app/App'
import reportWebVitals from './reportWebVitals'
import { store, persistor } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)
reportWebVitals()
