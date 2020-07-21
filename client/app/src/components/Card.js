import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import trashCan from '../assets/trash-can.png'
import heart from '../assets/heart.png'

export default ({ data, addFavorite, destroy }) => {

    return (
        <div className="h-100 w-100 d-flex justify-content-center" >
            <div className="row row-cols-1 row-cols-md-4" style={{ width: '95%' }}>
                {
                    data && data.map((el, i) => {
                        return (
                            <div className="col mb-4">
                                <Card key={i}>
                                    <Link to={`/movies/${el['_id']}`}>
                                        <Card.Img height="178px" variant="top" src={el.poster_path} />
                                    </Link>
                                    <Card.Body className="pt-1">
                                        <Card.Title>{el.title}</Card.Title>
                                        <Card.Text>
                                            <div className="w-100 d-flex justify-content-between">
                                                <p className="m-0">⭐ {el.popularity}</p>
                                                <div className="d-flex justify-content-center">
                                                    {
                                                        el.tags.map((tag, i) => {
                                                            return (
                                                                <Badge key={i} className="ml-2" variant="secondary">
                                                                    {tag}
                                                                </Badge>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="w-100 d-flex justify-content-around mt-3">
                                                <img style={{ cursor: 'pointer' }} src={heart} onClick={() => addFavorite(el)}></img>
                                                <img style={{ cursor: 'pointer' }} width={15} height={20} src={trashCan} onClick={() => destroy(el['_id'])}></img>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}