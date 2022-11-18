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

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Styles a field that appears in components that appear in 
 * the welcome page. 
 * 
 * @param {Object} param0 
 *      - label: field label text
 *      - fieldType: Whether the field is a textfield, button or text
 *      - type: Textfield type if the field is a textfield
 *      - onClick: function to handle onClick of button if the field is a button
 *      - children: In the case of text, the react component to display
 *      - element: Object to hold field state/values in the case of textfield
 *          - name: text field name
 *          - value: text field value
 *          - error: whether to display error or not
 *          - helperText: helper text to show in case of error
 *          - onChange: function to handle text field value change
 *      - disabled: 
 * @returns {React.ReactElement} Welcome Field Styled
 */
export default function WelcomeField({label, fieldType, type, onClick, children, element, disabled}){
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
                    disabled={disabled}
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