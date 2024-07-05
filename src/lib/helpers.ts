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


export const isDateRangeMoreThanOneYear = (startDate: string, endDate: string): boolean => {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = end.getTime() - start.getTime();
  
    // Convert milliseconds to days
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  
    // Check if the difference is more than 365 days
    return differenceInDays > getNumberOfDaysInYear(new Date().getFullYear());
}

function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getNumberOfDaysInYear(year: number): number {
    return isLeapYear(year) ? 366 : 365;
}

export function formatFileSize(bytes: number): string {
    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;
    const gigabytes = megabytes / 1024;

    return `${megabytes.toFixed(2)} MB`;
}

export const readFileAsDataURL = (file: Blob): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}