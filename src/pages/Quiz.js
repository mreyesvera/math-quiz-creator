import {
    Box, 
} from '@mui/material';
import {
    useParams,
} from "react-router-dom";
import * as React from 'react';
import { sampleQuiz } from '../components/sample_data';
import { Outlet } from 'react-router-dom';
import { quizzes, questions } from '../components/sample_data';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizAdd from './QuizAdd';
import QuizEdit from '../components/Quiz/QuizEdit';
import QuizDetails from '../components/Quiz/QuizDetails';

const classes = {
    root: {
        width: 1,
        height: '100vh',
    }
};


export default function Quiz(props){
    const { id } = useParams();
    console.log(questions);
    const currentQuiz = quizzes[0][0];
    const currentQuestions = questions[0];
    const contextValue = {
        quiz: currentQuiz,
        questions: currentQuestions,
    };

    

    return (
        <Box sx={classes.root}>
            <h1>{sampleQuiz.topic.title}</h1>
            <Box>
                <Outlet context={contextValue}/>
                {/* <Routes>
                    <Route path="/quiz/:id/details" element={<QuizDetails isCreator={props.isCreator}/>} />
                    <Route path="/quiz/:id/edit" element={<QuizEdit isCreator={props.isCreator}/>} />
                    <Route path="/quiz/:id/add" element={<QuizAdd isCreator={props.isCreator}/>} />
                </Routes> */}
            </Box>
        </Box>
    );
}