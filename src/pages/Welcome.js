import React from 'react';
import {
    Grid,
    Box,
} from '@mui/material';

const classesFromTheme = (isRegister) => {
    const rootMinHeight = isRegister ? '680px' : '600px';
    const containersContainerGap = isRegister ? '12px' : '5%';
    const formContainerHeight = isRegister ? '98%' : 4/5;

    return {
        root: {
            backgroundImage: 'url("/images/colorful_background_rotated.png")',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100vh',
            minHeight: rootMinHeight,
            minWidth: '345px',
        },
        containersContainer: {
            textAlign: 'center',
            height: 4/5,
            minHeight: '480px',
            display: 'flex',
            flexDirection: 'column',
            gap: containersContainerGap,
            width: 1,
            alignItems: 'stretch',
            justifyContent: 'center',
        },
        titleContainerContainer: {
            height: 1/5,
        },
        titleContainer: {
            background: "hsl(0, 0%, 100%, 80%)",
            mixBlendMode: 'screen',
        },
        title: {
            fontWeight: 200,
            fontSize: '80px',
            margin: 0,
        },
        formContainer: {
            background: 'hsl(222, 64%, 19%, 80%)',
            margin: 0,
            height: formContainerHeight,
            mixBlendMode: 'hard-light',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            padding: '10px',
        }
    }
};

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Main container to display Welcome Page. 
 * 
 * @returns {React.ReactElement} Welcome Page
 */
export default function Welcome(props){
    const [isRegister] = React.useState(window.location.pathname.includes('/register'));
    const classes = classesFromTheme(isRegister);

    return (
        <Grid 
            container 
            sx={ classes.root }
            alignItems="center"
            justifyContent="center"
        >
            <Grid 
                item 
                xs={12} 
                sx={ classes.containersContainer }
            >
                <Box sx={classes.titleContainerContainer}>
                    <Box sx={classes.titleContainer}>
                        <h1 style={classes.title}>MathVI</h1>
                    </Box>
                </Box>
                <Box sx={
                        isRegister ?
                        {
                            ...classes.formContainer,
                            height: '98%',
                        }
                        : classes.formContainer
                    }
                >
                    {props.children}
                </Box>
            </Grid>
        </Grid>
    );
}