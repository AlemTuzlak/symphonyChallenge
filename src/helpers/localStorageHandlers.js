/* ----------------------------------------------------- */
/*                  ACCESS TOKEN METHODS                 */
/* ----------------------------------------------------- */

export const checkIfAccessTokenExists = () => {
    return localStorage.getItem('AAT') !== null;
}

export const getAccessToken = () => {
    return localStorage.getItem('AAT');
}

export const setAccessToken = (accessToken) => {
    localStorage.setItem('AAT', accessToken);
}

export const removeAccessToken = () => {
    return localStorage.removeItem('AAT');
}