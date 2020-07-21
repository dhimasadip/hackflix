const initialState = {
    movies: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'GET_ALL':
            return {...state, movies: payload.movies}
        default:
            return state
    }
}