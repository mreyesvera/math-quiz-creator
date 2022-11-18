import {
    Box,
    FormControl,
    TextField,
    Modal
} from '@mui/material';
import SolveQuiz from '../SolvedQuiz/SolveQuiz';
import Error from '../Shared/Error';
import * as React from 'react';
import useAxiosAuth from '../../hooks/useAxiosAuth';

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Handles and displays a quiz on preview. 
 * 
 * @param {Object} param0 
 *      - quizId: Quiz id of the quiz to preview
 * @returns {React.ReactElement} Quiz's Preview
 */
export default function QuizPreview({quizId}){
    const axiosAuth = useAxiosAuth();
    const [error, setError] = React.useState();
    const [quiz, setQuiz] = React.useState();
    const [questions, setQuestions] = React.useState();
    const [userAnswers, setUserAnswers] = React.useState([]);
    const [gradedQuestions, setGradedQuestions] = React.useState();

    React.useEffect(() => {
        async function getQuiz(id){
            try {
                await axiosAuth.get(`/QuizzesLearner/${id}`).then(response => {
                    //console.log(response.data);

                    let data = response.data;
                    if(data){
                        setQuiz(data);

                        let questions = data.quizQuestions.map((quizQuestion) => {
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

                        setError(null);
                    } else {
                        setError("There was a problem retrieving data.");
                    }
                });
            } catch(error){
                setError(error);
            }
        }

        if(quizId){
            getQuiz(quizId);
        } else {
            setError("Invalid request.");
        }
    }, [quizId, axiosAuth]);

    function updateGradedQuestion(questionId, graded, answeredQuestionGraded, externalSetError){
        let updated = false;

        if(questionId && answeredQuestionGraded){
            setGradedQuestions(oldGradedQuestions => {
                return oldGradedQuestions.map((oldGradedQuestion) => {
                    if(oldGradedQuestion.questionId !== questionId){
                        return oldGradedQuestion
                    } else {
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

    return (
        <Box>
            {
                error ?
                <Error error={error} />
                :
                <Box>
                    {
                        (questions && questions.length > 0) ?
                        <SolveQuiz 
                            quizId={quizId}
                            questions={questions}
                            userAnswers={userAnswers}
                            setUserAnswers={setUserAnswers}
                            graded={false}
                            gradedQuestions={gradedQuestions}
                            //solvedQuiz={}
                            updateGradedQuestion={updateGradedQuestion}
                            unlimitedMode={true}
                            exit={false}
                        />
                        :
                        <Box>No questions</Box>
                    }
                </Box>
            }
        </Box>
    );
}