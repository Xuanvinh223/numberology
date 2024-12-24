import React, { useState } from 'react';
import {
    calculateLifePathNumber,
    calculateExpressionNumber,
    calculatePersonalityNumber,
    calculateSoulUrgeNumber,
    calculateMaturityNumber,
    calculatePersonalYear,
    calculatePersonalMonth,
    calculatePersonalDay,
} from '../utils/calculations';

const InputForm = () => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Extract date components
        const [year, month, day] = dob.split('-').map(Number);

        // Current date
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
        const currentDay = currentDate.getDate();

        // Calculate numerology numbers
        const lifePath = calculateLifePathNumber(year, month, day);
        const expression = calculateExpressionNumber(name);
        const personality = calculatePersonalityNumber(name);
        const soulUrge = calculateSoulUrgeNumber(name);
        const maturity = calculateMaturityNumber(lifePath, expression);

        // Personal numbers
        const personalYear = calculatePersonalYear(day, month, currentYear);
        const personalMonth = calculatePersonalMonth(personalYear, currentMonth);
        const personalDay = calculatePersonalDay(personalMonth, currentDay);

        setResult({
            lifePath,
            expression,
            personality,
            soulUrge,
            maturity,
            personalYear,
            personalMonth,
            personalDay,
            currentYear,
            currentMonth,
            currentDay,
        });
    };

    return (
        <div className="bg-white p-8 rounded shadow-lg">
            <h1 className="text-xl font-bold mb-4">Thần Số Học</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Họ và Tên:</label>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Ngày Sinh:</label>
                    <input
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Tính Toán
                </button>
            </form>
            {result && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Kết Quả:</h2>
                    <p>Số Đường Đời: {result.lifePath}</p>
                    <p>Số Vận Mệnh: {result.expression}</p>
                    <p>Số Tính Cách: {result.personality}</p>
                    <p>Số Linh Hồn: {result.soulUrge}</p>
                    <p>Số Trưởng Thành: {result.maturity}</p>
                    <p>
                        Năm Cá Nhân ({result.currentYear}): {result.personalYear}
                    </p>
                    <p>
                        Tháng Cá Nhân ({result.currentMonth}): {result.personalMonth}
                    </p>
                    <p>
                        Ngày Cá Nhân ({result.currentDay}): {result.personalDay}
                    </p>
                </div>
            )}
        </div>
    );
};

export default InputForm;
