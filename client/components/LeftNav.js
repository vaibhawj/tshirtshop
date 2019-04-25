import React from 'react';
import {
    Typography, TextField, Paper, ListItemText, ListItem, List, withStyles
} from '@material-ui/core';
import { ReactHeight } from 'react-height';
import Cart from './Cart';

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
    }
});

class LeftNav extends React.Component {
    render() {
        const { classes } = this.props;
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
                    <Cart cartItems={this.props.cartItems} updateQuantity={this.props.updateQuantity} removeFromCart={this.props.removeFromCart} />
                </Paper>
            </ReactHeight>
        )
    }
}

export default withStyles(styles)(LeftNav);