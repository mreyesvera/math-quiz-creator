import {
    Box,
    List,
} from '@mui/material';
import * as React from 'react';
import CreatorHomeTopic from './CreatorHomeTopic'
import Error from '../Shared/Error';
import useAxiosAuth from '../../hooks/useAxiosAuth';
import Preview from '../SolvedQuiz/Preview';

const classes = {
    subtitle: {
        fontWeight: 300,
    }
};

export default function CreatorHome(){
    const axiosAuth = useAxiosAuth();

    const [topics, setTopics] = React.useState([]);
    const [error, setError] = React.useState();
    const [resetTopics, setResetTopics] = React.useState(true);
    
    const [openPreview, setOpenPreview] = React.useState(false);
    const [element, setElement] = React.useState();

    React.useEffect(() => {
        if(resetTopics){
            async function getTopics(){
                try {
                    await axiosAuth.get(`/Topics?owner=${true}`).then(response => {
                        console.log(response.data);
                        if(response.data){
                            setTopics(response.data);
                            setError(null);
                        } else {
                            setError("There was a problem retrieving data.");
                        }
                    }).catch(error => setError(error));
                } catch(error){
                    console.log("caught");
                    setError(error);
                }
            }

            setResetTopics(false);
            getTopics();
        }
    }, [resetTopics, axiosAuth]);

    function createPreview(type, elementId){
        setOpenPreview(true);

        setElement({
            id: elementId,
            type: type,
        });
    }

    
    return (
        <Box>
            <h2 style={classes.subtitle}>Your Quizzes and Questions</h2>
            {
                error ?
                <Error error={error} />
                :
                <Box>
                    <List>
                    {
                        topics.map((topic) => (
                            <CreatorHomeTopic 
                                key={topic.topicId} 
                                topic={topic} 
                                setResetTopics={setResetTopics}
                                openPreview={createPreview}
                            />
                        ))
                    }
                    </List>
                    {
                        element && 
                        <Preview
                            open={openPreview}
                            handleClose={() => setOpenPreview(false)}
                            element={element}
                        />
                    }
                </Box>
            }
        </Box>
    );
}