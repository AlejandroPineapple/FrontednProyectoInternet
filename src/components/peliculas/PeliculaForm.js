import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function PeliculaForm() {
  const [pelicula, setPelicula] = useState({
    nombre: '',
    director: '',
    ano: '',
    descripcion: '',
    imagen: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`https://backendproyectointernet.azurewebsites.net/peliculas/${id}`)
        .then(response => {
          setPelicula(response.data);
        })
        .catch(error => console.error('Error fetching película:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPelicula(prevPelicula => ({
      ...prevPelicula,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'put' : 'post';
    const url = id ? `https://backendproyectointernet.azurewebsites.net/peliculas/${id}` : 'https://backendproyectointernet.azurewebsites.net/peliculas/';

    axios[method](url, pelicula)
      .then(() => {
        navigate('/peliculas');
      })
      .catch(error => console.error('Error saving película:', error));
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Editar Película' : 'Agregar Nueva Película'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" className="form-control" id="nombre" name="nombre" value={pelicula.nombre} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="ano">Año:</label>
          <input type="text" className="form-control" id="ano" name="ano" value={pelicula.ano} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="plataforma">Plataforma:</label>
          <input type="text" className="form-control" id="plataforma" name="plataforma" value={pelicula.plataforma} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea className="form-control" id="descripcion" name="descripcion" value={pelicula.descripcion} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="imagen">Imagen de la Película:</label>
          <input type="text" className="form-control" id="imagen" name="imagen" value={pelicula.imagen} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="imbd">IMBd:</label>
          <input type="text" className="form-control" id="imbd" name="imbd" value={pelicula.imbd} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">{id ? 'Actualizar' : 'Agregar'}</button>
      </form>
    </div>
  );
}

export default PeliculaForm;