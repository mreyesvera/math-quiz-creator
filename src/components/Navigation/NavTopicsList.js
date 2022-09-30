import {
    //Box, 
    List,
    // ListItem,
    // ListItemButton,
    // ListItemText,
} from '@mui/material';
import * as React from 'react';
import NavTopicList from './NavTopicList';
import { topics } from '../sample_data';

export default function NavTopicsList(props){
    //const [listIsOpen, setListIsOpen] = React.useState(false);
    //const [openTopic, setOpenTopic] = React.useState();
    
    return (
        <List>
            {
                topics.map((topic) => (
                    <NavTopicList key={topic.topicId} topic={topic}/>
                ))
            }
        </List>
    );
}