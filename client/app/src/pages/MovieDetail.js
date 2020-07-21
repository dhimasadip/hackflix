import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Card, Badge, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import trashCan from '../assets/trash-can.png'
import heart from '../assets/heart.png'

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

const GET_MOVIE_ID = gql`
    query getMovieDetail($id: String){
        movie(_id: $id){
            _id
            title
            overview
            popularity
            tags
            poster_path
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

const EDIT_MOVIE = gql`
    mutation ($updatedMovie: MovieEdit) {
        editMovie(edit: $updatedMovie) {
            n
            ok
        }
    }
`

export default () => {
    const { id } = useParams()
    const [movieInput, setMovieInput] = useState({
        _id: id,
        title: '',
        overview: '',
        popularity: 0,
        poster_path: '',
        tags: ''
    })
    const { loading, error, data: movie } = useQuery(GET_MOVIE_ID, {
        variables: { id }
    })

    useEffect(() => {
        if (movie) {
            const oldData = {
                _id: id,
                title: movie.movie.title,
                overview: movie.movie.overview,
                popularity: +movie.movie.popularity,
                poster_path: movie.movie.poster_path,
                tags: movie.movie.tags.toString()
            }
            setMovieInput(oldData)
        }
    }, [movie])

    const [deleteMovie] = useMutation(DELETE_MOVIE, {
        refetchQueries: [{
            query: GET_MOVIES
        }]
    })

    const [editMovie] = useMutation(EDIT_MOVIE, {
        refetchQueries: [{
            query: GET_MOVIE_ID,
            variables: { id }
        }]
    })


    const destroy = (id) => {
        deleteMovie({
            variables: { id }
        })
    }
    
    const inputChange = (e) => {
        let { value, name } = e.target
        if (name == 'popularity') value = +value
        const newMovie = { ...movieInput, [name]: value }
        setMovieInput(newMovie)
    }
    
    const editHandler = (e) => {
        e.preventDefault()
        editMovie({
            variables: { updatedMovie: movieInput }
        })
    }
    
    if (loading) return <p>Loading...</p>

    return (
        <div className="row w-100">
            <div className="col-6">
                <div className="h-100 w-100 d-flex align-items-center justify-content-center mt-3">
                    <Card style={{ width: '60%' }}>
                        <Card.Img height="60%" variant="top" src={movie.movie.poster_path} />
                        <Card.Body className="pt-1">
                            <Card.Title>{movie.movie.title}</Card.Title>
                            <Card.Text>
                                <div className="w-100 d-flex justify-content-between">
                                    <p className="m-0">⭐ {movie.movie.popularity}</p>
                                    <div className="d-flex justify-content-center">
                                        {
                                            movie.movie.tags.map((tag, i) => {
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
                                    <img width={25} height={25} src={heart}></img>
                                    <Link to="/movies">
                                        <img width={15} height={20} src={trashCan} onClick={() => destroy(movie.movie['_id'])}></img>
                                    </Link>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="col-6 mt-3">
                <div className="bg-light p-2 rounded shadow">
                    <Form onSubmit={editHandler}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required
                                type="text" placeholder="title" name="title"
                                onChange={inputChange} defaultValue={movie.movie.title}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Overview</Form.Label>
                            <Form.Control required
                                type="text" placeholder="overview" name="overview"
                                onChange={inputChange} defaultValue={movie.movie.overview}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Popularity</Form.Label>
                            <Form.Control required name="popularity"
                                type="number" min={0} max={10} step={0.1} placeholder="popularity"
                                onChange={inputChange} defaultValue={movie.movie.popularity}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Poster Path</Form.Label>
                            <Form.Control required
                                type="text" placeholder="poster path" name="poster_path"
                                onChange={inputChange} defaultValue={movie.movie.poster_path}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tags</Form.Label>
                            <Form.Control required
                                type="text" placeholder="e.g: action,fantasy" name="tags"
                                onChange={inputChange} defaultValue={movie.movie.tags}
                            />
                        </Form.Group>
                        <div className="w-100 d-flex justify-content-center">
                            <Button variant="primary" type="submit">Update</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>

    )
}