import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import { Typography, TextField } from '@material-ui/core'

const drawerWidth = 240;

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
                    {['REGIONAL', 'NATURE', 'SEASONAL'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Typography variant="h6" noWrap className={classes.filterText}>Category</Typography>
                <List>
                    {['ANIMAL', 'FLOWER'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        )
    }
}

export default withStyles(styles)(LeftNav);