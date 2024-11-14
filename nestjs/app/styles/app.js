// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
    const isAdmin = true; // Defina a lógica para verificar se o usuário é admin

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Home isAdmin={isAdmin} />
                </Route>
                {/* Adicione outras rotas conforme necessário */}
            </Switch>
        </Router>
    );
};
import './styles/App.css';

export default App;
