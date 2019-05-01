import React from 'react';
import {
    AppBar as MuiAppbar, Toolbar, Button, Dialog, DialogContent,
    TextField, withStyles, Tabs, Tab, Typography
} from '@material-ui/core';
import axios from 'axios';


const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#4D5766"
    },
    toolBar: {
        justifyContent: "space-between"
    },
    tabContent: {
        padding: 10,
        display: "flex",
        flexDirection: "column"
    },
    button: {
        marginTop: 30
    }
});

class AppBar extends React.Component {

    componentDidMount() {
        axios.get("/api/auth/status")
            .then(res => this.setState({ loggedInUser: res.data }))
            .catch(err => console.log(err));
    }

    constructor() {
        super();
        this.state = {
            openSignIn: false,
            activeTab: 0,
            name: "",
            email: "",
            password: "",
            loggedInUser: false,
            error: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.clearDialogState = this.clearDialogState.bind(this);
    }

    handleInputChange(type) {
        return e => {
            e.preventDefault();
            this.setState({ [`${type}`]: e.target.value, error: false })
        }
    }

    handleClick(type) {
        return e => {
            e.preventDefault();
            switch (type) {
                case "login":
                    axios.post("/api/auth/login", {
                        email: this.state.email,
                        password: this.state.password
                    })
                        .then(
                            res => {
                                this.setState({ loggedInUser: res.data, error: false });
                                this.closeDialog();
                            })
                        .catch(err => this.setState({ error: true }));
                    break;
                case "signup":
                    axios.post("/api/auth/signup", {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password
                    }).then(
                        res => {
                            this.setState({ loggedInUser: res.data, error: false });
                            this.closeDialog();
                        }
                    ).catch(err => this.setState({ error: true }));
                    break;
            }
        }
    }

    handleLogout() {
        axios.post("/api/auth/logout")
            .then(() => this.setState({ loggedInUser: false }))
            .catch(err => console.log(err));
    }

    closeDialog() {
        this.setState({ openSignIn: false, activeTab: 0 });
        this.clearDialogState();
    }

    clearDialogState() {
        this.setState({ name: "", email: "", password: "", error: false });
    }

    render() {
        const { classes } = this.props;
        return (
            <MuiAppbar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <img src="/images/shop.png" />
                    {
                        this.state.loggedInUser &&
                        <div style={{ display: "flex", flexDirection: "row", flexFlow: "vertical-center" }}>
                            <Typography color="inherit" variant="subtitle2" fontFamily="Monospace">{this.state.loggedInUser}</Typography>
                            <Button color="secondary" size="small" onClick={e => {
                                e.preventDefault();
                                this.handleLogout();
                            }}>Logout</Button>
                        </div>
                    }
                    {
                        !this.state.loggedInUser &&
                        <Button color="secondary" size="small" onClick={e => {
                            e.preventDefault();
                            this.setState({ openSignIn: true })
                        }}>Login | Sign up</Button>
                    }
                    <Dialog open={this.state.openSignIn} onClose={e => {
                        e.preventDefault();
                        this.closeDialog();
                    }}>
                        <DialogContent>
                            <Tabs value={this.state.activeTab} onChange={(e, value) => {
                                e.preventDefault();
                                this.setState({ activeTab: value });
                                this.clearDialogState();
                            }}>
                                <Tab label="Login" />
                                <Tab label="Sign Up" />
                            </Tabs>
                            {
                                this.state.activeTab == 0 &&
                                <div className={classes.tabContent}>
                                    {this.state.error && <Typography color="secondary" variant="caption">Login failed. Please try again</Typography>}
                                    <TextField placeholder="Email" margin="normal" onChange={this.handleInputChange("email")} value={this.state.email} />
                                    <TextField placeholder="Password" type="password" margin="normal" onChange={this.handleInputChange("password")} value={this.state.password} />
                                    <Button className={classes.button} color="secondary" variant="contained" margin="normal" onClick={this.handleClick("login")}>Login</Button>
                                </div>
                            }
                            {
                                this.state.activeTab == 1 &&
                                <div className={classes.tabContent}>
                                    {this.state.error && <Typography color="secondary" variant="caption">Signup failed. Please try again</Typography>}
                                    <TextField placeholder="Name" margin="normal" onChange={this.handleInputChange("name")} value={this.state.name}></TextField>
                                    <TextField placeholder="Email" margin="normal" onChange={this.handleInputChange("email")} value={this.state.email}></TextField>
                                    <TextField placeholder="Password" type="password" margin="normal" onChange={this.handleInputChange("password")} value={this.state.password} ></TextField>
                                    <Button className={classes.button} color="secondary" variant="contained" margin="normal" onClick={this.handleClick("signup")}>Sign up</Button>
                                </div>
                            }
                        </DialogContent>
                    </Dialog>
                </Toolbar>
            </MuiAppbar>
        )
    }
}

export default withStyles(styles)(AppBar);