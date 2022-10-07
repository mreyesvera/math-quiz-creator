import {
    Box, 
    Grid,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getValueFromProperty } from '../../utils/ProcessProperties';
import * as React from 'react';

const classes = {
    titleSection: {
        display: 'flex',
    },
    gridSection: {
        height: '350px',
    }
};

export default function CreatorContentGrid(props) {
    
    console.log(props);

    return (
        <Grid container direction='column'>
            <Grid item sx={classes.titleSection}>
                <Box>{props.title}</Box>
                {
                    props.titleSectionActions && props.titleSectionActions.length &&
                    props.titleSectionActions.map((action) => (
                        <Button
                            onClick={action.onClick}
                        >
                            {action.title}
                        </Button>
                    ))
                }
            </Grid>
            <Grid item  sx={classes.gridSection}>
                <DataGrid 
                    rows={props.data} 
                    columns={props.columns} 
                    getRowId={props.getRowId}
                    components={{ Toolbar: GridToolbar }}
                />
            </Grid>
        </Grid>
    );
}