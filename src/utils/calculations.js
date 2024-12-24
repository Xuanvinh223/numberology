// Helper function to calculate the sum of digits until a single digit or special number
const reduceToSingleDigit = (num) => {
    const sumDigits = (num) => String(num).split('').reduce((sum, digit) => sum + Number(digit), 0);
    while (num > 9 && ![11, 22, 33].includes(num)) {
        num = sumDigits(num);
    }
    return num;
};

// Calculate Personality Number
export const calculatePersonalityNumber = (name) => {
    const letterValues = {
        A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
        J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
        S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
    };

    const nameUpperCase = name.toUpperCase().replace(/[^A-Z]/g, '');
    const consonants = nameUpperCase.replace(/[AEIOU]/g, ''); // Remove vowels
    const total = consonants.split('').reduce((sum, char) => sum + letterValues[char], 0);

    return reduceToSingleDigit(total);
};

// Calculate Soul Urge Number
export const calculateSoulUrgeNumber = (name) => {
    const letterValues = {
        A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
        J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
        S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
    };

    const nameUpperCase = name.toUpperCase().replace(/[^A-Z]/g, '');
    const vowels = nameUpperCase.replace(/[^AEIOU]/g, ''); // Keep only vowels
    const total = vowels.split('').reduce((sum, char) => sum + letterValues[char], 0);

    return reduceToSingleDigit(total);
};

export const calculateLifePathNumber = (year, month, day) => {
    const sumDigits = (num) => String(num).split('').reduce((sum, digit) => sum + Number(digit), 0);

    let total = sumDigits(year) + sumDigits(month) + sumDigits(day);

    while (total > 9 && ![11, 22, 33].includes(total)) {
        total = sumDigits(total);
    }

    return total;
};

export const calculateExpressionNumber = (name) => {
    const letterValues = {
        A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
        J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
        S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
    };

    const nameUpperCase = name.toUpperCase().replace(/[^A-Z]/g, '');
    const total = nameUpperCase.split('').reduce((sum, char) => sum + letterValues[char], 0);

    return calculateLifePathNumber(total, 0, 0); // Simplify to one-digit
};

export const calculateMaturityNumber = (lifePath, expression) => {
    const total = lifePath + expression;
    return reduceToSingleDigit(total); // Dùng hàm reduceToSingleDigit để rút gọn
};

// Calculate Personal Year
export const calculatePersonalYear = (day, month, currentYear) => {
    const sumDigits = (num) => String(num).split('').reduce((sum, digit) => sum + Number(digit), 0);
    let total = sumDigits(day) + sumDigits(month) + sumDigits(currentYear);
    while (total > 9 && ![11, 22, 33].includes(total)) {
        total = sumDigits(total);
    }
    return total;
};

// Calculate Personal Month
export const calculatePersonalMonth = (personalYear, currentMonth) => {
    const total = personalYear + currentMonth;
    return total > 9 ? total % 9 || 9 : total;
};

// Calculate Personal Day
export const calculatePersonalDay = (personalMonth, currentDay) => {
    const total = personalMonth + currentDay;
    return total > 9 ? total % 9 || 9 : total;
};

export const generateBirthChart = (name, day, month, year) => {
    const letterValues = {
        A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
        J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
        S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
    };

    // Helper to normalize name (remove diacritics)
    const normalizeName = (str) => {
        return str
            .normalize("NFD") // Decompose Unicode
            .replace(/[\u0300-\u036f]/g, "") // Remove diacritic marks
            .replace(/đ/g, "d") // Replace 'đ' with 'd'
            .replace(/Đ/g, "D") // Replace 'Đ' with 'D'
            .toUpperCase(); // Convert to uppercase
    };

    // Helper to count digits
    const countDigits = (str) => {
        const counts = { 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
        str.split('').forEach((char) => {
            if (char in counts) counts[char] += char;
        });
        return counts;
    };

    // Normalize name
    const normalizedName = normalizeName(name);

    // Combine digits from date of birth
    const dobNumbers = `${day}${month}${year}`.split('').filter((char) => char >= '1' && char <= '9');

    // Combine digits from name
    const nameNumbers = normalizedName
        .replace(/[^A-Z]/g, '') // Remove non-alphabetical characters
        .split('')
        .map((char) => letterValues[char])
        .join('');

    // Combine all numbers and count
    const allNumbers = [...dobNumbers, ...nameNumbers];

    return countDigits(allNumbers.join(''));
};


