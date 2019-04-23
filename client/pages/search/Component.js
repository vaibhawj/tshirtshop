import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import LeftNav from '../../components/LeftNav';
import Pagination from '../../components/Pagination';
import Card from '../../components/ProductCard';

const styles = theme => ({
    content: {
        flexGrow: 1,
        paddingLeft: 23,
        paddingTop: 100
    },
    row: {
        display: "flex",
        flexDirection: "row"
    }
});


class Search extends React.Component {

    componentWillMount() {
        if (this.props.location != "/") {
            this.props.history.push("/");
        }
    }

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
                    searchCategory={this.props.searchCategory}
                    searchProducts={this.props.searchProducts}
                    cartItems={this.props.cartItems}
                    removeFromCart={this.props.removeFromCart} />
                <main className={classes.content}>
                    <Pagination totalPages={this.props.totalPages} currentPage={this.props.currentPage} onPageChange={this.props.goToPage} />
                    <Grid container spacing={16}>
                        {
                            this.props.products.map(p => {
                                return (
                                    <Grid item key={p.productId}>
                                        <Card product={p} addToCart={this.props.addToCart} history={this.props.history} />
                                    </Grid>)
                            })
                        }
                    </Grid>
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(Search);