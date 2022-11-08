import {
    Box,
} from '@mui/material';
import Error from '../components/Shared/Error';
import QuizForm from '../components/Quiz/QuizForm';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { 
    removeQuestionOnQuizQuestion
} from '../utils/quizQuestionUtils';
import { useParams } from "react-router-dom";
import useAxiosAuth from '../hooks/useAxiosAuth';
import useAuth from '../hooks/useAuth';


const classes = {
    root: {
        width: 1,
        height: '100vh',
    }
};

export default function QuizAdd(){
    const axiosAuth = useAxiosAuth();
    const { auth } = useAuth();

    const navigate = useNavigate();
    const { topicId } = useParams();
    //const [getData, setGetData] = React.useState(true);
    const [ topic, setTopic ] = React.useState();
    // removed setQuiz, if needed can be added later on
    const [ quiz ] = React.useState({
        title: "",
        description: "",
        isPublic: false,
        hasUnlimitedMode: false,
        quizQuestions: [],
    }); 
    const [error, setError] = React.useState([]);

    async function saveQuiz(quiz, formData, quizQuestions, quizQuestionsData, setErrors){
        let newQuiz = {
            topicId: topic.topicId,
            //creatorId: auth?.user?.userId,
            ...formData
        };
        console.log(newQuiz);

        let errors = []

        try {
            await axiosAuth.post(`/Quizzes`, newQuiz)
                .then(response => {
                    console.log(response);

                    if(response.status === 201){
                        quiz = response.data;

                        //navigate(`/quiz/${quiz.quizId}/details`);
                    } else {
                        errors.push("There was a problem saving the data.");
                    }
                })
                .then(async () => {
                    if(quiz){
                        if(quizQuestionsData && quizQuestionsData.length > 0){
                            for(let i=0; i<quizQuestionsData.length; i++){
                                let addedQuizQuestion = removeQuestionOnQuizQuestion(quizQuestionsData[i]);
                                
                                addedQuizQuestion.quizId = quiz.quizId;

                                console.log(addedQuizQuestion);
                                await axiosAuth.post(`/QuizQuestions`, addedQuizQuestion)
                                    .then(response => {
                                        console.log(response);
            
                                        if(response.status === 201){
                                            // do something here for valid response
                                        } else {
                                            errors.push("Unabel to add question.")
                                        }
                                    });
                            }
                        }
                    }
                })
                .then(() => {
                    if(quiz && errors.length === 0){
                        navigate(`/quiz/${quiz.quizId}/details`);
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
                    <QuizForm 
                        quiz={quiz}
                        onSubmit={saveQuiz}
                        topicId={topic.topicId}
                    />
                </Box>
            }
        </Box>
    );
}