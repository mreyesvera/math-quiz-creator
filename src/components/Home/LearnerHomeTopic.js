import {
    Box,
} from '@mui/material';
import * as React from 'react';
import LearnerHomeTopicQuiz from './LearnerHomeTopicQuiz'

const classes = {
    quizzesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

export default function LearnerHomeTopic(props){
    return (
        <Box>
            <h3>{props.title}</h3>
            <Box sx={classes.quizzesContainer}>
                {
                    props.solvedQuizzes.length > 0 ?
                        props.solvedQuizzes.map((solvedQuiz) => (
                            <LearnerHomeTopicQuiz key={solvedQuiz.solvedQuizId} solvedQuiz={solvedQuiz} solved={true}/>
                        ))
                    :
                    <LearnerHomeTopicQuiz solved={false}/>
                }
            </Box>
        </Box>
    );
}