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

export default function CreatorGridHomeActions(props){
    const navigate = useNavigate();

    const [id, setId] = React.useState('');
    const [baseUrl, setBaseUrl] = React.useState('');

    React.useEffect(()=> {
        switch(props.type){
            case "question":
                setId(props.params.row.questionId);
                setBaseUrl("/question/")
                break;
            case "quiz":
                setId(props.params.row.quizId);
                setBaseUrl("/quiz/");
                break;
        }
    }, []);

    const onEdit = (e) => {
        navigate(`${baseUrl}${id}/edit`);
    }

    return (
    <Box>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onEdit}>Delete</Button>
        <Button onClick={onEdit}>Preview</Button>
    </Box>
    )
}