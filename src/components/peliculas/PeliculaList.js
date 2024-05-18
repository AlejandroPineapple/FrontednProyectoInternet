import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PeliculaList() {
  const [peliculas, setPeliculas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [count, setCount] = useState(5);

  useEffect(() => {
    axios.get('https://backendproyectointernet.azurewebsites.net/peliculas/')
      .then(res => {
        console.log(res);
        setPeliculas(res.data.peliculas);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPeliculas = Array.isArray(peliculas) ? peliculas.filter(pelicula => {
    return pelicula.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];

  const handleCountChange = (event) => {
    setCount(Number(event.target.value));
  };

  return (
    <div className="container my-5">
      <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Películas Geniales</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Busca una película"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="row">
        {filteredPeliculas.slice(0, count).map((pelicula, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100">
              <Link to={`/peliculas/${pelicula._id}`} style={{ textDecoration: 'none' }}>
                <img src={pelicula.imagen || "https://via.placeholder.com/150"} className="card-img-top" alt={`${pelicula.nombre} Poster`} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{pelicula.nombre}</h5>
                <p className="card-text"><small className="text-muted">Año: {pelicula.ano}</small></p>
                <p className="card-text"><small className="text-muted">Plataforma: {pelicula.plataforma}</small></p>
                <a href={pelicula.imbd} className="btn btn-warning" target="_blank" rel="noopener noreferrer">IMDb</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredPeliculas.length > count && (
        <>
          <h2 style={{ marginTop: '30px', textAlign: 'center' }}>Películas Recomendadas</h2>
          <div className="row">
            {filteredPeliculas.slice(count).map((pelicula, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100">
                  <Link to={`/peliculas/${pelicula._id}`} style={{ textDecoration: 'none' }}>
                    <img src={pelicula.imagen || "https://via.placeholder.com/150"} className="card-img-top" alt={`${pelicula.nombre} Poster`} />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{pelicula.nombre}</h5>
                    <p className="card-text"><small className="text-muted">Año: {pelicula.ano}</small></p>
                    <p className="card-text"><small className="text-muted">Plataforma: {pelicula.plataforma}</small></p>
                    <a href={pelicula.imbd} className="btn btn-warning" target="_blank" rel="noopener noreferrer">IMDb</a>
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
            <Link to="/create-pelicula" style={{ textDecoration: 'none' }}>
              <img src="https://content.mycutegraphics.com/graphics/alligator/alligator-holding-addition-symbol.png" className="card-img-top" alt="Agregar nueva película" />
            </Link>
            <div className="card-body">
              <h5 className="card-title">Agregar Nueva Película</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4">
        <label htmlFor="peliculaCount">Cantidad de películas antes de "Películas Recomendadas":</label>
        <input
          type="number"
          id="peliculaCount"
          className="form-control"
          value={count}
          onChange={handleCountChange}
          min="1"
          max={filteredPeliculas.length}
        />
      </div>
    </div>
  );
}

export default PeliculaList;