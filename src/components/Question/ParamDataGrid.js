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

export default function ParamDataGrid({data, columns, getRowId}){
    return (
        <Box
            sx={classes.gridContainer}
        >
            <DataGrid 
                rows={data} 
                columns={columns} 
                getRowId={getRowId}
                disableColumnMenu
                experimentalFeatures={{ newEditingApi: true }}
                //components={{ Toolbar: GridToolbar }}
            />
        </Box>
    );
}