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
        marginTop: '60px',
    },
    text: {
        margin: '0 auto',
    },
};

export default function WelcomeField({label, fieldType, type, onClick, children, element}){
    return (
        <WelcomeComponent>
            {
                fieldType === "TextField" &&
                <FormControl sx={classes.field} >
                    <TextField 
                        label={label}
                        variant="filled" 
                        InputProps={ {sx: classes.formField} }
                        InputLabelProps={ {sx: classes.formField}}
                        type={type}
                        name={element.name}
                        value={element.value}
                        error={element.error}
                        helperText={element.helperText}
                        onChange={element.onChange}
                    />
                </FormControl>
            }
            {
                fieldType === "Button" &&
                <Button 
                    sx={{...classes.field, ...classes.button}}
                    color="secondary" 
                    variant="contained"
                    onClick={onClick}
                >
                    { label }
                </Button>
            }
            {
                fieldType === 'Text' &&
                <Box sx={{...classes.field, ...classes.text}}>
                   { children }
                </Box>
            }
        </WelcomeComponent>
    );
} 