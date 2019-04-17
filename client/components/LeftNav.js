import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import { Typography, TextField } from '@material-ui/core'

const drawerWidth = 270;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    searchInput: {
        marginTop: 30,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 20
    },
    filterText: {
        color: 'grey',
        marginLeft: 8
    }
});

class LeftNav extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <TextField className={classes.searchInput} placeholder="Search" />
                <Typography variant="h6" noWrap className={classes.filterText}>Department</Typography>
                <List>
                    {
                        this.props.departments.map(d => (
                            <ListItem button key={d.id}>
                                <ListItemText primary={d.name} />
                            </ListItem>
                        ))
                    }
                </List>
                <Divider />
                <Typography variant="h6" noWrap className={classes.filterText}>Category</Typography>
                <List>
                    {
                        this.props.categories.map(c => (
                            <ListItem button key={c.id}>
                                <ListItemText primary={c.name} />
                            </ListItem>
                        ))
                    }
                </List>
            </Drawer>
        )
    }
}

export default withStyles(styles)(LeftNav);