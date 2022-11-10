import {
    Box, 
    Button,
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const classes = {
    root: {
        marginBottom: '50px',
        marginLeft: '20px',
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        margin: 0,
    },
    editingDetails: {
        marginTop: '20px',
        marginBottom: '20px',
    },
    description: {
        marginLeft: '20px',
        marginTop: '20px',
        marginBottom: '20px',
    },
    practiceButton: {
    },
};

export default function QuizInformation(props){
    const { auth } = useAuth();
    const navigate = useNavigate();
    const quiz = props.quiz;

    const onEdit = (e) => {
        navigate(`/quiz/${quiz.quizId}/edit`);
    }

    const onTakeQuiz = (e) => {
        navigate(`/quiz/${quiz.quizId}/solve`);
    }

    return (
        <Box sx={classes.root}>
            <Box sx={classes.titleContainer}>
                <h1 style={classes.title}>{quiz.title}</h1>
                {
                    auth?.user?.role === "Learner" &&
                    <Button
                        variant="contained"
                        onClick={onTakeQuiz}
                    >
                        Take Quiz
                    </Button>
                }
                {
                    (auth?.user?.role === "Creator" 
                        && auth?.user?.userId == quiz?.creator?.userId) &&
                    <Button
                        variant="contained"
                        onClick={onEdit}
                    >
                        Edit Quiz
                    </Button>
                }
            </Box>
            <Box style={classes.description}>
                {quiz.description}
            </Box>
            <Box sx={classes.editingDetails}>
                <Box>
                    Created By: {quiz.creator.userName}
                </Box>
                <Box>
                    Last Modified: {quiz.lastModifiedTime}
                </Box>
                <Box>
                    Creation: {quiz.creationTime}
                </Box>
            </Box>
            {
                auth?.user?.role === "Learner" &&
                <Box>
                    <Button
                        variant="contained"
                        sx={classes.practiceButton}
                    >
                        Practice in Unlimited Mode
                    </Button>
                </Box>
            }
        </Box>
    );
}