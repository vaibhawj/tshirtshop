import React from 'react';
import {
    withStyles, Typography, Card, CardContent,
    CardMedia, TextField, List, ListItem, Button
} from '@material-ui/core';

import AddToCartButton from '../../components/AddToCartButton';

const styles = theme => ({
    content: {
        flexGrow: 1,
        paddingTop: 100,
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 10,
        marginRight: 10
    },
    media: {
        width: 270,
        height: 270,
        marginLeft: 10,
        marginRight: 10
    },
    smallMedia: {
        width: 100,
        height: 100,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        cursor: "pointer"
    },
    sellingPrice: {
        color: "deeppink"
    },
    originalPrice: {
        color: "grey",
        textDecorationLine: "line-through",
        marginLeft: 10,
        paddingTop: 5
    },
    size: {
        border: 2,
        marginRight: 5,
        width: 150
    },
    color: {
        border: 2,
        marginRight: 5
    },
    addToCart: {
        marginTop: 20
    }
});

class Details extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedColor: null,
            selectedSize: null,
            bigImage: null,
            quantity: 1
        }
    }

    componentDidMount() {
        this.props.getProduct(this.props.match.params.productId);
    }

    render() {
        const { classes } = this.props;
        const p = this.props.product;
        return (
            <Card className={classes.content}>
                {
                    this.props.product &&
                    <CardContent>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div>
                                <div style={{ border: 2, borderColor: "red", padding: 20, backgroundColor: "white" }}>
                                    <CardMedia
                                        className={classes.media}
                                        image={`/images/${this.state.bigImage ? this.state.bigImage : p.image}`}
                                        title={p.name}
                                    />
                                </div>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <CardMedia
                                        className={classes.smallMedia}
                                        image={`/images/${p.image}`}
                                        title={p.name}
                                        onClick={e => {
                                            e.preventDefault();
                                            this.setState({ bigImage: p.image })
                                        }}
                                    />
                                    <CardMedia
                                        className={classes.smallMedia}
                                        image={`/images/${p.image2}`}
                                        title={p.name}
                                        onClick={e => {
                                            e.preventDefault();
                                            this.setState({ bigImage: p.image2 })
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginLeft: 20 }}>
                                <Typography color="textSecondary" variant="caption">
                                    <span onClick={e => {
                                        e.preventDefault();
                                        this.props.history.push("/");
                                    }} style={{ cursor: "pointer" }}>Home</span> / {p.name}
                                </Typography>
                                <Typography color="textPrimary" variant="h6" style={{ marginTop: 20 }}>
                                    {p.name}
                                </Typography>
                                <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                                    <Typography gutterBottom className={classes.sellingPrice} variant="h6">
                                        <b>${p.discountedPrice == 0 ? p.price : p.discountedPrice}</b>
                                    </Typography>
                                    <Typography gutterBottom className={classes.originalPrice}>
                                        {p.discountedPrice == 0 ? <br /> : `$${p.price}`}
                                    </Typography>
                                </div>
                                <Typography color="textSecondary" variant="body2">
                                    {p.description}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" style={{ marginTop: 10 }}>Quantity</Typography>
                                <TextField type="number" inputProps={{ min: "1", step: "1" }} style={{ marginBottom: 5, width: 100 }}
                                    value={this.state.quantity} onChange={e => {
                                        e.preventDefault();
                                        const quantity = Number.parseInt(e.target.value);
                                        this.setState({ quantity: quantity <= 0 ? 1 : quantity })
                                    }} />
                                <Typography variant="h6" color="textSecondary" style={{ marginTop: 10 }}>Size</Typography>
                                <List style={{ display: "flex", flexDirection: "row" }}>
                                    {
                                        p.sizes.map((s, i) => <ListItem button key={s.id} className={classes.size}
                                            selected={i == 0} onClick={e => {
                                                e.preventDefault();
                                                this.setState({ selectedSize: s.value })
                                            }} selected={this.state.selectedSize ? s.value == this.state.selectedSize : i == 0}
                                        >
                                            <Typography variant="button" color="textSecondary">{s.value}</Typography>
                                        </ListItem>)
                                    }
                                </List>
                                <Typography variant="h6" color="textSecondary" style={{ marginTop: 10 }}>Color</Typography>
                                <List style={{ display: "flex", flexDirection: "row" }}>
                                    {
                                        p.colors.map((c, i) => <ListItem alignItems="center" button key={c.id} className={classes.color}
                                            onClick={e => {
                                                e.preventDefault();
                                                this.setState({ selectedColor: c.value })
                                            }} selected={this.state.selectedColor ? c.value == this.state.selectedColor : i == 0}
                                        >
                                            <Typography variant="button" color="textSecondary">{c.value}</Typography>
                                        </ListItem>)
                                    }
                                </List>
                                <AddToCartButton class={classes.addToCart} product={p} size={this.state.selectedSize || p.sizes[0].value} color={this.state.selectedColor || p.colors[0].value}
                                    quantity={this.state.quantity} addToCart={this.props.addToCart}
                                />
                            </div>
                        </div>

                    </CardContent>
                }
            </Card>
        )
    }
}

export default withStyles(styles)(Details);