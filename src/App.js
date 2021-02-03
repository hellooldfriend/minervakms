import React, { useState, useEffect } from 'react'
import './App.css'

import SearchEditor from './components/SearchEditor'

function App() {
    const [showModal, setShowModal] = useState(true)

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Open modal</button>

            <SearchEditor
                visible={showModal}
                onClick={() => setShowModal(false)}
            />
        </div>
    )
}

export default App
