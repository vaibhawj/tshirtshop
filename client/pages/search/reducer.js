

export default (state = { products: [], departments: [], categories: [] }, action) => {
    switch (action.type) {
        case "GET_PRODUCTS_SUCCESS": return {
            ...state,
            products: action.payload.products,
            departments: action.payload.departments,
            categories: action.payload.categories
        }
        case "SET_DEPT": return {
            ...state,
            selectedDepartment: action.payload
        }
        case "SET_CAT": return {
            ...state,
            selectedCategory: action.payload
        }

    }
    return state;
}