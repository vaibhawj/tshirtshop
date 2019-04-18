import SearchComponent from './Component';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => {
    return {
        products: state.searchPage.products,
        departments: state.searchPage.departments,
        categories: state.searchPage.categories,
        selectedDepartment: state.searchPage.selectedDepartment,
        selectedCategory: state.searchPage.selectedCategory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(getProducts()),
        searchDepartment: id => {
            dispatch({ type: "SET_DEPT", payload: id });
            dispatch(getProducts());
        },
        searchCategory: id => {
            dispatch({ type: "SET_CAT", payload: id });
            dispatch(getProducts());
        },
        searchProducts: searchString => {
            dispatch({ type: "SET_SEARCH_STRING", payload: searchString });
            dispatch(getProducts());
        }
    }
}

const getProducts = () => {
    return (dispatch, getState) => {
        const state = getState();
        const selectedDept = state.searchPage.selectedDepartment;
        const selectedCategory = state.searchPage.selectedCategory;
        const searchString = state.searchPage.searchString
        var url = '/api/products';
        if (selectedDept || selectedCategory || searchString) {
            url = url + "?";
            if (selectedDept) {
                url = url + `departmentId=${selectedDept}`;
            }
            if (selectedCategory) {
                if (selectedDept) {
                    url = url + "&";
                }
                url = url + `categoryId=${selectedCategory}`;
            }
            if (searchString) {
                if (selectedDept || selectedCategory) {
                    url = url + "&";
                }
                url = url + `searchString=${searchString}`;
            }
        }
        axios.get(url).then(res => {
            dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: res.data });
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);