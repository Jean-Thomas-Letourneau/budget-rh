import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import ComposantDataTable from './ComposantDataTable';
import { apiSlice } from '../api/apiSlice';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Checkbox } from 'primereact/checkbox';

const EmployeeDataTable = ({ idScenario, simulation }) => {
    const [employees, setEmployees] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [editingRows, setEditingRows] = useState(null);

    // Fetch, create, update, and delete hooks
    const { data: allEmployees, isLoading, isError, refetch } = apiSlice.useFetchDataQuery('employes');
    const [createData] = apiSlice.useCreateDataMutation();
    const [updateData] = apiSlice.useUpdateDataMutation();
    const [deleteData] = apiSlice.useDeleteDataMutation();

    useEffect(() => {
        if (allEmployees) {
            // Filter employees by idScenario
            const filteredEmployees = idScenario
                ? allEmployees.filter(employee => employee.idScenario === idScenario)
                : allEmployees;
            setEmployees(filteredEmployees);
        }
    }, [allEmployees, idScenario]);

    const onSelectedChange = async (rowData) => {
        // Update the 'selected' field in the database
        await updateData({
            modelName: 'employes',
            id: rowData.id,
            data: { ...rowData, selected: !rowData.selected }
        }).unwrap();
        refetch();
    };

    const onRowEditComplete = async (e) => {
        const { newData } = e;
        try {
            await updateData({ modelName: 'employes', id: newData.id, data: newData }).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to update employee:', error);
        }
    };

    const showDeleteConfirm = (rowData) => {
        confirmDialog({
            message: 'Do you want to delete this employee?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => onDelete(rowData),
        });
    };

    const onDelete = async (rowData) => {
        try {
            await deleteData({ modelName: 'employes', id: rowData.id }).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to delete employee:', error);
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning p-button-outlined" onClick={() => showDeleteConfirm(rowData)} />
            </React.Fragment>
        );
    };

    const onCreate = async () => {
        try {
            const newEmployee = { idScenario, nom: '', prenom: '', genre: 'Homme' }; // Provide default values
            const result = await createData({ modelName: 'employes', data: newEmployee }).unwrap();
            console.log(result);
            setEditingRows({ ...editingRows, [result.id]: true }); // Set the new row into edit mode
            refetch();
        } catch (error) {
            console.error('Failed to create new employee:', error);
        }
    };

    const selectedBodyTemplate = (rowData) => {
        return (
            <Checkbox checked={rowData.selected} onChange={() => onSelectedChange(rowData)} disabled={!simulation} />
        );
    };

    const footer = (
        <div className="table-footer">
            <Button label="Add New Employee" icon="pi pi-plus" onClick={onCreate} className="p-button-text" style={{ width: '100%' }} />
        </div>
    );

    const textEditor = (options) => (
        <InputText type="text" value={options.rowData[options.field]} autoFocus
            onChange={(e) => options.editorCallback(e.target.value)} />
    );

    const rowExpansionTemplate = (data) => (
        <div className="child-table">
            <ComposantDataTable idEmploye={data.id} simulation={simulation} />
        </div>
    );

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading employees.</p>;

    return (
        <div>
            <ConfirmDialog />
            <DataTable value={employees} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                className="parent-table"
                header={<div className="table-header">Employés</div>}
                rowExpansionTemplate={rowExpansionTemplate} editMode="row" dataKey="id"
                onRowEditComplete={onRowEditComplete}
                editingRows={editingRows} onRowEditChange={(e) => setEditingRows(e.data)}
                footer={footer}>
                {simulation && <Column body={selectedBodyTemplate} style={{ width: '4rem', textAlign: 'center' }} />}
                <Column expander style={{ width: '3em' }} />
                <Column field="nom" header="Nom" editor={textEditor} />
                <Column field="prenom" header="Prénom" editor={textEditor} />
                <Column field="genre" header="Genre" editor={textEditor} />
                <Column rowEditor style={{ width: '5rem', 'textAlign': 'center' }} />
                <Column body={actionBodyTemplate} style={{ width: '4rem', textAlign: 'center' }} />
            </DataTable>
        </div>
    );
};

export default EmployeeDataTable;
