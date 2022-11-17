import {
    Box,
} from '@mui/material';
import * as React from 'react';
import { useOutletContext } from 'react-router-dom';
import QuestionForm from './QuestionForm';
//import Errors from '../Shared/Errors';
import { useNavigate } from "react-router-dom";
import useAxiosAuth from '../../hooks/useAxiosAuth';

export default function QuestionEdit(){
    const axiosAuth = useAxiosAuth();
    const navigate = useNavigate();
    const outletContext = useOutletContext();

    async function saveQuestion(question, parameters, formData, setErrors, setDisableSave){
        let modifiedQuestion = {
            questionId: question.questionId,
            ...formData
        };

        let oldParameters = outletContext?.question?.parameters;

        if(!oldParameters){
            oldParameters = [];
        }

        let deletedParameters = oldParameters.filter((oldParameter) => {
            let parameterInUpdated = parameters.find((parameter) => parameter.parameterId === oldParameter.parameterId);

            if(!parameterInUpdated){
                return true;
            } 

            return false;
        });

        let modifiedParameters = parameters.filter((parameter) => {
            let oldParamater = oldParameters.find((oldParameter) => oldParameter.parameterId === parameter.parameterId);

            if(oldParamater){
                return oldParamater.value !== parameter.value;
            }

            return false;
        });

        let addedParameters = parameters.filter((parameter) => {
            let oldParamater = oldParameters.find((oldParameter) => oldParameter.parameterId === parameter.parameterId);

            if(!oldParamater){
                return true;
            }

            return false;
        });

        deletedParameters = deletedParameters.map(deletedParam => ({
            ...deletedParam,
            questionId: outletContext.question.questionId
        }));

        modifiedParameters = modifiedParameters.map(modifiedParam => ({
            ...modifiedParam,
            questionId: outletContext.question.questionId
        }));

        addedParameters = addedParameters.map(addedParam => ({
            ...addedParam,
            questionId: outletContext.question.questionId
        }));

        let errors = [];

        try {
            if(deletedParameters && deletedParameters.length > 0){
                for(let i=0; i<deletedParameters.length; i++){
                    let deletedParam = deletedParameters[i];

                    if(deletedParam.parameterId){
                        await axiosAuth.delete(`/Parameters/${deletedParam.parameterId}`)
                            .then(response => {
                                //console.log(response);

                                if(response.status === 204){
                                    // do something here for valid response
                                } else {
                                    errors.push("Unable to delete parameter.");
                                }
                            });
                    } else {
                        errors.push("Unable to delete parameter.");
                    }
                }
            }

            if(modifiedParameters && modifiedParameters.length > 0){
                for(let i=0; i<modifiedParameters.length; i++){
                    let modifiedParameter = modifiedParameters[i];

                    if(modifiedParameter.parameterId){
                        await axiosAuth.put(`/Parameters/${modifiedParameter.parameterId}`, modifiedParameter)
                            .then(response => {
                                //console.log(response);

                                if(response.status === 204){
                                    // do something here for valid repsonse
                                } else {
                                    errors.push("Unable to modify parameter.");
                                }
                            });
                    } else {
                        errors.push("Unable to modify parameter.");
                    }
                }
            }

            if(addedParameters && addedParameters.length > 0){
                for(let i=0; i<addedParameters.length; i++){
                    let addedParameter = addedParameters[i];

                    await axiosAuth.post(`/Parameters`, addedParameter)
                        .then(response => {
                            //console.log(response);

                            if(response.status === 201){
                                // do something here for valid response
                            } else {
                                errors.push("Unabel to add question.")
                            }
                        });
                }
            }


            await axiosAuth.put(`/Questions/${outletContext.question.questionId}`, modifiedQuestion)
                .then(response => {
                    //console.log(response);

                    if(response.status === 204){
                        outletContext.setGetData(true);
                        setDisableSave(false);
                        navigate(-1);
                    } else {
                        errors.push("There was a problem saving the data.");
                    }
                });
        } catch(error){
            errors.push("There was a problem saving the data.");
        }

        setErrors(errors);
    }

    return (
        <Box>
            <QuestionForm 
                question={outletContext.question}
                onSubmit={saveQuestion}
            />
        </Box>
    );
}