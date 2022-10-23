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
import { useOutletContext } from 'react-router-dom';
import CreatorContentGrid from '../Home/CreatorContentGrid';
import { useNavigate } from "react-router-dom";

export default function CreatorGridQuizEditActions(props){
    const onClick = (e) => {
        console.log(props.params);
    };

    return (
    <Box>
        <Button onClick={onClick}>Edit</Button>
        <Button onClick={onClick}>Remove</Button>
        <Button onClick={onClick}>Delete</Button>
        <Button onClick={onClick}>Preview</Button>
    </Box>
    )
}