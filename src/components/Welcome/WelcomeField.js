import {
    TextField,
    Button,
    Box,
    FormControl,
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
    text: {
        margin: '0 auto',
    },
};

export default function WelcomeField(props){
    return (
        <WelcomeComponent>
            {
                props.fieldType === "TextField" &&
                <FormControl sx={classes.field} >
                    <TextField 
                        id="outlined-basic" 
                        label={props.label}
                        variant="filled" 
                        InputProps={ {sx: classes.formField} }
                        InputLabelProps={ {sx: classes.formField}}
                        type={props.type}
                    />
                </FormControl>
            }
            {
                props.fieldType === "Button" &&
                <Button 
                    sx={{...classes.field, ...classes.button}}
                    color="secondary" 
                    variant="contained"
                    onClick={props.onClick}
                >
                    { props.label }
                </Button>
            }
            {
                props.fieldType === 'Text' &&
                <Box sx={{...classes.field, ...classes.text}}>
                   { props.children }
                </Box>
            }
        </WelcomeComponent>
    );
} 