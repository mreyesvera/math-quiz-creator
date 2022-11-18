import {
    Box, 
    Grid,
    Button,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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
    },
    gridSection: {
        height: '350px',
    },
    button: {
        boxShadow: 'none',
        marginLeft: '5px',
    }
});

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Used throughout the application to display mui grids particularly
 * for questions, quizzes and solved quizzes. 
 * 
 * @param {Object} props 
 *      - titleBackgroundColor: Color of title's background
 *      - titleSectionActions: Actions at title level
 *          - title: Action button text
 *          - onClick: onClick button action
 *      - data: MUI Data Grid data
 *      - columns: MUI Data Grid columns
 *      - getRowId: MUI Data Grid getRowId
 *      - toolbar: whether MUI Data Grid toolbar is enabled or not
 *      - checkBoxSelection: MUI Data Grid checkBoxSelection
 *      - selectionModel: MUI Data Grid selectionModel
 *      - onSelectionModelChange: MUI Data Grid onSelectionModelChanged
 *      - initialState: MUI Data Grid initialState
 * @returns {React.ReactElement} Displays an MUI Grid with a title and title level actions
 */
export default function CreatorContentGrid(props) {
    const classes = createClasses(props);

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
                    components={props.toolbar ? { Toolbar: GridToolbar } : {}}
                    checkboxSelection={props.checkboxSelection}
                    selectionModel={props.selectionModel}
                    onSelectionModelChange={props.onSelectionModelChange}
                    initialState={props.initialState}
                />
            </Grid>
        </Grid>
    );
}