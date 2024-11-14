import React, { useState } from 'react';
import { importDeck } from '../services/api'; // Importa a função para importar o baralho
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic } from '@fortawesome/free-solid-svg-icons'; // Importa o ícone

const DeckImport = () => {
    const [deckData, setDeckData] = useState(''); // Estado para armazenar o JSON do baralho
    const [loading, setLoading] = useState(false); // Estado para controle de carregamento
    const [message, setMessage] = useState(''); // Estado para mensagens de sucesso ou erro
    const [importHistory, setImportHistory] = useState([]); // Estado para histórico de importações

    const handleImport = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        setLoading(true); // Ativa o carregamento
        setMessage(''); // Limpa mensagens anteriores

        try {
            const result = await importDeck(JSON.parse(deckData)); // Tenta importar o baralho
            setMessage(`Deck imported: ${result.name}`); // Mensagem de sucesso
            setImportHistory([...importHistory, result]); // Adiciona ao histórico
        } catch (error) {
            console.error('Error importing deck:', error);
            setMessage('Failed to import deck'); // Mensagem de erro
        } finally {
            setLoading(false); // Desativa o carregamento
        }
    };

    return (
        <div>
            <h1>Importar Baralho</h1>
            <form onSubmit={handleImport}>
                <textarea
                    value={deckData}
                    onChange={(e) => setDeckData(e.target.value)}
                    placeholder="Cole o JSON do baralho aqui"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Importando...' : 'Importar Baralho'}
                </button>
                {message && <div className="message">{message}</div>} {/* Exibe mensagens */}
            </form>
            {importHistory.length > 0 && (
                <div>
                    <h3>Histórico de Importações</h3>
                    <ul>
                        {importHistory.map((deck, index) => (
                            <li key={index}>
                                <FontAwesomeIcon icon={faMagic} style={{ marginRight: '10px' }} />
                                {deck.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DeckImport;
