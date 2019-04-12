const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    searchRoot: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    searchInput: {
        marginLeft: 8,
        flex: 1,
    },
    searchIconButton: {
        padding: 10,
    },
    filterText: {
        color: 'grey',
        marginLeft: 8
    }
});

export default styles;