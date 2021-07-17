import { Fragment, useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import { makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    player: {
        width: '100%',
        height: '100%',
        margin: 'auto'
    }
}));

const PlayVideo = props => {
    const classes = useStyles();
    const { id } = useParams();
    const [video, setVideo] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    
    useEffect(() => {
        const getVideo = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/home/${id}`);
                const data = await res.data;

                console.log(data);
                setVideo(data);
            }
            catch (err) {
                console.log('Something went wrong', err);
            }
        }

        getVideo();
    }, []);

    const playHandler = () => {
        setIsPlaying(!isPlaying);
    }

    return (
        <Fragment>
            <ReactPlayer 
                url={process.env.REACT_APP_UPLOAD_PATH + video.video} 
                onClick={playHandler}
                playing={isPlaying}
                controls={true}
                className={classes.player}
            />
        </Fragment>
    );
};

export default PlayVideo;