

export default (state = { products: [], departments: [], categories: [] }, action) => {
    switch (action.type) {
        case "GET_PRODUCTS_SUCCESS": return {
            ...state,
            products: action.payload.products,
            departments: state.departments.length == 0 ? action.payload.departments : state.departments,
            categories: state.categories.length == 0 ? action.payload.categories : state.categories
        }
        case "SET_DEPT": return {
            ...state,
            selectedDepartment: action.payload == state.selectedDepartment ? null : action.payload,
            categories: [],
            selectedCategory: null
        }
        case "SET_CAT": return {
            ...state,
            selectedCategory: action.payload == state.selectedCategory ? null : action.payload
        }
    }
    return state;
}