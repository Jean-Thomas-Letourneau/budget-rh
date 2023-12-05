import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';

const SimulationComposantDataTable = ({ composants, onDataChanged }) => {
    const [localComposants, setLocalComposants] = useState(composants.map(comp => ({ ...comp, isEnabled: true })));
    const [expandedRows, setExpandedRows] = useState(null);

    const onCheckboxChange = (e, rowData) => {
        const updatedComposants = localComposants.map(comp =>
            comp.id === rowData.id ? { ...comp, isEnabled: e.checked } : comp
        );
        setLocalComposants(updatedComposants);
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
        let updatedComposants = [...localComposants];
        updatedComposants[index] = newData;
        setLocalComposants(updatedComposants);
        onDataChanged(updatedComposants);
    };

    const textEditor = (options) => (
        <InputText type="text" value={options.rowData[options.field]}
            onChange={(e) => options.editorCallback(e.target.value)} />
    );

    return (
        <div>
            <h2>Composants</h2>
            <DataTable value={localComposants} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                onRowEditComplete={onRowEditComplete}>
                <Column field="isEnabled" body={checkboxBodyTemplate} style={{ width: '3em' }} />
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
            </DataTable>
        </div>
    );
};

export default SimulationComposantDataTable;
