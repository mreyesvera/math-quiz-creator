import {
    Box, 
    List,
} from '@mui/material';
import * as React from 'react';
import NavTopicList from './NavTopicList';
import Error from '../Shared/Error';
import useAxiosAuth from '../../hooks/useAxiosAuth';

export default function NavTopicsList(props){
    const axiosAuth = useAxiosAuth();

    const [topics, setTopics] = React.useState([]);
    const [error, setError] = React.useState([]);
    const [resetTopic, setResetTopic] = React.useState(true);

    React.useEffect(() => {
        if(resetTopic){
            async function getTopics(){
                try {
                    await axiosAuth.get(`/Topics`).then(response => {
                        //console.log(response.data);
                        
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

            setResetTopic(false);
            getTopics();
        }
    }, [resetTopic, axiosAuth]);
    
    return (
        <Box>
            {
                error ?
                <Error error={error} />
                :
                <List>
                    {
                        topics.map((topic) => (
                            <NavTopicList key={topic.topicId} topic={topic} onItemSelected={props.onItemSelected}/>
                        ))
                    }
                </List>
            }
        </Box>
    );
}