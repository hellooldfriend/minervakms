import React, { useState } from 'react'
import './App.css'


import { Provider } from 'react-redux'
import store from './store'

import SearchEditor from './components/SearchEditor'

function App() {
    const [showModal, setShowModal] = useState(true)
    return (
        <Provider store={store}>
            <div>
                <button onClick={() => setShowModal(true)}>Open modal</button>
                <SearchEditor
                    visible={showModal}
                    onClick={() => setShowModal(false)}
                />
            </div>
        </Provider>

    )
}

export default App
