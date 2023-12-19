import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { confirmDialog } from 'primereact/confirmdialog';
import { apiSlice } from '../api/apiSlice';
import { Checkbox } from 'primereact/checkbox';

const DeductionDataTable = ({ idFondsDebit, simulation }) => {
    const [deductions, setDeductions] = useState([]);
    const [editingRows, setEditingRows] = useState({});

    const { data: allDeductions, isLoading, isError, refetch } = apiSlice.useFetchDataQuery('deductions');
    const [createData] = apiSlice.useCreateDataMutation();
    const [updateData] = apiSlice.useUpdateDataMutation();
    const [deleteData] = apiSlice.useDeleteDataMutation();

    useEffect(() => {
        if (allDeductions) {
            const filteredDeductions = idFondsDebit
                ? allDeductions.filter(deduction => deduction.idFondsDebit === idFondsDebit)
                : allDeductions;
            setDeductions(filteredDeductions);
        }
    }, [allDeductions, idFondsDebit]);

    const onSelectedChange = async (rowData) => {
        await updateData({
            modelName: 'deductions',
            id: rowData.id,
            data: { ...rowData, selected: !rowData.selected }
        }).unwrap();
        refetch();
    };

    const onRowEditComplete = async (e) => {
        const { newData } = e;
        try {
            await updateData({ modelName: 'deductions', id: newData.id, data: newData }).unwrap();
            refetch();
            // Remove the row from editing mode after update
            const updatedEditingRows = { ...editingRows };
            delete updatedEditingRows[newData.id];
            setEditingRows(updatedEditingRows);
        } catch (error) {
            console.error('Failed to update deduction:', error);
        }
    };

    const showDeleteConfirm = (rowData) => {
        confirmDialog({
            message: 'Do you want to delete this deduction?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => onDelete(rowData),
        });
    };

    const onDelete = async (rowData) => {
        try {
            await deleteData({ modelName: 'deductions', id: rowData.id }).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to delete deduction:', error);
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning p-button-outlined" onClick={() => showDeleteConfirm(rowData)} />
        );
    };

    const onCreate = async () => {
        try {
            const newDeduction = { idFondsDebit: idFondsDebit, typeDeduction: 'New Deduction', nbSemaines: 0, dateDebut: new Date().toISOString(), dateFin: new Date().toISOString() }; // Provide default values
            const result = await createData({ modelName: 'deductions', data: newDeduction }).unwrap();
            refetch();
            // Enter the new row into edit mode
            setEditingRows({ ...editingRows, [result.id]: true });
        } catch (error) {
            console.error('Failed to create new deduction:', error);
        }
    };

    const textEditor = (options) => (
        <InputText type="text" value={options.rowData[options.field]} autoFocus
            onChange={(e) => options.editorCallback(e.target.value)} />
    );

    const footer = (
        <Button label="Add New Deduction" icon="pi pi-plus" onClick={onCreate} className="p-button-text p-button-plain" style={{ width: '100%' }} />
    );

    const selectedBodyTemplate = (rowData) => {
        return (
            <Checkbox checked={rowData.selected} onChange={() => onSelectedChange(rowData)} disabled={!simulation} />
        );
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading deductions.</p>;

    return (
        <div>
            <DataTable value={deductions} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete}
                editingRows={editingRows} onRowEditChange={(e) => setEditingRows(e.data)}
                footer={footer} className="child-table">
                {simulation && <Column body={selectedBodyTemplate} style={{ width: '4rem', textAlign: 'center' }} />}
                <Column field="typeDeduction" header="Type of Deduction" editor={textEditor} />
                <Column field="nbSemaines" header="Number of Weeks" editor={textEditor} />
                <Column field="dateDebut" header="Start Date" editor={textEditor} />
                <Column field="dateFin" header="End Date" editor={textEditor} />
                <Column rowEditor style={{ width: '4rem', textAlign: 'center' }} />
                <Column body={actionBodyTemplate} style={{ width: '4rem', textAlign: 'center' }} />
            </DataTable>
        </div>
    );
};

export default DeductionDataTable;
