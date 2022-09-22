import {
    Box,
    TextField
} from '@mui/material';

const classes = {
    root: {
        color: 'white',
        paddingBottom: '60px',
    },
    title: {
        margin: '0 0 20px 0',
        fontWeight: 500,
        fontSize: '40px',
    },
    textFieldContainer: {
        padding: '5px 0',
        textAlign: 'center',
    },
    textField: {
        width: 8/10,
        maxWidth: '500px',
    },
    formField: {
        color: 'white',
    }
};

export default function Login(){
    return (
        <Box sx={classes.root}>
            <h1 style={classes.title}>Login</h1>
            <Box sx={classes.textFieldContainer}>
                <TextField 
                    sx={classes.textField} 
                    id="outlined-basic" 
                    label="USERNAME" 
                    variant="filled" 
                    InputProps={ {sx: classes.formField} }
                    InputLabelProps={ {sx: classes.formField}}
                />
            </Box>
            <Box sx={classes.textFieldContainer}>
                <TextField 
                    sx={classes.textField} 
                    id="outlined-basic" 
                    label="PASSWORD" 
                    variant="filled" 
                    type="password"
                    InputProps={ {sx: classes.formField} }
                    InputLabelProps={ {sx: classes.formField}}
                />
            </Box>
        </Box>
    );
} 