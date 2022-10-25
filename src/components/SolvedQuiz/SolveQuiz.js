import {
    Box,
    List,
    Grid,
    ListItem,
    ListItemText,
    ListItemButton,
} from '@mui/material';
import QuestionPreview from './QuestionPreview';
import * as React from 'react';

const questions = [
    {
        questionId: 0, 
        title: "Question 1",
        description: "Description 1"
    },
    {
        questionId: 1,
        title: "Question 2",
        description: "Description 2"
    },
    {
        questionId: 2,
        title: "Question 3",
        description: "Description 3"
    },
    {
        questionId: 3,
        title: "Question 4",
        description: "Description 4"
    },
];

export default function SolveQuiz(){
    const [errors, setErrors] = React.useState([]);
    const [selectedQuestion, setSelectedQuestion] = React.useState(0);
    const [question, setQuestion] = React.useState({
        questionId: 0,
        title: "Question #1",
        description: "Based on the following data set determine the median value:\n4, 6, 8, 10",
        //answer: "7",
    });
    const [userAnswers, setUserAnswers] = React.useState([]);

    React.useEffect(() => {
        
        if(questions && questions.length > 0){
            let userAnswers = [];
            questions.forEach((question) => {
                userAnswers.push(
                    { 
                        questionId: question.questionId,
                        answer: "",
                    }
                );
            });

            setUserAnswers(userAnswers);

            setQuestion(questions[0]);

            setSelectedQuestion(0);
        } else {
            setErrors(oldErrors => {
                return oldErrors.concat(["No questions to display."]);
            });
        }

    }, []);

    function selectQuestion(question){
        setQuestion(question);
    }

    function onUserAnswerChanged(event){
        setUserAnswers(oldUserAnswers => {
            let newUserAnswers = oldUserAnswers.slice();

            newUserAnswers[selectQuestion] = {
                ...newUserAnswers[selectQuestion],
                userAnswer: event.target.value
            };

            return newUserAnswers;
        });
    }

    function exitQuiz(){

    }

    console.log(userAnswers)
    return (
        <Grid 
            container
            direction="column"
        >
            <Grid item>
                <h1>Statistics</h1>
                <h2>Quiz Title</h2>
            </Grid>
            <Grid item>
                <Grid container>
                    <Grid item>
                        <List>
                            {
                                questions.map((question) => (
                                    <ListItem key={question.questionId}>
                                        <ListItemButton
                                            onClick={() => selectQuestion(question)}
                                        >
                                            <ListItemText primary={ question.title } />
                                        </ListItemButton>
                                    </ListItem>
                                ))
                            }
                            <ListItem>
                                <ListItemButton
                                    onClick={exitQuiz}
                                >
                                    <ListItemText primary="Exit Quiz" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item>
                        {
                            userAnswers && userAnswers.length > 0 && userAnswers[selectedQuestion] &&
                            <QuestionPreview 
                                question={question} 
                                userAnswer={userAnswers[selectedQuestion].answer}
                                onChange={onUserAnswerChanged}
                                canGrade={false}
                                canReset={false}
                            />
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}