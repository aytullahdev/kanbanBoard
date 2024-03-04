const storagePrefix = "del__";

export const storage = {

    getToken: () => {
        //if (typeof window !== 'undefined') null;
        // return JSON.parse(localStorage.getItem(`${storagePrefix}token`));
    },
    setToken: (accessToken) => {
        //localStorage.setItem(`${storagePrefix}token`, JSON.stringify(accessToken));
    },
    clearToken: () => {
        //if (typeof window !== 'undefined') null;
        //localStorage.removeItem(`${storagePrefix}token`);
    },
};