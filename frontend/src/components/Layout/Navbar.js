import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    navlink: {
        textDecoration: 'none',
        color: 'white'
    }
  }));

const Navbar = () => {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary" >
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        Video Player
                    </Typography>
                    
                    <Button color="inherit">
                        <NavLink to="/home" className={classes.navlink}>HOME</NavLink>
                    </Button>
                    <Button color="inherit">
                        <NavLink to="/upload" className={classes.navlink}>UPLOAD</NavLink>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;