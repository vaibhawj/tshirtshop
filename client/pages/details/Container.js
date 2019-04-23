import DetailsComponent from './Component';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => {
    return {
        product: state.detailsPage.product
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProduct: (productId) => dispatch(getProduct(productId)),
        addToCart: item => {
            dispatch({ type: "ADD_TO_CART", payload: item });
        }
    }
}

const getProduct = (productId) => {
    return (dispatch) => {
        var url = `/api/products/${productId}`;
        axios.get(url).then(res => {
            dispatch({ type: "GET_PRODUCT_SUCCESS", payload: res.data });
        });
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetailsComponent);