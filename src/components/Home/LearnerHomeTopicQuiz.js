import {
    Box,
} from '@mui/material';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const createClasses = (theme, solved) => {
    const backgroundColor = solved ? theme.palette.existingQuiz : theme.palette.nonExistantElement;
    const hoverCursor = solved ? 'pointer' : 'auto';

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
                cursor: hoverCursor,
            }
        },
    }
}

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Used in the Learner's home to display a specific topic's quiz
 * results based on user's solved quizzes.  
 * 
 * @param {Object} param0 
 *      - quizId: quiz id of the quiz being represented 
 *      - solved: Whether this is a display for a solved quizzes, or just to display message to solve quizzes
 *      - title: quiz title of the quiz being represented
 *      - highestScore: user's highest score 
 * @returns {React.ReactElement} - Learner's Home Topic Quiz 
 */
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