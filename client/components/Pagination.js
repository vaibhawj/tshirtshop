import React from 'react';
import { Badge, withStyles } from '@material-ui/core';

const styles = {
    row: {
        display: "flex",
        flexDirection: "row"
    },
    pageNum: {
        marginRight: 20
    },
    pageNumbers: {
        marginLeft: "40%",
        marginBottom: 21
    }
}

class Pagination extends React.Component {
    render() {
        const { classes } = this.props;
        const pages = [];
        for (var i = 1; i <= this.props.totalPages; i++) {
            pages.push(i);
        }
        return (
            <div className={`${classes.row} ${classes.pageNumbers}`}>
                {
                    pages.map(i => {
                        if (i == this.props.currentPage) {
                            return (<Badge key={`p-${i}`} badgeContent={i} color="secondary" className={classes.pageNum} style={{ cursor: "default" }}> </Badge>)
                        } else {
                            return (<Badge key={`p-${i}`} badgeContent={i} className={classes.pageNum} style={{ cursor: "pointer" }}
                                onClick={e => {
                                    e.preventDefault();
                                    this.props.onPageChange(i);
                                }}
                            > </Badge>)
                        }
                    })
                }
            </div>
        )
    }
}

export default withStyles(styles)(Pagination);