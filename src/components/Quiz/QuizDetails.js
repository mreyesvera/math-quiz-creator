import {
    Box, 
} from '@mui/material';
import {
    useParams,
} from "react-router-dom";
import * as React from 'react';
import { useOutletContext } from "react-router-dom";
import { sampleQuiz } from '../../components/sample_data';
import QuizInformation from './QuizInformation';
import QuizEdit from './QuizEdit';
import QuizAggregates from './QuizAggregates';
import SolvedQuizzesGrid from './SolvedQuizzesGrid';
import { solvedQuizzes2 } from '../../components/sample_data';


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
  const contextValue = useOutletContext();

    return (
        <Box>
            <Box>
                <QuizInformation quiz={contextValue.quiz} isCreator={props.isCreator}/>
            </Box>
            <Box>
                {
                    props.isCreator ?
                    <QuizAggregates quizId={contextValue.quiz.quizId}/>
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