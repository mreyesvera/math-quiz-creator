import {
    Box,
    Button,
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import ConfirmDelete from '../Shared/ConfirmDelete';
import useAxiosAuth from '../../hooks/useAxiosAuth';

export default function CreatorGridHomeActions(props){
    const axiosAuth = useAxiosAuth();
    const navigate = useNavigate();

    const [id, setId] = React.useState('');
    const [baseUrl, setBaseUrl] = React.useState('');
    const [apiBaseUrl, setApiBaseUrl] = React.useState('');
    const [error, setError] = React.useState(false);

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
                setApiBaseUrl(`/Questions/`);
                break;
            case "quiz":
                setId(props.params.row.quizId);
                setBaseUrl("/quiz/");
                setApiBaseUrl(`/Quizzes/`);
                break;
            default:
                setError(true);
        }
    }, [props.type, props.params.row]);

    const onEdit = (e) => {
        navigate(`${baseUrl}${id}/edit`);
    }

    const onDelete = (e) => {
        handleOpenConfirmDelete(true);
    }

    async function deleteElement(setErrors){
        console.log(`${apiBaseUrl}${id}`);
        try {
            await axiosAuth.delete(`${apiBaseUrl}${id}`)
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
        {
            !error &&
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
        }
    </Box>
    )
}