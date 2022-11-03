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

/*const questions = [
    {
        questionId: 0, 
        title: "Question 1",
        description: "Description 1"
    },
    {
        questionId: 1,
        title: "Question 2",
        description: "Description 2"
    },
    {
        questionId: 2,
        title: "Question 3",
        description: "Description 3"
    },
    {
        questionId: 3,
        title: "Question 4",
        description: "Description 4"
    },
];*/

const classes = {
    quizTitle: {
        paddingLeft: '30px',
    },
    quizPreview: {
        height: '50vh'
    },
};

export default function SolveQuiz({questions}){
    return (
        <Grid 
            container
            direction="column"
        >
            {/* <Grid item>
                <h1>Statistics</h1>
                <Box sx={classes.quizTitle}>
                    <h2>Quiz Title</h2>
                </Box>
            </Grid> */}
            <Grid 
                item
                sx={classes.quizPreview}
            >
                <QuizAnswerable questions={questions}/>
            </Grid>
        </Grid>
    );
}