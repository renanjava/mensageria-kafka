// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Ajuste conforme necessário

export const fetchDecks = async (isAdmin) => {
    const endpoint = isAdmin ? `${API_URL}/decks` : `${API_URL}/decks/user`;
    const response = await axios.get(endpoint);
    return response.data;
};

export const importDeck = async (deckData) => {
    const response = await axios.post(`${API_URL}/decks/import`, deckData);
    return response.data;
};
