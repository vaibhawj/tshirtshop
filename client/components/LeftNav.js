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
        width: "90%"
    },
    filterText: {
        color: 'grey',
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
                    <Divider />
                    <TextField className={classes.searchInput} placeholder="Search" />
                    <Typography variant="h6" noWrap className={classes.filterText}>Department</Typography>
                    <List>
                        {
                            this.props.departments.map(d => {
                                return (
                                    <ListItem button key={d.id} selected={this.props.selectedDepartment == d.id}
                                        className={classes.listItem}
                                        onClick={e => {
                                            e.preventDefault();
                                            this.props.searchDepartment(d.id)
                                        }
                                        }>
                                        <ListItemText primary={d.name.toUpperCase()} />
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
                                <ListItem button key={c.id} selected={this.props.selectedCategory == c.id}
                                    className={classes.listItem}
                                    onClick={e => {
                                        e.preventDefault();
                                        this.props.searchCategory(c.id)
                                    }
                                    }>
                                    <ListItemText primary={c.name.toUpperCase()} />
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