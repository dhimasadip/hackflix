import React from 'react'

export const getMovies = (movies) => {
    return (dispatch) => {
        dispatch({
            type: 'GET_MOVIES',
            payload: {
                movies
            }
        })
    }
}