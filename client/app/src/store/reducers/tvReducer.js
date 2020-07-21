const initialState = {
    tv: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'GET_TV':
            return { ...state, tv: payload.tv }
        default:
            return state
    }
}