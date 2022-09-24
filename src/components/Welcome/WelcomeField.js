import {
    TextField,
    Button,
    Box,
} from '@mui/material';
import WelcomeComponent from './WelcomeComponent';

const classes = {
    field: {
        width: 8/10,
        maxWidth: '500px',
    },
    formField: {
        color: 'white',
    },
    button: {
        //marginTop: 'min(60px, 5%)',
        marginTop: '60px',
    },
};

export default function WelcomeField(props){
    return (
        <WelcomeComponent>
            {
                props.fieldType === "TextField" &&
                <TextField 
                    sx={classes.field} 
                    id="outlined-basic" 
                    label={props.label}
                    variant="filled" 
                    InputProps={ {sx: classes.formField} }
                    InputLabelProps={ {sx: classes.formField}}
                />
            }
            {
                props.fieldType === "Button" &&
                <Button 
                    sx={{...classes.field, ...classes.button}}
                    color="secondary" 
                    variant="contained"
                >
                    { props.label }
                </Button>
            }
            {
                props.fieldType === 'Text' &&
                <Box sx={classes.field}>
                   { props.children }
                </Box>
            }
        </WelcomeComponent>
    );
} 