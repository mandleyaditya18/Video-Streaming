import { Fragment, useEffect, useState } from "react";
import ReactPlayer from 'react-player';
import { useParams } from "react-router-dom";
import axios from 'axios';

const PlayVideo = props => {
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
                url={`${process.env.PUBLIC_URL+'/uploads/'+video.video}`} 
                onClick={playHandler}
                playing={isPlaying}
                controls={true}
            />
        </Fragment>
    );
};

export default PlayVideo;