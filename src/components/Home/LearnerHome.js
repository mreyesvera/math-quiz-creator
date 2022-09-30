import {
    Box,
} from '@mui/material';
import * as React from 'react';
import LearnerHomeTopic from './LearnerHomeTopic';
import { topics, solvedQuizzes } from '../sample_data';

const classes = {
    subtitle: {
        fontWeight: 300,
    }
};

export default function LearnerHome(){
    return (
        <Box>
            <h2 style={classes.subtitle}>Quizzes you have solved</h2>
            {
                solvedQuizzes.map((topicSolvedQuizzes, index) => (
                    <LearnerHomeTopic title={topics[index].title} key={index} solvedQuizzes={topicSolvedQuizzes} />
                ))
            }
        </Box>
    );
}