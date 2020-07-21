import React, { useEffect } from 'react'
import Carousel from '../components/Carousel'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../store/actions/getAll'
import { gql, useQuery } from '@apollo/client'

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

export default () => {
    const movies = useSelector(state => state.entertainmeReducer.movies)
    const dispatch = useDispatch()

    const { loading, error, data } = useQuery(GET_ALL)

    if (loading) return <p className="w-100 mt-5 text-center text-secondary"> Loading... </p>


    if (data) {
        dispatch(getAll(data.entertainme))
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-around mt-3 w-100">
            <div className="w-100">
                <h4 className="w-25 text-center text-light">Movies</h4>
                {
                    movies &&
                    <Carousel data={movies.movies} />
                }
                {
                    !movies &&
                    <Carousel data={[]} />
                }
            </div>
            <div className="w-100 mt-4">
                <h4 className="w-25 text-center text-light">Tv Series</h4>
                {
                    movies &&
                    <Carousel data={movies.tvs} />
                }
                {
                    !movies &&
                    <Carousel data={[]} />
                }
            </div>
        </div>

    )
}