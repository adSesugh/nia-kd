export const getTotalDaysInYear = (year: number): number => {
    const isLeapYear: boolean = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return isLeapYear ? 366 : 365;
}

export const getTotalDaysOfYear = (date: any): number => {
    const startOfYear: any = new Date(date.getFullYear(), 0, 0); // January 1st of the same year
    const diff = date - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
    return Math.floor(diff / oneDay);
}

export const getDaysPercentage = (days: number, totalDays: number): number => Math.ceil(days / totalDays * 100)

export const generateZerofillID = (counter: number): string => String(counter).padStart(6, '0')