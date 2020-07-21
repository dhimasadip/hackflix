import React, { useState } from 'react'
import Card from '../components/Card'
import Modal from '../components/Modal'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Button } from 'react-bootstrap'
import { movieFavorites } from '../config/graphql'

const GET_MOVIES = gql`
    query{
        getMovies{
            _id
            title
            overview
            popularity
            poster_path
            tags
        }
    }
`

const ADD_MOVIE = gql`
    mutation AddMovie($newMovie: MovieInput) {
        addMovie(movie: $newMovie) {
            _id
            title
            overview
            popularity
            poster_path
            tags
        }
    }
`

const DELETE_MOVIE = gql`
    mutation Destroy($id: String) {
        deleteMovie(_id: $id) {
            n
            ok
          }
    }
`


export default () => {
    const [showAdd, setShowAdd] = useState(false)
    const { loading, error, data } = useQuery(GET_MOVIES)
    const [addMovie] = useMutation(ADD_MOVIE, {
        refetchQueries: [{
            query: GET_MOVIES
        }]
    })

    const [deleteMovie] = useMutation(DELETE_MOVIE, {
        refetchQueries: [{
            query: GET_MOVIES
        }]
    })

    if (loading) return <p className="mt-5"> Loading... </p>

    const add = (newMovie) => {
        addMovie({
            variables: { newMovie }
        })
        setShowAdd(false)
    }

    const destroy = (id) => {
        deleteMovie({
            variables: { id }
        })
    }

    const onCancel = () => {
        setShowAdd(false)
    }

    const addFav = (movie) => {
        const [...currFav] = movieFavorites()
        const current = currFav.filter(el => el.title != movie.title)
        movieFavorites([...current, movie])
    }

    return (
        <div className="mt-3 w-100 d-flex flex-column justify-content-between">
            <div className="w-100 d-flex justify-content-end pr-5 mb-4">
                <Button variant="dark" onClick={() => setShowAdd(true)}>Add Movie</Button>
            </div>
            <Card addFavorite={addFav} destroy={destroy} data={data.getMovies} />
            <Modal onCancel={onCancel} showModal={showAdd} add={add} />
        </div>
    )
}