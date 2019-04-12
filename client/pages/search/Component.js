import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import styles from './styles';
import { Typography } from '@material-ui/core';

class Search extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
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
                    <Paper className={classes.searchRoot} elevation={1}>
                        <InputBase className={classes.searchInput} placeholder="Search" />
                        <IconButton className={classes.searchIconButton} aria-label="Search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <Divider />
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
            </div>
        )
    }
}

export default withStyles(styles)(Search);