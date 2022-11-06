import {
    Box,
    FormControl,
    TextField,
    Button,
    FormLabel,
    TextareaAutosize,
    Grid,
} from '@mui/material';
import * as React from 'react';
import { useOutletContext } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import QuestionFeaturesDrawer from './QuestionFeaturesDrawer';
import Errors from '../Shared/Errors';
import { useNavigate } from "react-router-dom";
import mathQuizCreatorAPI from '../../config/mathQuizCreatorAPI.json';
import axios from 'axios';

const classes = { 
    topRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkboxContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    descriptionTextareaContainer: {
        width: 1,
        marginTop: 1,
    },
    descriptionTextareaLabel: {
        py: 1,
    },
    descriptionTextarea: {
        minWidth: 1,
        maxWidth: 1,
        width: 1,
    },
    questionsGridContainer: {
        marginTop: 4,
    },
    saveChangesContainer: {
        my: 1,
        textAlign: 'right',
    },
    titleActionButton: {
        marginLeft: 2,
    },
    featureButton: {
        my: 2,
        marginRight: 2,
    },
    rowWithMarginTop: {
        marginTop: 2,
    },
    fullWidth: {
        width: 1,
    },
    previewButton: {
        my: 2,
        py: 1,
    },
};

export default function QuestionEdit(){
    const navigate = useNavigate();
    const outletContext = useOutletContext();

    async function saveQuestion(question, formData, setErrors){
        let modifiedQuestion = {
            questionId: question.questionId,
            ...formData
        };
        console.log(modifiedQuestion);

        try {
            await axios.put(`${mathQuizCreatorAPI.baseURL}Questions/${outletContext.question.questionId}`, modifiedQuestion)
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