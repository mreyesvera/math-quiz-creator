import React from 'react';
import {
    // Container,
    Grid,
} from '@mui/material';


export default function Welcome(props){
    return (
        <Grid 
            container
        >
            <Grid item>
                <h1>MathVi</h1>
                {props.children}
            </Grid>
            <Grid item>

            </Grid>
        </Grid>
    );
}