

export default (state = { products: [] }, action) => {
    switch (action.type) {
        case "GET_PRODUCTS_SUCCESS": return { ...state, products: action.payload }
    }
    return state;
}