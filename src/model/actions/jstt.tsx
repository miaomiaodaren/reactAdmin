export function csstt(name) {
    return dispatch => {
        alert('22');
        dispatch({ type: 'CSSTT', payload: {name: 'fufeng' }})
    }
}