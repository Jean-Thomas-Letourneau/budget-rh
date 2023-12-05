import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import SimulationComposantDataTable from './SimulationComposantDataTable';

const SimulationEmployeeDataTable = ({ employees, onDataChanged }) => {
    const [localEmployees, setLocalEmployees] = useState(employees.map(emp => ({ ...emp, isEnabled: true })));
    const [expandedRows, setExpandedRows] = useState(null);

    const onCheckboxChange = (e, rowData) => {
        const updatedEmployees = localEmployees.map(emp =>
            emp.id === rowData.id ? { ...emp, isEnabled: e.checked } : emp
        );
        setLocalEmployees(updatedEmployees);
    };

    const checkboxBodyTemplate = (rowData) => {
        return (
            <Checkbox
                checked={rowData.isEnabled}
                onChange={(e) => onCheckboxChange(e, rowData)}
            />
        );
    };

    const onRowEditComplete = (e) => {
        const { newData, index } = e;
        let updatedEmployees = [...localEmployees];
        updatedEmployees[index] = newData;
        setLocalEmployees(updatedEmployees);
    };

    const onComposantDataChange = (employeeId, updatedComposants) => {
        const updatedEmployees = localEmployees.map(emp =>
            emp.id === employeeId ? { ...emp, composants: updatedComposants } : emp
        );
        setLocalEmployees(updatedEmployees);
        onDataChanged(updatedEmployees);
    };

    const textEditor = (options) => (
        <InputText type="text" value={options.rowData[options.field]}
            onChange={(e) => options.editorCallback(e.target.value)} />
    );

    const rowExpansionTemplate = (data) => <SimulationComposantDataTable composants={data.composants} onDataChanged={(updatedComposants) => onComposantDataChange(data.id, updatedComposants)} />;

    return (
        <div>
            <h2>Employés</h2>
            <DataTable value={localEmployees} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate} editMode="row" dataKey="id"
                onRowEditComplete={onRowEditComplete}>
                <Column expander style={{ width: '3em' }} />
                <Column field="isEnabled" body={checkboxBodyTemplate} style={{ width: '3em' }} />
                <Column field="nom" header="Nom" editor={textEditor} />
                <Column field="prenom" header="Prénom" editor={textEditor} />
                <Column field="genre" header="Genre" editor={textEditor} />
                <Column field="salaire" header="Salaire" editor={textEditor} />
                <Column rowEditor />
            </DataTable>
        </div>
    );
};

export default SimulationEmployeeDataTable;
