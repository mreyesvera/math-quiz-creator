import {
    Box,
} from '@mui/material';
import * as React from 'react';
import LearnerHomeTopicQuiz from './LearnerHomeTopicQuiz'
import { getHighestScore } from '../../utils/solvedQuizUtils';

const classes = {
    quizzesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

export default function LearnerHomeTopic({title, quizzes}){
    return (
        <Box>
            <h3>{title}</h3>
            <Box sx={classes.quizzesContainer}>
                {
                    quizzes.length > 0 ?
                        quizzes.map((quiz) => (
                            <LearnerHomeTopicQuiz 
                                key={quiz.quizId} 
                                quizId={quiz.quizId}
                                title={quiz.title} 
                                highestScore={getHighestScore(quiz.solvedQuizzes)}
                                solved={true}
                            />
                        ))
                    :
                    <LearnerHomeTopicQuiz solved={false}/>
                }
            </Box>
        </Box>
    );
}