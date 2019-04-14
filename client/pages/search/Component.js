import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, CardMedia } from '@material-ui/core';
import LeftNav from '../../components/LeftNav';
import axios from 'axios';

const styles = theme => ({
    content: {
        flexGrow: 1
    },
    media: {
        paddingTop: '56.25%'
    }
});


class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get('/api/products').then(res => {
            this.setState({ products: res.data })
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <LeftNav />
                <main className={classes.content} style={{ paddingLeft: 240, paddingTop: 100 }}>
                    {
                        this.state.products.map(p => {
                            return (
                                <Card>
                                    <CardMedia
                                        className={classes.media}
                                        image={`images/${p.image}`}
                                        title="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            {p.name}
                                        </Typography>
                                    </CardContent>
                                </Card>)
                        })
                    }

                </main>>
            </div>
        )
    }
}

export default withStyles(styles)(Search);