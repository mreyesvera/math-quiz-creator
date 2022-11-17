import {
    Box,
    FormControl,
    TextField,
    Button,
    Divider,
    FormLabel,
    TextareaAutosize,
    Grid,
    autocompleteClasses,
} from '@mui/material';
import * as React from 'react';
import ParamDataControl from './ParamDataControl';

const classes = {  
    root: {
        width: 1,
    },
    content: {
        width: 9/10,
        margin: '0 auto',
        marginRight: 4,
    },
    topRow: {
        marginBottom: 4,
        display: 'flex',
        justifyContent: 'space-between',
    },
    paramFieldControl: {
        width: '100%',
        marginRight: 2,
    },
    paramDataControlContainer: {
        width: 1,
    }
};

export default function QuestionParametrization({paramsColumns, paramsData, setParamsColumns, setParamsData, parameters, setParameters}){
    const [paramInput, setParamInput] = React.useState({
        value: "",
        error: false,
        helperText: "",
    });
    const [paramDataGridActionsDisabled, setParamDataGridActionsDisabled] = React.useState(false);

    React.useEffect(() => {
        if(paramsColumns && paramsColumns.length > 0){
            setParamDataGridActionsDisabled(false);
        } else {
            setParamDataGridActionsDisabled(true);
            setParamsData([]);
        }
    }, [paramsColumns, setParamsData]);

    function onChangeParam(event){
        setParamInput(oldParamInput => ({
            ...oldParamInput,
            value: event.target.value
        }))
    }

    function onAddParam(){
        if(paramInput.value && paramInput.value.length > 0 ){
            let foundParam = paramsColumns.find(paramColumn => {
                return paramColumn.name === paramInput.value
            });

            if(!foundParam){
                let paramsToAdd = [];
                for(let i=0; i<paramsData.length; i++){
                    let param = paramsData[i];

                    paramsToAdd.push({
                        name: paramInput.value,
                        order: param.order,
                        value: ""
                    });
                }

                setParameters(oldParameters => {
                    return oldParameters.concat(paramsToAdd);
                });

                setParamsColumns(oldParamsColumns => {
                    var newParamsColumns = oldParamsColumns.slice();

                    newParamsColumns.push({
                        name: paramInput.value,
                        field: paramInput.value,
                        headerName: paramInput.value,
                        flex: 1,
                        editable: true,
                        sortable: false,
                    })

                    return newParamsColumns;
                });

                setParamsData(oldParamsData => {
                    return oldParamsData.map(param => ({
                        ...param,
                        [paramInput.value]: "",
                        [paramInput.value + "_" + param.order + "_id"]: undefined
                    }));
                });

                setParamInput({
                    value: "",
                    error: false,
                    helperText: "",
                });
            } else {
                setParamInput(oldParamInput => ({
                    ...oldParamInput,
                    error: true,
                    helperText: "Param already exists",
                }));
            }
        } else {
            setParamInput(oldParamInput => ({
                ...oldParamInput,
                error: true,
                helperText: "Invalid Param",
            }));
        }
    }

    function onDeleteParam(){
        if(paramInput.value && paramInput.value.length > 0 ){
            let foundParam = paramsColumns.find(paramColumn => {
                return paramColumn.name === paramInput.value
            });

            if(foundParam){
                setParameters(oldParameters => {
                    return oldParameters.filter(param => {
                        return param.name !== paramInput.value;
                    })
                });

                setParamsColumns(oldParamsColumns => {
                    return oldParamsColumns.filter(paramColumn => {
                        return paramColumn.name !== paramInput.value
                    });
                });

                setParamsData(oldParamsData => {
                    return oldParamsData.map(param => ({
                        ...param,
                        [paramInput.value]: undefined,
                        [paramInput.value + "_" + param.order + "_id"]: undefined
                    }));
                });
    
                setParamInput({
                    value: "",
                    error: false,
                    helperText: "",
                });

            } else {
                setParamInput(oldParamInput => ({
                    ...oldParamInput,
                    error: true,
                    helperText: "Not Found",
                }));
            }
                
        } else {
            setParamInput(oldParamInput => ({
                ...oldParamInput,
                error: true,
                helperText: "Not Found",
            }));
        }
    }

    function onAddRow(){
        let maxOrder = 0;

        for(let i=0; i<paramsData.length; i++){
            if(paramsData[i].order > maxOrder){
                maxOrder = paramsData[i].order
            }
        }

        let paramsToAdd = [];
        for(let i=0; i<paramsColumns.length; i++){
            let paramColumn = paramsColumns[i];

            paramsToAdd.push({
                name: paramColumn.name,
                order: maxOrder + 1,
                value: ""
            });
        }

        setParameters(oldParameters => {
            return oldParameters.concat(paramsToAdd);
        });

        setParamsData(oldParamsData => {
            let newParamsData = oldParamsData.slice();

            let newParam = {
                order: maxOrder + 1
            }

            for(let i=0; i<paramsColumns.length; i++){
                let paramColumn = paramsColumns[i];

                newParam = {
                    ...newParam,
                    [paramColumn.name]: "",
                    [paramColumn.name + "_" + newParam.order + "_id"]: undefined
                }
            }

            newParamsData.push(newParam);

            return newParamsData;
        });
    }

    function onDeleteRow(){
        if(paramsData && paramsData.length > 0){
            let maxOrder = 0;

            for(let i=0; i<paramsData.length; i++){
                if(paramsData[i].order > maxOrder){
                    maxOrder = paramsData[i].order
                }
            }

            setParameters(oldParameters => {
                return oldParameters.filter(param => {
                    return param.order !== maxOrder;
                })
            });

            setParamsData(oldParamsData => {
                return oldParamsData.slice(0, -1);
            });
        }
    }

    function onCellEdit(cellData){
        const { id, field, value } = cellData;

        setParamsData(oldParamsData => {
            return oldParamsData.map(param => {
                if(param.order === id){
                    return {
                        ...param,
                        [field]: value
                    };
                } else {
                    return param;
                }
            });
        });

        setParameters(oldParameters => {
            return oldParameters.map(param => {
                if(param.order === id && param.name === field){
                    return {
                        ...param,
                        value: value
                    };
                } else {
                    return param;
                }
            })
        })
    }

    return (
        <Box
            sx={classes.root}
        >
            <h3>
                Parameters
            </h3>
            <Box
                sx={classes.content}
            >
                <Box
                    sx={classes.topRow}
                >
                    <FormControl
                        sx={classes.paramFieldControl}
                    >
                        <TextField
                            label="Param Name"
                            value={paramInput.value}
                            error={paramInput.error}
                            helperText={paramInput.helperText}
                            onChange={onChangeParam}
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        onClick={onAddParam}
                    >
                        Add
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ml:1}}
                        onClick={onDeleteParam}
                    >
                        Delete
                    </Button>
                </Box>
                <Divider />
                <Box
                    sx={classes.paramDataControlContainer}
                >
                    {
                        paramsColumns && paramsData &&
                        <ParamDataControl 
                            paramsColumns={paramsColumns}
                            paramsData={paramsData}
                            onAddRow={onAddRow}
                            onDeleteRow={onDeleteRow}
                            onCellEdit={onCellEdit}
                            disableButtons={paramDataGridActionsDisabled}
                        />
                    }
                </Box>
            </Box>
        </Box>
    );
}