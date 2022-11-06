import {
    Box,
} from '@mui/material';
import * as React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import QuizForm from './QuizForm';
import { 
    matchingQuizQuestionId, 
    removeQuestionOnQuizQuestion
} from '../../utils/quizQuestionUtils';
import mathQuizCreatorAPI from '../../config/mathQuizCreatorAPI.json';
import axios from 'axios';


export default function QuizEdit(){
    const navigate = useNavigate();
    const outletContext = useOutletContext();

    async function saveQuiz(quiz, formData, quizQuestions, quizQuestionsData, setErrors){
        let modifiedQuiz = {
            quizId: quiz.quizId,
            ...formData
        };

        console.log("Quiz Edit quizQuestions");
        console.log(quizQuestions);

        console.log("Quiz Edit quizQuestionsData");
        console.log(quizQuestionsData);
        
        let deletedQuizQuestions = quizQuestions.filter((quizQuestion) => {
            let quizQuestionInData = quizQuestionsData.find((quizQuestionData) => matchingQuizQuestionId(quizQuestionData, quizQuestion));

            if(!quizQuestionInData){
                return true;
            } 

            return false;
        });

        let modifiedQuizQuestions = quizQuestionsData.filter((quizQuestionData) => {
            let quizQuestion = quizQuestions.find((quizQuestion) => matchingQuizQuestionId(quizQuestion, quizQuestionData));

            if(quizQuestion){
                return quizQuestion.order !== quizQuestionData.order;
            }

            return false;
        });

        let addedQuizQuestions = quizQuestionsData.filter((quizQuestionData) => {
            let quizQuestion = quizQuestions.find((quizQuestion) => matchingQuizQuestionId(quizQuestion, quizQuestionData));

            if(!quizQuestion){
                return true;
            }

            return false;
        });



        console.log("deleted quiz questions");
        console.log(deletedQuizQuestions);

        console.log("modified quiz questions");
        console.log(modifiedQuizQuestions);

        console.log("added quiz questions");
        console.log(addedQuizQuestions);
        
        let errors = []

        try {
            await axios.put(`${mathQuizCreatorAPI.baseURL}Quizzes/${quiz.quizId}`, modifiedQuiz)
                .then(response => {
                    console.log(response);

                    if(response.status === 204){
                        outletContext.setGetData(true);
                        //navigate(`/quiz/${quiz.quizId}/details`);
                        //navigate(-1); FIGURE OUT WHERE TO PLACE THIS LATER ON
                    } else {
                        errors.push("There was a problem saving the quiz data.");
                    }
                });
            
            if(deletedQuizQuestions && deletedQuizQuestions.length > 0){
                for(let i=0; i<deletedQuizQuestions.length; i++){
                    let deletedQuizQuestion = deletedQuizQuestions[i];

                    if(deletedQuizQuestion.quizQuestionId){
                        await axios.delete(`${mathQuizCreatorAPI.baseURL}QuizQuestions/${deletedQuizQuestion.quizQuestionId}`)
                            .then(response => {
                                console.log(response);

                                if(response.status === 204){
                                    // do something here for valid response
                                } else {
                                    errors.push("Unable to delete quiz question.");
                                }
                            });
                    } else {
                        errors.push("Unable to delete quiz question.");
                    }
                }
            }

            if(modifiedQuizQuestions && modifiedQuizQuestions.length > 0){
                for(let i=0; i<modifiedQuizQuestions.length; i++){
                    let modifiedQuizQuestion = removeQuestionOnQuizQuestion(modifiedQuizQuestions[i]);

                    console.log(modifiedQuizQuestion);
                    if(modifiedQuizQuestion.quizQuestionId){
                        await axios.put(`${mathQuizCreatorAPI.baseURL}QuizQuestions/${modifiedQuizQuestion.quizQuestionId}`, modifiedQuizQuestion)
                            .then(response => {
                                console.log(response);

                                if(response.status === 204){
                                    // do something here for valid repsonse
                                } else {
                                    errors.push("Unable to modify question.");
                                }
                            });
                    } else {
                        errors.push("Unable to modify question.");
                    }
                }
            }

            if(addedQuizQuestions && addedQuizQuestions.length > 0){
                for(let i=0; i<addedQuizQuestions.length; i++){
                    let addedQuizQuestion = removeQuestionOnQuizQuestion(addedQuizQuestions[i]);

                    console.log(addedQuizQuestion);
                    await axios.post(`${mathQuizCreatorAPI.baseURL}QuizQuestions`, addedQuizQuestion)
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

        } catch(error){
            errors.push("There was a problem saving the data.");
        }

        setErrors(errors);
    }

    return (
        <Box>
            <QuizForm 
                quiz={outletContext.quiz}
                onSubmit={saveQuiz}
                topicId={outletContext.quiz.topic.topicId}
            />
        </Box>
    );
}