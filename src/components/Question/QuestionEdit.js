import {
    Box,
    FormControl,
    TextField,
    Button,
    FormLabel,
    TextareaAutosize,
    Grid,
} from '@mui/material';
import * as React from 'react';
import QuestionFeaturesDrawer from './QuestionFeaturesDrawer';

const classes = { 
    topRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkboxContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    descriptionTextareaContainer: {
        width: 1,
        marginTop: 1,
    },
    descriptionTextareaLabel: {
        py: 1,
    },
    descriptionTextarea: {
        minWidth: 1,
        maxWidth: 1,
        width: 1,
    },
    questionsGridContainer: {
        marginTop: 4,
    },
    saveChangesContainer: {
        my: 1,
        textAlign: 'right',
    },
    titleActionButton: {
        marginLeft: 2,
    },
    featureButton: {
        my: 2,
        marginRight: 2,
    },
    rowWithMarginTop: {
        marginTop: 2,
    },
    fullWidth: {
        width: 1,
    },
    previewButton: {
        my: 2,
        py: 1,
    },
};

export default function QuestionEdit(){
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={classes.saveChangesContainer}>
                    <Button
                        variant="contained"
                        sx={classes.titleActionButton}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={classes.titleActionButton}
                    >
                        Save Changes
                    </Button>
                </Box>
                <Box sx={classes.topRow}>
                    <FormControl>
                        <TextField
                            label="Question Name"
                            //value={quiz.title}
                        />
                    </FormControl>
                </Box>
                <FormControl sx={classes.descriptionTextareaContainer}>
                    <FormLabel sx={classes.descriptionTextareaLabel}>
                        Question Description
                    </FormLabel>
                    <TextareaAutosize 
                        minRows={10}
                        sx={classes.descriptionTextarea}
                        //value={quiz.description}
                    />
                </FormControl>
                <Box>
                    <Box>

                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            sx={classes.featureButton}
                        >
                            Visualizations
                        </Button>
                        <Button
                            variant="contained"
                            sx={classes.featureButton}
                        >
                            Parametrizations
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={classes.rowWithMarginTop}
                >
                    <FormControl
                        sx={classes.fullWidth}
                    >
                        <TextField
                            label="Answer"
                            sx={classes.fullWidth}
                            //value={quiz.title}
                        />
                    </FormControl>
                </Box>
                <Box
                    sx={classes.rowWithMarginTop}
                >
                    <Button
                        variant="contained"
                        sx={{...classes.fullWidth,...classes.previewButton}}
                    >
                        Preview
                    </Button>
                </Box>
            </Box>
            <QuestionFeaturesDrawer />
        </Box>
    );
}