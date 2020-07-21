import React, { useEffect } from 'react'
import Carousel from '../components/Carousel'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../store/actions/movie'
import { gql, useQuery } from '@apollo/client'

export default () => {
    const movies = useSelector(state => state.movieReducer.movies)
    const dispatch = useDispatch()

    const GET_ALL = gql`
        query {
            entertainme {
                movies{
                    _id
                    title
                    overview
                    popularity
                    tags
                    poster_path
                }
                tvs {
                    _id
                    title
                    overview
                    popularity
                    tags
                    poster_path
                }
            }
            
        }
    `
    const { loading, error, data } = useQuery(GET_ALL)

    if (loading) return <p> Loading... </p>

    if (data) {
        dispatch(getMovies(data.entertainme))
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-around mt-3 w-100">
            <div className="w-100">
                <h4 className="w-25 text-center text-light">Movies</h4>
                <Carousel data={movies.movies} />
            </div>
            <div className="w-100 mt-4">
                <h4 className="w-25 text-center text-light">Tv Series</h4>
                <Carousel data={movies.tvs} />
            </div>
        </div>

    )
}