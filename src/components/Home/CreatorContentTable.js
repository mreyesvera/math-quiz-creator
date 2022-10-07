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
import { getValueFromProperty } from '../../utils/ProcessProperties';
import * as React from 'react';

const classes = {
    titleSection: {
        display: 'flex',
    }
};

export default function CreatorContentTable(props) {
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
            <Grid item>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                props.headers.map((header, index) => (<TableCell key={index}>{header}</TableCell>))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.content && 
                            props.content.map((element, index) => (
                                <TableRow key={index}>
                                    {
                                        props.properties.map((property, index) => {
                                            const value = getValueFromProperty(element, property);

                                            return <TableCell key={index}>{value}</TableCell>
                                        })
                                    }
                                     
                                    <TableCell>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
}