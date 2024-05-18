import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [count, setCount] = useState(5);

  useEffect(() => {
    axios.get('https://backendproyectointernet.azurewebsites.net/albums')
      .then(res => {
        console.log(res);
        setAlbums(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAlbums = albums.filter(album => {
    return album.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleCountChange = (event) => {
    setCount(Number(event.target.value));
  };

  return (
    <div className="container my-5">
      <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Albums Cool</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Busca uno"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="row">
        {filteredAlbums.slice(0, count).map((album, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <Link to={`/albums/${album._id}`} style={{ textDecoration: 'none' }}>
                <img src={album.imagen || "https://via.placeholder.com/150"} className="card-img-top" alt={`${album.nombre} Album Cover`} />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{album.nombre} - {album.artista}</h5>
                <p className="card-text"><small className="text-muted">Año: {album.ano}</small></p>
                <div className="mt-auto">
                  {album.appleMusic && (
                    <a href={album.appleMusic} className="btn btn-danger me-2 mb-2" role="button">
                      <i className="bi bi-apple"></i> Apple Music
                    </a>
                  )}
                  {album.spotify && (
                    <a href={album.spotify} className="btn btn-success me-2 mb-2" role="button">
                      <i className="bi bi-spotify"></i> Spotify
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredAlbums.length > count && (
        <>
          <h2 style={{ marginTop: '30px', textAlign: 'center' }}>Álbumes Recomendados</h2>
          <div className="row">
            {filteredAlbums.slice(count).map((album, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100">
                  <Link to={`/albums/${album._id}`} style={{ textDecoration: 'none' }}>
                    <img src={album.imagen || "https://via.placeholder.com/150"} className="card-img-top" alt={`${album.nombre} Album Cover`} />
                  </Link>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{album.nombre} - {album.artista}</h5>
                    <p className="card-text"><small className="text-muted">Año: {album.ano}</small></p>
                    <div className="mt-auto">
                      {album.appleMusic && (
                        <a href={album.appleMusic} className="btn btn-danger me-2 mb-2" role="button">
                          <i className="bi bi-apple"></i> Apple Music
                        </a>
                      )}
                      {album.spotify && (
                        <a href={album.spotify} className="btn btn-success me-2 mb-2" role="button">
                          <i className="bi bi-spotify"></i> Spotify
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <Link to="/create-album" style={{ textDecoration: 'none' }}>
              <img src="https://content.mycutegraphics.com/graphics/alligator/alligator-holding-addition-symbol.png" className="card-img-top" alt="Agregar nuevo álbum" />
            </Link>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Agregar Nuevo Álbum</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4">
        <label htmlFor="albumCount">Cantidad de álbumes antes de "Álbumes Recomendados":</label>
        <input
          type="number"
          id="albumCount"
          className="form-control"
          value={count}
          onChange={handleCountChange}
          min="1"
          max={filteredAlbums.length}
        />
      </div>
    </div>
  );
}

export default AlbumList;