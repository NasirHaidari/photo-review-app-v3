import React from 'react'
import { Card } from 'react-bootstrap'

const NotFound = () => {
  return (
    <Card className='text-center'>
      <Card.Body>
        <Card.Text className='alert-danger mt-3'>
          404 could not find => {window.location.href}
        </Card.Text>
      </Card.Body>
      <Card.Img
        variant='bottom'
        className='img-fluid'
        src='../images/404.bmp cap'
        fiuled
        alt='404'
      />
    </Card>
  )
}

export default NotFound
