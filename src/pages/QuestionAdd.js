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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Main container to display Question Add Page. 
 * 
 * @returns {React.ReactElement} Question Add Page
 */
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

    async function saveQuestion(question, parameters, formData, setErrors, setDisableSave){
        let newQuestion = {
            topicId: topic.topicId,
            //creatorId: auth?.user?.userId,
            ...formData
        };

        let errors = [];

        try {
            await axiosAuth.post(`/Questions`, newQuestion)
                .then(response => {
                    //console.log(response);

                    if(response.status === 201){
                        question = response.data;
                    } else {
                        setErrors(["There was a problem saving the data."]);
                    }
                })
                .then(async () => {
                    if(question){
                        if(parameters && parameters.length > 0){
                            for(let i=0; i<parameters.length; i++){
                                let addedParam = parameters[i];
                                
                                addedParam.questionId = question.questionId;

                                await axiosAuth.post(`/Parameters`, addedParam)
                                    .then(response => {
                                        //console.log(response);
            
                                        if(response.status === 201){
                                            // do something here for valid response
                                        } else {
                                            errors.push("Unabel to add parameter.")
                                        }
                                    });
                            }
                        }
                    }
                })
                .then(() => {
                    if(question && errors.length === 0){
                        setDisableSave(false);
                        navigate(-1);
                    }
                });
        } catch(error){
            errors.push("There was a problem saving the data.");
        }

        setErrors(errors);
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