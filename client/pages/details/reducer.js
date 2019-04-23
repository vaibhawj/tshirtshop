
export default (state = { product: null }, action) => {
    switch (action.type) {
        case "GET_PRODUCT_SUCCESS": return {
            ...state,
            product: action.payload
        }
    }
    return state;
}