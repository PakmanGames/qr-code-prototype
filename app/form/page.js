'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { QRCodeSVG } from 'qrcode.react';
import { Slider } from '@radix-ui/react-slider';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';

export default function Form() {
    const router = useRouter();
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            name: '',
            dateOfBirth: '',
            healthCardNumber: '',
            symptoms: '',
            severity: 5
        }
    });

    const onSubmit = (data) => {
        const qrData = JSON.stringify(data);
        localStorage.setItem('patientQRData', qrData);
        router.push('/qrcode');
    };

    // Generate year options from 1925 to 2025
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 2025 - 1925 + 1 }, (_, i) => 2025 - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

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
                        <Label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth
                        </Label>
                        <div className="grid grid-cols-3 gap-4">
                            <select
                                {...register('dateOfBirth.year', { required: true })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Year</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <select
                                {...register('dateOfBirth.month', { required: true })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Month</option>
                                {months.map(month => (
                                    <option key={month} value={month}>
                                        {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}
                                    </option>
                                ))}
                            </select>
                            <select
                                {...register('dateOfBirth.day', { required: true })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Day</option>
                                {days.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>
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
                        <div className="relative pt-1">
                            <Slider
                                value={[watch('severity')]}
                                onValueChange={(value) => setValue('severity', value[0])}
                                min={1}
                                max={10}
                                step={1}
                                className="relative flex items-center select-none touch-none w-full h-5"
                            >
                                <div className="relative flex-1 h-1 bg-gray-200 rounded-full">
                                    <div 
                                        className="absolute h-full bg-blue-600 rounded-full"
                                        style={{ width: `${(watch('severity') - 1) * 11.11}%` }}
                                    />
                                </div>
                                <div 
                                    className="absolute w-4 h-4 bg-blue-600 rounded-full shadow-lg"
                                    style={{ 
                                        left: `${(watch('severity') - 1) * 11.11}%`,
                                        transform: 'translateX(-50%)'
                                    }}
                                />
                            </Slider>
                        </div>
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
            </div>
        </div>
    );
}