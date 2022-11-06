import {
    Box,
    FormControl,
    TextField 
} from '@mui/material';
import Error from '../components/Shared/Error';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import QuestionForm from '../components/Question/QuestionForm';
import mathQuizCreatorAPI from '../config/mathQuizCreatorAPI.json';
import axios from 'axios';
import { useParams } from "react-router-dom";

const classes = {
    root: {
        width: 1,
        height: '100vh',
    }
};

export default function QuestionAdd(){
    const navigate = useNavigate();
    const { topicId } = useParams();
    //const [getData, setGetData] = React.useState(true);
    const [ topic, setTopic ] = React.useState();
    const [ question, setQuestion ] = React.useState({
        title: "",
        description: "",
        answer: "",
    }); 
    const [error, setError] = React.useState([]);

    async function saveQuestion(question, formData, setErrors){
        let newQuestion = {
            topicId: topic.topicId,
            creatorId: 'a6a1ff7a-9bdd-456a-90e7-08dab507521e',
            ...formData
        };
        console.log(newQuestion);

        try {
            await axios.post(`${mathQuizCreatorAPI.baseURL}Questions`, newQuestion)
                .then(response => {
                    console.log(response);

                    if(response.status === 201){
                        question = response.data;

                        navigate(`/home`);
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
                    <QuestionForm 
                        question={question}
                        onSubmit={saveQuestion}
                    />
                </Box>
            }
        </Box>
    );
}