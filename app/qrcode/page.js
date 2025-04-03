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
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">No QR Code Generated</h1>
                    <p className="text-gray-600 mb-6">Please pre-register to generate your QR code.</p>
                    <Link 
                        href="/form"
                        className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Pre-register Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Your QR Code</h1>
                
                <div className="text-center">
                    <div ref={qrRef} className="inline-block p-4 bg-white rounded-lg shadow">
                        <QRCodeSVG value={qrData} size={200} />
                    </div>
                    
                    <div className="mt-6 text-left">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h2>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><span className="font-medium">Name:</span> {patientData.name}</p>
                            <p><span className="font-medium">Date of Birth:</span> {`${patientData.dateOfBirth.year}-${patientData.dateOfBirth.month}-${patientData.dateOfBirth.day}`}</p>
                            <p><span className="font-medium">Health Card Number:</span> {patientData.healthCardNumber}</p>
                            <p><span className="font-medium">Symptoms:</span> {patientData.symptoms}</p>
                            <p><span className="font-medium">Severity:</span> {patientData.severity}/10</p>
                        </div>
                    </div>

                    <p className="mt-6 text-sm text-gray-600">
                        Please show this QR code to hospital staff when you arrive.
                    </p>

                    <div className="mt-6 space-y-4">
                        <Link 
                            href="/form"
                            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Update Information
                        </Link>
                        <button
                            onClick={saveQRCode}
                            className="ml-4 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save QR Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}