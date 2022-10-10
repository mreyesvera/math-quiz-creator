import {
    Box, 
} from '@mui/material';
import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const classes = {
    gridSection: {
        height: '350px',
    },
}

export default function SolvedQuizzesGrid(props){
    return (
        <Box sx={classes.gridSection}>
            <Box>
                Highest Score: 90%
            </Box>
            <DataGrid 
                rows={props.data} 
                columns={props.columns} 
                getRowId={props.getRowId}
                components={{ Toolbar: GridToolbar }}
            /> 
        </Box>
    );
}