import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const navigate = useNavigate();

    const items = [
        { label: 'Base de données', icon: 'pi pi-fw pi-database', command: () => { navigate('/database'); } },
        { label: 'Sommaire', icon: 'pi pi-fw pi-list', command: () => { navigate('/summary'); } },
        { label: 'Simulations', icon: 'pi pi-fw pi-chart-bar', command: () => { navigate('/simulations'); } }
    ];

    return (
        <div>
            <TabMenu model={items} />
        </div>
    );
};

export default NavigationBar;
