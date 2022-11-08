import {
    Box,
    Button,
} from '@mui/material';
import Error from '../Shared/Error';
import { useOutletContext } from 'react-router-dom';
import * as React from 'react';
import SolveQuiz from './SolveQuiz';
import useAxiosAuth from '../../hooks/useAxiosAuth';

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
    const axiosAuth = useAxiosAuth();
    const outletContext = useOutletContext();
    const [questions, setQuestions] = React.useState();
    const [error, setError] = React.useState();
    const [userAnswers, setUserAnswers] = React.useState([]);

    const [graded, setGraded] = React.useState(false);
    const [solvedQuiz, setSolvedQuiz] = React.useState();
    const [gradedQuestions, setGradedQuestions] = React.useState();

    React.useEffect(() => {
        let questions = outletContext.quiz.quizQuestions.map((quizQuestion) => {
            return {
                ...quizQuestion.question,
                order: quizQuestion.order,
            }
        });

        questions.sort((a, b) => { return a.order - b.order});
        setQuestions(questions);

        let gradedQuestions = [];
        questions.forEach((question) => {
            gradedQuestions.push({
                questionId: question.questionId,
                question: question,
                graded: false,
                correct: undefined,
                correctAnswer: undefined,
            });
        });
        setGradedQuestions(gradedQuestions);
    }, [outletContext.quiz.quizQuestions]);

    async function onSubmit(e) {
        e.preventDefault();

        let answeredQuiz = {
            quizId: outletContext.quiz.quizId,
            answeredQuestions: userAnswers
        }

        try {
            await axiosAuth.post(`/QuizzesLearner`, answeredQuiz)
                .then(response => {
                    console.log(response);

                    if(response.status === 200 && response.data){
                        let error = "";
                        let data = response.data;

                        setSolvedQuiz(data.solvedQuiz);

                        let answeredQuestionsGraded = data.answeredQuestionsGraded;

                        if(answeredQuestionsGraded && answeredQuestionsGraded.length > 0){
                            setGradedQuestions(oldGradedQuestions => {
                                return oldGradedQuestions.map((oldGradedQuestion) => {
                                    let answeredQuestionGraded = answeredQuestionsGraded.find(aqg => aqg.questionId === oldGradedQuestion.questionId);

                                    if(!answeredQuestionsGraded){
                                        error = "Error grading quiz."
                                        return oldGradedQuestion;
                                    } else {
                                        return {
                                            ...oldGradedQuestion,
                                            graded: true,
                                            correct: answeredQuestionGraded.correct,
                                            correctAnswer: answeredQuestionGraded.correctAnswer
                                        }
                                    }
                                });
                            });
                        }

                        if(error.length === 0){
                            setGraded(true);
                        } else {
                            setError(error);
                        }

                        //navigate(`/quiz/${quiz.quizId}/details`);
                    } else {
                        setError("There was a problem saving the data.");
                    }
                })
        } catch(error){

        }

        console.log(answeredQuiz);
    } 

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
                                {
                                    !graded && 
                                    <Button
                                        variant="contained"
                                        sx={classes.quizSubmitButton}
                                        onClick={onSubmit}
                                    >
                                        Submit
                                    </Button>
                                }
                            </Box>
                            {
                                (questions && questions.length > 0) ?
                                <SolveQuiz 
                                    questions={questions}
                                    userAnswers={userAnswers}
                                    setUserAnswers={setUserAnswers}
                                    graded={graded}
                                    gradedQuestions={gradedQuestions}
                                    solvedQuiz={solvedQuiz}
                                />
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