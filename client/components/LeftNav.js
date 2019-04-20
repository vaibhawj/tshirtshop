import React from 'react';
import { Typography, TextField, Paper, ListItemText, ListItem, Divider, List, withStyles } from '@material-ui/core';
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
    filterText: {
        color: '#989898',
        marginLeft: 8
    },
    listItem: {
        textAlign: "center",
        backgroundColor: "#F2F2F2",
        marginBottom: 5
    },
    cartList: {
        backgroundColor: "#F2F2F2",
        marginBottom: 20
    },
    cartItem: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5
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
                    <Typography variant="h6" noWrap className={classes.filterText}>Department</Typography>
                    <List>
                        {
                            this.props.departments.map(d => {
                                return (
                                    <ListItem button key={d.id} divider selected={this.props.selectedDepartment == d.id}
                                        className={classes.listItem}
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.searchDepartment(d.id)
                                        }
                                        }>
                                        <ListItemText secondary={d.name.toUpperCase()} secondaryTypographyProps={{ variant: "button" }} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                    <Typography variant="h6" noWrap className={classes.filterText}>Category</Typography>
                    <List>
                        {
                            this.props.categories.map(c => (
                                <ListItem button key={c.id} divider selected={this.props.selectedCategory == c.id}
                                    className={classes.listItem}
                                    onClick={e => {
                                        e.preventDefault();
                                        this.props.searchCategory(c.id)
                                    }
                                    }>
                                    <ListItemText secondary={c.name.toUpperCase()} secondaryTypographyProps={{ variant: "button" }} />
                                </ListItem>
                            ))
                        }
                    </List>
                    {
                        this.props.cartItems.length > 0 &&
                        <div>
                            <Typography variant="h6" noWrap className={classes.filterText}>Cart</Typography>
                            <List>
                                {
                                    this.props.cartItems.map(i => {
                                        return (
                                            <div className={classes.cartList} key={`${i.id}-${i.size}-${i.color}`}>
                                                <Typography variant="subtitle1" className={classes.cartItem}>1 <span style={{ color: "deeppink" }}>x</span> <span style={{ color: "grey" }}>{i.name}</span></Typography>
                                                <Typography variant="subtitle2" className={classes.cartItem} color="textSecondary">Size: {i.size}</Typography>
                                                <Typography variant="subtitle2" className={classes.cartItem} color="textSecondary">Color: {i.color}</Typography>
                                            </div>
                                        )
                                    })
                                }
                            </List>
                        </div>
                    }
                </Paper>
            </ReactHeight>
        )
    }
}

export default withStyles(styles)(LeftNav);