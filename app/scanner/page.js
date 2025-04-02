'use client';

import { useState } from 'react';

export default function Scanner() {
    const [scannedData, setScannedData] = useState(null);
    const [error, setError] = useState('');

    const handleScan = (data) => {
        try {
            const parsedData = JSON.parse(data);
            setScannedData(parsedData);
            setError('');
        } catch (err) {
            setError('Invalid QR code format');
            setScannedData(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Patient QR Code Scanner</h1>
                
                <div className="mb-6">
                    <button
                        onClick={() => {
                            // In a real app, this would open the camera
                            // For demo purposes, we'll simulate a scan
                            const mockData = {
                                name: "John Doe",
                                healthCardNumber: "123456789",
                                symptoms: "Fever and headache",
                                severity: 7
                            };
                            handleScan(JSON.stringify(mockData));
                        }}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Scan QR Code
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                {scannedData && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-medium text-gray-900">Patient Information</h2>
                        <div className="bg-gray-50 rounded-md p-4 space-y-3">
                            <div>
                                <span className="font-medium text-gray-700">Name:</span>
                                <span className="ml-2 text-gray-900">{scannedData.name}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Health Card Number:</span>
                                <span className="ml-2 text-gray-900">{scannedData.healthCardNumber}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Symptoms:</span>
                                <span className="ml-2 text-gray-900">{scannedData.symptoms}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-700">Severity Level:</span>
                                <span className="ml-2 text-gray-900">{scannedData.severity}/10</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}