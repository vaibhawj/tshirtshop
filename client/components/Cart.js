import React from 'react';
import {
    withStyles, Typography, List, Button, Dialog, DialogContent, DialogActions,
    Table, TableHead, TableBody, TableRow, TableCell, IconButton, TextField, Divider
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
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
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    smallMedia: {
        width: 75,
        height: 75
    },
    text: {
        color: '#989898',
        marginLeft: 8
    }
});

const DeleteAction = ({ item, removeFromCart }) =>
    <IconButton size="small" onClick={
        e => {
            e.preventDefault();
            e.stopPropagation();
            removeFromCart(item);
        }
    }
    >
        <DeleteIcon fontSize="small" />
    </IconButton>

const TotalPrice = ({ classes, totalPrice }) =>
    <div className={classes.totalPrice}>
        <Typography variant="body1" color="textSecondary" noWrap style={{ marginRight: 5 }}>Total Price:</Typography>
        <Typography noWrap style={{ color: "deeppink" }}>${totalPrice.toFixed(2)}</Typography>
    </div>

class Cart extends React.Component {

    constructor() {
        super();
        this.state = {
            showCartDialog: false
        }
    }

    render() {
        const { cartItems, classes } = this.props;
        if (cartItems.length == 0) {
            return null;
        }

        const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return (
            <div>
                <Typography variant="h6" noWrap className={classes.text}>Cart</Typography>
                <List>
                    {
                        cartItems.map(i => {
                            return (
                                <div className={classes.cartList} key={`d-${i.id}-${i.size}-${i.color}`}>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Typography variant="subtitle1" className={classes.cartItem}>{i.quantity} <span style={{ color: "deeppink" }}>x</span> <span style={{ color: "grey" }}>{i.name}</span></Typography>
                                        <DeleteAction removeFromCart={this.props.removeFromCart} item={i} />
                                    </div>
                                    <Typography variant="subtitle2" className={classes.cartItem} color="textSecondary">Size: {i.size}</Typography>
                                    <Typography variant="subtitle2" className={classes.cartItem} color="textSecondary">Color: {i.color}</Typography>
                                </div>
                            )
                        })
                    }
                </List>
                <div style={{ width: 300, marginLeft: "52%" }}>
                    <TotalPrice classes={classes} totalPrice={totalPrice} />
                </div>
                <div style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
                    <Button fullWidth variant="contained" color="secondary" onClick={
                        e => {
                            e.preventDefault();
                            this.setState({ showCartDialog: true });
                        }
                    }>View Details</Button>
                    <Dialog
                        open={this.state.showCartDialog}
                        onClose={e => {
                            e.preventDefault();
                            this.setState({
                                showCartDialog: false
                            })
                        }}
                        scroll="paper"
                        aria-labelledby="scroll-dialog-title"
                        fullWidth maxWidth="md"
                    >
                        <DialogContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item</TableCell>
                                        <TableCell>Options</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cartItems.map(i => <TableRow key={`r-${i.id}`}>
                                            <TableCell>
                                                <img
                                                    className={classes.smallMedia}
                                                    src={`/images/${i.image}`}
                                                    title={i.name}
                                                />
                                                <Typography color="textSecondary" variant="caption">{i.name}</Typography>
                                            </TableCell>
                                            <TableCell><Typography color="textSecondary" variant="caption">Size: {i.size}</Typography><Typography color="textSecondary" variant="caption">Color: {i.color}</Typography></TableCell>
                                            <TableCell>
                                                <TextField type="number" inputProps={{ min: "1", step: "1" }} style={{ width: 50 }}
                                                    defaultValue={i.quantity} onBlur={e => {
                                                        e.preventDefault();
                                                        const quantity = e.target.value;
                                                        this.props.updateQuantity({ ...i, quantity });
                                                    }} />
                                            </TableCell>
                                            <TableCell><Typography color="textSecondary" variant="caption">${(i.quantity * i.price).toFixed(2)}</Typography></TableCell>
                                            <TableCell><DeleteAction removeFromCart={this.props.removeFromCart} item={i} /></TableCell>
                                        </TableRow>)
                                    }
                                </TableBody>
                            </Table>
                        </DialogContent>
                        <DialogContent>
                            <TotalPrice classes={classes} totalPrice={totalPrice} />
                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <Button color="secondary" variant="contained">Checkout</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Cart);