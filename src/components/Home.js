import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import useAlbums from '../hooks/useAlbums'
import AlbumsGrid from './albums/AlbumsGrid'
import { CircleLoader } from 'react-spinners'

const Home = () => {
  const { currentUser } = useAuth()
  const { logout } = useAuth()
  const { albums, loading } = useAlbums()
  const navigate = useNavigate()

  async function logoutHandel() {
    await logout()
    await navigate('/login')
  }

  return (
    <>
      <div>
        <p>Welcome Back! </p>

        <Button
          type='submit'
          className='alert-dark float-right'
          onClick={logoutHandel}>
          logout
        </Button>
      </div>
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
    </>
  )
}

export default Home
