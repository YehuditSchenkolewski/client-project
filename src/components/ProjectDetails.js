import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import * as InfoService from "../services/info.services";
import { useSelector } from "react-redux";
import './ProjectDetails.css';

export default () => {
    const projectList = useSelector((state) => state.project);

    const [rowData, setRowData] = useState();
    const [projectsPercentage, setProjectsPercentage] = useState();
    const [averageScores, setAverageScores] = useState();

    const [column] = useState(
        [
            { field: 'id', filter: true, sortable: true },
            { field: 'name', filter: true, sortable: true },
            { field: 'score', filter: true, sortable: true },
            { field: 'durationInDays', filter: true, sortable: true },
            { field: 'bugsCount', filter: true, sortable: true },
            {
                field: 'madeDeadline', filter: true, sortable: true,
                cellRenderer: (params) => {
                    return params.data.madeDadeline.toString();
                }
            },
        ]);

    useEffect(() => {
        if (!projectList.projectDetails) return;
        const array = Object.values(projectList.projectDetails);
        filterData(array, true);
        setRowData(array);
    }, [projectList]);

    const getRowStyle = (params) => {
        if (params.data.score < 70) {
            return { backgroundColor: 'red' };
        }
        if (params.data.score > 90)
            return { backgroundColor: 'green' };
    };

    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const defaultColDef = {
        filter: true,
        flex: 1
    };

    const filterData = (e, isLoad = false) => {
        let sumDeadlineProjects = 0;
        let sumAllScores = 0;
        let sumAllProjects = 0;
        if (isLoad)
            e.forEach(function (node) {
                if (node.madeDadeline === true)
                    sumDeadlineProjects += 1;
                sumAllScores += node.score;
                sumAllProjects += 1;
            });
        else
            e.api.forEachNodeAfterFilterAndSort(function (node) {
                if (node.data.madeDadeline === true)
                    sumDeadlineProjects += 1;
                sumAllScores += node.data.score;
                sumAllProjects += 1;
            });
        setProjectsPercentage(((sumDeadlineProjects / sumAllProjects) * 100).toString());
        setAverageScores((sumAllScores / sumAllProjects).toString());
    }

    return (
        <div>
            <div className="card card-text bg-warning col-5">
                Deadline projects percentage - {projectsPercentage}%
            </div>
            <div className="card card-text bg-warning col-5">
                Average project scores - {averageScores}
            </div>
            <div className="ag-theme-alpine">
                <div style={gridStyle} className="ag-theme-balham">
                    <AgGridReact
                        rowHeight={50}
                        rowData={rowData}
                        columnDefs={column}
                        enableFilter={true}
                        getRowStyle={getRowStyle}
                        defaultColDef={defaultColDef}
                        onFilterChanged={filterData}
                    />
                </div>
            </div>
        </div>
    );
}