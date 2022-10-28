import {
    Box,
} from '@mui/material';
//import { Outlet } from 'react-router-dom';
//import { useNavigate } from "react-router-dom";
import CreatorHome from '../components/Home/CreatorHome';
import LearnerHome from '../components/Home/LearnerHome';

const classes = {
    root: {
        width: 1,
        //height: '100vh',
    }
};

export default function Home(props){
    //const navigate = useNavigate();

    return (
        <Box sx={classes.root}>
            <h1>{props.title}</h1>
            <Box>
                {
                    props.isCreator ?
                    <CreatorHome />
                    :
                    <LearnerHome />
                }
            </Box>
        </Box>
    );
} 

