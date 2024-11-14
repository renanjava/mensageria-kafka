import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic } from '@fortawesome/free-solid-svg-icons';

// Dentro do retorno de `DeckList`
return (
    <div>
        <h2>Decks</h2>
        <ul>
            {decks.map(deck => (
                <li key={deck.id}>
                    <FontAwesomeIcon icon={faMagic} style={{ marginRight: '10px' }} />
                    {deck.name}
                </li>
            ))}
        </ul>
    </div>
);
