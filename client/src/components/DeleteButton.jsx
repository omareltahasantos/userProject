import React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

const DeleteButton = ({ userId, onDelete }) => {
  const handleClick = () => {
    // Realizar la solicitud de eliminación al backend
    axios.delete(`https://localhost:8000/api/users/${userId }`)
      .then(() => {

        onDelete(userId);
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  return (
    <Button variant="contained" color="error" onClick={handleClick}>
      Eliminar
    </Button>
  );
};

export default DeleteButton;
