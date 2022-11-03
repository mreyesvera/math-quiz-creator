import {
    //Box, 
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Grid,
} from '@mui/material';
import { quizzes } from '../sample_data';
import NavTopicQuizzesGrid from './NavTopicQuizzesGrid';
import * as React from 'react';

const classes = {
    listItemButton: {
        textAlign: 'center'
    },
};

export default function NavTopicList({topic, onItemSelected}){
    //console.log(topic);
    const [isOpen, setIsOpen] = React.useState(false);

    function toggleIsOpen(){
        setIsOpen((oldIsOpen) => {
            return !oldIsOpen;
        });
        //console.log(isOpen);
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
                    {/* <List>
                        {
                            topicQuizzes.current.map(
                                (quiz) => (
                                    <ListItem key={quiz.quizId}>
                                        <ListItemButton>
                                            <ListItemText primary={quiz.title}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            )
                        }
                    </List> */}
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