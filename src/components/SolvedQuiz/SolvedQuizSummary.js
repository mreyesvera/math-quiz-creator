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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Displays the summary of results from a solved quiz. 
 * 
 * @param {Object} param0 
 *      - correct: Amount of correct answers
 *      - incorrect: Amount of incorrect answers
 *      - score: Total Score
 *      - onExit:  function to handle exiting the quiz
 * @returns {React.ReactElement} Solved Quiz Summary
 */
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