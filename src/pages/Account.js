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
        p: '8%',
    },
    resetPasswordContainer: {
        p: '8%',
    }

};

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