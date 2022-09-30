import {
    //Box, 
    //List,
    ListItem,
    ListItemButton,
    ListItemText,
    Grid,
} from '@mui/material';
import * as React from 'react';
import { quizzes } from '../sample_data';
import CreatorContentTable from './CreatorContentTable';

const classes = {
    listItemButton: {
        //textAlign: 'center'
        background: '#5c3189',
        color: 'white',
        my: 1,
        '&:hover': {
            color: '#5c3189',
        }
    },
};

const quizzesHeaders = ["Title", "Public", "UM", "Last Modified", "Actions"];
const questionsHeaders = ["Title", "Assigned Quizzes", "Last Modified", "Actions"];

export default function CreatorHomeTopic(props){
    const [isOpen, setIsOpen] = React.useState(false);
    const topicQuizzes = React.useRef(quizzes[props.topic.topicId]);

    function toggleIsOpen(){
        setIsOpen((oldIsOpen) => {
            return !oldIsOpen;
        });
        console.log(isOpen);
    }

    function openTopicList(){
        // later this might be a filter where it looks for the matching topicId
        console.log(topicQuizzes.current);
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
                        <ListItemText primary={props.topic.title} />
                    </ListItemButton>
                </Grid>
            {
                isOpen &&
                <Grid item>
                    {/* <List>
                        {
                            topicQuizzes.current.map(
                                (quiz) => (
                                    <ListItem key={quiz.quizzId}>
                                        <ListItemButton>
                                            <ListItemText primary={quiz.title}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            )
                        }
                    </List> */}
                    <CreatorContentTable title="Quizzes" headers={quizzesHeaders} content={topicQuizzes.current}/>
                    <CreatorContentTable title="Questions" headers={questionsHeaders} content={[]}/>
                </Grid>
            }
            </Grid>
        </ListItem>
    );
}
