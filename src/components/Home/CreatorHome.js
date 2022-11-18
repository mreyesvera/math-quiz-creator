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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Main component for the creator's home page. 
 *  
 * @returns {React.ReactElement} Creator Home
 */
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
                        //console.log(response.data);

                        if(response.data){
                            setTopics(response.data);
                            setError(null);
                        } else {
                            setError("There was a problem retrieving data.");
                        }
                    }).catch(error => setError(error));
                } catch(error){
                    setError("There was a problem retrieving data.");
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