import { useState, useEffect } from "react";

function captalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [status, setStatus] = useState("playing");

  function handleCardClick(id) {
    if (status !== "playing") return;

    if (clicked.includes(id)) {
      setStatus("lost");
      return;
    }

    const newClicked = [...clicked, id];
    setClicked(newClicked);

    if (newClicked.length > bestScore) {
      setBestScore(newClicked.length);
    }

    if (newClicked.length === cards.length) {
      setStatus("won");
    }

    setCards(shuffle(cards));
  }

  function playAgain() {
    setClicked([]);
    setStatus("playing");
    setCards(shuffle(cards));
  }

  useEffect(() => {
    async function getPokemon() {
      const pokemonIds = [
        809, 484, 448, 384, 646, 321, 799, 879, 818, 612, 111, 126,
      ];

      const promises = pokemonIds.map(async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return {
          id: data.id,
          name: capitalize(data.name),
          image: data.sprites.front_default,
        };
      });

      const results = await Promise.all(promises);
      setCards(results);
    }
    getPokemon();
  }, []);

  if (cards.length === 0) return <p>Loading Pokemons...</p>;
  return (
    <div className="app">
      <header className="header">
        <h1>Pokémon Memory Game</h1>
        <div className="scores">
          <p>Score: {clicked.length}</p>
          <p>Best: {bestScore}</p>
        </div>
      </header>
    </div>
  );
}
