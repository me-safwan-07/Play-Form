// get the today date with full hours
export const getTodayDate = (): Date => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
}