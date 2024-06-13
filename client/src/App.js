// src/App.js
import React from 'react';
import Users from './components/Users';
import Header from './components/Header';

function App() {
    return (
        <div className="App">
            <Header/>
                <Users />
        </div>
    );
}

export default App;
