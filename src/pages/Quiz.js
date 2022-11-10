import {
    Box, 
} from '@mui/material';
import {
    useParams,
} from "react-router-dom";
import * as React from 'react';
import Error from '../components/Shared/Error';
import { Outlet } from 'react-router-dom';
import useAxiosAuth from '../hooks/useAxiosAuth';

const classes = {
    root: {
        width: 1,
    }
};


export default function Quiz(){
    const axiosAuth = useAxiosAuth();
    const { id } = useParams();
    const idRef = React.useRef(id);
    const [getData, setGetData] = React.useState(true);
    const [ quiz, setQuiz ] = React.useState({}); 
    const [error, setError] = React.useState();

    const contextValue = {
        quiz: quiz,
        setGetData: setGetData,
    };

    React.useEffect(()=>{
        if(getData || id !== idRef.current){
            
            idRef.current = id;

            async function getQuiz(id){
                try {
                    await axiosAuth.get(`/QuizzesLearner/${id}`).then(response => {
                        console.log(response.data);
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
    }, [id, getData, axiosAuth]);

    return (
        <Box sx={classes.root}>
            {
                error ?
                <Error error={error} />
                :
                <Box>
                {
                    (quiz && quiz.topic && contextValue) &&
                    <Box>
                        <h1>{quiz.topic.title}</h1>
                        <Outlet context={contextValue}/>
                    </Box>
                }
                </Box>
            }
        </Box>
    );
}