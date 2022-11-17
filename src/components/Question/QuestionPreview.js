import {
    Box,
} from '@mui/material';
import * as React from 'react';
import QuestionAnswerable from '../SolvedQuiz/QuestionAnswerable';
import useAxiosAuth from '../../hooks/useAxiosAuth';
import Error from '../Shared/Error';

export default function QuestionPreview({questionId}){
    const axiosAuth = useAxiosAuth();
    const [gradedQuestion, setGradedQuestion] = React.useState();
    const [error, setError] = React.useState();
    const [question, setQuestion] = React.useState();
    const [userAnswer, setUserAnswer] = React.useState();

    React.useEffect(() => {
        // Add an if and state for getData?

        async function getQuestion(){
            try {
                await axiosAuth.get(`/Questions/Parametrized/${questionId}`)
                .then(response => {
                    console.log(response);

                    let data = response.data;

                    if(response.status === 200 && data){
                        setQuestion(data);

                        setGradedQuestion({
                            questionId: data.questionId,
                            question: data.question,
                            graded: false,
                            correct: undefined,
                            correctAnswer: undefined,
                        });

                        setUserAnswer({
                            questionId: data.questionId,
                            answer: "",
                        });
                    } else {
                        setError("There was a problem retrieving the question.");
                    }
                });
            } catch(error){
                setError("There was a problem retrieving the question.");
            }
        }

        if(questionId){
            getQuestion();
        } else {
            setError("Invalid request.");
        }
    }, [questionId, axiosAuth]);

    function onUserAnswerChanged(event){
        const value = event.target.value;

        console.log(value);
        setUserAnswer(oldUserAnswer => ({
                ...oldUserAnswer,
                answer: value
            })
        );
    }

    function updateGradedQuestion(questionId, graded, answeredQuestionGraded, externalSetError){
        let updated = false;
        console.log(questionId);
        console.log(graded);
        console.log(answeredQuestionGraded);

        if(questionId && answeredQuestionGraded){
            updated = true;
            setGradedQuestion(oldGradedQuestion => ({
                ...oldGradedQuestion,
                graded: graded,
                correct: answeredQuestionGraded.correct,
                correctAnswer: answeredQuestionGraded.correctAnswer
            }));
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
                    question && gradedQuestion && userAnswer && 
                    <QuestionAnswerable 
                        question={question}
                        gradedQuestion={gradedQuestion} 
                        userAnswer={userAnswer.answer}
                        onChange={onUserAnswerChanged}
                        updateGradedQuestion={updateGradedQuestion}
                        canGrade={true}
                        canReset={true}
                    />
                }
                </Box>
            }
        </Box>
    );
}