import {
    Box, 
} from '@mui/material';
import * as React from 'react';
import Error from '../Shared/Error';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useAxiosAuth from '../../hooks/useAxiosAuth';
import { getHighestScore } from '../../utils/solvedQuizUtils';

const classes = {
    gridSection: {
        height: '350px',
    },
    gridContainer: {
        height: 1
    }
}

const solvedQuizzesColumns = [
    {
        field: 'creationTime',
        headerName: 'Date Taken',
        type: 'date',
        valueGetter: ({value}) => value && new Date(value + "T00:00:00"),
        flex: 1,
    },
    {
        field: 'correctResponses',
        headerName: 'Correct',
        type: 'number',
        flex: 1,
    },
    {
        field: 'incorrectResponses',
        headerName: 'Incorrect',
        type: 'number',
        flex: 1,
    },
    {
        field: 'totalQuestions',
        headerName: 'Total',
        type: 'number',
        flex: 1,
    },
    {
        field: 'score',
        headerName: 'Score',
        type: 'number',
        valueGetter: ({value}) => Math.round(value*100*100, 2)/100,
        flex: 1,
    },
];

function getSolvedQuizRowId(solvedQuiz){
    return solvedQuiz.solvedQuizId;
}

export default function SolvedQuizzesGrid({quizId}){
    const axiosAuth = useAxiosAuth();

    const [solvedQuizzes, setSolvedQuizzes] = React.useState([]);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        if(quizId){
            async function getSolvedQuizzes(id){
                try {
                    await axiosAuth.get(`/SolvedQuizzes?quizId=${id}`).then(response => {
                        console.log(response.data);
                        if(response.data){
                            setSolvedQuizzes(response.data);
                            setError(null);
                        } else {
                            setError("There was a problem retrieving data.");
                        }
                    });
                } catch(error){
                    setError(error);
                }
            }

            getSolvedQuizzes(quizId);
        }
    }, [quizId, axiosAuth]);

    console.log(solvedQuizzes);
    return (
        <Box sx={classes.gridSection}>
            {
                error ?
                <Error error={error} />
                :
                <Box
                    sx={classes.gridContainer}
                >
                    <Box>
                        Highest Score: {(solvedQuizzes && solvedQuizzes.length > 0) ? getHighestScore(solvedQuizzes) + "%" : "No Data"}
                    </Box>
                    <DataGrid 
                        rows={solvedQuizzes} 
                        columns={solvedQuizzesColumns} 
                        getRowId={getSolvedQuizRowId}
                        components={{ Toolbar: GridToolbar }}
                    /> 
                </Box>
            }
        </Box>
    );
}