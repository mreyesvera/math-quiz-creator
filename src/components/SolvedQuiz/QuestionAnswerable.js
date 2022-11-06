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
        mx: 2,
        height: 1,
    },
    questionDescription: {
        marginBottom: '20px',
    },
    titleContent: {
    },
    questionContent: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '40vh',
    },
    answerField: {
        width: 1,
    },
    answerActions: {
        textAlign: 'right',
    },
}

export default function QuestionAnswerable({question, userAnswer, graded, onChange, canGrade, canReset}){
    return(
        <Box
            sx={classes.container}
        >
            <Box
                sx={classes.titleContent}
            >
                <h4>
                    {question.title}
                </h4>
            </Box>
            <Box
                sx={classes.questionContent}
            >
                <Box
                    sx={classes.questionDescription}
                >
                    <Box>
                        {question.description}
                    </Box>
                    <Box>
                        {/* Visualizations */}
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <FormControl
                            sx={classes.answerField}
                        >
                            <TextField 
                                label="Answer"
                                name="userAnswer"
                                value={userAnswer}
                                onChange={onChange}
                            />
                        </FormControl>
                        {
                            (canGrade || canReset) &&
                            <Box
                                sx={classes.answerActions}
                            >
                                <Button>Reset</Button>
                                <Button>Grade</Button>
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}