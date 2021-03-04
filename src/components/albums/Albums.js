import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CircleLoader } from 'react-spinners'
import { useAuth } from '../../context/AuthContext'
import useAlbums from '../../hooks/useAlbums'
import AlbumsGrid from './AlbumsGrid'

const Albums = () => {
  const { currentUser } = useAuth()
  const { albums, loading } = useAlbums()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  })
  return (
    <div>
      <h2 className='mb-3'>Albums</h2>

      {loading ? (
        <CircleLoader color={'#000'} size={20} />
      ) : (
        <AlbumsGrid albums={albums} />
      )}

      {currentUser && (
        <div className='mt-3'>
          <Link to='/albums/create' className='btn btn-primary'>
            Create a new Album
          </Link>
        </div>
      )}
    </div>
  )
}

export default Albums
