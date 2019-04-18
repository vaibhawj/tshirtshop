import React from 'react';
import { Badge, withStyles } from '@material-ui/core';

const styles = {
    row: {
        display: "flex",
        flexDirection: "row"
    },
    pageNum: {
        marginRight: 20,
        marginBottom: 20

    },
    pageNumbers: {
        textAlign: "center",
        textSize: 20
    }
}

class Pagination extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={`${classes.row} ${classes.pageNumbers}`}>
                {
                    [...Array(this.props.totalPages).keys()].map(i => {
                        if (i == this.props.currentPage) {
                            return (<Badge key={`p-${i}`} badgeContent={i} color="secondary" className={classes.pageNum} style={{ cursor: "default" }}> </Badge>)
                        } else {
                            return (<Badge key={`p-${i}`} badgeContent={i} className={classes.pageNum} style={{ cursor: "pointer" }}> </Badge>)
                        }
                    })
                }
            </div>
        )
    }
}

export default withStyles(styles)(Pagination);