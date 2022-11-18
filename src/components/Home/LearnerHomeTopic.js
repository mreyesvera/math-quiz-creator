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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Manages and displays a learner home topic list of quizzes 
 * that have been solved. 
 *  
 * @param {Object} param0 
 *      - title: topic title
 *      - quizzes: topic quizzes
 *      - searchInput: user's search input
 * @returns {React.ReactElement} Learner Home Topic
 */
export default function LearnerHomeTopic({title, quizzes, searchInput}){
    return (
        <Box>
            <h3>{title}</h3>
            <Box sx={classes.quizzesContainer}>
                {
                    quizzes.length > 0 ?
                        quizzes.filter((quiz) => {
                            if(searchInput && searchInput.length > 0){
                                if(quiz.title.toLowerCase().includes(searchInput.toLowerCase())){
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