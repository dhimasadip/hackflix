import React from 'react'
import Card from '../components/Card'
import { gql, useQuery } from '@apollo/client'

const GET_TV = gql`
    query{
        getTv{
            _id
            title
            overview
            popularity
            poster_path
            tags
        }
    }
`

export default () => {

    const { loading, error, data } = useQuery(GET_TV)

    if (loading) return <p> Loading... </p>

    return (
        <div className="mt-4 w-100 d-flex flex-column justify-content-around">
            <Card data={data.getTv} />
        </div>
    )
}