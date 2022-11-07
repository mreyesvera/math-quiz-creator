import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from '@mui/material';
import * as React from 'react';
import Errors from './Errors';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function ConfirmDelete({open, elementTitle, handleClose, onDelete}){
    const [errors, setErrors] = React.useState([]);
    const [deleting, setDeleting] = React.useState(false);

    React.useEffect(() => {
        if(deleting){
            setDeleting(false);
            onDelete(setErrors);
        }
    }, [deleting, onDelete])

    function deleteConfirm(){
        setDeleting(true);
    }
    
      return (
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Confirm Delete"}</DialogTitle>
            {
                (errors && errors.length > 0) ??
                <Errors errors={errors} />
            }
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {
                    `Are you sure you want to delete ${elementTitle}?`
                }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={deleteConfirm}>Delete</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}