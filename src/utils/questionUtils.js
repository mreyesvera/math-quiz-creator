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
    

    let order = 1;
    let proceed = true;

    while(proceed){
        let paramDataRow = {};

        for(let i=0; i<paramsColumns.length; i++){
            let paramColumn = paramsColumns[i].name;

            let foundParam = parameters.find(param => param.order === order && param.name === paramColumn)

            paramDataRow.order = order;
            if(foundParam){
                paramDataRow[paramColumn] = foundParam.value;
                paramDataRow[paramColumn + "_" + order + "_id"] = foundParam.parameterId
            } else {
                proceed = false;
            }
        }

        if(proceed){
            paramData.push(paramDataRow);
            order++;
        }
    }

    return paramData;
}

export {
    formatParamsColumns,
    formatParamsData
};