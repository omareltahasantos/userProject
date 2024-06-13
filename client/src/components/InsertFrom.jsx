import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const InsertForm = ({ fetchUsers }) => {
  const [userData, setUserData] = useState({
    name: '', 
    lastname: '',
    email: '',
    password: ''
  });

  const [showForm, setShowForm] = useState(true);
  const [insertSuccess, setInsertSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get('https://localhost:8000/api/users',{params:userData})
      .then(response => {
        fetchUsers(); 
        setInsertSuccess(true);
        setShowForm(false); // Cierra el formulario
      })
      .catch(error => {
        console.error('Error al insertar el usuario:', error);
      });
  };

  const handleOpenForm = () => {
    setInsertSuccess(false);
    setShowForm(true);
  };

  return (
    <div>
      {!showForm && (
        <Button variant="contained" color="primary" onClick={handleOpenForm}>
          Añadir Usuario
        </Button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Nombre"
            value={userData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="lastname"
            label="Apellido"
            value={userData.lastname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="email"
            label="Correo electrónico"
            value={userData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="password"
            label="Contraseña"
            type="password"
            value={userData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </form>
      )}
      {insertSuccess && (
        <p>¡Usuario insertado correctamente!</p>
      )}
      {insertSuccess && (
        <Button onClick={handleOpenForm} variant="contained" color="primary">
          Añadir otro Usuario
        </Button>
      )}
    </div>
  );
};

export default InsertForm;
