import {
    Box,
    Button,
} from '@mui/material';
import * as React from 'react';

const classes = {
    root: {
        height: 1,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    marginTop: {
        marginTop: 2,
    }
};

export default function SolvedQuizSummary({correct, incorrect, score, onExit}){
    return (
        <Box
            sx={classes.root}
        >
            <Box>
                <h4>Your score results are...</h4>
            </Box>
            <Box>
                <Box>
                    Correct responses: {correct}
                </Box>
                <Box>
                    Incorrect responses: {incorrect}
                </Box>
                <Box
                    sx={classes.marginTop}
                >
                    Score: {score*100}%
                </Box>
            </Box>
            <Box
                sx={classes.marginTop}
            >
                <Button
                    onClick={onExit}
                >
                    Exit Quiz
                </Button>
            </Box>
        </Box>
    );
}