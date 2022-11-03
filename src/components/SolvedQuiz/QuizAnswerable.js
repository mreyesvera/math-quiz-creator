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

const classes = {
    root: {
        height: 1,
    },
    listItem: {
        padding: 0,
        '&.Mui-selected': {
            backgroundColor: "#f7c965"
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

export default function QuizAnswerable({questions}){
    const [errors, setErrors] = React.useState([]);
    const [selectedQuestion, setSelectedQuestion] = React.useState(0);
    const [question, setQuestion] = React.useState({
        questionId: 0,
        title: "Question #1",
        description: "Based on the following data set determine the median value:\n4, 6, 8, 10",
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

    }, [questions]);

    function selectQuestion(question, index){
        setQuestion(question);
        setSelectedQuestion(index);
    }

    function onUserAnswerChanged(event){
        console.log(event);
        const value = event.target.value;

        setUserAnswers(oldUserAnswers => {
            let newUserAnswers = oldUserAnswers.slice();

            newUserAnswers[selectedQuestion].answer = value;

            return newUserAnswers;
        });
    }

    function exitQuiz(){

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
                        questions.map((question, index) => (
                            <ListItem 
                                key={question.questionId}
                                sx={classes.listItem}
                                selected={index === selectedQuestion}
                            >
                                <ListItemButton
                                    onClick={() => selectQuestion(question, index)}
                                    sx={classes.listItemButton}
                                >
                                    <ListItemText primary={ question.title } />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
                <List>
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
                    userAnswers && userAnswers.length > 0 && userAnswers[selectedQuestion] &&
                    <QuestionAnswerable 
                        question={question} 
                        userAnswer={userAnswers[selectedQuestion].answer}
                        onChange={onUserAnswerChanged}
                        canGrade={false}
                        canReset={false}
                    />
                }
            </Grid>
        </Grid>
    );
}