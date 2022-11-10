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
    height: '80%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
  };

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