import React, { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { LoadingButton } from '@mui/lab';
import { adminApi } from 'src/api/admin';
import toast from 'react-hot-toast';

const DeleteConfirmation = ({ open, onClose, id }) => {
  const [isLoading, setIsLoading] = useState(false);

  //delete function
  const onConfirm = async (id) => {
    setIsLoading(true);
    try {
      const isDelete = await adminApi.deleteAdmin(id);
      onClose(true);
      toast.success('Admin deleted successfully!');

      //page reload after delete
      window.location.reload();
      return isDelete;
    } catch (error) {
      console.error('Error occurred during deletion:', error);
    }
    setIsLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Are you sure you want to delete?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you click the delete button, we cannot retrieve your data again!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
        >
          CANCEL
        </Button>
        <LoadingButton
          loading={isLoading}
          onClick={() => onConfirm(id)}
          variant="contained"
          color="error"
        >
          DELETE
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
