import React from 'react';
import CreditScoreGauge from '../dashboard/user/CreditScore';
// import CreditScoreGauge from './CreditScore';

function Credit() {
    // Sample score value
    const score = 520;

    // Function to display a message based on the credit score
    const getScoreMessage = (score) => {
        if (score < 580) {
            return 'Your credit score is considered poor. Let’s work on improving it!';
        } else if (score >= 580 && score < 670) {
            return 'Your credit score is fair. You’re on the right track!';
        } else if (score >= 670 && score < 740) {
            return 'Your credit score is good. Keep up the great work!';
        } else {
            return 'Excellent credit score! You’re in great financial shape!';
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
            <div className='w-[100%] bg-white shadow-lg rounded-lg p-6'>
                {/* Credit Score Section */}
                <h1 className='text-2xl font-semibold mb-4'>Your Credit Score</h1>
                <div className='flex justify-center mb-6'>
                    <CreditScoreGauge score={score} />
                </div>

                {/* Credit Score Explanation */}
                <p className='text-lg font-medium text-gray-600 mb-4'>
                    {getScoreMessage(score)}
                </p>

                {/* Credit Score Range */}
                <div className=' grid grid-cols-3 gap-4 mb-6 mx-5'>
                    <div className='text-center p-4 bg-gray-100 rounded-lg shadow'>
                        <p className='text-sm text-gray-500'>Poor</p>
                        <p className='text-xl font-semibold text-red-500'>300-579</p>
                    </div>
                    <div className='text-center p-4 bg-gray-100 rounded-lg shadow'>
                        <p className='text-sm text-gray-500'>Fair</p>
                        <p className='text-xl font-semibold text-yellow-500'>580-669</p>
                    </div>
                    <div className='text-center p-4 bg-gray-100 rounded-lg shadow'>
                        <p className='text-sm text-gray-500'>Good</p>
                        <p className='text-xl font-semibold text-green-500'>670-739</p>
                    </div>
                    <div className='text-center p-4 bg-gray-100 rounded-lg shadow'>
                        <p className='text-sm text-gray-500'>Very Good</p>
                        <p className='text-xl font-semibold text-blue-500'>740-799</p>
                    </div>
                    <div className='text-center p-4 bg-gray-100 rounded-lg shadow'>
                        <p className='text-sm text-gray-500'>Excellent</p>
                        <p className='text-xl font-semibold text-indigo-500'>800-850</p>
                    </div>
                </div>

                {/* Improvement Tips */}
                <div className='bg-blue-50 p-4 rounded-lg shadow-md'>
                    <h2 className='text-lg font-semibold mb-2 text-blue-600'>Tips to Improve Your Credit Score</h2>
                    <ul className='list-disc list-inside text-gray-700'>
                        <li>Pay your bills on time to avoid late payments.</li>
                        <li>Keep your credit utilization ratio low (below 30%).</li>
                        <li>Avoid opening too many new credit accounts at once.</li>
                        <li>Check your credit report for errors and dispute inaccuracies.</li>
                        <li>Keep older accounts open to maintain your credit history length.</li>
                    </ul>
                </div>

                {/* Additional Resources */}
                <div className='mt-6'>
                    <h3 className='text-lg font-semibold mb-2 text-gray-800'>Additional Resources</h3>
                    <div className='grid grid-cols-2 gap-4'>
                        <a href='#' className='p-4 bg-gray-100 rounded-lg shadow text-center'>
                            <p className='text-sm font-medium text-gray-700'>Credit Report</p>
                        </a>
                        <a href='#' className='p-4 bg-gray-100 rounded-lg shadow text-center'>
                            <p className='text-sm font-medium text-gray-700'>Debt Management</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Credit;
