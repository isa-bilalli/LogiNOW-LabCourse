import Navbar from '../components/Navbar';
import {checkHealth} from '../api.js'
import { useEffect } from 'react';

function Dashboard () {
    
    useEffect(() => {
        checkHealth();
    });

    return (
    <>
        <Navbar />
    </>
    )
}

export default Dashboard;