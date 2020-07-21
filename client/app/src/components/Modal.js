import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

export default ({ showModal, add, onCancel }) => {

    const [showModalAdd, setShowModalAdd] = useState(false)
    const [movie, setMovie] = useState({
        title: '',
        overview: '',
        popularity: 0,
        poster_path: '',
        tags: ''
    })

    const inputChange = (e) => {
        let { value, name } = e.target
        if (name == 'popularity') value = +value
        const newMovie = { ...movie, [name]: value }
        setMovie(newMovie)
    }

    const addHandler = (e) => {
        e.preventDefault()
        add(movie)
    }

    const handleClose = () => {
        setShowModalAdd(false)
        onCancel()
    }

    useEffect(() => {
        setShowModalAdd(showModal)
    }, [showModal])

    return (
        <div>

            <Modal
                show={showModalAdd}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addHandler}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control required
                                type="text" placeholder="title" name="title"
                                onChange={inputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Overview</Form.Label>
                            <Form.Control required
                                type="text" placeholder="overview" name="overview"
                                onChange={inputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Popularity</Form.Label>
                            <Form.Control required name="popularity"
                                type="number" min={0} max={10} step={0.1} placeholder="popularity"
                                onChange={inputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Poster Path</Form.Label>
                            <Form.Control required
                                type="text" placeholder="poster path" name="poster_path"
                                onChange={inputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tags</Form.Label>
                            <Form.Control required
                                type="text" placeholder="e.g: action,fantasy" name="tags"
                                onChange={inputChange}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            <Button variant="primary" type="submit">Add</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}