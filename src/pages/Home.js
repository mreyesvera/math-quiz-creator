import {
    Box,
} from '@mui/material';
import CreatorHome from '../components/Home/CreatorHome';
import LearnerHome from '../components/Home/LearnerHome';
import useAuth from '../hooks/useAuth';

const classes = {
    root: {
        width: 1,
    }
};

export default function Home(props){
    const { auth } = useAuth();

    return (
        <Box sx={classes.root}>
            <h1>{auth?.user?.userName ? `Hello ${auth?.user?.userName}!` : ""}</h1>
            <Box>
                {
                    auth?.user?.role ?
                        <Box>
                        {
                            auth.user.role === "Creator" ?
                            <CreatorHome />
                            :
                            <Box>
                                {
                                    auth.user.role === "Learner" ?
                                    <LearnerHome />
                                    :
                                    <Box></Box>
                                }
                            </Box>
                        }
                        </Box>
                        :
                    <Box>Invalid Request</Box>
                }
            </Box>
        </Box>
    );
} 

