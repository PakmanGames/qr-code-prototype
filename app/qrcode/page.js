'use client';

import { useEffect, useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Link from "next/link";

export default function QRCode() {
    const [qrData, setQrData] = useState(null);
    const [patientData, setPatientData] = useState(null);
    const qrRef = useRef(null);

    useEffect(() => {
        const storedData = localStorage.getItem('patientQRData');
        if (storedData) {
            setQrData(storedData);
            setPatientData(JSON.parse(storedData));
        }
    }, []);

    const saveQRCode = async () => {
        if (!qrRef.current) return;

        // Get the SVG element
        const svgElement = qrRef.current.querySelector('svg');
        if (!svgElement) return;

        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to match SVG
        canvas.width = 200;
        canvas.height = 200;

        // Convert SVG to data URL
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);

        // Create an image element
        const img = new Image();
        img.onload = () => {
            // Draw the image on canvas
            ctx.drawImage(img, 0, 0, 200, 200);

            // Convert canvas to blob
            canvas.toBlob((blob) => {
                if (!blob) return;

                // Create download link
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'patient-qr-code.png';

                // Trigger download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 'image/png');
        };
        img.src = svgUrl;
    };

    if (!qrData) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-400 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-900 mb-2">No QR Code Generated</h1>
                        <p className="text-blue-600">Please pre-register to generate your QR code</p>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <p className="text-gray-600 mb-8">You have not generated a QR code yet. Please fill out the patient information form to create one.</p>
                        <Link 
                            href="/form"
                            className="inline-flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Pre-register Now
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-400 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-900 mb-2">Your QR Code</h1>
                    <p className="text-blue-600">Show this to hospital staff when you arrive</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center">
                        <div ref={qrRef} className="inline-block p-6 bg-white rounded-xl shadow-md">
                            <QRCodeSVG value={qrData} size={200} />
                        </div>
                        
                        <div className="mt-8 text-left">
                            <h2 className="text-xl font-bold text-blue-900 mb-4">Patient Information</h2>
                            <div className="space-y-3 text-base text-gray-700">
                                <p><span className="font-semibold text-blue-900">Name:</span> {patientData.name}</p>
                                <p><span className="font-semibold text-blue-900">Date of Birth:</span> {`${patientData.dateOfBirth.year}-${patientData.dateOfBirth.month}-${patientData.dateOfBirth.day}`}</p>
                                <p><span className="font-semibold text-blue-900">Health Card Number:</span> {patientData.healthCardNumber}</p>
                                <p><span className="font-semibold text-blue-900">Symptoms:</span> {patientData.symptoms}</p>
                                <p><span className="font-semibold text-blue-900">Severity:</span> <span className="text-blue-600 font-bold">{patientData.severity}/10</span></p>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <Link 
                                href="/form"
                                className="inline-flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                Update Information
                            </Link>
                            <button
                                onClick={saveQRCode}
                                className="ml-4 inline-flex items-center justify-center py-3 px-6 border border-blue-200 rounded-lg text-lg font-semibold text-blue-900 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h-2v5.586l-1.293-1.293z" />
                                </svg>
                                Save QR Code
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}