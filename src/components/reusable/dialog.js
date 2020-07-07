import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({ openDialog, city, handleReturn }) {
  return (
    <div>
      <Dialog open={openDialog} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">No Restaurants Found in {city}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter another location near to you and submit to get results. We are doing our best to serve your location, find Restaurants in major cities.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReturn} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
