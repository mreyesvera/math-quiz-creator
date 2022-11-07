import {
    Box,
} from '@mui/material';
import CreatorHome from '../components/Home/CreatorHome';
import LearnerHome from '../components/Home/LearnerHome';

const classes = {
    root: {
        width: 1,
    }
};

export default function Home(props){
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

