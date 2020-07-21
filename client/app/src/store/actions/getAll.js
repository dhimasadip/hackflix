import React from 'react'

export const getAll = (movies) => {
    return (dispatch) => {
        dispatch({
            type: 'GET_ALL',
            payload: {
                movies
            }
        })
    }
}