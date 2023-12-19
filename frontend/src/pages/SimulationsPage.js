import React, { useState, useEffect } from 'react';
import { apiSlice } from '../api/apiSlice';
import { useCopyScenarioData } from '../hooks/useCopyScenarioData';
import EmployeeDataTable from '../components/EmployeeDataTable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Sidebar } from 'primereact/sidebar';
import { ProgressBar } from 'primereact/progressbar'; // Import ProgressBar component
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const SimulationPage = () => {
    const [selectedScenarioId, setSelectedScenarioId] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [newSimulationData, setNewSimulationData] = useState({ anneeFiscale: '', description: '', simulation: true });
    const [copyFromScenarioId, setCopyFromScenarioId] = useState(null);
    const { data: scenariosData, isLoading, isError, refetch } = apiSlice.useFetchDataQuery('scenarios');
    const { copyData } = useCopyScenarioData();

    const simulationScenarios = scenariosData?.filter(scenario => scenario.simulation === true) || [];
    const allScenariosOptions = scenariosData?.map(scenario => ({ label: scenario.anneeFiscale, value: scenario.id })) || [];

    const [totalSalaire, setTotalSalaire] = useState(0);

    // Function to handle simulation selection and sidebar visibility
    const handleSimulationSelect = (id) => {
        setSelectedScenarioId(id);
        setIsSidebarVisible(false); // This will close the sidebar upon selection
    };

    const handleCreateSimulation = async () => {
        console.log("Scenario ID to Copy From: ", copyFromScenarioId);

        if (copyFromScenarioId) {
            try {
                const createdScenario = await copyData(copyFromScenarioId, newSimulationData);
                refetch();
                setSelectedScenarioId(createdScenario.idScenario);
                setIsDialogVisible(false);
            } catch (error) {
                console.error('Error in creating simulation:', error);
            }
        } else {
            console.error('No scenario selected to copy from');
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading scenarios.</p>;

    return (
        <div>
            <Button label="Select Simulation" onClick={() => setIsSidebarVisible(true)} />
            <Sidebar visible={isSidebarVisible} onHide={() => setIsSidebarVisible(false)}>
                {simulationScenarios.map(scenario => (
                    <div>
                        <Button key={scenario.id}
                            label={scenario.anneeFiscale + " - " + scenario.description}
                            onClick={() => handleSimulationSelect(scenario.id)}
                            className="p-button-text" />
                    </div>

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

            {selectedScenarioId && (
                <div className="progress-section">
                    <h4>Total Salaire for the selected scenario:</h4>
                    <ProgressBar value={totalSalaire} showValue={true} />
                    <p>{totalSalaire.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default SimulationPage;
