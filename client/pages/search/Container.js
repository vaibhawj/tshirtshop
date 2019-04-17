import SearchComponent from './Component';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => {
    return {
        products: state.searchPage.products,
        departments: state.searchPage.departments,
        categories: state.searchPage.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(getProducts())
    }
}

const getProducts = () => {
    return (dispatch) => {
        axios.get('/api/products').then(res => {
            dispatch({type: "GET_PRODUCTS_SUCCESS", payload: res.data});
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);