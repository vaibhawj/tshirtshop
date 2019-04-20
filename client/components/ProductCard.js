import React from 'react';
import {
    Card, CardMedia, CardContent, Typography, withStyles,
    FormControl, Select, MenuItem, Button
} from '@material-ui/core';
import axios from 'axios';

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
        cursor: "pointer",
        position: "relative"
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
    },
    actionContent: {
        zIndex: 999,
        top: "5%",
        left: "50%",
        marginLeft: "-50%",
        width: 300,
        position: "absolute"
    },
    form: {
        marginTop: 100,
        display: "flex",
        flexDirection: "row"
    },
    formControl: {
        margin: 10,
        left: "15%",
        minWidth: 80,
    },
    button: {
        marginTop: "20%",
        width: 280,
        left: "50%",
        marginLeft: "-47%"
    }
});

class ItemDescription extends React.Component {
    render() {
        const p = this.props.product;
        const { classes } = this.props;
        return (
            <div>
                <Typography color="textSecondary" gutterBottom align="center" variant="subheading">
                    {p.name}
                </Typography>
                <Typography gutterBottom align="center" className={classes.sellingPrice} variant="h6">
                    <b>${p.discountedPrice == 0 ? p.price : p.discountedPrice}</b>
                </Typography>
                <Typography gutterBottom align="center" className={classes.originalPrice}>
                    {p.discountedPrice == 0 ? <br /> : `$${p.price}`}
                </Typography>
            </div>
        )
    }
}

const ItemDescriptionWithStyle = withStyles(styles)(ItemDescription);

class ProductCard extends React.Component {

    constructor() {
        super()
        this.state = {
            mouseOver: false,
            sizes: null,
            colors: null
        }
        this.fetchAttributes = this.fetchAttributes.bind(this);
    }

    fetchAttributes() {
        if (!this.state.sizes || !this.state.colors) {
            axios.get(`/api/products/${this.props.product.productId}/attributes`).then(res => {
                this.setState({
                    sizes: res.data.sizes,
                    colors: res.data.colors
                });
            });
        }
    }

    render() {
        const p = this.props.product;
        const { classes } = this.props;
        return (
            <Card className={classes.card}
                onMouseOver={
                    e => {
                        e.preventDefault();
                        this.setState({ mouseOver: true })
                        this.fetchAttributes();
                    }
                }
                onMouseOut={
                    e => {
                        e.preventDefault();
                        this.setState({ mouseOver: false })
                    }
                }
            >
                <CardContent style={this.state.mouseOver ? { opacity: 0.2 } : { opacity: 1 }}>
                    <CardMedia
                        className={classes.media}
                        image={`images/${p.image}`}
                        title={p.name}
                    />
                    <CardContent>
                        <ItemDescriptionWithStyle product={p} />
                    </CardContent>
                </CardContent>
                <CardContent hidden={!this.state.mouseOver} className={classes.actionContent}>
                    <ItemDescriptionWithStyle product={p} />
                    {
                        this.state.sizes && this.state.colors &&
                        <form>

                            <div className={classes.form}>
                                <FormControl className={classes.formControl}>
                                    <Select value={this.state.sizes[0].id}>
                                        {
                                            this.state.sizes.map(s => <MenuItem key={s.id} value={s.id}>{s.value}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <Select value={this.state.colors[0].id}>
                                        {
                                            this.state.colors.map(c => <MenuItem key={c.id} value={c.id}>{c.value}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <Button color="secondary" variant="contained" className={classes.button}>Add to cart</Button>
                        </form>
                    }
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(ProductCard);