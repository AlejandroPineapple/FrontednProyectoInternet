import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomeCarousel from './components/HomeCarousel';
import AlbumList from './components/albums/AlbumList';
import AlbumDetail from './components/albums/AlbumDetail';
import AlbumForm from './components/albums/AlbumForm';
import PeliculaList from './components/peliculas/PeliculaList';
import PeliculaDetail from './components/peliculas/PeliculaDetail';
import PeliculaForm from './components/peliculas/PeliculaForm';
import Login from './components/auth/Login';
import './App.css';
import Register from './components/auth/Register';

function App() {
    return (
      <Router>
        <Navbar />  
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <HomeCarousel />
                <div id="Bienvenida" className="container mt-5 d-flex flex-column flex-md-row align-items-center">
                    <div className="text-center text-md-start flex-grow-1 me-md-3">
                        <h2>Bienvenido a mi maravillosa, espectacular e impresionante pagina web</h2>
                        <hr />
                        <p> Esta es mi pagina web, pasale pasale</p>
                        <p> Aqui puedes ver mis gustos en peliculas y musica</p>
                        <p> Puse las peliculas y albums que a mi me gustan pero si me quieres recomendar uno agregalo y yo lo checo ntp</p>
                        <p> Tambien puedes dejar un comentario, na mas registrate primero</p>
                        <p> Ah, y checate mi playlist esta bien cool</p>
                      </div>
                      <a href="https://open.spotify.com/playlist/5yoGfgYk50zYvTcbBLnebm?si=5163bc6ab7254c07&nd=1&dlsi=5f4b217f59f94ac9" target="_blank" rel="noopener noreferrer" className="my-3 my-md-0">
                        <img src="/imagenes/playlist.jpg" className="img-fluid img-thumbnail" alt="Playlist" style={{ maxWidth: "90%", height: "auto" }} />
                      </a>
                    </div>
              </>
            } />
            <Route path="/albums" element={<AlbumList />} />
            <Route path="/albums/:id" element={<AlbumDetail />} />
            <Route path="/albums/edit/:id" element={<AlbumForm />} />
            <Route path="/create-album" element={<AlbumForm />} />
            <Route path="/peliculas" element={<PeliculaList />} />
            <Route path="/peliculas/:id" element={<PeliculaDetail />} />
            <Route path="/peliculas/edit/:id" element={<PeliculaForm />} />
            <Route path="/create-pelicula" element={<PeliculaForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    );
  }
  
  export default App;