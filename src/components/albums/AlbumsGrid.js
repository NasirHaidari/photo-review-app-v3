import React, { useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import PhotoPlaceholder from '../../assets/images/photo-placeholder.png'
import useDeleteAlbum from '../../hooks/useDeleteAlbum'
const AlbumsGrid = ({ albums }) => {
  const { currentUser } = useAuth()
  const [deleteAlbum, setDeleteAlbum] = useState(null)
  useDeleteAlbum(deleteAlbum)

  const handleDeleteImage = (album) => {
    console.log(album)
    if (
      window.confirm(
        `Are you really sure you want to delete the Album\n"${album.title}"?`
      )
    ) {
      setDeleteAlbum(album)
    }
  }
  const filterAlbums = albums.filter((album) => {
    return album.owner === currentUser.uid
  })

  return (
    <Row>
      {currentUser &&
        filterAlbums.map((album) => (
          <Col sm={6} md={4} lg={3} key={album.id}>
            <Card className='mb-3 bg-dark '>
              <Link to={`/albums/${album.id}`}>
                <Card.Img
                  variant='top'
                  src={PhotoPlaceholder}
                  title={album.title}
                />
              </Link>
              <Card.Body>
                <Card.Title className='mb-0'>
                  <Link to={`/albums/${album.id}`}>{album.title}</Link>
                </Card.Title>
                {currentUser && (
                  <Button
                    variant='danger'
                    size='sm'
                    className='float-right'
                    onClick={() => {
                      handleDeleteImage(album)
                    }}>
                    Delete
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  )
}

export default AlbumsGrid
