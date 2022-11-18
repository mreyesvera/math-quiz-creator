import {
    Box,
    Button,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
} from '@mui/material';
import Errors from '../Shared/Errors';
import CreatorContentGrid from '../Home/CreatorContentGrid';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AssignedQuizzesCell from '../Question/AssignedQuizzesCell';
import * as React from 'react';
import useAxiosAuth from '../../hooks/useAxiosAuth';

const classes = {
    arrowButtonsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    arrowButton: {
        width: '49%'
    },
    verticalButton: {
        padding: 0,
        minWidth: '40px',
        width: '40px',
        height: 'calc(100% - 60px)',
    },
    savedQuestionsGridContainer: {
        width: 'calc(100% - 50px)',
    },
    savedQuestionsGridButtons: {
        marginTop: '30px',
        paddingLeft: '10px',
        width: '50px',
        height: '350px',
    },
    savedQuestionsGridButtonContainer: {
        height: 1,
    },
    topVerticalButton: {
        display: 'flex',
        paddingBottom: '8px',
        alignItems: 'end',
    },
    bottomVerticalButton: {

    },
}

const questionsColumns = [
    {
        field: 'title',
        headerName: 'Title',
        flex: 2,
    },
    {
        field: 'assignedQuizzes',
        headerName: 'Assigned Quizzes',
        flex: 1,
        renderCell: (cellValues) => {
            return <AssignedQuizzesCell assignedQuizzes={cellValues.row.assignedQuizzes}/>
        }
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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Handles and displays a dialog to be able to edit a quiz's questions (quiz questions).
 * 
 * @param {Object} param0 
 *      - open: Whether the update questions dialog is open or not
 *      - handleClose: Handles closing the update questions dialog
 *      - topicId: Topic id of the quiz where the dialog shows up
 *      - quizQuestions: Quiz's questions 
 *      - quizId: Quiz id of the quiz where the dialog shows up
 *      - setUpdatedQuestions: function to update quiz's questions
 *      - setQuizQuestions: function to update quiz's quiz questions
 *      - reset: Whether to reset the retrieved questions
 *      - setReset: function to set reset
 * @returns {React.ReactElement} Quiz's Update Questions
 */
export default function UpdateQuestions({open, handleClose, topicId, quizQuestions, quizId, 
    setUpdatedQuestions, setQuizQuestions, reset, setReset}){
    const axiosAuth = useAxiosAuth();

    const [errors, setErrors] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);

    const [savedQuestions, setSavedQuestions] = React.useState([]);
    const [remainingQuestions, setRemainingQuestions] = React.useState([]);

    const [selectedSaved, setSelectedSaved] = React.useState([]);
    const [selectedRemaining, setSelectedRemaining] = React.useState([]);

    React.useEffect(() => {
        async function getQuestions(topicId){
            try {
                await axiosAuth.get(`/Questions?topicId=${topicId}`)
                    .then(response => {
                        //console.log(response);
    
                        if(response.status === 200){
                            setQuestions(response.data);

                            return response.data
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

                        setSavedQuestions(savedQuestionsTemp);
                        setRemainingQuestions(remainingQuestionsTemp);
                    });
            } catch(error){
                setErrors(["There was a problem saving the data."]);
            }
        }

        if(reset){
            setReset(false);
            var errors = [];

            if(!quizQuestions){
                errors.push("Quiz Questions can't be null.");
            } 

            if(topicId){
                getQuestions(topicId);
            } else {
                errors.push(["Topic Id can't be null."]);
            }

            setErrors(errors);
        }
    }, [topicId, quizQuestions, reset, setReset, axiosAuth]);

    function passToRemainingQuestions(){
        const selectedSavedQuestions = questions.filter((question) => selectedSaved.includes(question.questionId));

        setRemainingQuestions(oldRemainingQuestions => {
            return oldRemainingQuestions.concat(selectedSavedQuestions)
        });
        setSavedQuestions(oldSavedQuestions => {
            return oldSavedQuestions.filter((question) => !selectedSaved.includes(question.questionId));
        });

        setSelectedSaved([]);
    }

    function passToSavedQuestions(){
        const selectedRemainingQuestions = questions.filter((question) => selectedRemaining.includes(question.questionId));

        setSavedQuestions(oldSavedQuestions => {
            return oldSavedQuestions.concat(selectedRemainingQuestions);
        });
        setRemainingQuestions(oldRemainingQuestions => {
            return oldRemainingQuestions.filter((question) => !selectedRemaining.includes(question.questionId));
        });

        setSelectedRemaining([]);
    }

    function moveRowsUp(){
        let newSavedQuestions = savedQuestions.slice();

        for(let i=1; i<newSavedQuestions.length; i++){
            if(selectedSaved.includes(newSavedQuestions[i].questionId) 
                && !selectedSaved.includes(newSavedQuestions[i-1].questionId)){
                let tempQuestion = newSavedQuestions[i-1];

                newSavedQuestions[i-1] = newSavedQuestions[i];
                newSavedQuestions[i] = tempQuestion; 
            }
        }

        setSavedQuestions(newSavedQuestions);
    }

    function moveRowsDown(){
        let newSavedQuestions = savedQuestions.slice();
        
        for(let i=newSavedQuestions.length-2; i>=0; i--){
            if(selectedSaved.includes(newSavedQuestions[i].questionId)
                && !selectedSaved.includes(newSavedQuestions[i+1].questionId)){
                let tempQuestion = newSavedQuestions[i+1];

                newSavedQuestions[i+1] = newSavedQuestions[i];
                newSavedQuestions[i] = tempQuestion;
            }
        }

        setSavedQuestions(newSavedQuestions);
    }

    function isInSavedQuestions(savedQuestions, quizQuestion){
        let savedQuestion = savedQuestions.find((question) => question.questionId === quizQuestion.questionId);

        if(savedQuestion){
            return savedQuestion;
        }

        return false;
    }

    function isInQuizQuestions(savedQuestion, quizQuestions){
        let quizQuestion = quizQuestions.find((quizQuestion) => quizQuestion.questionId === savedQuestion.questionId);

        if(quizQuestion){
            return quizQuestion;
        }

        return false
    }

    function createNewQuizQuestions(savedQuestions, quizQuestions){
        let newQuizQuestions = savedQuestions.filter((question) => {
            return !isInQuizQuestions(question, quizQuestions);
        });

        newQuizQuestions = newQuizQuestions.map((question) => {
            return {
                quizId: quizId, 
                questionId: question.questionId,
                question: question
            }
        });

        return newQuizQuestions;
    }

    function setOrder(questions){
        return questions.map((question, index) => {
            return {
                ...question,
                order: index + 1
            }
        });
    }

    function submitQuestions(){
        let updatedQuestions = setOrder(savedQuestions);
        
        let updatedQuizQuestions = quizQuestions.filter((quizQuestion) => {
            return isInSavedQuestions(savedQuestions, quizQuestion);
        });

        let addedQuizQuestions = createNewQuizQuestions(savedQuestions, quizQuestions);

        let newQuizQuestions = updatedQuizQuestions.concat(addedQuizQuestions);

        newQuizQuestions = newQuizQuestions.map((quizQuestion) => {
            let question = updatedQuestions.find((question) => question.questionId === quizQuestion.questionId);

            if(question){
                return {
                    ...quizQuestion,
                    order: question.order
                }
            } else {
                // error in logic
                return {};
            }
        });

        setUpdatedQuestions(updatedQuestions);
        setQuizQuestions(newQuizQuestions);
        handleClose();
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
            <DialogTitle>Update Questions</DialogTitle>
            {
                (errors && errors.length > 0) &&
                <Errors errors={errors} />
            }
            <DialogContent>
                <Grid container>
                    <Grid 
                        item
                        sx={classes.savedQuestionsGridContainer}
                    >
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
                    </Grid>
                    <Grid 
                        item
                        sx={classes.savedQuestionsGridButtons}
                    >
                        <Grid 
                            container 
                            direction="row"
                            sx={classes.savedQuestionsGridButtonContainer}
                        >
                            <Grid item sx={classes.topVerticalButton}>
                                <Button
                                    variant="contained"
                                    sx={{...classes.arrowButton, ...classes.verticalButton}}
                                    onClick={moveRowsUp}
                                >
                                    <KeyboardArrowUpIcon />
                                </Button>
                            </Grid>
                            <Grid item sx={classes.bottomVerticalButton}>
                                <Button
                                    variant="contained"
                                    sx={{...classes.arrowButton, 
                                        ...classes.verticalButton   
                                    }}
                                    onClick={moveRowsDown}
                                >
                                    <KeyboardArrowDownIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box
                    sx={classes.arrowButtonsContainer}
                >
                    <Button
                        variant="contained"
                        sx={classes.arrowButton}
                        onClick={passToSavedQuestions}
                    >
                        <KeyboardArrowUpIcon />
                    </Button>
                    <Button
                        variant="contained"
                        sx={classes.arrowButton}
                        onClick={passToRemainingQuestions}
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
              <Button onClick={submitQuestions}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
}