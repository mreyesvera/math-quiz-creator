import {
    ListItem,
    ListItemButton,
    ListItemText,
    Grid,
} from '@mui/material';
import NavTopicQuizzesGrid from './NavTopicQuizzesGrid';
import * as React from 'react';

const classes = {
    listItemButton: {
        textAlign: 'center'
    },
};

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Manages and displays the list of quizzes for a specified topic.
 * 
 * @param {Object} param0 
 *      - topic: Topic object to display the navigation list for
 *      - onItemSelected: function to handle a quiz being selected
 * @returns {React.ReactElement} Navigation Drawer Topic List
 */
export default function NavTopicList({topic, onItemSelected}){
    const [isOpen, setIsOpen] = React.useState(false);

    function toggleIsOpen(){
        setIsOpen((oldIsOpen) => {
            return !oldIsOpen;
        });
    }

    function openTopicList(){
        toggleIsOpen();
    }

    return (
        <ListItem disablePadding>
            <Grid container direction='column'>
                <Grid item>
                    <ListItemButton 
                        sx={classes.listItemButton}
                        onClick={openTopicList}
                    >
                        <ListItemText primary={topic.title} />
                    </ListItemButton>
                </Grid>
            {
                isOpen &&
                <Grid item>
                    <NavTopicQuizzesGrid 
                        quizzes={topic.quizzes} 
                        onItemSelected={onItemSelected}
                    />
                </Grid>
            }
            </Grid>
        </ListItem>
    );
}