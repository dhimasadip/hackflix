const initialState = {
    movies: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'GET_MOVIES':
            return {...state, movies: payload.movies}
        default:
            return state
    }
}