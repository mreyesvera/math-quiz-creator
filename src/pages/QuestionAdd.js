import {
    Box,
} from '@mui/material';
import Error from '../components/Shared/Error';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import QuestionForm from '../components/Question/QuestionForm';
import useAxiosAuth from '../hooks/useAxiosAuth';
import { useParams } from "react-router-dom";
import useAuth from '../hooks/useAuth';

const classes = {
    root: {
        width: 1,
        height: '100vh',
    }
};

export default function QuestionAdd(){
    const axiosAuth = useAxiosAuth();
    const { auth } = useAuth();

    const navigate = useNavigate();
    const { topicId } = useParams();
    const [ topic, setTopic ] = React.useState();
    // removed setQuestion, if needed can be added later on
    const [ question ] = React.useState({
        title: "",
        description: "",
        answer: "",
    }); 
    const [error, setError] = React.useState([]);

    async function saveQuestion(question, formData, setErrors){
        let newQuestion = {
            topicId: topic.topicId,
            creatorId: auth?.user?.userId,
            ...formData
        };
        console.log(newQuestion);

        try {
            await axiosAuth.post(`/Questions`, newQuestion)
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
                await axiosAuth.get(`/Topics/${id}`).then(response => {
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
    }, [topicId, axiosAuth]);

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