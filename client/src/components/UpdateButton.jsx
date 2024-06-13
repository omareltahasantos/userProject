import React, { useState } from 'react';
import Button from '@mui/material/Button';
import UpdateForm from './UpdateForm';

const UpdateButton = ({ user, fetchUsers }) => {
  const [showForm, setShowForm] = useState(false);


  const toggleForm = () => {
    setShowForm(!showForm);
  };
  

  return (
    <div>
      <Button onClick={toggleForm} variant="contained" color="secondary">
        {showForm ? 'Ocultar formulario' : 'Actualizar usuario'}
      </Button>
      {showForm && <UpdateForm user={user} fetchUsers={fetchUsers}  />}
    </div>
  );
};

export default UpdateButton;
