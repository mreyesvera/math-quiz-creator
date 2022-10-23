import {
    Box,
    FormControl,
    TextField,
    Checkbox,
    FormLabel,
    TextareaAutosize,
    Button,
} from '@mui/material';
import { sampleQuiz } from '../components/sample_data';
import { Outlet } from 'react-router-dom';
import * as React from 'react';

const classes = {
    root: {
        width: 1,
        //height: '100vh',
    }
};

export default function Question(props){
    return (
        <Box sx={classes.root}>
        <h1>{sampleQuiz.topic.title}</h1>
            <Box>
                <Outlet context={"test"}/>
            </Box>
        </Box>
    );
}