import React from 'react';
import CreditScoreGauge from './CreditScore';
import Sidebar from '../../sidebar/Sidebar';

function Dashboard() {
    return (
        <div className='flex h-screen'>
            <Sidebar />
            <div className='w-full h-auto mx-auto px-8 py-8 bg-gray-100 flex justify-center items-center'>
                <div className='w-[500px] h-auto bg-white shadow-md rounded-lg p-6'>
                    <h1 className='text-xl font-semibold mb-4'>Credit Score Gauge</h1>
                    <div className='flex justify-center'>
                        <CreditScoreGauge score={520} /> {/* Pass any score you like */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
