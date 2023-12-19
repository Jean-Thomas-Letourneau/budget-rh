import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { confirmDialog } from 'primereact/confirmdialog';
import DeductionDataTable from './DeductionDataTable';
import { apiSlice } from '../api/apiSlice';
import { Checkbox } from 'primereact/checkbox';

const FondsDebitDataTable = ({ idComposant, simulation }) => {
    const [fondsDebits, setFondsDebits] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [editingRows, setEditingRows] = useState({});

    const { data: allFondsDebits, isLoading, isError, refetch } = apiSlice.useFetchDataQuery('fondsDebits');
    const [createData] = apiSlice.useCreateDataMutation();
    const [updateData] = apiSlice.useUpdateDataMutation();
    const [deleteData] = apiSlice.useDeleteDataMutation();

    useEffect(() => {
        if (allFondsDebits) {
            const filteredFondsDebits = idComposant
                ? allFondsDebits.filter(fondsDebit => fondsDebit.idComposant === idComposant)
                : allFondsDebits;
            setFondsDebits(filteredFondsDebits);
        }
    }, [allFondsDebits, idComposant]);

    const onSelectedChange = async (rowData) => {
        await updateData({
            modelName: 'fondsDebits',
            id: rowData.id,
            data: { ...rowData, selected: !rowData.selected }
        }).unwrap();
        refetch();
    };

    const onRowEditComplete = async (e) => {
        const { newData } = e;
        try {
            await updateData({ modelName: 'fondsDebits', id: newData.id, data: newData }).unwrap();
            refetch();
            // Remove the row from editing mode after update
            const updatedEditingRows = { ...editingRows };
            delete updatedEditingRows[newData.id];
            setEditingRows(updatedEditingRows);
        } catch (error) {
            console.error('Failed to update fondsDebit:', error);
        }
    };

    const showDeleteConfirm = (rowData) => {
        confirmDialog({
            message: 'Do you want to delete this fondsDebit?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => onDelete(rowData),
        });
    };

    const onDelete = async (rowData) => {
        try {
            await deleteData({ modelName: 'fondsDebits', id: rowData.id }).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to delete fondsDebit:', error);
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning p-button-outlined" onClick={() => showDeleteConfirm(rowData)} />
        );
    };

    const onCreate = async () => {
        try {
            const newFondsDebit = { idComposant: idComposant, pourcentage: 0, montant: 0 }; // Provide default values
            const result = await createData({ modelName: 'fondsDebits', data: newFondsDebit }).unwrap();
            refetch();
            // Enter the new row into edit mode
            setEditingRows({ ...editingRows, [result.id]: true });
        } catch (error) {
            console.error('Failed to create new fondsDebit:', error);
        }
    };

    const textEditor = (options) => (
        <InputText type="text" value={options.rowData[options.field]} autoFocus
            onChange={(e) => options.editorCallback(e.target.value)} />
    );

    const rowExpansionTemplate = (data) => (
        <div className="child-table">
            <DeductionDataTable idFondsDebit={data.id} simulation={simulation} />
        </div>
    );

    const header = (
        <div className="table-header">
            <h2>Fonds Debits</h2>
        </div>
    );

    const footer = (
        <Button label="Add New Fonds Debit" icon="pi pi-plus" onClick={onCreate} className="p-button-text p-button-plain" style={{ width: '100%' }} />
    );

    const selectedBodyTemplate = (rowData) => {
        return (
            <Checkbox checked={rowData.selected} onChange={() => onSelectedChange(rowData)} disabled={!simulation} />
        );
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading fondsDebits.</p>;

    return (
        <div>
            <DataTable value={fondsDebits} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                className="child-table"
                editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete}
                editingRows={editingRows} onRowEditChange={(e) => setEditingRows(e.data)}
                header={header} footer={footer} rowExpansionTemplate={rowExpansionTemplate}>
                {simulation && <Column body={selectedBodyTemplate} style={{ width: '4rem', textAlign: 'center' }} />}
                <Column expander style={{ width: '3em' }} />
                <Column field="pourcentage" header="Pourcentage" editor={textEditor} />
                <Column field="montant" header="Montant" editor={textEditor} />
                <Column rowEditor style={{ width: '4rem', textAlign: 'center' }} />
                <Column body={actionBodyTemplate} style={{ width: '4rem', textAlign: 'center' }} />
            </DataTable>
        </div>
    );
};

export default FondsDebitDataTable;
