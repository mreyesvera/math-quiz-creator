import {
    Box, 
} from '@mui/material';
import * as React from 'react';
import { useOutletContext } from "react-router-dom";
import QuizInformation from './QuizInformation';
import QuizAggregates from './QuizAggregates';
import SolvedQuizzesGrid from './SolvedQuizzesGrid';
import { solvedQuizzes2 } from '../../components/sample_data';
import useAuth from '../../hooks/useAuth';


export default function Quiz(){
    const { auth } = useAuth();
    const contextValue = useOutletContext();

    return (
        <Box>
            <Box>
                <QuizInformation quiz={contextValue.quiz}/>
            </Box>
            <Box>
                {
                    auth?.user?.role === "Creator" ?
                    <QuizAggregates quizId={contextValue.quiz.quizId}/>
                    :
                    <SolvedQuizzesGrid 
                        quizId={contextValue.quiz.quizId}
                    />
                }
            </Box>
        </Box>
    );
}