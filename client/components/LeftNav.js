import React from 'react';
import { Typography, TextField, Paper, ListItemText, ListItem, List, withStyles, Button } from '@material-ui/core';
import { ReactHeight } from 'react-height';

const drawerWidth = 270;

const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        marginLeft: 20
    },
    drawerPaper: {
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    searchInput: {
        marginTop: 30,
        paddingLeft: 10,
        marginBottom: 20,
        width: "92%"
    },
    text: {
        color: '#989898',
        marginLeft: 8
    },
    filterList: {
        marginLeft: 10,
        marginRight: 10
    },
    listItem: {
        textAlign: "center",
        backgroundColor: "#F2F2F2",
        marginBottom: 5
    },
    cartList: {
        backgroundColor: "#F2F2F2",
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10
    },
    cartItem: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    totalPrice: {
        display: "flex",
        flexDirection: "row"
    }
});

class LeftNav extends React.Component {
    render() {
        const { classes } = this.props;
        const cartItems = this.props.cartItems;
        const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return (
            <ReactHeight onHeightReady={() => { }} className={classes.drawer}>
                <Paper anchor="left">
                    <div className={classes.toolbar} />
                    <TextField className={classes.searchInput} placeholder="Search"
                        onChange={e => this.props.searchProducts(e.target.value)} />
                    <Typography variant="h6" noWrap className={classes.text}>Department</Typography>
                    <List>
                        {
                            this.props.departments.map(d => {
                                return (
                                    <div className={classes.filterList} key={`d-${d.id}`}>
                                        <ListItem button divider selected={this.props.selectedDepartment == d.id}
                                            className={classes.listItem}
                                            onClick={e => {
                                                e.preventDefault();
                                                this.props.searchDepartment(d.id)
                                            }
                                            }>
                                            <ListItemText secondary={d.name.toUpperCase()} secondaryTypographyProps={{ variant: "button" }} />
                                        </ListItem>
                                    </div>
                                )
                            })
                        }
                    </List>
                    <Typography variant="h6" noWrap className={classes.text}>Category</Typography>
                    <List>
                        {
                            this.props.categories.map(c => (
                                <div className={classes.filterList} key={`c-${c.id}`}>
                                    <ListItem button divider selected={this.props.selectedCategory == c.id}
                                        className={classes.listItem}
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.searchCategory(c.id)
                                        }
                                        }>
                                        <ListItemText secondary={c.name.toUpperCase()} secondaryTypographyProps={{ variant: "button" }} />
                                    </ListItem>
                                </div>
                            ))
                        }
                    </List>
                    {
                        cartItems.length > 0 &&
                        <div>
                            <Typography variant="h6" noWrap className={classes.text}>Cart</Typography>
                            <List>
                                {
                                    cartItems.map(i => {
                                        return (
                                            <div className={classes.cartList} key={`d-${i.id}-${i.size}-${i.color}`}>
                                                <Typography variant="subtitle1" className={classes.cartItem}>{i.quantity} <span style={{ color: "deeppink" }}>x</span> <span style={{ color: "grey" }}>{i.name}</span></Typography>
                                                <Typography variant="subtitle2" className={classes.cartItem} color="textSecondary">Size: {i.size}</Typography>
                                                <Typography variant="subtitle2" className={classes.cartItem} color="textSecondary">Color: {i.color}</Typography>
                                            </div>
                                        )
                                    })
                                }
                            </List>
                            <div style={{ width: 300, marginLeft: "52%" }}>
                                <div className={classes.totalPrice}>
                                    <Typography variant="body1" color="textSecondary" noWrap style={{ marginRight: 5 }}>Total Price:</Typography>
                                    <Typography noWrap style={{ color: "deeppink" }}>${totalPrice.toFixed(2)}</Typography>
                                </div>
                            </div>
                            <div style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
                                <Button fullWidth variant="contained" color="secondary">View Details</Button>
                            </div>
                        </div>
                    }
                </Paper>
            </ReactHeight>
        )
    }
}

export default withStyles(styles)(LeftNav);