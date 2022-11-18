import {
    Box,
    Grid,
} from '@mui/material';
import AccountDetails from '../components/Account/AccountDetails';
import ResetPassword from '../components/Account/ResetPassword';
import Error from '../components/Shared/Error';
import * as React from 'react';

const classes = {
    root: {
        
    },
    accountDetailsContainer: {
        px: '8%',
        py: '20px',
    },
    resetPasswordContainer: {
        px: '8%',
        py: '20px',
    }

};

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Main container to display Account Page. 
 * 
 * @returns {React.ReactElement} Account Page
 */
export default function Account(){
    const [error, setError] = React.useState("");

    return (
        <Box sx={classes.root}>
        {
            error ?
            <Error error={error} />
            :
            <Box>
                <h1>Account</h1>
                <Grid 
                    container
                    direction="column"
                    sx={classes.root}
                >
                    <Grid item sx={classes.accountDetailsContainer}>
                        <AccountDetails />
                    </Grid>
                    <Grid item sx={classes.resetPasswordContainer}>
                        <ResetPassword />
                    </Grid>
                </Grid>
            </Box>
        }
        </Box>
    );
}