import React, { useState } from 'react';
import Button from '@mui/material/Button';
import InsertForm from './InsertFrom';

const InsertButton = ({ user,fetchUsers }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Button onClick={toggleForm} variant="contained" color="primary">
        {showForm ? 'Ocultar formulario' : 'Agregar usuario'}
      </Button>
      {showForm && <InsertForm  fetchUsers={fetchUsers} />}
    </div>
  );
};

export default InsertButton;
