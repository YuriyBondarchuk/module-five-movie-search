const LOCAL_SPECIFIC_NAME: string = '_movie-local-';

export const setLocalStorage = (key: string, data: any): void => {
    if (typeof window !== "undefined") {
        try {
            localStorage.setItem(LOCAL_SPECIFIC_NAME + key, JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    }
};

export const getLocalStorage = (key: string): any => {
    if (typeof window !== "undefined") {
        try {
            const saved = localStorage.getItem(LOCAL_SPECIFIC_NAME + key);
            const initial = saved !== null ? JSON.parse(saved) : null;
             return initial;
        } catch (error) {
            console.log(error)
        }
    }
};
