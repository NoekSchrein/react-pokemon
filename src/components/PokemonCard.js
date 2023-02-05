import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./PokemonCard.css";

function PokemonCard({name}) {

    const [pokemons, setPokemons] = useState({})

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemons(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchData();

    }, [])

    return (
        <div className="pokemonCard">
            {Object.keys(pokemons).length > 0 &&
                <>
                    <h3>{pokemons.name}</h3>
                    <img src={pokemons.sprites.front_default} alt={pokemons.name}/>
                    <p><strong>Moves: </strong>{pokemons.moves.length}</p>
                    <p><strong>Weight: </strong>{pokemons.weight}</p>
                    <p><strong>Abilities</strong></p>
                    <ul className="unordered-list">
                        {pokemons.abilities.map((ability) => {
                            return (
                                <li key={ability}
                                className="abilities-list">{ability.ability.name}
                                </li>
                            )
                        })
                        }
                    </ul>
                </>}
        </div>
    );
};

export default PokemonCard;