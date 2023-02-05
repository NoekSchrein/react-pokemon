import React, {useEffect, useState} from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard';
import axios from "axios";


function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [nextPage, setNextPage] = useState([]);

    useEffect(() => {
        async function fetchList() {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
                setPokemonList(response.data.results);
            } catch (e) {
                console.error(e);
            }
        }

        fetchList();
    }, [])

    async function clickNext() {
        try {
            const response = await axios.get("\"https://pokeapi.co/api/v2/pokemon?offset=20&limit=20\"");
            setNextPage(response.data.result);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div>
                <button>
                    Vorige pagina
                </button>
                <button
                    type="button"
                    onClick={clickNext}>
                    Volgende pagina
                </button>
            </div>
            <div className="outer-container">
                <img src="./assets/pokemon%20Logo.jpg" alt=""/>
                {Object.keys(pokemonList).length > 0 &&
                    <>
                        <ul className="pokemonList">
                            {pokemonList.map((onePokemon) => {
                                return <PokemonCard name={onePokemon.name}/>
                            })}
                        </ul>
                    </>}
            </div>
        </>
    );
}

export default App;
