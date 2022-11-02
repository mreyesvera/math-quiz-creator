import {
    Box, 
    //List,
    ListItem,
    ListItemButton,
    ListItemText,
    Grid,
    Button,
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { quizzes, questions } from '../sample_data';
import mathQuizCreatorAPI from '../config/mathQuizCreatorAPI.json';
import appConfig from '../config/appConfig.json';
import CreatorContentTable from './CreatorContentTable';
import CreatorContentGrid from './CreatorContentGrid';
import DataGridCellClickable from './DataGridCellClickable';
import CreatorGridHomeActions from './CreatorGridHomeActions';

const classes = {
    listItemButton: {
        //textAlign: 'center'
        background: '#5c3189',
        color: 'white',
        my: 1,
        '&:hover': {
            color: '#5c3189',
        },
        borderRadius: '4px',
    },
};

// const quizzesHeaders = ["Title", "Public", "UM", "Last Modified", "Actions"];
// const quizzesProperties = ["title", "isPublic", "hasUnlimitedMode", "lastModifiedTime"];
// const questionsHeaders = ["Title", "Assigned Quizzes", "Last Modified", "Actions"];
// const questionsProperties = ["title", "quizQuestions.title", "lastModifiedTime"];

const quizzesColumns = [
    {
        field: 'title',
        headerName: 'Title',
        flex: 2,
        renderCell: (cellValues) => {
            return <DataGridCellClickable 
                        text={cellValues.row.title}
                        navigateUrl={`/quiz/${cellValues.row.quizId}/details`}
                    />;
        }
    },
    {
        field: 'isPublic',
        headerName:'Public',
        flex: 1,
    },
    {
        field: 'hasUnlimitedMode',
        headerName: 'UM',
        flex: 1,
    },
    {
        field: 'lastModifiedTime',
        headerName: 'Last Modified',
        flex: 2,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 3,
        sortable: false,
        renderCell: (params) => {
            return <CreatorGridHomeActions params={params} type="quiz" />;
        }

    }
];

const questionsColumns = [
    {
        field: 'title',
        headerName: 'Title',
        flex: 2,
    }, 
    {
        field: 'assignedQuizzes',
        headerName: 'Assigned Quizzes',
        flex: 2,
    },
    {
        field: 'lastModifiedTime',
        headerName: 'Last Modified',
        flex: 2,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 3,
        sortable: false,
        renderCell: (params) => {
            return <CreatorGridHomeActions params={params} type="question" />;
        }

    }
];

function getQuizRowId(row){
    return row.quizId;
}

function getQuestionRowId(row){
    return row.questionId;
}

function onClickQuizCell(row){
    console.log(row);
}

function onClickQuestionCell(row){
    console.log(row);
}

export default function CreatorHomeTopic({topic, setResetTopic}){
    //console.log(topic);
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();
    //const topicQuizzes = React.useRef(quizzes[props.topic.topicId]);
    //const topicQuestions = React.useRef(questions[props.topic.topicId]);

    const quizzesTitleActions = [{
        title: 'CREATE NEW',
        onClick: () => {
            navigate(`/quiz/${topic.topicId}/add`)
        }
    }];
    const questionsTitleActions = [{
        title: 'CREATE NEW',
        onClick: () => {
            navigate(`/question/${topic.topicId}/add`)
        }
    }];

    function toggleIsOpen(){
        setIsOpen((oldIsOpen) => {
            return !oldIsOpen;
        });
        console.log(isOpen);
    }

    function openTopicList(){
        // later this might be a filter where it looks for the matching topicId
        //console.log(topicQuizzes.current);
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
                    <CreatorContentGrid 
                        title="Quizzes" 
                        columns={quizzesColumns}
                        data={topic.quizzes}
                        getRowId={getQuizRowId}
                        titleSectionActions={quizzesTitleActions}
                        titleBackgroundColor='#70a489'
                        onClickCell={() => console.log("clicked")}
                        toolbar={true}
                    />
                    <CreatorContentGrid 
                        title="Questions" 
                        columns={questionsColumns}
                        data={topic.questions}
                        getRowId={getQuestionRowId}
                        titleSectionActions={questionsTitleActions}
                        titleBackgroundColor='#1e839c'
                        onClickCell={onClickQuestionCell}
                        toolbar={true}
                    />
                </Grid>
            }
            </Grid>
        </ListItem>
    );
}
