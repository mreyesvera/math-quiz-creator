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
            const onClick = (e) => {
                console.log(params);
            };

            return (
            <Box>
                <Button onClick={onClick}>Edit</Button>
                <Button onClick={onClick}>Remove</Button>
                <Button onClick={onClick}>Delete</Button>
                <Button onClick={onClick}>Preview</Button>
            </Box>
            )
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
    const outletContext = useOutletContext();
    const quiz = outletContext.quiz;
    const questions = outletContext.questions;

    return (
        <Box>
            <Box sx={classes.saveChangesContainer}>
                <Button
                    variant="contained"
                >
                    Save Changes
                </Button>
            </Box>
            <Box sx={classes.topRow}>
                <FormControl>
                    <TextField
                        label="Quiz Name"
                        value={quiz.title}
                    />
                </FormControl>
                <FormControl sx={classes.checkboxContainer}>
                    <Checkbox
                        checked={quiz.isPublic}
                    />
                    <FormLabel>
                        Public
                    </FormLabel>
                </FormControl>
                <FormControl sx={classes.checkboxContainer}>
                    <Checkbox
                        checked={quiz.hasUnlimitedMode}
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
                    value={quiz.description}
                />
            </FormControl>
            <Box sx={classes.questionsGridContainer}>
                <CreatorContentGrid 
                    title="Questions"
                    columns={questionsColumns}
                    data={questions}
                    getRowId={getQuestionRowId}
                    titleSectionActions={questionsTitleActions}
                    titleBackgroundColor='#1e839c'
                />
            </Box>
        </Box>
    );
}