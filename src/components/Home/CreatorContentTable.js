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
import * as React from 'react';

export default function CreatorContentTable(props) {
    console.log(props);
    return (
        <Grid container direction='column'>
            <Grid item>
                <Box>{props.title}</Box>
                <Button>Create New</Button>
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
                                        /* Make this variable, add a prop that will
                                           specify the properties to show and then 
                                           use the neat javascript thing to convert to
                                           variable name and go through each and
                                           get each value of the element
                                        */
                                     }
                                    <TableCell>{element.title}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
}