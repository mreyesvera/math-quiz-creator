import React from 'react';
import {
    // Container,
    Grid,
    Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const classesFromTheme = (theme) => (
    {
        root: {
            //background: "#404040",
            backgroundImage: 'url("/images/colorful_background_rotated.png")',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100vh',
            minHeight: '600px',
            //minHeight: '680px',
            minWidth: '345px',
        },
        containersContainer: {
            textAlign: 'center',
            height: 4/5,
            minHeight: '480px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5%',
            //gap: '12px',
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
            //textAlign: 'center',
            // [theme.breakpoints.down('sm')]: {
            //     color: 'pink',
            // }
        },
        title: {
            fontWeight: 200,
            fontSize: '80px',
            //margin: 'min(100px, 10%) 0 5% 0' ,
            margin: 0,
        },
        formContainer: {
            //background: "hsl(0, 0%, 100%, 100%)",
            //background: 'hsl(0, 0%, 12%, 80%)',
            background: 'hsl(222, 64%, 19%, 80%)',
            margin: 0,
            //mixBlendMode: 'screen',
            //mixBlendMode: 'overlay',
            //mixBlendMode: 'hue',
            //mixBlendMode: 'color-burn',
            height: 4/5,
            //height: '98%',
            mixBlendMode: 'hard-light',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            padding: '10px',
        }
    }
);


export default function Welcome(props){
    const theme = useTheme();
    const classes = classesFromTheme(theme);
    const [isRegister, setIsRegister] = React.useState(window.location.pathname.includes('/register'));
    

    return (
        <Grid 
            container 
            sx={
                isRegister ?
                {
                    ...classes.root,
                    minHeight: '680px',
                }
                : classes.root
            }
            alignItems="center"
            justifyContent="center"
        >
            <Grid 
                item 
                xs={12} 
                sx={
                    isRegister ?
                    {
                        ...classes.containersContainer,
                        gap: '12px',
                    }
                    : classes.containersContainer
                }
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