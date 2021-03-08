import React, { useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'
import { db } from '../../firebase/index'

const CreateAlbumWithPhotos = (props) => {
  const [newAlbumId, setNewAlbumId] = useState()
  const { albumId } = useParams()
  const { album } = useAlbum(albumId)

  const selected = props.select

  const date = new Date().toLocaleString()

  const createAlbum = async () => {
    try {
      const docRef = await db.collection('albums').add({
        title: `${album.title} made by customer at: ${date}`,
        owner: album.owner,
      })

      setNewAlbumId(docRef.id)

      selected.forEach((image) => {
        const img = {
          name: image.name,
          owner: album.owner,
          path: image.path,
          size: image.size,
          type: image.type,
          url: image.url,
        }

        if (docRef.id) {
          img.album = db.collection('albums').doc(docRef.id)
        }

        db.collection('images').add(img)
      })
    } catch (err) {
      console.error('Error adding document: ', err)
    }
  }

  const createNewHandel = async () => {
    await createAlbum()

    document.querySelector('#submit').classList.add('invisible')
  }

  return (
    <div>
      {newAlbumId && (
        <Alert
          title='test'
          variant='danger'
          className='alert-danger h2 text-lg-center'>
          You can now close the page!
        </Alert>
      )}
      <Button
        id='submit'
        variant='info'
        block
        className='btn-block m-2 font-weight-bold'
        onClick={createNewHandel}>
        send liked photos back to photographer
      </Button>
    </div>
  )
}

export default CreateAlbumWithPhotos
