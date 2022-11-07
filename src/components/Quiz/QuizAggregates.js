import {
    Box, 
} from '@mui/material';
import * as React from 'react';
import Errors from '../Shared/Errors';
import useAxiosAuth from '../../hooks/useAxiosAuth';

const classes = {
    aggregates: {
        marginLeft: '20px',
    }
};

function getMinimum(solvedQuizzes){
    if(!solvedQuizzes || !(solvedQuizzes.length > 0))
        return "No data";

    let minimum = 1;
    solvedQuizzes.forEach(solvedQuiz => {
        if(solvedQuiz.score < minimum){
            minimum = solvedQuiz.score;
        }
    });

    return minimum.toFixed(2);
}

function getMaximum(solvedQuizzes){
    if(!solvedQuizzes || !(solvedQuizzes.length > 0))
        return "No data";

    let maximum = 0;
    solvedQuizzes.forEach(solvedQuiz => {
        if(solvedQuiz.score > maximum){
            maximum = solvedQuiz.score;
        }
    });

    return maximum.toFixed(2);

}

function getAverage(solvedQuizzes){
    if(!solvedQuizzes || !(solvedQuizzes.length > 0))
        return "No data";

    let sum = 0;
    solvedQuizzes.forEach((solvedQuiz) => {
        sum += solvedQuiz.score;
    })

    return (sum / solvedQuizzes.length).toFixed(2);
}

export default function QuizAggregates({quizId}){
    const axiosAuth = useAxiosAuth();
    const [errors, setErrors] = React.useState([]);
    const [solvedQuizzes, setSolvedQuizzes] = React.useState([]);

    React.useEffect(() => {
        async function getSolvedQuizzes(quizId){
            try {
                await axiosAuth.get(`/SolvedQuizzes?quizId=${quizId}`)
                    .then(response => {
                        //console.log(response);
    
                        if(response.status === 200){
                            setSolvedQuizzes(response.data)
                            console.log(response.data);
                        } else {
                            setErrors(["There was a problem saving the data."]);
                        }
                    });
            } catch(error){
                setErrors(["There was a problem getting the data."]);
            }
        }

        if(quizId){
            getSolvedQuizzes(quizId);
        } else {
            
            setErrors(["Quiz Id can't be empty."]);
        }
    }, [quizId, axiosAuth]);

    return (
        <Box sx={classes.aggregates}>
            <h3>Aggregate Results</h3>
            {
                (errors && errors.length > 0) ?
                <Errors errors={errors} />
                :
                <Box>
                    <Box>
                        Minimum: {getMinimum(solvedQuizzes)}
                    </Box>
                    <Box>
                        Maximum: {getMaximum(solvedQuizzes)}
                    </Box>
                    <Box>
                        Average: {getAverage(solvedQuizzes)}
                    </Box>
                </Box>
            }
        </Box>
    );
}