import { useEffect, useState } from 'react';
import DetailsType from './components/DetailsType';
import {
    fetchAllPokemon,
    fetchEvolutionChainById,
    fetchPokemonDetailsByName,
} from './api';
import { getEvolutions, getMoves, getTypes } from './getDetails';

function App() {
    const [pokemonIndex, setPokemonIndex] = useState([]);
    const [pokemon, setPokemon] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [pokemonDetails, setPokemonDetails] = useState();
    const [loadingPokemon, setLoadingPokemon] = useState(true);
    const [loadingPokemonDetails, setLoadingPokemonDetails] = useState();
    const [errors, setErrors] = useState({
        pokemon: null,
        pokemonDetails: null,
    });

    useEffect(() => {
        const fetchPokemon = async () => {
            const { results: pokemonList } = await fetchAllPokemon();

            setPokemon(pokemonList);
            setPokemonIndex(pokemonList);
        };

        fetchPokemon()
            .then(() => {
                setLoadingPokemon(false);
                setErrors({ ...errors, pokemon: null });
            })
            .catch((error) => {
                setErrors({ ...errors, pokemon: error });
                setLoadingPokemon(false);
            });
    }, []);

    const onSearchValueChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);

        const filteredPokemon = pokemonIndex.filter((monster) =>
            monster.name.includes(value),
        );
        setPokemon(filteredPokemon);
    };

    const onGetDetails = (name) => async () => {
        setLoadingPokemonDetails(true);
        setPokemonDetails();

        try {
            const pokemonDetail = await fetchPokemonDetailsByName(name);
            const evolutionChain = await fetchEvolutionChainById(
                pokemonDetail.id,
            );

            const evolutions = getEvolutions(evolutionChain?.chain, [name]);
            const details = {
                moves: getMoves(pokemonDetail.moves),
                types: getTypes(pokemonDetail.types),
                evolutions,
                name,
            };

            setPokemonDetails(details);
            setErrors({ ...errors, pokemonDetails: null });
            setLoadingPokemonDetails(false);
        } catch (error) {
            setErrors({ ...errors, pokemonDetails: error });
            setLoadingPokemonDetails(false);
        }
    };

    return (
        <div className={'pokedex__container'}>
            <form
                className={'pokedex__search-input'}
                aria-label='Search Pokemon'
                role='search'
            >
                <input
                    value={searchValue}
                    onChange={onSearchValueChange}
                    placeholder={'Search Pokemon'}
                />
            </form>
            <div className={'pokedex__content'}>
                {loadingPokemon && <h1>Loading...</h1>}
                {errors?.pokemon && <h1>Error Getting Pokemon!</h1>}
                {pokemon.length === 0 && !!searchValue && (
                    <h1>No Results Found</h1>
                )}
                {pokemon.length > 0 && (
                    <div className={'pokedex__search-results'}>
                        {pokemon.map((monster) => {
                            return (
                                <div
                                    className={'pokedex__list-item'}
                                    key={monster.name}
                                >
                                    <p className={'pokedex__item-name'}>
                                        {monster.name}
                                    </p>
                                    <button
                                        onClick={onGetDetails(monster.name)}
                                        aria-label='Get Details'
                                    >
                                        Get Details
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
                {(pokemonDetails ||
                    loadingPokemonDetails ||
                    errors?.pokemonDetails) && (
                    <div className={'pokedex__details'}>
                        {loadingPokemonDetails && <h3>Loading Details...</h3>}
                        {errors?.pokemonDetails && (
                            <h3>Error Getting Pokemon Details!</h3>
                        )}
                        {pokemonDetails && (
                            <>
                                <h3 className={`pokedex__details-title`}>
                                    {pokemonDetails.name}
                                </h3>
                                <DetailsType
                                    list={pokemonDetails.types}
                                    listName={'Types'}
                                />
                                <DetailsType
                                    list={pokemonDetails.moves}
                                    listName={'Moves'}
                                />
                                <DetailsType
                                    bulletedList={false}
                                    list={pokemonDetails.evolutions}
                                    listName={'Evolutions'}
                                />
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
