import {
    Box,
    List,
} from '@mui/material';
import * as React from 'react';
import CreatorHomeTopic from './CreatorHomeTopic'
import { topics } from '../sample_data';

const classes = {
    subtitle: {
        fontWeight: 300,
    }
};

export default function CreatorHome(){
    return (
        <Box>
            <h2 style={classes.subtitle}>Your Quizzes and Questions</h2>
            <List>
            {
                topics.map((topic) => (
                    <CreatorHomeTopic key={topic.topicId} topic={topic}/>
                ))
            }
            </List>
        </Box>
    );
}