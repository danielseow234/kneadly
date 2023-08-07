export const formatDateToString = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length !== 3) {
        return "";
    }

    const [year, month, day] = dateArray;
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString();

    return formattedDate;
};

export const formatTimeToString = (timeArray) => {
    if (!Array.isArray(timeArray) || timeArray.length !== 2) {
        // Invalid time array format
        return "";
    }

    const [hour, minute] = timeArray;
    const formattedTime = new Date(0, 0, 0, hour, minute).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return formattedTime;
};