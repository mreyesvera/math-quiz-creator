import {
    Box,
    FormControl,
    TextField,
    Checkbox,
    FormLabel,
    TextareaAutosize,
    Button,
} from '@mui/material';
import * as React from 'react';
import { useOutletContext } from 'react-router-dom';
import CreatorContentGrid from '../Home/CreatorContentGrid';
import Errors from '../Shared/Errors';
import { useNavigate } from "react-router-dom";
import CreatorGridQuizEditActions from "../Home/CreatorGridQuizEditActions";
import mathQuizCreatorAPI from '../config/mathQuizCreatorAPI.json';
import axios from 'axios';

const classes = { 
    topRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkboxContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    descriptionTextareaContainer: {
        width: 1,
        marginTop: 1,
    },
    descriptionTextareaLabel: {
        py: 1,
    },
    descriptionTextarea: {
        minWidth: 1,
        maxWidth: 1,
        width: 1,
    },
    questionsGridContainer: {
        marginTop: 4,
    },
    saveChangesContainer: {
        my: 1,
        textAlign: 'right',
    },
    titleActionButton: {
        marginLeft: 2,
    },
};

const questionsColumns = [
    {
        field: 'order',
        headerName: 'Order',
        flex: 1,
    },
    {
        field: 'title',
        headerName: 'Title',
        flex: 2,
    },
    {
        field: 'quizQuestions.title',
        headerName: 'Quizzes',
        flex: 1,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 3,
        sortable: false,
        renderCell: (params) => {
            return <CreatorGridQuizEditActions params={params} />
        }
    }
]

const questionsTitleActions = [
    {
        title: 'ADD QUESTIONS',
    },
    {
        title: 'CREATE NEW',
    },
];

function getQuestionRowId(row){
    return row.questionId;
}

export default function QuizEdit(){
    const navigate = useNavigate();
    const outletContext = useOutletContext();
    const [errors, setErrors] = React.useState([]);
    const [save, setSave] = React.useState(false);
    const [disableSave, setDisableSave] = React.useState(true);

    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        isPublic: false,
        hasUnlimitedMode: false,
    });
    const [questions, setQuestions] = React.useState([]);
    const [quizQuestionsData, setQuizQuestionsData] = React.useState([]);

    const navigateBack = (e) => {
        navigate(-1);
    }

    function handleChange(event){
        console.log("changed");
        const {name, value, type, checked} = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    React.useEffect(() => {
        function validateValues(){
            let errors = [];

            if(!formData.title || formData.title.length > 20){
                errors.push("Title is invalid. It should contain a value between 1 and 20 characters.");
            }
            if(!formData.description){
                errors.push("Description is invalid. It can't be empty.")
            }
            if(typeof formData.isPublic != "boolean"){
                errors.push("Problem with values. Invalid Public value.")
            }
            if(typeof formData.hasUnlimitedMode != "boolean"){
                errors.push("Problem with values. Invalid Unlimited Mode value")
            }

            // add validation for questions

            return errors;
        }

        async function saveQuiz(){
            let modifiedQuiz = {
                quizId: outletContext.quiz.quizId,
                ...formData
            };

            try {
                await axios.put(`${mathQuizCreatorAPI.baseURL}Quizzes/${outletContext.quiz.quizId}`, modifiedQuiz)
                    .then(response => {
                        console.log(response);

                        if(response.status === 204){
                            outletContext.setGetData(true);
                        } else {
                            setErrors(["There was a problem saving the data."]);
                        }
                    });
            } catch(error){
                setErrors(["There was a problem saving the data."]);
            }
        }

        if(save){
            setSave(false);
            let errors = validateValues()

            if(errors.length === 0){
                setErrors([]);
                //console.log(formData);
                saveQuiz();
            } else {
                setErrors(errors);
            }
        }
    }, [save, formData, outletContext]);

    React.useEffect(()=> {
        const quiz = outletContext.quiz;

        let changes = formData.title === quiz.title &&
                        formData.description === quiz.description &&
                        formData.isPublic === quiz.isPublic &&
                        formData.hasUnlimitedMode === quiz.hasUnlimitedMode;

        setDisableSave(changes);
    }, [formData, outletContext]);

    function handleSubmit(event){
        setSave(true);
    }

    React.useEffect(() => {
        const quiz = outletContext.quiz;
        const quizQuestions = outletContext.quiz.quizQuestions;

        setFormData({
            title: quiz.title,
            description: quiz.description,
            isPublic: quiz.isPublic,
            hasUnlimitedMode: quiz.hasUnlimitedMode,
        });

        setQuestions(quizQuestions.map(quizQuestion => 
            ({...quizQuestion.question, order:quizQuestion.order})
        ));

        setQuizQuestionsData(quizQuestions);
    }, [outletContext.quiz]);

    return (
        <Box>
            <Box sx={classes.saveChangesContainer}>
                <Button
                    variant="contained"
                    sx={classes.titleActionButton}
                    onClick={navigateBack}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    sx={classes.titleActionButton}
                    onClick={handleSubmit}
                    disabled={disableSave}
                >
                    Save Changes
                </Button>
            </Box>
            {
                (errors && errors.length) ?
                <Errors errors={errors} />
                :
                ""
            }
            <Box sx={classes.topRow}>
                <FormControl>
                    <TextField
                        label="Quiz Name"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl sx={classes.checkboxContainer}>
                    <Checkbox
                        name="isPublic"
                        checked={formData.isPublic}
                        onChange={handleChange}
                    />
                    <FormLabel>
                        Public
                    </FormLabel>
                </FormControl>
                <FormControl sx={classes.checkboxContainer}>
                    <Checkbox
                        name="hasUnlimitedMode"
                        checked={formData.hasUnlimitedMode}
                        onChange={handleChange}
                    />
                    <FormLabel>
                        Unlimited Mode
                    </FormLabel>
                </FormControl>
            </Box>
            <FormControl sx={classes.descriptionTextareaContainer}>
                <FormLabel sx={classes.descriptionTextareaLabel}>
                    Quiz Description
                </FormLabel>
                <TextareaAutosize 
                    minRows={10}
                    sx={classes.descriptionTextarea}
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                />
            </FormControl>
            <Box sx={classes.questionsGridContainer}>
                <CreatorContentGrid 
                    title="Questions"
                    columns={questionsColumns}
                    data={
                        questions
                    }
                    getRowId={getQuestionRowId}
                    titleSectionActions={questionsTitleActions}
                    titleBackgroundColor='#1e839c'
                />
            </Box>
        </Box>
    );
}