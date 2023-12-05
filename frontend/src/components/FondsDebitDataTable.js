import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { useUpdateDataMutation, useFetchDataQuery } from '../api/apiSlice';
import { Divider } from 'primereact/divider';

const FondsDebitDataTable = ({ fondsDebits }) => {
    const [updateData] = useUpdateDataMutation();
    const { refetch } = useFetchDataQuery('fondsDebits');

    const onRowEditComplete = async (e) => {
        const { newData } = e;
        try {
            await updateData({ modelName: 'fondsDebits', id: newData.id, data: newData }).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to update fondsDebit:', error);
        }
    };

    const textEditor = (options) => (
        <InputText type="text" value={options.rowData[options.field]}
            onChange={(e) => options.editorCallback(e.target.value)} />
    );

    return (
        <div>
            <h2>Débits</h2>
            <DataTable value={fondsDebits} className="p-datatable-sm" editMode="row" dataKey="id"
                onRowEditComplete={onRowEditComplete}>
                <Column field="source" header="Source" editor={textEditor} /> {/* New Source Column */}
                <Column field="pourcentage" header="Pourcentage" editor={textEditor} />
                <Column field="montant" header="Montant" editor={textEditor} />
                <Column rowEditor />
            </DataTable>
        </div>
    );
};

export default FondsDebitDataTable;
