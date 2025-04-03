'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { QRCodeSVG } from 'qrcode.react';
import { Slider } from '@radix-ui/react-slider';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';

export default function Form() {
    const router = useRouter();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formData, setFormData] = useState(null);
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
        setFormData(data);
        setShowConfirmation(true);
    };

    const handleConfirm = () => {
        const qrData = JSON.stringify(formData);
        localStorage.setItem('patientQRData', qrData);
        router.push('/qrcode');
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        setFormData(null);
    };

    // Generate year options from 1925 to 2025
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 2025 - 1925 + 1 }, (_, i) => 2025 - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-400 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-900 mb-2">Patient Information Form</h1>
                    <p className="text-blue-600">Please fill out your information below</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="block text-sm font-semibold text-blue-900">
                                Full Name
                            </Label>
                            <input
                                type="text"
                                id="name"
                                {...register('name', { required: true })}
                                className="mt-1 block w-full px-4 py-3 rounded-lg border border-blue-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="block text-sm font-semibold text-blue-900">
                                Date of Birth
                            </Label>
                            <div className="grid grid-cols-3 gap-4">
                                <select
                                    {...register('dateOfBirth.month', { required: true })}
                                    className="mt-1 block w-full px-2 py-3 rounded-lg border border-blue-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-sm"
                                >
                                    <option value="">Month</option>
                                    {months.map(month => (
                                        <option key={month} value={month}>
                                            {new Date(2000, month - 1).toLocaleString('default', { month: 'short' })}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    {...register('dateOfBirth.day', { required: true })}
                                    className="mt-1 block w-full px-2 py-3 rounded-lg border border-blue-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-sm"
                                >
                                    <option value="">Day</option>
                                    {days.map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                                <select
                                    {...register('dateOfBirth.year', { required: true })}
                                    className="mt-1 block w-full px-2 py-3 rounded-lg border border-blue-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 text-sm"
                                >
                                    <option value="">Year</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="healthCardNumber" className="block text-sm font-semibold text-blue-900">
                                Health Card Number
                            </Label>
                            <input
                                type="text"
                                id="healthCardNumber"
                                {...register('healthCardNumber', { required: true })}
                                className="mt-1 block w-full px-4 py-3 rounded-lg border border-blue-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                                placeholder="Enter your health card number"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="symptoms" className="block text-sm font-semibold text-blue-900">
                                Symptoms
                            </Label>
                            <textarea
                                id="symptoms"
                                {...register('symptoms', { required: true })}
                                rows={4}
                                className="mt-1 block w-full px-4 py-3 rounded-lg border border-blue-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                                placeholder="Describe your symptoms"
                            />
                        </div>

                        <div className="space-y-4">
                            <Label className="block text-sm font-semibold text-blue-900">
                                Pain/Symptom Severity
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
                                    <div className="relative flex-1 h-2 bg-blue-100 rounded-full">
                                        <div 
                                            className="absolute h-full bg-blue-600 rounded-full transition-all duration-200"
                                            style={{ width: `${(watch('severity') - 1) * 11.11}%` }}
                                        />
                                    </div>
                                    <div 
                                        className="absolute w-6 h-6 bg-blue-600 rounded-full shadow-lg transition-all duration-200"
                                        style={{ 
                                            left: `${(watch('severity') - 1) * 11.11}%`,
                                            transform: 'translateX(-50%)'
                                        }}
                                    />
                                </Slider>
                            </div>
                            <div className="text-center">
                                <span className="text-4xl font-bold text-blue-600">{watch('severity')}</span>
                                <span className="text-lg text-blue-600 ml-1">/10</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                            Generate QR Code
                        </button>
                    </form>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
                        <h2 className="text-2xl font-bold text-blue-900 mb-6">Confirm Information</h2>
                        <div className="space-y-4 text-base text-gray-700 mb-8">
                            <p><span className="font-semibold text-blue-900">Name:</span> {formData.name}</p>
                            <p><span className="font-semibold text-blue-900">Date of Birth:</span> {`${formData.dateOfBirth.year}-${formData.dateOfBirth.month}-${formData.dateOfBirth.day}`}</p>
                            <p><span className="font-semibold text-blue-900">Health Card Number:</span> {formData.healthCardNumber}</p>
                            <p><span className="font-semibold text-blue-900">Symptoms:</span> {formData.symptoms}</p>
                            <p><span className="font-semibold text-blue-900">Severity:</span> <span className="text-blue-600 font-bold">{formData.severity}/10</span></p>
                        </div>
                        <div className="flex justify-evenly space-x-4">
                            <button
                                onClick={handleCancel}
                                className="px-6 py-3 border border-blue-200 rounded-lg text-sm font-semibold text-blue-900 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                No, Edit Info
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Yes, Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}