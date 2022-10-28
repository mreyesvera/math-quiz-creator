import {
    Box,
    FormControl,
    TextField,
    Button,
    FormLabel,
    TextareaAutosize,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from '@mui/material';
import Errors from '../Shared/Errors';
import CreatorContentGrid from '../Home/CreatorContentGrid';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import * as React from 'react';
import mathQuizCreatorAPI from '../config/mathQuizCreatorAPI.json';
import axios from 'axios';

const classes = {
    arrowButtonsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    arrowButton: {
        width: '49%'
    }
}

const questionsColumns = [
    {
        field: 'title',
        headerName: 'Title',
        flex: 2,
    },
    {
        field: 'assignedQuizzes',
        headerName: 'Quizzes',
        flex: 1,
    },
    {
        field: 'lastModifiedTime',
        headerName: 'Last Modified',
        flex: 1,
    }
]

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function getQuestionRowId(row){
    return row.questionId;
}


export default function UpdateQuestions({open, handleClose, topicId, quizQuestions}){
    console.log(quizQuestions);
    const [errors, setErrors] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);

    const [newQuizQuestions, setNewQuizQuestions] = React.useState([]);

    const [savedQuestions, setSavedQuestions] = React.useState([]);
    const [remainingQuestions, setRemainingQuestions] = React.useState([]);

    const [selectedSaved, setSelectedSaved] = React.useState([]);
    const [selectedRemaining, setSelectedRemaining] = React.useState([]);

    React.useEffect(() => {
        async function getQuestions(topicId){
            try {
                await axios.get(`${mathQuizCreatorAPI.baseURL}Questions?topicId=${topicId}`)
                    .then(response => {
                        //console.log(response);
    
                        if(response.status === 200){
                            setQuestions(response.data)
                            console.log(response.data);

                            return response.data

                            //outletContext.setGetData(true);
                            //navigate(`/quiz/${quiz.quizId}/details`);
                        } else {
                            setErrors(["There was a problem saving the data."]);
                        }
                    }).then((questions) => {
                        let savedQuestionsTemp = [];
                        let remainingQuestionsTemp = [];

                        questions.forEach((question) => {
                            let quizQuestion = quizQuestions.find(quizQuestion => quizQuestion.questionId === question.questionId);

                            if(quizQuestion){
                                savedQuestionsTemp.push(question);
                            } else {
                                remainingQuestionsTemp.push(question);
                            }
                        });

                        console.log(savedQuestionsTemp);
                        console.log(remainingQuestionsTemp);

                        setSavedQuestions(savedQuestionsTemp);
                        setRemainingQuestions(remainingQuestionsTemp);
                    });
            } catch(error){
                setErrors(["There was a problem saving the data."]);
            }
        }

        var errors = [];

        if(quizQuestions){
            setNewQuizQuestions(quizQuestions);
        } else {
            errors.push("Quiz Questions can't be null.")
        }

        if(topicId){
            getQuestions(topicId);
        } else {
            errors.push(["Topic Id can't be null."]);
        }

        setErrors(errors);
    }, [topicId]);

    function passToRemainingQuestions(){
        console.log("click");
        setRemainingQuestions(oldRemainingQuestions => {
            return oldRemainingQuestions.concat(selectedSaved)
        });
        setSelectedSaved([]);
    }

    function passToSavedQuestions(){
        console.log("click");
        setSavedQuestions(oldSavedQuestions => {
            return oldSavedQuestions.concat(selectedRemaining);
        })
        setSelectedRemaining([]);
    }


    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="lg"
            fullWidth
        >
            <DialogTitle>{"Add Questions"}</DialogTitle>
            {
                (errors && errors.length > 0) ??
                <Errors errors={errors} />
            }
            <DialogContent>
                <CreatorContentGrid 
                    title="Saved Questions"
                    columns={questionsColumns}
                    data={savedQuestions}
                    getRowId={getQuestionRowId}
                    titleSectionActions={[]}
                    titleBackgroundColor='#1e839c'
                    checkboxSelection={true}
                    selectionModel={selectedSaved}
                    onSelectionModelChange={setSelectedSaved}
                />
                <Box
                    sx={classes.arrowButtonsContainer}
                >
                    <Button
                        variant="contained"
                        sx={classes.arrowButton}
                        onClick={passToRemainingQuestions}
                    >
                        <KeyboardArrowUpIcon />
                    </Button>
                    <Button
                        variant="contained"
                        sx={classes.arrowButton}
                        onClick={passToSavedQuestions}
                    >
                        <KeyboardArrowDownIcon />
                    </Button>
                </Box>
                <CreatorContentGrid 
                    title="Remaining Questions"
                    columns={questionsColumns}
                    data={remainingQuestions}
                    getRowId={getQuestionRowId}
                    titleSectionActions={[]}
                    titleBackgroundColor='#1e839c'
                    checkboxSelection={true}
                    selectionModel={selectedRemaining}
                    onSelectionModelChange={setSelectedRemaining}
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}