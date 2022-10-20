import {
    Box,
    FormControl,
    TextField 
} from '@mui/material';
import { sampleQuiz } from '../components/sample_data';
import QuizEdit from '../components/Quiz/QuizEdit';
import * as React from 'react';
import axios from 'axios';

const classes = {
    root: {
        width: 1,
        height: '100vh',
    }
};

export default function QuizAdd(){
    return (
        <Box sx={classes.root}>
            <h1>{sampleQuiz.topic.title}</h1>
            <QuizEdit />
        </Box>
    );
}