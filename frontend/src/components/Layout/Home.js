import { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { Grid, makeStyles, Paper } from "@material-ui/core";
import { Route, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    img: {
        width: '100%',
        height: '80%',
        // marginTop: '10%',
        objectFit: 'contain',
        '&:hover': {
            cursor: 'pointer',
         },
    },
    root: {
        width: '80%',
        flexGrow: 1,
        margin: 'auto'
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#404040'
    },
    text: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
}));

const Home = props => {
    const [videos, setVideos] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const getAllVideos = async () => {
            try {
                const res = await axios.get('http://localhost:5000/home');
                const data = await res.data;

                console.log(data);
                setVideos(data);
            }
            catch (error) {
                console.log('Something went wrong', error);
            }           
        }

        getAllVideos();
    },[]);

    // const playVideoHandler = (id, url) => {
    //     const vUrl = process.env.PUBLIC_URL+'/uploads/'+url;
    //     <Route path='home/:id'>
    //         <PlayVideo url={vUrl} id={id} />
    //     </Route>
    // }

    if (videos) {
        return (
            <Grid container className={classes.root} spacing={3}>
                {/* <img src={process.env.PUBLIC_URL + '/uploads/dog.png'} alt='dog' /> */}
                {videos.map((video) => (
                    <Grid container item key={video._id} xs={4}>
                        <Paper className={classes.paper}>
                            <Link to={`/home/${video._id}`}>
                                <img 
                                    src={process.env.REACT_APP_UPLOAD_PATH + video.thumbnail}
                                    alt={video.title} 
                                    className={classes.img}
                                    // onClick={() => playVideoHandler(video._id, video.video)} 
                                />
                            </Link>
                            <h3>{video.name}</h3>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            
        );
    }
    else {
        return null;
    }
}

export default Home;