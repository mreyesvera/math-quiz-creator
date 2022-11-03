import {
    Box,
    Button,
    List,
    Grid,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
} from '@mui/material';
import {
    useParams,
} from "react-router-dom";
import Error from '../Shared/Error';
import { useOutletContext } from 'react-router-dom';
import * as React from 'react';
import SolveQuiz from './SolveQuiz';

const classes = {
    quizTitle: {
        paddingLeft: '30px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    quizSubmitButton: {
        margin: '20px',
    },
};

export default function TakeQuiz(){
    const outletContext = useOutletContext();
    const [questions, setQuestions] = React.useState();
    const [error, setError] = React.useState();
    const [answers, setAnswers] = React.useState();

    React.useEffect(() => {
        let questions = outletContext.quiz.quizQuestions.map((quizQuestion) => {
            return {
                ...quizQuestion.question,
                order: quizQuestion.order
            }
        });

        questions.sort((a, b) => { return a.order - b.order});

        setQuestions(questions);
    }, []);

    console.log(outletContext.quiz);
    return (
        <Box>
            {
                error ?
                <Error error={error} />
                :
                <Box>
                    {
                        outletContext.quiz &&
                        <Box>
                            <Box
                                sx={classes.quizTitle}
                            >
                                <h2>{outletContext.quiz.title}</h2>
                                <Button
                                    variant="contained"
                                    sx={classes.quizSubmitButton}
                                >
                                    Submit
                                </Button>
                            </Box>
                            {
                                (questions && questions.length > 0) ?
                                <SolveQuiz questions={questions}/>
                                :
                                <Box>No questions</Box>
                            }
                        </Box>
                    }
                </Box>
            }
        </Box>
    );
}