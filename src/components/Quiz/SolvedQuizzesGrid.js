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
        field: 'totalQuestions',
        headerName: 'Total',
        flex: 1,
    },
    {
        field: 'score',
        headerName: 'Score',
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
                    await axiosAuth.get(`/SolvedQuizzes`, id).then(response => {
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
    }, [quizId]);


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
                        Highest Score: {getHighestScore(solvedQuizzes)}%
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