import {
    Box,
    FormControl,
    TextField,
    FormLabel,
    TextareaAutosize,
    Button,
} from '@mui/material';
import * as React from 'react';
import Errors from '../Shared/Errors';
import QuestionFeaturesDrawer from './QuestionFeaturesDrawer';
import { useNavigate } from "react-router-dom";
import { formatParamsColumns, formatParamsData } from '../../utils/questionUtils';

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

export default function QuestionForm({question, onSubmit}){
    const [open, setOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState("Parametrization");

    const openParametrization = () => {
        setSelectedItem("Parametrization");
        setOpen(true);
    }

    const openVisualizations = () => {
        setSelectedItem("Visualization");
        setOpen(true);
    }

    const navigate = useNavigate();
    const [errors, setErrors] = React.useState([]);
    const [save, setSave] = React.useState(false);
    const [disableSave, setDisableSave] = React.useState(true);

    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        answer: "",
    });
    const [paramsColumns, setParamsColumns] = React.useState();
    const [paramsData, setParamsData] = React.useState();

    const navigateBack = (e) => {
        navigate(-1);
    }

    function handleChange(event){
        console.log("changed");
        const {name, value, type, checked} = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    React.useEffect(() => {
        function validateValues(){
            let errors = [];

            if(!formData.title || formData.title.length > 20){
                errors.push("Title is invalid. It should contain a value between 1 and 20 characters.");
            }
            if(!formData.description){
                errors.push("Description is invalid. It can't be empty.")
            }
            if(!formData.answer){
                errors.push("Answer is invalid. It can't be empty.")
            }

            // add validation for questions

            return errors;
        }

        if(save){
            setSave(false);
            let errors = validateValues()

            if(errors.length === 0){
                setErrors([]);
                onSubmit(question, formData, setErrors);
            } else {
                setErrors(errors);
            }
        }
    }, [save, formData, question, onSubmit]);

    React.useEffect(()=> {
        let changes = formData.title === question.title &&
                        formData.description === question.description &&
                        formData.answer === question.answer;

        setDisableSave(changes);
    }, [formData, question]);

    function handleSubmit(event){
        setSave(true);
    }

    React.useEffect(() => {
        setFormData({
            title: question.title,
            description: question.description,
            answer: question.answer
        });

        let paramsColumns = undefined;
        let paramsData = undefined;
        if(question.parameters){
            paramsColumns = formatParamsColumns(question.parameters);
            paramsData = formatParamsData(question.parameters, paramsColumns);
        }

        setParamsColumns(paramsColumns);
        setParamsData(paramsData);
    }, [question]);


    console.log(paramsColumns);
    console.log(paramsData);
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={classes.saveChangesContainer}>
                    <Button
                        variant="contained"
                        sx={classes.titleActionButton}
                        onClick={navigateBack}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={classes.titleActionButton}
                        onClick={handleSubmit}
                        disabled={disableSave}
                    >
                        Save Changes
                    </Button>
                </Box>
                {
                    (errors && errors.length) ?
                    <Errors errors={errors} />
                    :
                    ""
                }
                <Box sx={classes.topRow}>
                    <FormControl>
                        <TextField
                            label="Question Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
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
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </FormControl>
                <Box>
                    <Box>

                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            sx={classes.featureButton}
                            onClick={openVisualizations}
                        >
                            Visualizations
                        </Button>
                        <Button
                            variant="contained"
                            sx={classes.featureButton}
                            onClick={openParametrization}
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
                            name="answer"
                            value={formData.answer}
                            onChange={handleChange}
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
            <QuestionFeaturesDrawer 
                open={open}
                setOpen={setOpen}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                openParametrization={openParametrization}
                openVisualizations={openVisualizations}
                paramsColumns={paramsColumns}
                paramsData={paramsData}
            />
        </Box>
    );
}