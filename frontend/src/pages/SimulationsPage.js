import React, { useState, useEffect } from 'react';
import { apiSlice } from '../api/apiSlice';
import { useCopyScenarioData } from '../hooks/useCopyScenarioData';
import EmployeeDataTable from '../components/EmployeeDataTable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Sidebar } from 'primereact/sidebar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const SimulationPage = () => {
    const [selectedScenarioId, setSelectedScenarioId] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [newSimulationData, setNewSimulationData] = useState({ anneeFiscale: '', description: '', simulation: true });
    const [copyFromScenarioId, setCopyFromScenarioId] = useState(null); // Separate state for scenario to copy from
    const { data: scenariosData, isLoading, isError, refetch } = apiSlice.useFetchDataQuery('scenarios');
    const { copyData } = useCopyScenarioData();

    const simulationScenarios = scenariosData?.filter(scenario => scenario.simulation === true) || [];
    const allScenariosOptions = scenariosData?.map(scenario => ({ label: scenario.anneeFiscale, value: scenario.id })) || [];

    const handleCreateSimulation = async () => {
        try {
            console.log(newSimulationData);
            const createdScenario = await copyData(selectedScenarioId, newSimulationData);

            refetch();
            setSelectedScenarioId(createdScenario.id);
            setIsDialogVisible(false);
        } catch (error) {
            console.error('Error in creating simulation:', error);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading scenarios.</p>;

    return (
        <div>
            <Button label="Select Simulation" onClick={() => setIsSidebarVisible(true)} />
            <Sidebar visible={isSidebarVisible} onHide={() => setIsSidebarVisible(false)}>
                {simulationScenarios.map(scenario => (
                    <Button key={scenario.id} label={scenario.anneeFiscale} onClick={() => setSelectedScenarioId(scenario.id)} className="p-button-text" />
                ))}
                <Button label="Create New Simulation" onClick={() => setIsDialogVisible(true)} />
            </Sidebar>

            <Dialog header="Create New Simulation" visible={isDialogVisible} onHide={() => setIsDialogVisible(false)} style={{ width: '50vw' }}>
                <div>
                    <h3>New Scenario Details</h3>
                    <InputText placeholder="Fiscal Year" value={newSimulationData.anneeFiscale} onChange={(e) => setNewSimulationData({ ...newSimulationData, anneeFiscale: e.target.value })} />
                    <InputText placeholder="Description" value={newSimulationData.description} onChange={(e) => setNewSimulationData({ ...newSimulationData, description: e.target.value })} />

                    <Dropdown value={copyFromScenarioId} options={allScenariosOptions} onChange={(e) => setCopyFromScenarioId(e.value)} placeholder="Select a Scenario to Copy From" />

                    <Button label="Create" onClick={handleCreateSimulation} />
                </div>
            </Dialog>

            {selectedScenarioId && <EmployeeDataTable idScenario={selectedScenarioId} simulation={true} />}
        </div>
    );
};

export default SimulationPage;
