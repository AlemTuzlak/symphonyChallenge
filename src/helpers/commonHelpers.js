

export const createImageUrl = (url) => {
    url = url.replace('\\', '/');
    return `http://localhost:8000/${url}`
}