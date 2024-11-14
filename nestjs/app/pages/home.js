// src/pages/Home.js
import React from 'react';
import DeckImport from '../components/DeckImport';

const Home = ({ isAdmin }) => {
    return (
        <div>
            <h1>Welcome to Deck Manager</h1>
            <DeckList isAdmin={isAdmin} />
            {isAdmin && <DeckImport />}
        </div>
    );
};
export default Home;


