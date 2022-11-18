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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Used as a container for QuizAnswerable. 
 * (Not as needed as I thought it would be) 
 * 
 * @param {Object} param0 
 *      - quizId: Quiz id of the quiz to display
 *      - questions: Quiz questions
 *      - userAnswers: list of objects to hold the user answers per question
 *      - setUserAnswers: function to set the userAnswers
 *      - graded: whether the quiz is graded or not
 *      - solvedQuiz: the returned solved quiz once graded
 *      - gradedQuestions: object to manage graded questions data
 *      - updateGradedQuestion: function to update the graded questions
 *      - unlimitedMode: whether the quiz should be shown in unlimited mode or not
 *      - exit: whether the exit button is available
 *      - setGetData: function to reretrieve the quiz data
 * @returns {React.ReactElement} Solve Quiz display
 */
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