import {
    Box, 
} from '@mui/material';
import {
    useParams,
} from "react-router-dom";
import * as React from 'react';
import { sampleQuiz } from '../components/sample_data';
import Error from '../components/Shared/Error';
import { Outlet } from 'react-router-dom';
import { quizzes, questions } from '../components/sample_data';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QuizAdd from './QuizAdd';
import QuizEdit from '../components/Quiz/QuizEdit';
import QuizDetails from '../components/Quiz/QuizDetails';
import mathQuizCreatorAPI from '../components/config/mathQuizCreatorAPI.json';
import axios from 'axios';

const classes = {
    root: {
        width: 1,
        //height: '100vh',
    }
};


export default function Quiz(props){
    const { id } = useParams();
    const [getData, setGetData] = React.useState(true);
    const [ quiz, setQuiz ] = React.useState({}); 
    const [error, setError] = React.useState([]);

    const contextValue = {
        quiz: quiz,
        setGetData: setGetData,
    };

    React.useEffect(()=>{
        if(getData){
            async function getQuiz(id){
                try {
                    await axios.get(`${mathQuizCreatorAPI.baseURL}Quizzes/${id}`).then(response => {
                        //console.log(response.data);
                        if(response.data){
                            setQuiz(response.data);
                            setError(null);
                        } else {
                            setError("There was a problem retrieving data.");
                        }
                    });
                } catch(error){
                    setError(error);
                }
            }

            setGetData(false);
            getQuiz(id);
        }
    }, [id, getData]);

    
    console.log(quiz);
    return (
        <Box sx={classes.root}>
            {
                error ?
                <Error error={error} />
                :
                <Box>
                    <h1>{quiz.topic.title}</h1>
                    <Outlet context={contextValue}/>
                </Box>
            }
        </Box>
    );
}