import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    calculateLifePathNumber,
    calculateExpressionNumber,
    calculatePersonalityNumber,
    calculateSoulUrgeNumber,
    calculateMaturityNumber,
    calculatePersonalYear,
    calculatePersonalMonth,
    calculatePersonalDay,
    generateBirthChart,
    calculatePinnaclesAndChallenges,
} from '../utils/calculations';

const normalizeName = (str) => {
    return str
        .normalize("NFD") // Decompose Unicode
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritic marks
        .replace(/đ/g, "d") // Replace 'đ' with 'd'
        .replace(/Đ/g, "D") // Replace 'Đ' with 'D'
        .toUpperCase(); // Convert to uppercase
};

const InputForm = () => {
    const [name, setName] = useState('Phạm Xuân Vinh');
    const [dob, setDob] = useState('2003-02-02');
    const [result, setResult] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const fullName = normalizeName(name);

        // Extract date components
        const [year, month, day] = dob.split('-').map(Number);

        // Current date
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
        const currentDay = currentDate.getDate();

        // Calculate numerology numbers
        const lifePath = calculateLifePathNumber(year, month, day);
        const expression = calculateExpressionNumber(fullName);
        const personality = calculatePersonalityNumber(fullName);
        const soulUrge = calculateSoulUrgeNumber(fullName);
        const maturity = calculateMaturityNumber(lifePath, expression);

        // Personal numbers
        const personalYear = calculatePersonalYear(day, month, currentYear);
        const personalMonth = calculatePersonalMonth(personalYear, currentMonth);
        const personalDay = calculatePersonalDay(personalMonth, currentDay);

        // Generate birth chart
        const birthChart = generateBirthChart(fullName, day, month, year);
        const { pinnacles, challenges } = calculatePinnaclesAndChallenges(day, month, year);
        setResult({
            lifePath,
            expression,
            personality,
            soulUrge,
            maturity,
            personalYear,
            personalMonth,
            personalDay,
            birthChart,
            pinnacles,
            challenges,
        });
    };

    return (
        <div className="container bg-white p-8 rounded shadow-lg">
            <h1 className="text-center text-xl font-bold mb-4 text-primary">Thần Số Học</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Họ và Tên:</label>
                    <input
                        type="text"
                        className="form-control w-full p-2 border border-gray-300 rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Ngày Sinh:</label>
                    <input
                        type="date"
                        className="form-control w-full p-2 border border-gray-300 rounded"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Tra cứu
                </button>
            </form>
            {result && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-center">Kết Quả:</h2>
                    <p>Số Đường Đời: {result.lifePath}</p>
                    <p>Số Vận Mệnh: {result.expression}</p>
                    <p>Số Tính Cách: {result.personality}</p>
                    <p>Số Linh Hồn: {result.soulUrge}</p>
                    <p>Số Trưởng Thành: {result.maturity}</p>
                    <p>Năm Cá Nhân <span>({new Date().getFullYear()})</span> : {result.personalYear} </p>
                    <p>Tháng Cá Nhân <span>({new Date().getMonth() + 1})</span> : {result.personalMonth} </p>
                    <p>Ngày Cá Nhân <span>({new Date().getDate()})</span> : {result.personalDay} </p>
                    <h2 className="text-lg font-semibold mt-6 text-center">Biểu Đồ Sinh:</h2>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>{result.birthChart['3'] || '-'}</td>
                                <td>{result.birthChart['6'] || '-'}</td>
                                <td>{result.birthChart['9'] || '-'}</td>
                            </tr>
                            <tr>
                                <td>{result.birthChart['2'] || '-'}</td>
                                <td>{result.birthChart['5'] || '-'}</td>
                                <td>{result.birthChart['8'] || '-'}</td>
                            </tr>
                            <tr>
                                <td>{result.birthChart['1'] || '-'}</td>
                                <td>{result.birthChart['4'] || '-'}</td>
                                <td>{result.birthChart['7'] || '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2 className="text-lg font-semibold mt-6 text-center">Đỉnh Cao và Thử Thách cuộc đời:</h2>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
                        {result.pinnacles.map((pinnacle, index) => (
                            <div className="col" key={index}>
                                <div className="card shadow-sm">
                                    <div className="card-header bg-primary text-white text-center">
                                        <h5 className="card-title mb-0">Đỉnh {index + 1}</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <strong>Đỉnh:</strong> {pinnacle}
                                        </div>
                                        <div>
                                            <strong>Thử Thách:</strong> {result.challenges[index]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

    );
};

export default InputForm;
