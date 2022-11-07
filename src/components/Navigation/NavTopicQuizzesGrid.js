import {
    Box, 
} from '@mui/material';
import * as React from 'react';
import DataGridCellClickable from '../Home/DataGridCellClickable';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const classes = {
    grid: {
        height: '300px',
        backgroundColor: 'rgba(0, 0, 0, 50%)',
        "svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeSmall.css-ptiqhd-MuiSvgIcon-root":{
            color: 'white',
        },
        ".MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.MuiTablePagination-toolbar.css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
            color: 'white',
        },
        "button.MuiButtonBase-root.Mui-disabled.MuiIconButton-root.Mui-disabled.MuiIconButton-colorInherit.MuiIconButton-sizeMedium.css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
            color: 'white',
        },
        ".css-3be3ve-MuiFormControl-root-MuiTextField-root-MuiDataGrid-toolbarQuickFilter input": {
            color: 'white',
        },
        "svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.MuiSelect-icon.MuiTablePagination-selectIcon.MuiSelect-iconStandard.css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
            color: 'white',
        },
        "&.MuiDataGrid-root": {
            border: 'none',
        },
    }
}

const createColumns = (onItemSelected) => [
    {
        field: 'title',
        headerName: 'Title',
        flex: 2,
        renderCell: (cellValues) => {
            return <DataGridCellClickable 
                        text={cellValues.row.title}
                        navigateUrl={`/quiz/${cellValues.row.quizId}/details`}
                        afterNavigate={onItemSelected}
                    />;
        }
    }
];

function getQuizRowId(row){
    return row.quizId;
}

export default function NavTopicQuizzesGrid({quizzes, onItemSelected}){
    const columns = React.useRef(createColumns(onItemSelected));

    return (
        <Box>
            <DataGrid 
                sx={classes.grid}
                rows={quizzes}
                columns={columns.current}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                disableSelectionOnClick
                components={{ Toolbar: GridToolbar}}
                componentsProps = {{
                    toolbar: {
                        csvOptions: { disableToolbarButton: true },
                        printOptions: { disableToolbarButton: true },
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
                getRowId={getQuizRowId}
                headerHeight={0}
                mode= 'dark'
            />
        </Box>
    );
}