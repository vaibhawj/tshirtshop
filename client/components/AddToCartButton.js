import React from 'react';
import { Button } from '@material-ui/core'

class AddToCartButton extends React.Component {
    render() {
        const p = this.props.product;
        return (
            <Button color="secondary" variant="contained" className={this.props.class}
                onClick={
                    e => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.props.addToCart({
                            id: p.productId,
                            name: p.name,
                            image: p.image,
                            size: this.props.size,
                            color: this.props.color,
                            price: p.discountedPrice == 0 ? p.price : p.discountedPrice,
                            quantity: this.props.quantity
                        });
                    }
                }>Add to cart</Button>
        )
    }
}

export default AddToCartButton;