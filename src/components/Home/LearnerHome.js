import {
    Box, TextField,
} from '@mui/material';
import * as React from 'react';
import LearnerHomeTopic from './LearnerHomeTopic';
import Error from '../Shared/Error';
import useAxiosAuth from '../../hooks/useAxiosAuth';

const classes = {
    subtitle: {
        fontWeight: 300,
    },
    searchInputContainer: {
        width: 1, 
        textAlign: 'right',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center'
    },
    searchInput: {
        height: '12px',
    },
    searchInputLabel: {
        fontWeight: 'bold',
        fontSize: '20px',
        marginRight: 1,
    },
};

export default function LearnerHome(){
    const axiosAuth = useAxiosAuth();

    const [topicsSolvedQuizzes, setTopicsSolvedQuizzes] = React.useState([]);
    const [error, setError] = React.useState();
    const [resetData, setResetData] = React.useState(true);
    const [searchInput, setSearchInput] = React.useState("");

    React.useEffect(() => {
        if(resetData){
            async function getTopicQuizQuestions(){
                try {
                    await axiosAuth.get(`/Topics/SolvedQuizzes`).then(response => {
                        console.log(response.data);
                        
                        if(response.data){
                            setTopicsSolvedQuizzes(response.data);
                            setError(null);
                        } else {
                            setError("There was a problem retrieving data.");
                        }
                    }).catch(error => setError(error));
                } catch(error){
                    //setError(error);
                    setError("There was a problem retrieving data.");
                }
            }
            setResetData(false);
            getTopicQuizQuestions();
        }
    }, [resetData, axiosAuth]);

    return (
        <Box>
            <h2 style={classes.subtitle}>Quizzes you have solved</h2>
            {
                error ?
                <Error error={error} />
                :
                <Box>
                    <Box
                        sx={classes.searchInputContainer}
                    >
                        <Box
                            sx={classes.searchInputLabel}
                        >
                            Search: 
                        </Box>
                        <TextField
                            value={searchInput}
                            onChange={(event) => setSearchInput(event.target.value)}
                        />
                    </Box>
                    {
                        topicsSolvedQuizzes.map((topicSolvedQuiz) => (
                            <LearnerHomeTopic 
                                key={topicSolvedQuiz.topicId} 
                                title={topicSolvedQuiz.title}
                                quizzes={topicSolvedQuiz.quizzes}
                                searchInput={searchInput}
                            />
                        ))
                    }
                </Box>
            }
        </Box>
    );
}