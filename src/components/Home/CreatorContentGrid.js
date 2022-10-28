import {
    Box, 
    Grid,
    Button,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getValueFromProperty } from '../../utils/ProcessProperties';
import * as React from 'react';

const createClasses = (props) => ({
    containerGrid: {
        marginBottom: 3,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 4,
    },
    titleSection: {
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 1,
        borderRadius: '4px',
        backgroundColor: props.titleBackgroundColor,
        //backgroundColor: '#1e839c',
        //backgroundColor: '#70a489',
    },
    gridSection: {
        height: '350px',
    },
    button: {
        boxShadow: 'none',
        marginLeft: '5px',
    }
});

export default function CreatorContentGrid(props) {
    const classes = createClasses(props);
    //console.log(props);

    return (
        <Grid 
            container 
            direction='column'
            sx={classes.containerGrid}
        >
            <Grid item sx={classes.titleSection}>
                <Box sx={classes.title}>{props.title}</Box>
                <Box>
                {
                    (props.titleSectionActions && props.titleSectionActions.length &&
                    props.titleSectionActions.map((action, index) => (
                        <Button
                            key={index}
                            onClick={action.onClick}
                            variant="contained"
                            sx={classes.button}
                            color="secondary"
                        >
                            {action.title}
                        </Button>
                    ))) || ""
                }
                </Box>
            </Grid>
            <Grid item  sx={classes.gridSection}>
                <DataGrid 
                    rows={props.data} 
                    columns={props.columns} 
                    getRowId={props.getRowId}
                    components={{ Toolbar: GridToolbar }}
                    checkboxSelection={props.checkboxSelection}
                />
            </Grid>
        </Grid>
    );
}