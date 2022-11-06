import {
    Box,
    List,
    Grid,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
} from '@mui/material';
import * as React from 'react';
import QuizAnswerable from './QuizAnswerable';

const classes = {
    quizTitle: {
        paddingLeft: '30px',
    },
    quizPreview: {
        height: '50vh'
    },
};

export default function SolveQuiz({questions, userAnswers, setUserAnswers, graded, gradedQuestions}){
    return (
        <Grid 
            container
            direction="column"
        >
            <Grid 
                item
                sx={classes.quizPreview}
            >
                <QuizAnswerable 
                    questions={questions}
                    userAnswers={userAnswers}
                    setUserAnswers={setUserAnswers}
                    graded={graded}
                    gradedQuestions={gradedQuestions}
                />
            </Grid>
        </Grid>
    );
}