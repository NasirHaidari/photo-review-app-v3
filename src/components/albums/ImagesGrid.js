import React, { useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import { useAuth } from '../../context/AuthContext'
import useDeleteImage from '../../hooks/useDeleteImage'
import CustomImagesGrid from './CustomImagesGrid'

const ImagesGrid = ({ images }) => {
  const [deleteImage, setDeleteImage] = useState(null)
  const { currentUser } = useAuth()
  useDeleteImage(deleteImage)

  const handleDeleteImage = (image) => {
    if (
      window.confirm(
        `Are you really sure you want to delete the image\n"${image.name}"?`
      )
    ) {
      setDeleteImage(image)
    }
  }

  return (
    <>
      {!currentUser ? (
        <CustomImagesGrid />
      ) : (
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
                      <Card.Img
                        variant='top'
                        src={image.url}
                        title={image.name}
                      />
                    </a>
                    <Card.Body>
                      <Card.Text className='text-muted small'>
                        {image.name}
                      </Card.Text>

                      {currentUser && currentUser.uid === image.owner && (
                        <Button
                          variant='danger'
                          size='sm'
                          onClick={() => {
                            handleDeleteImage(image)
                          }}>
                          Delete
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </SRLWrapper>
      )}
    </>
  )
}

export default ImagesGrid
