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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Used to display and manage the questions' parameters when 
 * editing or adding a question.
 * 
 * @param {Object} param0 
 *      - paramsColumns: MUI Data Grid columns
 *      - parmsData: MUI Data Grid rows 
 *      - onAddRow: function to handle adding a row in the parameters grid
 *      - onDeleteRow: function to handle deletion of a row in the parameters grid
 *      - onCellEdit: function to handle mui data grid cell edited
 *      - disableButtons: Whether to disable the add and delete row buttons
 * @returns {React.ReactElement} MUI Data Grid of parameters with buttons to add/delete rows
 */
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