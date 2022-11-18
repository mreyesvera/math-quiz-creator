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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Main container to display Home Page. 
 * 
 * @returns {React.ReactElement} Home Page
 */
export default function Home(){
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

