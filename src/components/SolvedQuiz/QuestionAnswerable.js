import {
    Box,
    FormControl,
    TextField,
    Button,
} from '@mui/material';
import * as React from 'react';
import useAxiosAuth from '../../hooks/useAxiosAuth';
import Error from '../Shared/Error';

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

export default function QuestionAnswerable({question, gradedQuestion, userAnswer, onChange, 
    canGrade, canReset, updateGradedQuestion, quizId}){
    const axiosAuth = useAxiosAuth();

    const [error, setError] = React.useState();
    const [grade, setGrade] = React.useState(false);
    const [disableGrade, setDisableGrade] = React.useState(false);

    React.useEffect(() => {
        setError();
    }, [question]);

    React.useEffect(() => {
        if(grade){
            async function gradeQuestion() {
                let answeredQuestion = {
                    questionId: question.questionId,
                    answer: userAnswer,
                    parameters: question.parameters
                }
                console.log(quizId);
                console.log(answeredQuestion);
        
                try {
                    await axiosAuth.post(`/QuizzesLearner/GradeQuestion?quizId=${quizId ? quizId : ""}`, answeredQuestion)
                        .then(response => {
                            console.log(response);
        
                            if(response.status === 200 && response.data){
                                let error = "";
                                let data = response.data;
        
                                if(data){
                                    updateGradedQuestion(question.questionId, true, data, setError)
                                } else {
                                    error="There was a problem grading question.";
                                }
        
                                if(error.length === 0){
                                    setError();
                                } else {
                                    setError(error);
                                }
                            } else {
                                setError("There was a problem grading question.");
                            }
                        })
                } catch(error){
                    setError("There was a problem grading question.");
                }
            }

            setGrade(false);
            gradeQuestion();
        }
    }, [grade]);

    React.useEffect(() => {
        setDisableGrade(!canGrade || !userAnswer || userAnswer.length === 0);
    }, [userAnswer]);

    function onGrade(){
        setGrade(true);
    }

    function onReset(){
        let resetedGradedQuestion = {
            ...gradedQuestion,
            correct: undefined,
            correctAnswer: undefined,
        };
        
        updateGradedQuestion(question.questionId, false, resetedGradedQuestion, setError);
        onChange({
            target: {
                value: ""
            }
        });
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
            {
                error ?
                <Error error={error} />
                :
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
                                    onChange={gradedQuestion.graded ? () => {} : onChange}
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
                                    <Button
                                        onClick={onReset}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        onClick={onGrade}
                                        disabled={disableGrade}
                                    >
                                        Grade
                                    </Button>
                                </Box>
                            }
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    );
}