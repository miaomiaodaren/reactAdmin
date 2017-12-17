const pardata = (data, type="GET") => {
    return {
        method: type,
        body: JSON.stringify(data),
        headers: {
            "Content-type": 'application/json'
        }
    }
}
const newFetch = (url, params, type) => {
    return fetch(url, pardata(params, type)).then(res => res.json())
}

export default newFetch