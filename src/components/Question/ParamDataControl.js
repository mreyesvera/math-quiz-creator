import {
    Box,
    Button,
} from '@mui/material';
import ParamDataGrid from './ParamDataGrid';
import * as React from 'react';

const classes = {
    root: {
        my: 4,
        width: 1,
    },
    addRowButtonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'right',
        marginBottom: 2,
    },
    gridContainer: {
        height: '400px',
        width: 1,
    }
};

function getRowId(row){
    return row.order;
}

export default function ParamDataControl({paramsColumns, paramsData}){
    return (
        <Box
            sx={classes.root}
        >
            <Box
                sx={classes.addRowButtonContainer}
            >
                <Button
                    variant='contained'
                >
                    Delete Row
                </Button>
                <Button
                    variant='contained'
                >
                    Add Row
                </Button>
            </Box>
            <Box
                sx={classes.gridContainer}
            >
                <ParamDataGrid 
                    data={paramsData}
                    columns={paramsColumns}
                    getRowId={getRowId}
                />
            </Box>
        </Box>
    );
}