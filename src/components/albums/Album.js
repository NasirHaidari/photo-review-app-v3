import React, { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ImagesGrid from './ImagesGrid'
import useAlbum from '../../hooks/useAlbum'
import UploadAlbumImage from './UploadAlbumImage'
import { useAuth } from '../../context/AuthContext'
import CustomImagesGrid from './CustomImagesGrid'
import { server } from '../../config/config.js'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import { db } from '../../firebase'

const Album = () => {
  const { currentUser } = useAuth()
  const { albumId } = useParams()
  const { album, images } = useAlbum(albumId)

  const [title, setTitle] = useState('')
  const inputEl = useRef(null)
  const navigate = useNavigate()

  const copyUrl = async (e) => {
    const Url = await document.getElementById('urlCopy')

    Url.innerHTML = window.location.href

    Url.select()
    document.execCommand('copy')
    alert(`the link: ${window.location.href} copied to your clipboard `)
  }

  //handelSubmit for the change the album name
  const handleSubmit = async () => {
    const docRef = await db.collection('albums').doc(albumId)

    return docRef
      .update({
        title: title,
      })
      .then(() => {
        console.log('Document successfully updated!')
      })
      .catch((error) => {
        console.error('Error updating document: ', error)
      })
      .then(() => alert(`The album name changed to: ${title}`))
      .then(() => navigate(`/albums/`))
  }

  return (
    <>
      <h2 className='mb-3'>Album {album && album.title}</h2>
      {currentUser && (
        <div>
          <InputGroup className='mb-3'>
            <FormControl
              onChange={(e) => setTitle(e.target.value)}
              ref={inputEl}
              placeholder='type the new title here and click the button'
            />
            <InputGroup.Append>
              <Button
                onClick={() => handleSubmit()}
                className='newText'
                variant='danger'>
                change Album title
              </Button>
            </InputGroup.Append>
          </InputGroup>

          <InputGroup className='mb-3'>
            <FormControl
              value={`${server}/albums/${albumId}`}
              id='urlCopy'
              readOnly
            />
            <InputGroup.Append>
              <Button variant='success' onClick={copyUrl}>
                copy Album Url
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      )}

      {currentUser && <UploadAlbumImage albumId={albumId} />}
      <hr />
      {currentUser ? (
        <ImagesGrid images={images} />
      ) : (
        <CustomImagesGrid images={images} />
      )}
    </>
  )
}

export default Album
