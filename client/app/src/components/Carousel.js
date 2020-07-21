import React from 'react'
import { Carousel } from 'react-bootstrap'

export default (props) => {
    const { data } = props
    const [...duplicateData] = data
    const separatedData = []

    while (duplicateData.length > 0) {
        const temp = duplicateData.splice(0, 4)
        separatedData.push(temp)
    }

    const nextIcon = <span aria-hidden="true" className="carousel-control-next-icon" />

    return (
        <div className="w-100">
            <Carousel indicators={false} nextIcon={nextIcon} className="bg-dark w-100">
                {
                    data &&
                    separatedData.map((nested, i) => {
                        return (
                            <Carousel.Item style={{backgroundColor: '#141414'}} key={i}>
                                <div className="d-flex justify-content-center flex-row">
                                    {
                                        nested.map((el, idx) => {
                                            return (
                                                <img key={idx}
                                                    className="d-block w-100 ml-2"
                                                    src={el.poster_path}
                                                    alt="First slide"
                                                    style={{ maxHeight: '30vh', maxWidth: '30vw' }}
                                                />
                                            )
                                        })
                                    }

                                </div>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}