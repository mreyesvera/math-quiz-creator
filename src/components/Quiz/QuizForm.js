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
import CreatorContentGrid from '../Home/CreatorContentGrid';
import Errors from '../Shared/Errors';
import { useNavigate } from "react-router-dom";
import { compareQuizQuestionsArrays } from '../../utils/quizQuestionUtils';
import { compareQuizzes } from '../../utils/quizUtils';
import CreatorGridHomeActions from "../Home/CreatorGridHomeActions";
import AssignedQuizzesCell from '../Question/AssignedQuizzesCell';
import UpdateQuestions from './UpdateQuestions';

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
        field: 'assignedQuizzes',
        headerName: 'Assigned Quizzes',
        flex: 2,
        renderCell: (cellValues) => {
            return <AssignedQuizzesCell assignedQuizzes={cellValues.row.assignedQuizzes}/>
        }
    },
    /*{
        field: 'actions',
        headerName: 'Actions',
        flex: 3,
        sortable: false,
        renderCell: (params) => {
            return <CreatorGridHomeActions params={params}  type="question"/>
        }
    }*/
];

const questionsTitleActions = (addQuestions, createNew) => ([
    {
        title: 'UPDATE QUESTIONS',
        onClick: addQuestions,
    },
    {
        title: 'CREATE NEW',
        onClick: createNew,
    },
]);

function getQuestionRowId(row){
    return row.questionId;
}

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Handles the quiz form used to add or edit quizzes.
 * 
 * @param {Object} param0 
 *      - topicId: topicId of the edited or added quiz
 *      - question: Quiz to edit or starting question
 *      - onSubmit: function to call once the form is submitted
 * @returns {React.ReactElement} Quiz's Form
 */
export default function QuizForm({topicId, quiz, onSubmit}){
    const navigate = useNavigate();
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
    const [quizQuestions, setQuizQuestions] = React.useState([]);
    const [quizQuestionsData, setQuizQuestionsData] = React.useState();
    const [resetUpdateQuestions, setResetUpdateQuestions] = React.useState(true);

    const [openAddQuestions, setOpenAddQuestions] = React.useState(false);

    const navigateBack = (e) => {
        navigate(-1);
    }

    function handleChange(event){
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


        if(save){
            setSave(false);
            let errors = validateValues();

            if(errors.length === 0){
                setErrors([]);
                onSubmit(quiz, formData, quizQuestions, quizQuestionsData, setErrors)
                    .then(setResetUpdateQuestions(true));
            } else {
                setErrors(errors);
            }
        }
    }, [save, formData, quiz, quizQuestions, quizQuestionsData, onSubmit]);

    React.useEffect(()=> {
        let changes = !compareQuizzes(formData, quiz) 
                    || !compareQuizQuestionsArrays(quizQuestionsData, quizQuestions);

        setDisableSave(!changes);
    }, [formData, quiz, quizQuestionsData, quizQuestions]);

    function handleSubmit(event){
        setSave(true);
    }

    React.useEffect(() => {
        const quizQuestions = quiz.quizQuestions; // maybe check if undefined

        setFormData({
            title: quiz.title,
            description: quiz.description,
            isPublic: quiz.isPublic,
            hasUnlimitedMode: quiz.hasUnlimitedMode,
        });

        setQuestions(quizQuestions.map(quizQuestion => 
            ({...quizQuestion.question, order:quizQuestion.order})
        ));

        setQuizQuestions(quizQuestions);
        setQuizQuestionsData(quizQuestions);
    }, [quiz]);

    function openAddQuestionsDialog(){
        setOpenAddQuestions(true);
    }

    function createNewQuestion(){
        navigate(`/question/${topicId}/add`);
    }

    function closeAddQuestions(){
        setOpenAddQuestions(false);
    }

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
                (errors && errors.length > 0) ?
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
                    toolbar={true}
                    data={
                        questions
                    }
                    getRowId={getQuestionRowId}
                    titleSectionActions={questionsTitleActions(openAddQuestionsDialog, createNewQuestion)}
                    titleBackgroundColor='#1e839c'
                    initialState={{
                        sorting: {
                            sortModel: [{ field: 'order', sort: 'asc' }],
                        },
                    }}
                />
            </Box>
            {
                topicId && quizQuestionsData &&
                <UpdateQuestions 
                    open={openAddQuestions} 
                    handleClose={closeAddQuestions}
                    quizQuestions={quizQuestionsData}
                    setQuizQuestions={setQuizQuestionsData}
                    topicId={topicId}
                    quizId={quiz.quizId}
                    setUpdatedQuestions={setQuestions}
                    reset={resetUpdateQuestions}
                    setReset={setResetUpdateQuestions}
                />  
            }
        </Box>
    );
}