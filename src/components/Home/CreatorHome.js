import {
    Box,
    List,
} from '@mui/material';
import * as React from 'react';
import CreatorHomeTopic from './CreatorHomeTopic'
import Error from '../Shared/Error';
import mathQuizCreatorAPI from '../config/mathQuizCreatorAPI.json';
import axios from 'axios';

const classes = {
    subtitle: {
        fontWeight: 300,
    }
};

export default function CreatorHome(){
    const [topics, setTopics] = React.useState([]);
    const [error, setError] = React.useState([]);

    React.useEffect(() => {
        async function getTopics(){
            try {
                await axios.get(`${mathQuizCreatorAPI.baseURL}Topics`).then(response => {
                    console.log(response.data);
                    if(response.data){
                        setTopics(response.data);
                        setError(null);
                    } else {
                        setError("There was a problem retrieving data.");
                    }
                });
            } catch(error){
                setError(error);
            }
        }

        getTopics();
    }, []);

    return (
        <Box>
            <h2 style={classes.subtitle}>Your Quizzes and Questions</h2>
            {
                error ?
                <Error error={error} />
                :
                <List>
                {
                    topics.map((topic) => (
                        <CreatorHomeTopic key={topic.topicId} topic={topic}/>
                    ))
                }
                </List>
            }
        </Box>
    );
}