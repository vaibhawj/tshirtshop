import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent } from '@material-ui/core';
import LeftNav from '../../components/LeftNav';

const styles = theme => ({
    content: {
        flexGrow: 1
    }
});


class Search extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <LeftNav />
                <main className={classes.content} style={{ paddingLeft: 240, paddingTop: 100 }}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Word of the Day
                            </Typography>
                        </CardContent>
                    </Card>
                </main>>
            </div>
        )
    }
}

export default withStyles(styles)(Search);