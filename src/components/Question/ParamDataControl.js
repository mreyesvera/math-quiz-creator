import {
    Box,
    Button,
} from '@mui/material';
import ParamDataGrid from './ParamDataGrid';
import * as React from 'react';

const classes = {
    root: {
        my: 4
    },
    addRowButtonContainer: {
        textAlign: 'right',
        marginBottom: 2,
    },
    gridContainer: {
        height: '400px',
    }
};

function getRowId(row){
    return row.order;
}

export default function ParamDataControl(){
    const [paramColumns, setParamColumns] = React.useState([
        {
            field: 'X',
            headerName: 'X',
            flex: 1,
            editable: true,
        },
        {
            field: 'Y',
            headerName: 'Y',
            flex: 1,
            editable: true,
        },
        {
            field: 'Z',
            headerName: 'Z',
            flex: 1,
            editable: true,
        }
    ]);
    const [paramsValues, setParamsValues] = React.useState([
        {
            order: 1,
            X: 1,
            Y: 1,
            Z: 1,
        },
        {
            order: 2,
            X: 2,
            Y: 2,
            Z: 2,
        },
        {
            order: 3,
            X: 3,
            Y: 3,
            Z: 3,
        },
        {
            order: 4,
            X: 4,
            Y: 4,
            Z: 4,
        },
    ]);

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
                    Add Row
                </Button>
            </Box>
            <Box
                sx={classes.gridContainer}
            >
                <ParamDataGrid 
                    data={paramsValues}
                    columns={paramColumns}
                    getRowId={getRowId}
                />
            </Box>
        </Box>
    );
}