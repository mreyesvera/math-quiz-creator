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

export default function LearnerHomeTopic({title, quizzes, searchInput}){
    return (
        <Box>
            <h3>{title}</h3>
            <Box sx={classes.quizzesContainer}>
                {
                    quizzes.length > 0 ?
                        quizzes.filter((quiz) => {
                            if(searchInput && searchInput.length > 0){
                                if(quiz.title.includes(searchInput)){
                                    return true;
                                }

                                return false;
                            }
                            return true;
                        }).map((quiz) => (
                            <LearnerHomeTopicQuiz 
                                key={quiz.quizId} 
                                quizId={quiz.quizId}
                                title={quiz.title} 
                                highestScore={getHighestScore(quiz.solvedQuizzes)}
                                solved={true}
                            />
                        ))
                    :
                    <Box>
                        {
                            (!searchInput || searchInput.length === 0) ?
                            <LearnerHomeTopicQuiz solved={false}/>
                            :
                            <Box></Box>
                        }
                    </Box>
                }
            </Box>
        </Box>
    );
}