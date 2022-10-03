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

function nestedValues(element, properties, index, value){
    let currentValue = element[properties[index]];
    if(Array.isArray(currentValue)){
        index++;

        currentValue.forEach((obj) => {
            value = nestedValues(obj, properties, index, value);
        });
    } else {
        value = value === "" ? currentValue : (value + ", " + currentValue);
    }

    return value;
}

function getValueFromProperty(element, property){
    let value = undefined; 

    if(property.includes(".")){
        const properties = property.split(".");

        value = nestedValues(element, properties, 0, "");
    } else {
        value = element[property];
    }

    console.log(value);
    if(value === true){
        value = "yes";
    } else if(value === false){
        value = "no";
    }

    return value;
}


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