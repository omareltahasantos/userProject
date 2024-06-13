import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { SnackBarApp } from './SnackBarApp';



const UpdateForm = ({ user, fetchUsers }) => {
  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    color: '',
    message: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password
      });
      setShowForm(true); // Mostrar el formulario cuando hay un usuario seleccionado
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`https://localhost:8000/api/users/${user.id}`, userData)
      .then(response => {
        console.log(response);
        fetchUsers();
        setUpdateSuccess(true); // Marcar la actualización como exitosa
        setSnackbar({
          open: true,
          color: 'success',
          message: 'Usuario  actualizado exitosamente'
        });
      })
      .catch(error => {
        console.error('Error al actualizar el usuario:', error);
        setSnackbar({
          open: true,
          color: 'error',
          message: 'Usuarios no actualizado exitosamente'
        });
      });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setUpdateSuccess(false); // Reiniciar el estado de éxito de actualización
  };

  return (
    <>
      {showForm && !updateSuccess && (
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
            Actualizar
          </Button>
        </form>
      )}

      

      {updateSuccess && (
        <Button onClick={handleCloseForm} variant="contained" color="primary">
          Cerrar
        </Button>
      )}
    </>
  );
};

export default UpdateForm;
