import {
    ListItem,
    ListItemButton,
    ListItemText,
    Grid,
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import CreatorContentGrid from './CreatorContentGrid';
import DataGridCellClickable from './DataGridCellClickable';
import CreatorGridHomeActions from './CreatorGridHomeActions';
import AssignedQuizzesCell from '../Question/AssignedQuizzesCell';
import { ELEMENT } from '../../utils/models';

const classes = {
    listItemButton: {
        background: '#5c3189',
        color: 'white',
        my: 1,
        '&:hover': {
            color: '#5c3189',
        },
        borderRadius: '4px',
    },
};

const createQuizzesColumns = (openPreview, setResetTopics) => [
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
        type: 'date',
        valueGetter: ({value}) => value && new Date(value + "T00:00:00"),
        flex: 2,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 3,
        sortable: false,
        renderCell: (params) => {
            return <CreatorGridHomeActions 
                        params={params} 
                        type={ELEMENT.QUIZ} 
                        openPreview={openPreview}
                        setResetTopics={setResetTopics}
                    />;
        }

    }
];

const createQuestionsColumns = (openPreview, setResetTopics) => [
    {
        field: 'title',
        headerName: 'Title',
        flex: 2,
    }, 
    {
        field: 'assignedQuizzes',
        headerName: 'Assigned Quizzes',
        flex: 2,
        renderCell: (cellValues) => {
            return <AssignedQuizzesCell assignedQuizzes={cellValues.row.assignedQuizzes}/>
        }
    },
    {
        field: 'lastModifiedTime',
        headerName: 'Last Modified',
        type: 'date',
        valueGetter: ({value}) => value && new Date(value + "T00:00:00"),
        flex: 2,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 3,
        sortable: false,
        renderCell: (params) => {
            return <CreatorGridHomeActions 
                        params={params} 
                        type={ELEMENT.QUESTION} 
                        openPreview={openPreview}
                        setResetTopics={setResetTopics}
                    />;
        }

    }
];

function getQuizRowId(row){
    return row.quizId;
}

function getQuestionRowId(row){
    return row.questionId;
}

export default function CreatorHomeTopic({topic, setResetTopics, openPreview}){
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();

    const quizzesColumns = createQuizzesColumns(openPreview, setResetTopics);
    const questionsColumns = createQuestionsColumns(openPreview, setResetTopics);

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
                        toolbar={true}
                    />
                    <CreatorContentGrid 
                        title="Questions" 
                        columns={questionsColumns}
                        data={topic.questions}
                        getRowId={getQuestionRowId}
                        titleSectionActions={questionsTitleActions}
                        titleBackgroundColor='#1e839c'
                        toolbar={true}
                    />
                </Grid>
            }
            </Grid>
        </ListItem>
    );
}
