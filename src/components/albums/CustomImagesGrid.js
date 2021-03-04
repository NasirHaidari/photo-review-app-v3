import React, { useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import { useAuth } from '../../context/AuthContext'
import CreateAlbumWithPhotos from './CreateAlbumWithPhotos'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'

function CustomImagesGrid({ images }) {
  const [select, setSelect] = useState([])
  // eslint-disable-next-line
  const { currentUser } = useAuth()

  const checkHandel = (image) => {
    if (select.includes(image)) {
      return
    } else {
      setSelect([...select, image])
    }
  }
  const removeHandel = (image) => {
    const filtered = select.filter((item) => item.id !== image.id)
    setSelect(filtered)
  }

  return (
    <SRLWrapper>
      <Row className='my-3'>
        {images &&
          images.map((image) => (
            <Col sm={6} md={4} lg={3} key={image.id}>
              <Card className='mb-3 bg-dark'>
                <a
                  href={image.url}
                  title='View image in lightbox'
                  data-attribute='SRL'>
                  <Card.Img variant='top' src={image.url} title={image.name} />
                </a>

                <Card.Body>
                  <Card.Text className='text-muted small'>
                    {image.name}
                  </Card.Text>

                  <Button
                    variant='primary'
                    className='btn-success'
                    disabled={select.includes(image)}
                    onClick={() => {
                      checkHandel(image)
                    }}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    Like
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <hr />
      <h3 className='alert-warning text-center'>Pictures you Liked</h3>
      <Row className='my-3 '>
        {select &&
          select.map((image) => (
            <Col sm={6} md={4} lg={3} key={image.id}>
              <Card className='mb-3 bg-dark'>
                <a
                  href={image.url}
                  title='View image in lightbox'
                  data-attribute='SRL'>
                  <Card.Img variant='top' src={image.url} title={image.name} />
                </a>
                <Card.Body>
                  <Card.Text className='text-muted small'>
                    {image.name}
                  </Card.Text>
                  <Button
                    variant='primary'
                    className='btn-danger'
                    onClick={() => {
                      removeHandel(image)
                    }}>
                    <FontAwesomeIcon icon={faThumbsDown} />
                    Dislike
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <CreateAlbumWithPhotos select={select} />
    </SRLWrapper>
  )
}

export default CustomImagesGrid
