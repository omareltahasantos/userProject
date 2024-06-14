import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SnackBarApp({ open, handleClose, color, text, vertical = 'top', horizontal = 'center', time = 3000 }) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        autoHideDuration={time}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

const SnackBarMessages = () => {
  const [messages, setMessages] = useState({
    success: [],
    error: []
  });

  const addSuccessMessage = (message) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      success: [...prevMessages.success, message]
    }));
  };

  const addErrorMessage = (message) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      error: [...prevMessages.error, message]
    }));
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    color: ''
  });

  return (
    <SnackBarApp
      open={snackbar.open}
      handleClose={() => setSnackbar({ ...snackbar, open: false })}
      color={snackbar.color}
      text={
        <ul>
          {messages.success.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
          {messages.error.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      }
    />
  );
};

