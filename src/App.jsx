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
}
