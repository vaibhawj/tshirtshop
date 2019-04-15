import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import LeftNav from '../../components/LeftNav';

const styles = theme => ({
    content: {
        flexGrow: 1
    },
    media: {
        width: 250,
        height: 250,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundPosition: 'inherit'
    },
    card: {
        width: 270
    },
    discountedPrice: {
        color: "deeppink"
    },
    originalPrice: {
        color: "grey",
        textDecorationLine: "line-through"
    }
});


class Search extends React.Component {

    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <LeftNav />
                <main className={classes.content} style={{ paddingLeft: 240, paddingTop: 100 }}>
                    <Grid container spacing={16}>
                        {
                            this.props.products.map(p => {
                                return (
                                    <Grid item key={p.product_id}>
                                        <Card className={classes.card}>
                                            <CardMedia
                                                className={classes.media}
                                                image={`images/${p.image}`}
                                                title="Paella dish"
                                            />
                                            <CardContent>
                                                <Typography color="textSecondary" gutterBottom align="center">
                                                    <b>{p.name}</b>
                                                </Typography>
                                                <Typography gutterBottom align="center" className={classes.discountedPrice} variant="h6">
                                                    <b>${p.discounted_price}</b>
                                                </Typography>
                                                <Typography gutterBottom align="center" className={classes.originalPrice}>
                                                    ${p.price}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>)
                            })
                        }
                    </Grid>
                </main>>
            </div>
        )
    }
}

export default withStyles(styles)(Search);