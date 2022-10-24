import {
    Box,
    FormControl,
    TextField 
} from '@mui/material';
import { sampleQuiz } from '../components/sample_data';
import Error from '../components/Shared/Error';
import QuizForm from '../components/Quiz/QuizForm';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import mathQuizCreatorAPI from '../components/config/mathQuizCreatorAPI.json';
import axios from 'axios';
import { useParams } from "react-router-dom";


const classes = {
    root: {
        width: 1,
        height: '100vh',
    }
};

export default function QuizAdd(){
    const navigate = useNavigate();
    const { topicId } = useParams();
    //const [getData, setGetData] = React.useState(true);
    const [ topic, setTopic ] = React.useState();
    const [ quiz, setQuiz ] = React.useState({
        title: "",
        description: "",
        isPublic: false,
        hasUnlimitedMode: false,
        quizQuestions: [],
    }); 
    const [error, setError] = React.useState([]);

    async function saveQuiz(quiz, formData, setErrors){
        let newQuiz = {
            topicId: topic.topicId,
            creatorId: 'a6a1ff7a-9bdd-456a-90e7-08dab507521e',
            ...formData
        };
        console.log(newQuiz);

        try {
            await axios.post(`${mathQuizCreatorAPI.baseURL}Quizzes`, newQuiz)
                .then(response => {
                    console.log(response);

                    if(response.status === 201){
                        quiz = response.data;

                        navigate(`/quiz/${quiz.quizId}/details`);
                    } else {
                        setErrors(["There was a problem saving the data."]);
                    }
                });
        } catch(error){
            setErrors(["There was a problem saving the data."]);
        }
    }
    
    React.useEffect(()=>{
        async function getTopic(id){
            try {
                await axios.get(`${mathQuizCreatorAPI.baseURL}Topics/${id}`).then(response => {
                    //console.log(response.data);
                    if(response.data){
                        setTopic(response.data);
                        setError(null);
                    } else {
                        setError("There was a problem retrieving data.");
                    }
                });
            } catch(error){
                setError(error);
            }
        }

        getTopic(topicId);
    }, [topicId]);


    return (
        <Box sx={classes.root}>
            {
                error ?
                <Error error={error} />
                :
                <Box>
                    <h1>{topic.title}</h1>
                    <QuizForm 
                        quiz={quiz}
                        onSubmit={saveQuiz}
                    />
                </Box>
            }
        </Box>
    );
}