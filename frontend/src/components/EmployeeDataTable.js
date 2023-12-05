import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import ComposantDataTable from './ComposantDataTable';
import { useUpdateDataMutation } from '../api/apiSlice';
import { useFetchDataQuery } from '../api/apiSlice';

const EmployeeDataTable = ({ employees }) => {
    const [expandedRows, setExpandedRows] = useState(null);
    const [updateData] = useUpdateDataMutation();
    const { refetch } = useFetchDataQuery('employes');

    const onRowEditComplete = async (e) => {
        const { newData } = e;
        try {
            // .unwrap() is used to ensure you get the returned payload or throw an error if the mutation failed
            await updateData({ modelName: 'employes', id: newData.id, data: newData }).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to update employee:', error);
            // Handle error appropriately
        }
    };

    const textEditor = (options) => (
        <InputText type="text" value={options.rowData[options.field]}
            onChange={(e) => options.editorCallback(e.target.value)} />
    );

    const rowExpansionTemplate = (data) => <ComposantDataTable composants={data.composants} />;

    return (
        <div>
            <h2>Employés</h2>
            <DataTable value={employees} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate} editMode="row" dataKey="id"
                onRowEditComplete={onRowEditComplete}>
                <Column expander style={{ width: '3em' }} />
                <Column field="nom" header="Nom" editor={textEditor} />
                <Column field="prenom" header="Prénom" editor={textEditor} />
                <Column field="genre" header="Genre" editor={textEditor} />
                <Column rowEditor />
            </DataTable>
        </div>

    );
};

export default EmployeeDataTable;
