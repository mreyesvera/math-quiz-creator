import React from 'react';
import {
    // Container,
    Grid,
    Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { convertLength } from '@mui/material/styles/cssUtils';

const classesFromTheme = (theme) => (
    {
        root: {
            //background: "#404040",
            backgroundImage: 'url("/images/colorful_background_rotated.png")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100vh',
        },
        imageContainer: {
            height: '100vh',
            width: 1,
            overflow: 'hidden',
            textAlign: 'initial',
            position: 'relative',
        },
        image: {
            position: 'absolute',
        },
        titleContainer: {
            background: "hsl(0, 0%, 100%, 85%)",
            mixBlendMode: 'screen',
            textAlign: 'center',
            // [theme.breakpoints.down('sm')]: {
            //     color: 'pink',
            // }
        },
        title: {
            fontWeight: 200,
            fontSize: '80px',
            margin: '10% 0' ,
        }
    }
);


export default function Welcome(props){
    const theme = useTheme();
    const classes = classesFromTheme(theme);
    const [imageHeightMode, setImageHeightMode] = React.useState(true)
    const [imageStyles, setImageStyles] = React.useState({
        height: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
    });

    React.useEffect(()=>{
        function imageStyleChange(e){
            console.log("function called");
            const screenRatioFlag = (window.innerWidth/2)/window.innerHeight > (2/3);
            if( screenRatioFlag && imageHeightMode){
                console.log("change");
                setImageStyles({
                    width: '100%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    height: 'auto',
                    left: '0',
                });
                setImageHeightMode(false);
            } else if (!screenRatioFlag && !imageHeightMode) {
                console.log("change");
                setImageStyles({
                    height: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'auto',
                    top: '0',
                });
                setImageHeightMode(true);
            }
        };

        imageStyleChange();
        window.addEventListener('resize', imageStyleChange);

        return ()=> {
            window.removeEventListener('resize', imageStyleChange);
        }; 
    }, [imageHeightMode]);
    

    return (
        <Grid container sx={classes.root}>
            <Grid item xs={12}>
                <Box sx={classes.contentContainer}>
                    <Box sx={classes.titleContainer}>
                        <h1 style={classes.title}>MathVi</h1>
                    </Box>
                    <Box sx={classes.formContainer}>
                        {props.children}
                    </Box>
                </Box>
            </Grid>
            {/* <Grid item xs={6} sx={classes.imageContainer}>
                <img 
                    src="/images/colorful_background.png" 
                    alt="colorful background"
                    style={{
                        ...classes.image,
                        ...imageStyles,
                    }}
                />
            </Grid>  */}
        </Grid>
    );
}