import {
    Box
} from '@mui/material';
import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const classes = {
    gridContainer: {
        height: '100%',
        width: 1,
    }
}

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Displays the a MUI Data Grid with the passed in question 
 * parameters' data/handlers.
 * 
 * @param {Object} param0 
 *      - data: MUI Data Grid rows
 *      - columns: MUI Data Grid columns
 *      - getRowId: MUI Data Grid getRowId
 *      - onCellEdit: MUI Data Grid onCellEditCommit
 * @returns {React.ReactElement} MUI Data Grid of passed in parameter data
 */
export default function ParamDataGrid({data, columns, getRowId, onCellEdit}){
    return (
        <Box
            sx={classes.gridContainer}
        >
            <DataGrid 
                rows={data} 
                columns={columns} 
                getRowId={getRowId}
                disableColumnMenu
                //experimentalFeatures={{ newEditingApi: true }}
                onCellEditCommit={onCellEdit}
                //components={{ Toolbar: GridToolbar }}
            />
        </Box>
    );
}