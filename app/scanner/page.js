'use client';

import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export default function Scanner() {
    const [scannedData, setScannedData] = useState(null);
    const [error, setError] = useState('');
    const [isCameraReady, setIsCameraReady] = useState(false);
    const qrCodeRef = useRef(null);

    useEffect(() => {
        const initScanner = async () => {
            try {
                // Create a new instance of Html5Qrcode
                const html5QrcodeScanner = new Html5Qrcode("reader");

                // Get available cameras
                const devices = await Html5Qrcode.getCameras();
                if (devices && devices.length) {
                    // Start with the first camera (usually the back camera)
                    const cameraId = devices[0].id;
                    
                    // Start the scanner
                    await html5QrcodeScanner.start(
                        cameraId,
                        {
                            fps: 1,
                            qrbox: { width: 250, height: 250 },
                            aspectRatio: 1.0,
                        },
                        (decodedText) => {
                            console.log('QR Code detected:', decodedText);
                            try {
                                const parsedData = JSON.parse(decodedText);
                                setScannedData(parsedData);
                                setError('');
                            } catch (err) {
                                console.error('Error parsing QR code:', err);
                                setError('Invalid QR code format. Please scan a valid patient QR code.');
                                setScannedData(null);
                            }
                        },
                        (errorMessage) => {
                            console.error('Scanner error:', errorMessage);
                            setError('Error scanning QR code. Please try again.');
                        }
                    );

                    qrCodeRef.current = html5QrcodeScanner;
                    setIsCameraReady(true);
                } else {
                    setError('No camera found on this device.');
                }
            } catch (err) {
                console.error('Camera initialization error:', err);
                setError('Error accessing camera. Please make sure your camera is working and permissions are granted.');
            }
        };

        initScanner();

        return () => {
            if (qrCodeRef.current) {
                qrCodeRef.current.stop().then(() => {
                    qrCodeRef.current.clear();
                }).catch(err => {
                    console.error('Error stopping scanner:', err);
                });
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Patient QR Code Scanner</h1>
                
                {!isCameraReady && (
                    <div className="mb-6 p-4 bg-yellow-50 text-yellow-700 rounded-md">
                        Initializing camera...
                    </div>
                )}

                <div id="reader" className="w-full aspect-square mb-6 rounded-lg overflow-hidden"></div>

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
                                <span className="font-medium text-gray-700">Date of Birth:</span>
                                <span className="ml-2 text-gray-900">{scannedData.dateOfBirth.month}-{scannedData.dateOfBirth.day}-{scannedData.dateOfBirth.year}</span>
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