const MAX_MOVES = 4;

export const getTypes = (types) => {
    if (!types || types.length === 0) {
        return [];
    }

    return types.map((t) => t.type.name);
};

export const getMoves = (moves) => {
    if (!moves || moves.length === 0) {
        return [];
    }

    const maxMovesToDisplay = Math.min(MAX_MOVES, moves.length);
    let movesToDisplay = [];

    for (let i = 0; i < maxMovesToDisplay; i++) {
        movesToDisplay = [...movesToDisplay, moves[i].move?.name];
    }

    return movesToDisplay;
};

export const getEvolutions = (chain, evolutions) => {
    if (!chain) {
        return [];
    }

    const { evolves_to } = chain;

    if (evolves_to?.length === 0) {
        return evolutions;
    }

    if (evolves_to) {
        return getEvolutions({ evolves_to: evolves_to[0]?.evolves_to }, [
            ...evolutions,
            evolves_to[0].species?.name,
        ]);
    }
};
