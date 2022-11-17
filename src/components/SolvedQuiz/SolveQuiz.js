import {
    Grid,
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

export default function SolveQuiz({questions, userAnswers, setUserAnswers, graded, solvedQuiz, gradedQuestions, 
    updateGradedQuestion, unlimitedMode, quizId, exit, setGetData}){
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
                    quizId={quizId}
                    questions={questions}
                    userAnswers={userAnswers}
                    setUserAnswers={setUserAnswers}
                    graded={graded}
                    gradedQuestions={gradedQuestions}
                    solvedQuiz={solvedQuiz}
                    updateGradedQuestion={updateGradedQuestion}
                    unlimitedMode={unlimitedMode}
                    exit={exit}
                    setGetData={setGetData}
                />
            </Grid>
        </Grid>
    );
}