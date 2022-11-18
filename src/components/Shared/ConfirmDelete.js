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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Handles and displays a dialog to be able to delete a quiz or question.
 * 
 * @param {Object} param0 
 *      - open: Whether the delete dialog is open or not
 *      - elementTitle: What is the element being deleted's title
 *      - handleClose: function to handle closing the dialog
 *      - onDelete: function to handle the delete operation
 * @returns {React.ReactElement} Confirm Delete Dialog
 */
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
                (errors && errors.length > 0) &&
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