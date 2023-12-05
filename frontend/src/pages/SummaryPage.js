import React, { useEffect, useState } from 'react';
import { apiSlice } from '../api/apiSlice'; // Import your API slice
import EmployeeDataTable from '../components/EmployeeDataTable';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';  // theme
import 'primereact/resources/primereact.min.css';          // core css
import 'primeicons/primeicons.css';                        // icons

const SummaryPage = () => {
    const [treeData, setTreeData] = useState([]);
    const [filteredTreeData, setFilteredTreeData] = useState([]);

    const [selectedYear, setSelectedYear] = useState(null);
    const yearOptions = [
        { label: '2021', value: '2021' },
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
        { label: '2024', value: '2024' },
        { label: '2025', value: '2025' }
    ];

    const { data: employeesData } = apiSlice.useFetchDataQuery('employes');
    const { data: composantsData } = apiSlice.useFetchDataQuery('composants');
    const { data: fondsDebitsData } = apiSlice.useFetchDataQuery('fondsDebits');

    useEffect(() => {
        if (employeesData && composantsData && fondsDebitsData) {
            const employeeNodes = employeesData.map((employe) => {
                const employeComposants = composantsData.filter(
                    (composant) => composant.idEmploye === employe.id
                ).map((composant) => {
                    const composantFondsDebits = fondsDebitsData.filter(
                        (fondsDebit) => fondsDebit.idComposant === composant.id
                    );
                    return {
                        ...composant,
                        fondsDebits: composantFondsDebits
                    };
                });

                return {
                    ...employe,
                    composants: employeComposants
                };
            });

            setTreeData(employeeNodes);
        }
    }, [employeesData, composantsData, fondsDebitsData]);

    useEffect(() => {
        if (!selectedYear) {
            setFilteredTreeData(treeData); // No year selected, show all data
        } else {
            const filteredData = treeData.map(employee => ({
                ...employee,
                composants: employee.composants.filter(composant => composant.anneeFiscale === selectedYear)
            }));
            setFilteredTreeData(filteredData);
        }
    }, [selectedYear, treeData]);

    //if (isLoading) return <p>Loading...</p>;
    //if (isError) return <p>Error loading data.</p>;

    return (
        <div>
            <Dropdown
                value={selectedYear}
                options={yearOptions}
                onChange={(e) => setSelectedYear(e.value)}
                placeholder="Select a year"
            />
            <EmployeeDataTable employees={filteredTreeData} />
        </div>
    );
};

export default SummaryPage;
