import {
    Box,
    FormControl,
    TextField,
    Button,
    Divider,
    FormLabel,
    TextareaAutosize,
    Grid,
    autocompleteClasses,
} from '@mui/material';
import * as React from 'react';
import ParamDataControl from './ParamDataControl';

const classes = {  
    root: {
        width: 1,
    },
    content: {
        width: 9/10,
        margin: '0 auto',
        marginRight: 4,
    },
    topRow: {
        marginBottom: 4,
        display: 'flex',
        justifyContent: 'space-between',
    },
    paramFieldControl: {
        width: '100%',
        marginRight: 2,
    },
    paramDataControlContainer: {
        width: 1,
    }
};

export default function QuestionParametrization({paramsColumns, paramsData}){
    return (
        <Box
            sx={classes.root}
        >
            <h3>
                Parameters
            </h3>
            <Box
                sx={classes.content}
            >
                <Box
                    sx={classes.topRow}
                >
                    <FormControl
                        sx={classes.paramFieldControl}
                    >
                        <TextField
                            label="Param Name"
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                    >
                        Add
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ml:1}}
                    >
                        Delete
                    </Button>
                </Box>
                <Divider />
                <Box
                    sx={classes.paramDataControlContainer}
                >
                    {
                        paramsColumns && paramsData &&
                        <ParamDataControl 
                            paramsColumns={paramsColumns}
                            paramsData={paramsData}
                        />
                    }
                </Box>
            </Box>
        </Box>
    );
}