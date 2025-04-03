'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { QRCodeSVG } from 'qrcode.react';
import { Slider } from '@radix-ui/react-slider';
import { Label } from '@radix-ui/react-label';

export default function Form() {
    const [qrCode, setQrCode] = useState('');
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            name: '',
            healthCardNumber: '',
            symptoms: '',
            severity: 5
        }
    });

    const onSubmit = (data) => {
        const qrData = JSON.stringify(data);
        setQrCode(qrData);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Patient Information Form</h1>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </Label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <Label htmlFor="healthCardNumber" className="block text-sm font-medium text-gray-700">
                            Health Card Number
                        </Label>
                        <input
                            type="text"
                            id="healthCardNumber"
                            {...register('healthCardNumber', { required: true })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <Label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">
                            Symptoms
                        </Label>
                        <textarea
                            id="symptoms"
                            {...register('symptoms', { required: true })}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">
                            Pain/Symptom Severity (1-10)
                        </Label>
                        <Slider
                            value={[watch('severity')]}
                            onValueChange={(value) => setValue('severity', value[0])}
                            min={1}
                            max={10}
                            step={1}
                            className="w-full"
                        />
                        <div className="mt-2 text-center text-sm text-gray-600">
                            {watch('severity')}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Generate QR Code
                    </button>
                </form>

                {qrCode && (
                    <div className="mt-8 text-center">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Your QR Code</h2>
                        <div className="inline-block p-4 bg-white rounded-lg shadow">
                            <QRCodeSVG value={qrCode} size={200} />
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                            Please show this QR code to hospital staff when you arrive.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}