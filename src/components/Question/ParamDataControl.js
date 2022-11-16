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
        width: '350px',
    }
};

function getRowId(row){
    return row.order;
}

export default function ParamDataControl({paramsColumns, paramsData, onAddRow, onDeleteRow, onCellEdit, disableButtons}){
    return (
        <Box
            sx={classes.root}
        >
            <Box
                sx={classes.addRowButtonContainer}
            >
                <Button
                    variant='contained'
                    onClick={onDeleteRow}
                    disabled={disableButtons}
                >
                    Delete Row
                </Button>
                <Button
                    variant='contained'
                    onClick={onAddRow}
                    disabled={disableButtons}
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
                    onCellEdit={onCellEdit}
                />
            </Box>
        </Box>
    );
}