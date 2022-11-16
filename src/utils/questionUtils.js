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

/*let maxOrder = 1;

for(let i=0; i<paramsData.length; i++){
    if(paramsData[i].order > maxOrder){
        maxOrder = paramsData[i].order
    }
}*/

export {
    formatParamsColumns,
    formatParamsData
};