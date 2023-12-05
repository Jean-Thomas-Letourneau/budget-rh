import React, { useEffect, useState } from 'react';
import { useFetchDataQuery } from '../api/apiSlice';
import SimulationEmployeeDataTable from '../components/SimulationEmployeeDataTable';
import { ProgressBar } from 'primereact/progressbar';

const SimulationsPage = () => {
    const { data: employeesData, isLoading: isLoadingEmployees, isSuccess: isSuccessEmployees } = useFetchDataQuery('employes');
    const { data: composantsData, isLoading: isLoadingComposants, isSuccess: isSuccessComposants } = useFetchDataQuery('composants');
    const { data: fondsDebitsData, isLoading: isLoadingFondsDebits, isSuccess: isSuccessFondsDebits } = useFetchDataQuery('fondsDebits');

    const [treeData, setTreeData] = useState([]);
    const [totalCosts, setTotalCosts] = useState(0);

    useEffect(() => {
        if (isSuccessEmployees && isSuccessComposants && isSuccessFondsDebits) {
            const employeeNodes = employeesData.map((employe) => {
                const employeComposants = composantsData.filter(
                    (composant) => composant.idEmploye === employe.id
                ).map((composant) => {
                    const composantFondsDebits = fondsDebitsData.filter(
                        (fondsDebit) => fondsDebit.idComposant === composant.id
                    );
                    return {
                        ...composant,
                        fondsDebits: composantFondsDebits,
                        isEnabled: true // Ensure initial isEnabled state
                    };
                });

                const totalSalaire = employeComposants
                    .filter(composant => composant.isEnabled)
                    .reduce((acc, composant) => acc + composant.salaire, 0);

                return {
                    ...employe,
                    composants: employeComposants,
                    salaire: totalSalaire,
                    isEnabled: true // Ensure initial isEnabled state
                };
            });

            setTreeData(employeeNodes);
            setTotalCosts(calculateTotalCosts(employeeNodes));
        }
    }, [isSuccessEmployees, isSuccessComposants, isSuccessFondsDebits, employeesData, composantsData, fondsDebitsData, treeData]);


    const onEmployeeDataChange = (updatedData) => {
        setTreeData(updatedData);
    };

    if (isLoadingEmployees || isLoadingComposants || isLoadingFondsDebits) {
        return <div>Loading...</div>;
    }

    if (!treeData.length) {
        return <div>Error loading data or no data available.</div>;
    }

    const progressBarValue = (totalCosts / 100000) * 100; // Calculate the percentage

    return (
        <div>
            <h1>Simulations</h1>
            <div>
                <ProgressBar value={progressBarValue} />
                <p>Total Costs: {totalCosts}</p>
            </div>
            <SimulationEmployeeDataTable employees={treeData} onDataChanged={onEmployeeDataChange} />
        </div>
    );
};

const calculateTotalCosts = (employees) => {
    return employees
        .filter(emp => emp.isEnabled)
        .reduce((acc, emp) => acc + emp.salaire, 0);
};

export default SimulationsPage;
