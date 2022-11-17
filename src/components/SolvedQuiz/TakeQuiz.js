import {
    Box,
    Button,
} from '@mui/material';
import {
    useParams,
} from "react-router-dom";
import Error from '../Shared/Error';
import { useOutletContext } from 'react-router-dom';
import * as React from 'react';
import SolveQuiz from './SolveQuiz';
import { useNavigate } from "react-router-dom";
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
    unlimited: {
        color: "#8e5070",
    },
};

export default function TakeQuiz(){
    const navigate = useNavigate();
    const axiosAuth = useAxiosAuth();
    const {unlimited} = useParams();
    const [unlimitedMode, setUnlimitedMode] = React.useState(false);
    const outletContext = useOutletContext();
    const [questions, setQuestions] = React.useState();
    const [error, setError] = React.useState();
    const [userAnswers, setUserAnswers] = React.useState([]);

    const [graded, setGraded] = React.useState(false);
    const [solvedQuiz, setSolvedQuiz] = React.useState();
    const [gradedQuestions, setGradedQuestions] = React.useState();

    React.useEffect(() => {
        if(unlimited === "true"){
            setUnlimitedMode(true);
        } else{
            setUnlimitedMode(false);
        }
    }, [unlimited])

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

    function updateGradedQuestion(questionId, graded, answeredQuestionGraded, externalSetError){
        let updated = false;
        console.log(questionId);
        console.log(graded);
        console.log(answeredQuestionGraded);

        if(questionId && answeredQuestionGraded){
            setGradedQuestions(oldGradedQuestions => {
                return oldGradedQuestions.map((oldGradedQuestion) => {
                    if(oldGradedQuestion.questionId !== questionId){
                        return oldGradedQuestion
                    } else {
                        console.log("found");
                        updated = true;
                        return {
                            ...oldGradedQuestion,
                            graded: graded,
                            correct: answeredQuestionGraded.correct,
                            correctAnswer: answeredQuestionGraded.correctAnswer
                        }
                    }
                });
            });
        }

        if(!updated){
            externalSetError("Error grading question.");
        }
    }

    console.log(outletContext.quiz);
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

                                    if(!answeredQuestionGraded){
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
                    } else {
                        setError("There was a problem saving the data.");
                    }
                })
        } catch(error){
            setError("There was a problem saving the data.");
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
                                <h2>{outletContext.quiz.title} <span style={classes.unlimited}>{unlimitedMode ? "- UNLIMITED MODE" : ""}</span></h2>
                                {
                                    !unlimitedMode && !graded && (questions && questions.length > 0) &&
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
                                    quizId={outletContext.quiz.quizId}
                                    questions={questions}
                                    userAnswers={userAnswers}
                                    setUserAnswers={setUserAnswers}
                                    graded={graded}
                                    gradedQuestions={gradedQuestions}
                                    solvedQuiz={solvedQuiz}
                                    updateGradedQuestion={updateGradedQuestion}
                                    unlimitedMode={unlimitedMode}
                                    setGetData={outletContext.setGetData}
                                    exit={true}
                                />
                                :
                                <Box>
                                    <Box
                                        sx={{ml: 4}}
                                    >
                                        No questions
                                    </Box>
                                    <Button
                                        variant="contained"
                                        sx={{m: 4}}
                                        onClick={() => navigate(-1)}
                                    >
                                        Exit Quiz
                                    </Button>
                                </Box>
                            }
                        </Box>
                    }
                </Box>
            }
        </Box>
    );
}