import {
    Box,
    List,
    Grid,
    ListItem,
    ListItemText,
    ListItemButton,
    FormControl,
    TextField,
    Button,
} from '@mui/material';
import * as React from 'react';

const classes = {
    container: {
        m: 2,
    },
}

export default function QuestionPreview({question, userAnswer, onChange, canGrade, canReset}){
    return(
        <Box
            sx={classes.container}
        >
            <Box>
                {question.title}
            </Box>
            <Box>
                {question.description}
            </Box>

            <Box>
                <Box>Answer:</Box>
                <FormControl>
                    <TextField 
                        name="userAnswer"
                        value={userAnswer}
                        onChange={onChange}
                    />
                </FormControl>
            </Box>
            {
                (canGrade || canReset) &&
                <Box>
                    {
                        canReset &&
                        <Button>Reset</Button>
                    }
                    {
                        canGrade &&
                        <Button>Grade</Button>
                    }
                </Box>
            }
        </Box>
    );
}