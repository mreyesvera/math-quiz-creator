import {
    Box,
} from '@mui/material';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const createClasses = (theme, solved) => {
    const backgroundColor = solved ? theme.palette.existingQuiz : theme.palette.nonExistantElement;

    return {
        root: {
            background: backgroundColor,
            width: '200px',
            height: '100px',
            margin: '10px',
            padding: '10px',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            '&:hover': {
                cursor: 'pointer',
            }
        },
    }
}

export default function LearnerHomeTopicQuiz({quizId, solved, title, highestScore}) {
    const theme = useTheme();
    const classes = createClasses(theme, solved);
    const navigate = useNavigate();

    return (
        <Box 
            sx={classes.root}
            onClick={quizId ? () => navigate(`/quiz/${quizId}/details`) : () => {}}
        >
            {
                solved ?
                <Box>
                    {title}
                    <br/>
                    HIGHEST SCORE: {highestScore}
                </Box>
                :
                <Box>
                    Try solving some quizzes!
                </Box>
            }
        </Box>
    );
}