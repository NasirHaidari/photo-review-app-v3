import React from 'react'
import { Container } from 'react-bootstrap'
import AuthProvider from './context/AuthContext'
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Albums from './components/albums/Albums'
import CreateAlbum from './components/albums/CreateAlbum'
import Album from './components/albums/Album'
import NotFound from './components/Notfound'
import Navigation from './components/Navigation'
import SimpleReactLightbox from 'simple-react-lightbox'
import SecureRoutes from './components/SecureRoutes'

function App() {
  return (
    <Router>
      <AuthProvider>
        <SimpleReactLightbox>
          <Navigation />

          <Container className='py-3'>
            <Routes>
              <SecureRoutes path='/'>
                <Home />
              </SecureRoutes>

              <Route path='/albums'>
                <Route path='/'>
                  <Albums />
                </Route>

                <Route path='/create'>
                  <CreateAlbum />
                </Route>

                <Route path='/:albumId'>
                  <Album />
                </Route>
              </Route>

              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/signup'>
                <Signup />
              </Route>

              <Route path='*' element={<NotFound />} />
            </Routes>
          </Container>
        </SimpleReactLightbox>
      </AuthProvider>
    </Router>
  )
}

export default App
