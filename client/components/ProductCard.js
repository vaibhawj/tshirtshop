import React from 'react';
import { Card, CardMedia, CardContent, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
    media: {
        width: 280,
        height: 280,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundPosition: 'inherit'
    },
    card: {
        cursor: "pointer"
    },
    sellingPrice: {
        color: "deeppink"
    },
    originalPrice: {
        color: "grey",
        textDecorationLine: "line-through"
    },
    row: {
        display: "flex",
        flexDirection: "row"
    }
});

class ProductCard extends React.Component {
    render() {
        const p = this.props.product;
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={`images/${p.image}`}
                    title={p.name}
                />
                <CardContent>
                    <Typography color="textSecondary" gutterBottom align="center" variant="subheading">
                        {p.name}
                    </Typography>
                    <Typography gutterBottom align="center" className={classes.sellingPrice} variant="h6">
                        <b>${p.discountedPrice == 0 ? p.price : p.discountedPrice}</b>
                    </Typography>
                    <Typography gutterBottom align="center" className={classes.originalPrice}>
                        {p.discountedPrice == 0 ? <br /> : `$${p.price}`}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(ProductCard);