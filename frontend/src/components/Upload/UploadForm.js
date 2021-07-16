import { useState } from "react";
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import axios from 'axios';
import Spinner from '../UI/Spinner';

const useStyles = makeStyles((theme) => ({
    label: {
        marginTop: '1em',
        marginBottom: '0em'
    },
    form: {
        minWidth: '40%'
    },
    file: {
        
    }
}));

const UploadForm = props => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [language, setLanguage] = useState('');
    const [imageName, setImageName] = useState('');
    const [videoName, setVideoName] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const imageHandler = event => {
        event.preventDefault();
        setImageName(event.target.files[0]);
    }

    const videoHandler = event => {
        event.preventDefault();
        setVideoName(event.target.files[0]);
    }

    const submitHandler = e => {
        e.preventDefault();

        setIsLoading(true);
        const formData = new FormData();

        formData.append('name', name);
        formData.append('year', year);
        formData.append('language', language);
        formData.append('thumbnailImage', imageName);
        formData.append('video', videoName);

        axios
            .post('http://localhost:5000/upload', formData)
            .then((res) => setMessage(res.data))
            .catch((err) => {
                console.log(err);
        });

        setName('');
        setYear('');
        setLanguage('');
        setImageName('');
        setVideoName('');
        setIsLoading(false);
    }

    return (
        <Grid container>
            <Grid container item alignItems='center' direction='column' style={{padding: 10}}>
                <h1>Upload Video</h1>
                <span>{message}</span>
                <div style={{height: 10}} />
                <form onSubmit={submitHandler} className={classes.form} encType='multipart/form-data'>
                    <h3 className={classes.label}>Movie Name</h3>
                    <TextField 
                        label='Movie Name' 
                        margin='normal'
                        variant='outlined'
                        fullWidth={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <h3 className={classes.label}>Year of Release</h3>
                    <TextField 
                        label='Year of Release' 
                        margin='normal'
                        variant='outlined'
                        fullWidth={true}
                        value={year}
                        onChange={(e) => setYear(e.target.value)}  
                    />
                    <h3 className={classes.label}>Language</h3>
                    <TextField 
                        label='Language' 
                        margin='normal'
                        variant='outlined'
                        fullWidth={true}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)} 
                    />
                    <h3 className={classes.label}>Upload Thumbnail</h3>
                    <input 
                        className={classes.file} 
                        type='file' 
                        name='thumbnailImage' 
                        onChange={imageHandler}
                    />
                    <h3 className={classes.label}>Upload Video</h3>
                    <input 
                        className={classes.file} 
                        type='file' 
                        name='video'  
                        onChange={videoHandler}
                    />
                    <div style={{height: 20}} />
                    <Button color='secondary' variant='contained' fullWidth={true} type='submit'>
                        Submit
                    </Button>
                    <span>
                        {isLoading && <Spinner />}
                    </span>
                </form>
            </Grid>
        </Grid>
    );
}

export default UploadForm;