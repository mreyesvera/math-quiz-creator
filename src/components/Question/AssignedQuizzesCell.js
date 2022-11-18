import {
    Box, 
} from '@mui/material';
import * as React from 'react';

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Displays a simple container with the passed in assigned quizzes 
 * listed inside. 
 * 
 * @param {Object} param0 
 *      - assignedQuizzes: Questions' list of assigned quizzes (titles)
 * @returns {React.ReactElement} Assigned Quizzes Cell
 */
export default function AssignedQuizzesCell({assignedQuizzes}){
    return (
        <Box>
            {
                assignedQuizzes ?
                assignedQuizzes.map((assignedQuiz, index) => (
                    <Box key={index}>
                        {assignedQuiz}
                    </Box>
                ))
                :
                ""
            }
        </Box>
    )
}