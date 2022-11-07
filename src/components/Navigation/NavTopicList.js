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

export default function NavTopicList({topic, onItemSelected}){
    const [isOpen, setIsOpen] = React.useState(false);

    function toggleIsOpen(){
        setIsOpen((oldIsOpen) => {
            return !oldIsOpen;
        });
    }

    function openTopicList(){
        // later this might be a filter where it looks for the matching topicId
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