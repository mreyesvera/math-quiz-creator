import {
    Box,
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
    successTextField: {
        '& label.Mui-focused': {
            color: '#67a489',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#67a489',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#67a489',
            },
            '&:hover fieldset': {
                borderColor: '#67a489',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#67a489',
            },
        },
        ".css-11xuzmr-MuiFormLabel-root-MuiInputLabel-root": {
            color: '#67a489',
        },
        ".css-dgdbsq-MuiFormHelperText-root": {
            color: '#67a489',
        },
    }
}

export default function QuestionAnswerable({question, gradedQuestion, userAnswer, onChange, canGrade, canReset}){
    console.log(question);

    function doNothing(){

    }

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
                                onChange={gradedQuestion.graded ? doNothing : onChange}
                                sx={gradedQuestion.graded ? (gradedQuestion.correct ? classes.successTextField : {}) : {}}
                                error={gradedQuestion.graded ? !gradedQuestion.correct : false}
                                helperText={gradedQuestion.graded ? (gradedQuestion.correct ? "Correct" : "Correct answer: " + gradedQuestion.correctAnswer) : ""}
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