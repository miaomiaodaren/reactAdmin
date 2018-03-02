export function csstt({ name }) {
    return (dispatch => {
        console.info(name, 22)
        dispatch({ type: 'CSSTT', payload: {name: 'fufeng' }})
    })
}