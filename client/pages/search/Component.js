import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import LeftNav from '../../components/LeftNav';

const styles = theme => ({
    content: {
        flexGrow: 1,
        paddingLeft: 40,
        paddingTop: 100
    },
    media: {
        width: 280,
        height: 280,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundPosition: 'inherit'
    },
    card: {

    },
    discountedPrice: {
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


class Search extends React.Component {

    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.row}>
                <LeftNav departments={this.props.departments}
                    categories={this.props.categories}
                    selectedDepartment={this.props.selectedDepartment}
                    selectedCategory={this.props.selectedCategory}
                    searchDepartment={this.props.searchDepartment}
                    searchCategory={this.props.searchCategory} />
                <main className={classes.content}>
                    <Grid container spacing={16}>
                        {
                            this.props.products.map(p => {
                                return (
                                    <Grid item key={p.productId}>
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
                                                    <b>${p.discountedPrice}</b>
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