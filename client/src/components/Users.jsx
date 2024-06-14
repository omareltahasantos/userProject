import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteButton from './DeleteButton';
import InsertButton from './InsertButton';
import UpdateButton from './UpdateButton';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import {SnackBarApp} from './SnackBarApp';
import Pagination from './Pagination'; 

const Users = () => {
  const [users, setUsers] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    color: '',
    message: ''
  });
  const [limit, setLimit] = useState(10); 
  const [offset, setOffset] = useState(0); 
  const [totalUsers, setTotalUsers] = useState(0); 

  const fetchUsers = (limit, offset) => {
    axios.get(`https://localhost:8000/api/user?limit=${limit}&offset=${offset}`)
      .then(response => {
        setUsers(response.data.data); 
        setTotalUsers(response.data.total); 
        setSnackbar({
          ...snackbar,
          open: true,
          color: 'success',
          message: 'Usuarios cargados exitosamente'
        });
      })
      .catch(error => {
        console.error('Error al acceder a la API', error);
        setSnackbar({
          ...snackbar,
          open: true,
          color: 'error',
          message: 'Error al cargar los usuarios'
        });
      });
  };

  useEffect(() => {
    fetchUsers(limit, offset);
  }, [offset, limit]);

  const handleDelete = (userId) => {
    axios.delete(`https://localhost:8000/api/users/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
        setSnackbar({
          ...snackbar,
          open: true,
          color: 'success',
          message: 'Usuario eliminado exitosamente'
        });
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
        setSnackbar({
          ...snackbar,
          open: true,
          color: 'error',
          message: 'Error al eliminar el usuario'
        });
      });
  };

  const handleInsert = (newUser) => {
    setUsers([...users, newUser]);
    setSnackbar({
      open: true,
      color: 'success',
      message: 'Usuario insertado exitosamente'
    });
  };

  const handleUpdate = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    setSnackbar({
      open: true,
      color: 'success',
      message: 'Usuario actualizado exitosamente'
    });
  };

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  return (
    <div>
      <h1>Lista de usuarios</h1>
      <InsertButton fetchUsers={fetchUsers} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Correo electrónico</TableCell>
              <TableCell>Contraseña</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <DeleteButton userId={user.id} onDelete={handleDelete} />
                    <UpdateButton user={user} fetchUsers={fetchUsers} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        limit={limit}
        offset={offset}
        total={totalUsers}
        onPageChange={handlePageChange}
      />

      <SnackBarApp
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        color={snackbar.color}
        text={snackbar.message}
      />
    </div>
  );
};

export default Users;
