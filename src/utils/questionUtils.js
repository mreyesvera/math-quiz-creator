function formatParamsColumns(parameters){
    let columns = [];
    parameters.forEach(param => {
        if(!columns.find(column => column.name === param.name)){
            columns.push({
                name: param.name,
                field: param.name,
                headerName: param.name,
                flex: 1,
                editable: true,
                sortable: false,
            });
        }
    });

    return columns;
}

function formatParamsData(parameters, paramsColumns){
    let paramData = [];

    let count = 1;
    let proceed = true;

    if(paramsColumns && paramsColumns.length > 0){
        while(proceed){
            let paramDataRow = {};

            for(let i=0; i<paramsColumns.length; i++){
                let paramColumn = paramsColumns[i].name;
                let order = count;

                let foundParam = parameters.find(param => param.order === order 
                    && param.name === paramColumn)

                paramDataRow.order = count;
                if(foundParam){
                    paramDataRow[paramColumn] = foundParam.value;
                    paramDataRow[paramColumn + "_" + order + "_id"] = foundParam.parameterId
                } else {
                    proceed = false;
                }
            }

            if(proceed){
                paramData.push(paramDataRow);
                count++;
            }
        }
    }

    return paramData;
}

function validateParams(parameters){
    let valid = true;
    parameters.forEach(param => {
        if(param.value && param.value.length > 0){

        } else {
            valid = false;
        }
    });

    return valid;
}

function paramsChanged(oldParameters, parameters){
    let changedParams = []

    let deletedParams = oldParameters.filter(oldParam => {
        let param = parameters.filter(param => param.order === oldParam.order && param.name === oldParam.name);

        if(param[0]){
            // could check if modified, but already do it in following concat, so not doing it here to avoid repetition
            return false
        }

        return true;
    });

    let addedOrModifiedParams = parameters.filter(param => {
        let oldParam = oldParameters.filter(oldParam => oldParam.order === param.order && oldParam.name === param.name);

        if(oldParam[0]){
            return oldParam[0].value !== param.value;
        }   

        return true;
    });

    return deletedParams.length > 0 || addedOrModifiedParams.length > 0;
}

function questionModified(oldQuestion, question){
    return oldQuestion.title !== question.title ||
            oldQuestion.description !== question.description ||
            oldQuestion.answer !== question.answer
}

/*let maxOrder = 1;

for(let i=0; i<paramsData.length; i++){
    if(paramsData[i].order > maxOrder){
        maxOrder = paramsData[i].order
    }
}*/

export {
    formatParamsColumns,
    formatParamsData,
    validateParams,
    paramsChanged,
    questionModified
};