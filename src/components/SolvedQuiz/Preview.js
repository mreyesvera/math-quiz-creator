import {
    Box,
    FormControl,
    TextField,
    Modal
} from '@mui/material';
import * as React from 'react';
import QuestionPreview from '../Question/QuestionPreview';
import { ELEMENT } from '../../utils/models';
import QuizPreview from '../Quiz/QuizPreview';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    //height: '80%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
  };

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Displays a modal that previews a quiz or question (specified element).
 * 
 * @param {Object} param0 
 *      - open: Whether the modal is open or not
 *      - handleClose: function to close the modal
 *      - element: Quiz or Question object to use for the preview
 * @returns {React.ReactElement} Preview Modal for quizzes and questions
 */
export default function Preview({open, handleClose, element}){
    return (
        <Modal
            //keepMounted
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Box>
                {
                    element.type === ELEMENT.QUESTION &&
                    <QuestionPreview questionId={element.id}/>
                }
                </Box>
                <Box>
                {
                    element.type === ELEMENT.QUIZ &&
                    <QuizPreview quizId={element.id}/>
                }
                </Box>
            </Box>
        </Modal>
    );
}