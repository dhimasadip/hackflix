import React from 'react'
import Card from '../components/Card'
import { movieFavorites } from '../config/graphql'

export default () => {

    const data = movieFavorites()

    return (
        <div className="mt-4 w-100 d-flex flex-column justify-content-around">
            <h3 className="text-center text-light mb-3">My Favorites</h3>
            {
                !data.length > 0 && <h5 className="mt-5 text-center text-secondary">No Data</h5>
            }
            <Card data={data} />
        </div>
    )
}