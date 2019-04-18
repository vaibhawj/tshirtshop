export const NUM_OF_RECORDS_PER_PAGE = 12;

export default (state = { products: [], departments: [], categories: [], currentPage: 1 }, action) => {
    switch (action.type) {
        case "GET_PRODUCTS_SUCCESS": return {
            ...state,
            products: action.payload.products,
            currentPage: 1,
            totalPages: Math.ceil(action.payload.products.length / NUM_OF_RECORDS_PER_PAGE),
            departments: state.departments.length == 0 ? action.payload.departments : state.departments,
            categories: state.searchString || state.categories.length == 0 ? action.payload.categories : state.categories
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
        case "SET_SEARCH_STRING": return {
            ...state,
            searchString: action.payload
        }
        case "SET_CURR_PAGE": return {
            ...state,
            currentPage: action.payload
        }
    }
    return state;
}