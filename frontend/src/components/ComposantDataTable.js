import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { confirmDialog } from 'primereact/confirmdialog';
import FondsDebitDataTable from './FondsDebitDataTable';
import { apiSlice } from '../api/apiSlice';
import { Checkbox } from 'primereact/checkbox';

const ComposantDataTable = ({ idEmploye, simulation }) => {
    const [composants, setComposants] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [editingRows, setEditingRows] = useState({});

    const { data: allComposants, isLoading, isError, refetch } = apiSlice.useFetchDataQuery('composants');
    const [createData] = apiSlice.useCreateDataMutation();
    const [updateData] = apiSlice.useUpdateDataMutation();
    const [deleteData] = apiSlice.useDeleteDataMutation();

    useEffect(() => {
        if (allComposants) {
            const filteredComposants = idEmploye
                ? allComposants.filter(composant => composant.idEmploye === idEmploye)
                : allComposants;
            setComposants(filteredComposants);
        }
    }, [allComposants, idEmploye]);

    const onSelectedChange = async (rowData) => {
        await updateData({
            modelName: 'composants',
            id: rowData.id,
            data: { ...rowData, selected: !rowData.selected }
        }).unwrap();
        refetch();
    };

    const onRowEditComplete = async (e) => {
        const { newData, originalEvent } = e;
        try {
            await updateData({ modelName: 'composants', id: newData.id, data: newData }).unwrap();
            refetch();
            // Remove the row from editing mode after update
            const updatedEditingRows = { ...editingRows };
            delete updatedEditingRows[newData.id];
            setEditingRows(updatedEditingRows);
        } catch (error) {
            console.error('Failed to update composant:', error);
        }
    };

    const showDeleteConfirm = (rowData) => {
        confirmDialog({
            message: 'Do you want to delete this composant?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => onDelete(rowData),
        });
    };

    const onDelete = async (rowData) => {
        try {
            await deleteData({ modelName: 'composants', id: rowData.id }).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to delete composant:', error);
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning p-button-outlined" onClick={() => showDeleteConfirm(rowData)} />
        );
    };

    const onCreate = async () => {
        try {
            const newComposant = { idEmploye: idEmploye, titre: 'New Composant', dateDebut: new Date().toISOString(), dateFin: new Date().toISOString(), groupe: '', niveau: 1, echelon: '', bilingue: false, salaire: 0 }; // Provide default values
            const result = await createData({ modelName: 'composants', data: newComposant }).unwrap();
            refetch();
            // Enter the new row into edit mode
            setEditingRows({ ...editingRows, [result.id]: true });
        } catch (error) {
            console.error('Failed to create new composant:', error);
        }
    };

    const textEditor = (options) => (
        <InputText type="text" value={options.rowData[options.field]} autoFocus
            onChange={(e) => options.editorCallback(e.target.value)} />
    );

    const rowExpansionTemplate = (data) => (
        <div className="child-table">
            <FondsDebitDataTable idComposant={data.id} simulation={simulation} />
        </div>
    );

    const footer = (
        <div className="table-footer">
            <Button label="Add New Composant" icon="pi pi-plus" onClick={onCreate} className="p-button-text p-button-plain" style={{ width: '100%' }} />
        </div>
    );

    const selectedBodyTemplate = (rowData) => {
        return (
            <Checkbox checked={rowData.selected} onChange={() => onSelectedChange(rowData)} disabled={!simulation} />
        );
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading composants.</p>;

    return (
        <div>
            <DataTable value={composants} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                className="child-table"
                editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete}
                editingRows={editingRows} onRowEditChange={(e) => setEditingRows(e.data)}
                footer={footer} rowExpansionTemplate={rowExpansionTemplate}>
                {simulation && <Column body={selectedBodyTemplate} style={{ width: '4rem', textAlign: 'center' }} />}
                <Column expander style={{ width: '3em' }} />
                <Column field="titre" header="Titre" editor={textEditor} />
                <Column field="dateDebut" header="Date Debut" editor={textEditor} />
                <Column field="dateFin" header="Date Fin" editor={textEditor} />
                <Column field="groupe" header="Groupe" editor={textEditor} />
                <Column field="niveau" header="Niveau" editor={textEditor} />
                <Column field="echelon" header="Échelon" editor={textEditor} />
                <Column field="bilingue" header="Bilingue" editor={textEditor} />
                <Column field="salaire" header="Salaire" editor={textEditor} />
                <Column rowEditor style={{ width: '4rem', textAlign: 'center' }} />
                <Column body={actionBodyTemplate} style={{ width: '4rem', textAlign: 'center' }} />
            </DataTable>
        </div>
    );
};

export default ComposantDataTable;
