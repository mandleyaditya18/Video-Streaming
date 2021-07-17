import { Fragment, useEffect, useState } from "react";
import axios from 'axios';
import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { Route, Link } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';

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
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(1);
    const [limit, setLimit] = useState(6);

    useEffect(() => {
        const getAllVideos = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/home?page=${page}`);
                const data = await res.data;

                // console.log(count);
                setVideos(data);
            }
            catch (error) {
                console.log('Something went wrong', error);
            }           
        }

        const getCount = async () => {
            try {
                const res = await axios.get('http://localhost:5000/count');
                const data = await res.data;
                
                setCount(data);
            }
            catch (error) {
                console.log('Something went wrong', error);
            }
        }

        getCount();
        getAllVideos();
    },[page]);

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
            <Container component={Box} py={3}>
                <Pagination 
                    size='large'
                    count={count}
                    color='primary'
                    page={page}
                    defaultPage={page} 
                    style={{backgroundColor: 'white'}}
                    showFirstButton={true}
                    showLastButton={true}
                    onChange={(event, value) => setPage(value)}
                />

            </Container>
            </Grid>
            
        );
    }
    else {
        return null;
    }
}

export default Home;