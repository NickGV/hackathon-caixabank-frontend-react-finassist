export const profilerData = [];

export const addProfilerData = (data) => {
    profilerData.push(data);
};

export const clearProfilerData = () => {
    profilerData.length = 0; 
};

export const getProfilerData = () => {
    return profilerData;
};
