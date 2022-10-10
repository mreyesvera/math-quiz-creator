import {
    Box, 
} from '@mui/material';
import {
    useParams,
} from "react-router-dom";
import * as React from 'react';
import { sampleQuiz } from '../components/sample_data';
import QuizDetails from '../components/Quiz/QuizDetails';
import QuizEdit from '../components/Quiz/QuizEdit';
import QuizAggregates from '../components/Quiz/QuizAggregates';
import SolvedQuizzesGrid from '../components/Quiz/SolvedQuizzesGrid';
import { solvedQuizzes2 } from '../components/sample_data';

const classes = {
    root: {
        width: 1,
        height: '100vh',
    }
};



const solvedQuizzesColumns = [
    {
        field: 'creationTime',
        headerName: 'Date Taken',
        flex: 1,
    },
    {
        field: 'correctResponses',
        headerName: 'Correct',
        flex: 1,
    },
    {
        field: 'incorrectResponses',
        headerName: 'Incorrect',
        flex: 1,
    },
    {
        field: 'totalNumberOfQuestions',
        headerName: 'Total',
        flex: 1,
    },
    {
        field: 'score',
        headerName: 'Score',
        flex: 1,
    },
];

function addTotalScore(solvedQuizzes){
    return solvedQuizzes.map((solvedQuiz) => {
        return {
            ...solvedQuiz,
            totalNumberOfQuestions: solvedQuiz.correctResponses + solvedQuiz.incorrectResponses
        };
    });
};

function getSolvedQuizRowId(solvedQuiz){
    return solvedQuiz.solvedQuizId;
}

export default function Quiz(props){
    const { id } = useParams();

    return (
        <Box sx={classes.root}>
            <h1>{sampleQuiz.topic.title}</h1>
            <Box>
                <QuizDetails quiz={sampleQuiz} isCreator={props.isCreator}/>
            </Box>
            <Box>
                {
                    props.isCreator ?
                    <QuizAggregates/>
                    :
                    <SolvedQuizzesGrid 
                        data={addTotalScore(solvedQuizzes2)}
                        columns={solvedQuizzesColumns}
                        getRowId={getSolvedQuizRowId}
                    />
                }
            </Box>
        </Box>
    );
}