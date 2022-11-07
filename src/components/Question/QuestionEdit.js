import {
    Box,
} from '@mui/material';
import * as React from 'react';
import { useOutletContext } from 'react-router-dom';
import QuestionForm from './QuestionForm';
//import Errors from '../Shared/Errors';
import { useNavigate } from "react-router-dom";
import useAxiosAuth from '../../hooks/useAxiosAuth';

export default function QuestionEdit(){
    const axiosAuth = useAxiosAuth();
    const navigate = useNavigate();
    const outletContext = useOutletContext();

    async function saveQuestion(question, formData, setErrors){
        let modifiedQuestion = {
            questionId: question.questionId,
            ...formData
        };
        console.log(modifiedQuestion);

        try {
            await axiosAuth.put(`/Questions/${outletContext.question.questionId}`, modifiedQuestion)
                .then(response => {
                    console.log(response);

                    if(response.status === 204){
                        outletContext.setGetData(true);
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
            <QuestionForm 
                question={outletContext.question}
                onSubmit={saveQuestion}
            />
        </Box>
    );
}