import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import FondsDebitDataTable from './FondsDebitDataTable';
import { useUpdateDataMutation, useFetchDataQuery } from '../api/apiSlice';

const ComposantDataTable = ({ composants }) => {
    const [expandedRows, setExpandedRows] = useState(null);
    const [updateData] = useUpdateDataMutation();
    const { refetch } = useFetchDataQuery('composants');

    const onRowEditComplete = async (e) => {
        const { newData } = e;
        try {
            await updateData({ modelName: 'composants', id: newData.id, data: newData }).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to update composant:', error);
        }
    };

    const textEditor = (options) => (
        <InputText type="text" value={options.rowData[options.field]}
            onChange={(e) => options.editorCallback(e.target.value)} />
    );

    const rowExpansionTemplate = (data) => <FondsDebitDataTable fondsDebits={data.fondsDebits} />;

    return (
        <div>
            <h2>Emploiment</h2>
            <DataTable value={composants} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate} editMode="row" dataKey="id"
                onRowEditComplete={onRowEditComplete}>
                <Column expander style={{ width: '3em' }} />
                <Column field="titre" header="Titre" editor={textEditor} />
                <Column field="dateDebut" header="Date Debut" editor={textEditor} />
                <Column field="dateFin" header="Date Fin" editor={textEditor} />
                <Column field="groupe" header="Groupe" editor={textEditor} />
                <Column field="niveau" header="Niveau" editor={textEditor} />
                <Column field="echelon" header="Échelon" editor={textEditor} />
                <Column field="bilingue" header="Bilingue" editor={textEditor} />
                <Column field="salaire" header="Salaire" editor={textEditor} />
                <Column field="anneeFiscale" header="Année Fiscale" editor={textEditor} />
                <Column rowEditor />
                {/* ... other columns as needed */}
            </DataTable>
        </div>
    );
};

export default ComposantDataTable;
