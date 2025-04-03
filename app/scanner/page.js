'use client';

import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export default function Scanner() {
    const [scannedData, setScannedData] = useState(null);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isScanning, setIsScanning] = useState(true);
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
                                setIsScanning(false);
                                html5QrcodeScanner.stop().then(() => {
                                    console.log('Scanner stopped after successful scan');
                                }).catch(err => {
                                    console.error('Error stopping scanner:', err);
                                });
                            } catch (err) {
                                console.error('Error parsing QR code:', err);
                            }
                        },
                        (errorMessage) => {
                            // Only log errors that aren't related to no QR code being found
                            if (!errorMessage.includes('No barcode or QR code detected') && 
                                !errorMessage.includes('NotFoundException: No MultiFormat Readers')) {
                                console.log('Scanner status:', errorMessage);
                            }
                        }
                    );

                    qrCodeRef.current = html5QrcodeScanner;
                    setIsCameraReady(true);
                }
            } catch (err) {
                console.error('Camera initialization error:', err);
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

    const handleScanAgain = async () => {
        if (qrCodeRef.current) {
            try {
                const devices = await Html5Qrcode.getCameras();
                if (devices && devices.length) {
                    await qrCodeRef.current.start(
                        devices[0].id,
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
                                setIsScanning(false);
                                qrCodeRef.current.stop().then(() => {
                                    console.log('Scanner stopped after successful scan');
                                }).catch(err => {
                                    console.error('Error stopping scanner:', err);
                                });
                            } catch (err) {
                                console.error('Error parsing QR code:', err);
                            }
                        },
                        (errorMessage) => {
                            // Only log errors that aren't related to no QR code being found
                            if (!errorMessage.includes('No barcode or QR code detected') && 
                                !errorMessage.includes('NotFoundException: No MultiFormat Readers')) {
                                console.log('Scanner status:', errorMessage);
                            }
                        }
                    );
                    setIsScanning(true);
                }
            } catch (err) {
                console.error('Error restarting scanner:', err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-400 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-900 mb-2">Patient QR Code Scanner</h1>
                    <p className="text-blue-600">Scan a patient&apos;s QR code to view their information</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {!isCameraReady && (
                        <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-lg text-center">
                            Initializing camera...
                        </div>
                    )}

                    <div className="relative">
                        <div id="reader" className="w-full aspect-square mb-6 rounded-xl overflow-hidden shadow-md"></div>
                        {!isScanning && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                                <button
                                    onClick={handleScanAgain}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                >
                                    Scan Again
                                </button>
                            </div>
                        )}
                    </div>

                    {scannedData && (
                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-blue-900 mb-4">Patient Information</h2>
                            <div className="space-y-3 text-base text-gray-700">
                                <p><span className="font-semibold text-blue-900">Name:</span> {scannedData.name}</p>
                                <p><span className="font-semibold text-blue-900">Date of Birth:</span> {`${scannedData.dateOfBirth.year}-${scannedData.dateOfBirth.month}-${scannedData.dateOfBirth.day}`}</p>
                                <p><span className="font-semibold text-blue-900">Health Card Number:</span> {scannedData.healthCardNumber}</p>
                                <p><span className="font-semibold text-blue-900">Symptoms:</span> {scannedData.symptoms}</p>
                                <p><span className="font-semibold text-blue-900">Severity:</span> <span className="text-blue-600 font-bold">{scannedData.severity}/10</span></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}