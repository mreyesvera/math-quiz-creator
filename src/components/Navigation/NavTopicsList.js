import {
    Box, 
    List,
    // ListItem,
    // ListItemButton,
    // ListItemText,
} from '@mui/material';
import * as React from 'react';
import NavTopicList from './NavTopicList';
import Error from '../Shared/Error';
import mathQuizCreatorAPI from '../config/mathQuizCreatorAPI.json';
import axios from 'axios';

export default function NavTopicsList(props){
    //const [listIsOpen, setListIsOpen] = React.useState(false);
    //const [openTopic, setOpenTopic] = React.useState();

    const [topics, setTopics] = React.useState([]);
    const [error, setError] = React.useState([]);
    const [resetTopic, setResetTopic] = React.useState(true);

    React.useEffect(() => {
        if(resetTopic){
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

            setResetTopic(false);
            getTopics();
        }
    }, [resetTopic]);
    
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