import {
    Box,
    FormControl,
    TextField,
    Checkbox,
    FormLabel,
    TextareaAutosize,
    Button,
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import ConfirmDelete from '../Shared/ConfirmDelete';
import mathQuizCreatorAPI from '../config/mathQuizCreatorAPI.json';
import axios from 'axios';

export default function CreatorGridHomeActions(props){
    const navigate = useNavigate();

    const [id, setId] = React.useState('');
    const [baseUrl, setBaseUrl] = React.useState('');
    const [apiBaseUrl, setApiBaseUrl] = React.useState('');

    const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);

    const handleOpenConfirmDelete = () => {
        setOpenConfirmDelete(true);
    };
    
    const handleCloseConfirmDelete = () => {
        setOpenConfirmDelete(false);
    };

    React.useEffect(()=> {
        switch(props.type){
            case "question":
                setId(props.params.row.questionId);
                setBaseUrl("/question/");
                setApiBaseUrl(`${mathQuizCreatorAPI.baseURL}Questions/`);
                break;
            case "quiz":
                setId(props.params.row.quizId);
                setBaseUrl("/quiz/");
                setApiBaseUrl(`${mathQuizCreatorAPI.baseURL}Quizzes/`);
                break;
        }
    }, []);

    const onEdit = (e) => {
        navigate(`${baseUrl}${id}/edit`);
    }

    const onDelete = (e) => {
        handleOpenConfirmDelete(true);
    }

    async function deleteElement(setErrors){
        console.log(`${apiBaseUrl}${id}`);
        try {
            await axios.delete(`${apiBaseUrl}${id}`)
                .then(response => {
                    console.log(response);

                    if(response.status === 204){
                        setOpenConfirmDelete(false);
                        //navigate(`/home`);
                    } else {
                        setErrors(["There was a problem deleting the value."]);
                    }
                });
        } catch(error){
            setErrors(["There was a problem deleting the value."]);
        }
    }

    return (
    <Box>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
        <Button onClick={onEdit}>Preview</Button>
        <ConfirmDelete 
            open={openConfirmDelete}
            handleOpen={handleOpenConfirmDelete}
            handleClose={handleCloseConfirmDelete}
            onDelete={deleteElement}
            elementTitle={props.params.row.title}
        />
    </Box>
    )
}