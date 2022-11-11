import {
    Box,
    List,
    Grid,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
} from '@mui/material';
import QuestionAnswerable from './QuestionAnswerable';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import SolvedQuizSummary from './SolvedQuizSummary';

const answeringColor= "#8e5070";

const classes = {
    root: {
        height: 1,
    },
    listItem: {
        padding: 0,
        '&.Mui-selected': {
            backgroundColor: answeringColor,
            color: 'white',
        }
    },
    answeredListItem: {
        color: answeringColor,
    },
    correctListItem: {
        backgroundColor: 'white',
        color: '#67a489',
        '&.Mui-selected': {
            backgroundColor: '#67a489',
            color: 'white',
        }
    },
    incorrectListItem: {
        backgroundColor: 'white',
        color: '#e60b4e',
        '&.Mui-selected': {
            backgroundColor: '#e60b4e',
            color: 'white',
        }
    },
    navLists: {
        paddingLeft: '30px',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        height: 1,
        justifyContent: 'space-between',
    },
    listItemButton: {
        textAlign: 'right',
        paddingRight: '30px',
    },
    questionPreviewContainer: {
        px: '30px',
        width: 'calc(100% - 201px)',
    },
    divider: {
        "&::before, &::after": {
            borderColor: "#f7c965",
          },
    },
};

export default function QuizAnswerable({quizId, questions, userAnswers, setUserAnswers, graded, solvedQuiz, 
    gradedQuestions, updateGradedQuestion, unlimitedMode}){
    const navigate = useNavigate();
    const [errors, setErrors] = React.useState([]);
    const [selectedQuestion, setSelectedQuestion] = React.useState(0);
    const [question, setQuestion] = React.useState({
        questionId: 0,
        title: "Question #1",
        description: "Based on the following data set determine the median value:\n4, 6, 8, 10",
    });
    const [grade, setGrade] = React.useState(false);

    React.useEffect(() => {
        if(graded){

        }
    }, [graded]);

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

    }, [questions, setUserAnswers]);

    React.useEffect(() => {
        if(graded){
            setSelectedQuestion(-1);
        }
    }, [graded]);

    function selectQuestion(question, index){
        setQuestion(question);
        setSelectedQuestion(index);
    }

    function onUserAnswerChanged(event){
        const value = event.target.value;

        console.log(value);
        setUserAnswers(oldUserAnswers => {
            let newUserAnswers = oldUserAnswers.slice();

            newUserAnswers[selectedQuestion].answer = value;

            return newUserAnswers;
        });
    }

    function exitQuiz(){
        navigate(-1);
    }

    function viewScore(){
        setSelectedQuestion(-1);
    }

    return(
        <Grid 
            container
            sx={classes.root}
        >
            <Grid 
                item
                sx={classes.navLists}
            >
                <List
                    sx={classes.questionsList}
                >
                    {
                        questions.map((question, index) => {
                            let sxListItem = classes.listItem;

                            if(userAnswers && userAnswers.length){
                                let userAnswer = userAnswers[index];

                                if(userAnswer && userAnswer.answer?.length > 0){
                                    sxListItem = {
                                        ...sxListItem,
                                        ...classes.answeredListItem
                                    }
                                }
                            }

                            if(graded && gradedQuestions && gradedQuestions.length){
                                let gradedQuestion = gradedQuestions[index];

                                if(gradedQuestion && gradedQuestion.graded){
                                    if(gradedQuestion.correct === true){
                                        sxListItem = {
                                            ...sxListItem,
                                            ...classes.correctListItem
                                        }
                                    } else if(gradedQuestion.correct === false){
                                        sxListItem = {
                                            ...sxListItem,
                                            ...classes.incorrectListItem
                                        }
                                    }
                                }
                            }
                            
                            return (
                                <ListItem 
                                    key={question.questionId}
                                    sx={sxListItem}
                                    selected={index === selectedQuestion}
                                >
                                    <ListItemButton
                                        onClick={() => selectQuestion(question, index)}
                                        sx={classes.listItemButton}
                                    >
                                        <ListItemText primary={ question.title } />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
                <List>
                    {
                        graded &&
                        <ListItem
                            sx={classes.listItem}
                        >
                            <ListItemButton
                                onClick={viewScore}
                                sx={classes.listItemButton}
                            >
                                <ListItemText primary="View Score" />
                            </ListItemButton>
                        </ListItem>
                    }
                    <ListItem
                        sx={classes.listItem}
                    >
                        <ListItemButton
                            onClick={exitQuiz}
                            sx={classes.listItemButton}
                        >
                            <ListItemText primary="Exit Quiz" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>
            <Divider 
                orientation="vertical" 
                flexItem 
                sx={classes.divider}
            />
            <Grid 
                item
                sx={classes.questionPreviewContainer}
            >
                {
                    selectedQuestion === -1 && solvedQuiz?
                    <SolvedQuizSummary 
                        correct = {solvedQuiz.correctResponses}
                        incorrect = {solvedQuiz.incorrectResponses}
                        score = {solvedQuiz.score}
                        onExit = {exitQuiz}
                    />
                    :
                    <Box>
                    {
                        userAnswers && userAnswers.length > 0 && userAnswers[selectedQuestion] && 
                        gradedQuestions && gradedQuestions[selectedQuestion] && 
                        <QuestionAnswerable 
                            quizId={quizId}
                            question={question}
                            gradedQuestion={gradedQuestions[selectedQuestion]} 
                            userAnswer={userAnswers[selectedQuestion].answer}
                            onChange={onUserAnswerChanged}
                            updateGradedQuestion={updateGradedQuestion}
                            canGrade={unlimitedMode}
                            canReset={unlimitedMode}
                            
                                // When doing this part for the graded, it will be done with an
                                // api call to grade one question
                                
                                // Based on the response only the unique's question object will 
                                // be updated and therefore only the styles, etc. will change for it

                                // Remember when doing this to reset the state when asked to reset.
                            
                        />
                    }
                    </Box>
                }
            </Grid>
        </Grid>
    );
}