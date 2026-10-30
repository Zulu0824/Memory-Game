# Pokémon Memory Card Game

A memory game built with React. Click each Pokémon once, and never click the same one twice. The cards shuffle after every click, so you have to remember which ones you've already picked.

Built as part of [The Odin Project](https://www.theodinproject.com/) React curriculum.

LIVE PREVIEW : [Memory Game](https://vermillion-flan-6e73c4.netlify.app/)

## How to Play

- Click a Pokémon card to score a point.
- The cards shuffle after every click.
- Click the same Pokémon twice and you lose.
- Click all 12 without a repeat and you win.
- Your best score is tracked for the session.

## Features

- Fetches Pokémon names and sprites from the [PokéAPI](https://pokeapi.co/)
- Fisher-Yates shuffle after every click
- Current score and best score tracking
- Win and lose states with a "Play again" button
- Status bar that shakes when you lose
- Responsive grid layout (4, 3, or 2 columns depending on screen width)
- Respects `prefers-reduced-motion`

## Tech Stack

- React (hooks: `useState`, `useEffect`)
- Vite
- Plain CSS
- PokéAPI

## How It Works

- **State:** `cards` holds the 12 Pokémon, `clicked` holds the ids already clicked this round, `bestScore` holds the highest score, and `status` is one of `"playing"`, `"won"`, or `"lost"`.
- **Fetching:** on first render, a `useEffect` requests 12 Pokémon from the PokéAPI in parallel with `Promise.all` and stores `{ id, name, image }` objects in state.
- **Clicking:** a click checks whether the card's id is already in `clicked`. If it is, the game is lost. If not, the id is added, the best score is updated, and the cards are shuffled. Clicking all 12 wins the game.
- **Shuffling:** a Fisher-Yates function returns a shuffled copy of the array, so state is never mutated directly.

## Acknowledgements

- Pokémon data and sprites from [PokéAPI](https://pokeapi.co/)
- Project idea from [The Odin Project](https://www.theodinproject.com/)
