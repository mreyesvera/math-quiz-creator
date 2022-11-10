import {
    Box,
    FormControl,
    TextField,
    Modal,
} from '@mui/material';
import * as React from 'react';
import QuestionAnswerable from '../SolvedQuiz/QuestionAnswerable';

export default function QuestionPreview(){
    return (
        <Box>
            Quiz Preivew
            {/* <QuestionAnswerable
                question={question}
                gradedQuestion={gradedQuestions[selectedQuestion]} 
                userAnswer={userAnswers[selectedQuestion].answer}
                onChange={onUserAnswerChanged}
                canGrade={false}
                canReset={false}
            /> */}
        </Box>
    );
}