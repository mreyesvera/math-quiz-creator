import {
    Box,
    List,
    Grid,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
    FormControl,
    TextField,
    Button,
} from '@mui/material';
import Errors from '../Shared/Errors';
import * as React from 'react';

const classes = {
    root: {
    },
    field: {
        width: 8/10,
        maxWidth: '500px',
    },
    button: {
        //marginTop: 'min(60px, 5%)',
        marginTop: '20px',
    },
};

export default function ResetPassword(props){
    const [errors, setErrors] = React.useState([]);
    const [formData, setFormData] = React.useState({
        password: "",
        confirmPassword: "",
    });

    function handleChange(event){
        const {name, value, type, checked} = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    return (
        <Box sx={classes.root}>
            <h2>Reset Password</h2>
            {
            errors && errors.length > 0 ?
            <Errors errors={errors} />
            :
            <Box>
                <Grid 
                    container
                    direction="column"
                >
                    <Grid item>
                        <FormControl sx={classes.field} >
                            <TextField 
                                label="New Password"
                                variant="filled" 
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl sx={classes.field} >
                            <TextField 
                                label="Confirm Password"
                                variant="filled" 
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button 
                            sx={{...classes.field, ...classes.button}}
                            color="secondary" 
                            variant="contained"
                            onClick={props.onClick}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            }
        </Box>
    );
}