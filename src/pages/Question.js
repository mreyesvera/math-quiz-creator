import {
    Box,
} from '@mui/material';
import {
    useParams,
} from "react-router-dom";
import { sampleQuiz } from '../components/sample_data';
import { Outlet } from 'react-router-dom';
import Error from '../components/Shared/Error';
import * as React from 'react';
import useAxiosAuth from '../hooks/useAxiosAuth';

const classes = {
    root: {
        width: 1,
    }
};

export default function Question(props){
    const axiosAuth = useAxiosAuth();
    const { id } = useParams();
    const [getData, setGetData] = React.useState(true);
    const [ question, setQuestion ] = React.useState({}); 
    const [error, setError] = React.useState([]);

    const contextValue = {
        question: question,
        setGetData: setGetData,
    };

    React.useEffect(()=>{
        if(getData){
            async function getQuestion(id){
                try {
                    await axiosAuth.get(`/Questions/${id}`).then(response => {
                        //console.log(response.data);
                        
                        if(response.data){
                            setQuestion(response.data);
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
            getQuestion(id);
        }
    }, [id, getData, axiosAuth]);

    return (
        <Box sx={classes.root}>
            {
                error ?
                <Error error={error} />
                :
                <Box>
                    <h1>{sampleQuiz.topic.title}</h1>
                    <Outlet context={contextValue}/>
                </Box>
            }
        </Box>
    );
}