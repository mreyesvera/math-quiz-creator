import {
    Box,
} from '@mui/material';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';

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
        },
    }
}

export default function LearnerHomeTopicQuiz(props) {
    const theme = useTheme();
    const classes = createClasses(theme, props.solved);

    return (
        <Box sx={classes.root}>
            {
                props.solved ?
                <Box>
                    {props.solvedQuiz.title}
                    <br/>
                    HIGHEST SCORE: {props.solvedQuiz.score}
                </Box>
                :
                <Box>
                    Try solving some quizzes!
                </Box>
            }
        </Box>
    );
}