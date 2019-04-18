import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField, Paper, ListItemText, ListItem, Divider, List } from '@material-ui/core';
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
        textAlign: "center"
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
                                        <ListItemText secondary={d.name.toUpperCase()} secondaryTypographyProps={{variant: "button"}} />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                    <Divider />
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
                                    <ListItemText secondary={c.name.toUpperCase()} secondaryTypographyProps={{variant: "button"}} />
                                </ListItem>
                            ))
                        }
                    </List>
                </Paper>
            </ReactHeight>
        )
    }
}

export default withStyles(styles)(LeftNav);