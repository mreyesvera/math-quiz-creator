import {
    Box,
    FormControl,
    TextField,
    Checkbox,
    FormLabel,
    TextareaAutosize,
    Button,
} from '@mui/material';
import * as React from 'react';
import { useOutletContext } from 'react-router-dom';
import CreatorContentGrid from '../Home/CreatorContentGrid';
import Errors from '../Shared/Errors';
import { useNavigate } from "react-router-dom";
import CreatorGridQuizEditActions from "../Home/CreatorGridQuizEditActions";
import QuizForm from './QuizForm';
import mathQuizCreatorAPI from '../config/mathQuizCreatorAPI.json';
import axios from 'axios';


export default function QuizEdit(){
    const navigate = useNavigate();
    const outletContext = useOutletContext();

    async function saveQuiz(quiz, formData, setErrors){
        let modifiedQuiz = {
            quizId: quiz.quizId,
            ...formData
        };

        try {
            await axios.put(`${mathQuizCreatorAPI.baseURL}Quizzes/${quiz.quizId}`, modifiedQuiz)
                .then(response => {
                    console.log(response);

                    if(response.status === 204){
                        outletContext.setGetData(true);
                        //navigate(`/quiz/${quiz.quizId}/details`);
                        navigate(-1);
                    } else {
                        setErrors(["There was a problem saving the data."]);
                    }
                });
        } catch(error){
            setErrors(["There was a problem saving the data."]);
        }
    }

    return (
        <Box>
            <QuizForm 
                quiz={outletContext.quiz}
                onSubmit={saveQuiz}
                topicId={outletContext.quiz.topic.topicId}
            />
        </Box>
    );
}