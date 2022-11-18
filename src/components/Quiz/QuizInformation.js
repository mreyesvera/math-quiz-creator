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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Handles displaying quiz's information and actions. 
 * 
 * @param {Object} props 
 *      - quiz: Quiz object to show the information for
 * @returns {React.ReactElement} Quiz's Information
 */
export default function QuizInformation(props){
    const { auth } = useAuth();
    const navigate = useNavigate();
    const quiz = props.quiz;

    const onEdit = (e) => {
        navigate(`/quiz/${quiz.quizId}/edit`);
    }

    const onTakeQuiz = (unlimited) => {
        navigate(`/quiz/${quiz.quizId}/solve/${unlimited}`);
    }

    return (
        <Box sx={classes.root}>
            <Box sx={classes.titleContainer}>
                <h1 style={classes.title}>{quiz.title}</h1>
                {
                    auth?.user?.role === "Learner" &&
                    <Button
                        variant="contained"
                        onClick={() => onTakeQuiz(false)}
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
                (auth?.user?.role === "Learner" && quiz.hasUnlimitedMode) && 
                <Box>
                    <Button
                        variant="contained"
                        sx={classes.practiceButton}
                        onClick={() => onTakeQuiz(true)}
                    >
                        Practice in Unlimited Mode
                    </Button>
                </Box>
            }
        </Box>
    );
}