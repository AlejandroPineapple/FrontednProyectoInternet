import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AlbumDetail() {
  const [album, setAlbum] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState({
    username: '',
    texto: ''
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://backendproyectointernet.azurewebsites.net/${id}/comentarios/`)
      .then(res => {
        setComentarios(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    axios.get(`https://backendproyectointernet.azurewebsites.net/albums/${id}/`)
      .then(res => {
        setAlbum(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoComentario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post(`https://backendproyectointernet.azurewebsites.net/${id}/comentarios`, nuevoComentario, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setComentarios([...comentarios, res.data]);
        setNuevoComentario({ username: '', texto: '' });
      })
      .catch(err => console.log(err));
  };

  const handleEdit = () => {
    navigate(`/albums/edit/${id}`);
  };

  const handleDelete = () => {
    axios.delete(`https://backendproyectointernet.azurewebsites.net/albums/${id}`)
      .then(() => {
        navigate('/albums');
      })
      .catch(error => {
        console.error('Error deleting album:', error);
      });
  };

  const toggleConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={album.imagen || "https://via.placeholder.com/300"} className="img-fluid mb-4" alt={`${album.nombre} Album Cover`} />
        </div>
        <div className="col-md-6">
          <h1 className="display-4">{album.nombre}</h1>
          <h2>{album.artista}</h2>
          <p className="lead">Año: {album.ano}</p>
          <p>{album.descripcion}</p>
          <div>
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
      <div className="row mt-5">
        {!loggedIn && (
          <div className="alert alert-warning" role="alert">
            Debes iniciar sesión para dejar un comentario.
          </div>
        )}
        {loggedIn && (
          <div>
            <h4>Crear Comentario</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="texto" className="form-label">Comentario</label>
                <textarea className="form-control" id="texto" name="texto" value={nuevoComentario.texto} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Enviar Comentario</button>
            </form>
          </div>
        )}
      </div>
      <div className="row mt-5">
        <h2 className='my-5'>Comentarios:</h2>
        {comentarios.map((comentario, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: 'bold' }}>{comentario.username}</h5>
                <p className="card-text">{comentario.texto}</p>
                <p className="card-text"><small className="text-muted"> {comentario.creadoEn}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-5">
      <div className="col">
        <div className="d-flex justify-content-center">
          <div className="btn-group">
            <button className="btn btn-primary me-2 btn-lg" onClick={handleEdit}>Editar Álbum</button>
            <button className="btn btn-danger btn-lg me-2" onClick={toggleConfirm}>Eliminar Álbum</button>
          </div>
        </div>
        {showConfirm && (
          <div className="mt-5 mx-5  justify-content-center">
            <center>
            <div>
            <p>¿Estás seguro de que deseas eliminar el álbum?</p>
            </div>
            <button className="btn btn-danger me-2" onClick={handleDelete}>Sí, eliminar</button>
            <button className="btn btn-secondary" onClick={toggleConfirm}>Cancelar</button>
            </center>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default AlbumDetail;