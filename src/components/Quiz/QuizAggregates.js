import {
    Box, 
} from '@mui/material';
import * as React from 'react';

const classes = {
    aggregates: {
        marginLeft: '20px',
    }
};

export default function QuizAggregates(){
    return (
        <Box sx={classes.aggregates}>
            <h3>Aggregate Results</h3>
            <Box>
                <Box>
                    Minimum: 5.0
                </Box>
                <Box>
                    Maximum: 10.0
                </Box>
                <Box>
                    Average: 8.0
                </Box>
            </Box>
        </Box>
    );
}