import {
    Box, 
    //List,
    ListItem,
    ListItemButton,
    ListItemText,
    Grid,
    Button,
} from '@mui/material';
import * as React from 'react';

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
                "test"
            }
        </Box>
    )
}