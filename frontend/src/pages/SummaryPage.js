import React, { useState } from 'react';
import { apiSlice } from '../api/apiSlice';
import EmployeeDataTable from '../components/EmployeeDataTable';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const SummaryPage = () => {
    const [selectedScenarioId, setSelectedScenarioId] = useState(null);
    const { data: scenariosData, isLoading, isError } = apiSlice.useFetchDataQuery('scenarios');

    // Filter scenarios to keep only those with simulation = false
    const filteredScenarios = scenariosData?.filter(scenario => scenario.simulation === false) || [];
    const yearOptions = filteredScenarios.map(scenario => ({
        label: scenario.anneeFiscale,
        value: scenario.id
    }));

    // Find the selected scenario to pass its simulation property
    const selectedScenario = filteredScenarios.find(scenario => scenario.id === selectedScenarioId);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading scenarios.</p>;

    return (
        <div>
            <Dropdown
                value={selectedScenarioId}
                options={yearOptions}
                onChange={(e) => setSelectedScenarioId(e.value)}
                placeholder="Select a Scenario"
            />
            {selectedScenarioId && <EmployeeDataTable idScenario={selectedScenarioId} simulation={selectedScenario?.simulation} />}
        </div>
    );
};

export default SummaryPage;
