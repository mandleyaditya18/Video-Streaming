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
        minWidth: '90%'
    },
    root: {
        backgroundColor: 'aliceblue',
        width: '50%',
        margin: 'auto',
        marginTop: '5%'
    },
    text: {
        backgroundColor: 'white'
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
    const [isError, setIsError] = useState({
        name: false,
        year: false,
        language: false
    });

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
            .post(process.env.REACT_APP_BASE_URL+'/upload', formData)
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
        <Grid container className={classes.root}>
            <Grid container item alignItems='center' direction='column' style={{padding: 10}}>
                <h1>Upload Video</h1>
                <span>{message}</span>
                <div style={{height: 10}} />
                <form onSubmit={submitHandler} className={classes.form} encType='multipart/form-data'>
                    <h3 className={classes.label}>Movie Name</h3>
                    <TextField
                        required
                        error={isError.name} 
                        label='Movie Name' 
                        margin='normal'
                        variant='outlined'
                        fullWidth={true}
                        value={name}
                        helperText=''
                        onChange={(e) => {
                            if (e.target.value.trim() === '' ){
                                setIsError((prev) => {
                                    return {...prev, name: true}
                                });
                            }
                            else {
                                setIsError((prev) => {
                                    return {...prev, name: false}
                                });
                            }
                            setName(e.target.value)
                        }}
                    />
                    <h3 className={classes.label}>Year of Release</h3>
                    <TextField
                        required
                        error={isError.year} 
                        label='Year of Release'  
                        margin='normal'
                        variant='outlined'
                        fullWidth={true}
                        value={year}
                        onChange={(e) => {
                            if (e.target.value.trim() === '' ){
                                setIsError((prev) => {
                                    return {...prev, year: true}
                                });
                            }
                            else {
                                setIsError((prev) => {
                                    return {...prev, year: false}
                                });
                            }
                            setYear(e.target.value)
                        }}  
                    />
                    <h3 className={classes.label}>Language</h3>
                    <TextField
                        required
                        error={isError.language} 
                        label='Language' 
                        margin='normal'
                        variant='outlined'
                        fullWidth={true}
                        value={language}
                        onChange={(e) => {
                            if (e.target.value.trim() === '' ){
                                setIsError((prev) => {
                                    return {...prev, language: true}
                                });
                            }
                            else {
                                setIsError((prev) => {
                                    return {...prev, language: false}
                                });
                            }
                            setLanguage(e.target.value)
                        }} 
                    />
                    <h3 className={classes.label}>Upload Thumbnail</h3>
                    <label htmlFor="thumbnailImage">
                        <input
                            id="thumbnailImage"
                            name="thumbnailImage"
                            style={{ display: 'none' }}
                            className={classes.file} 
                            type="file"
                            onChange={imageHandler} />
                        <Button
                            className="btn-choose"
                            variant="outlined"
                            component="span" 
                            >
                            Choose Files
                        </Button>
                        <span>{imageName === '' ? '' : imageName['name']}</span>
                    </label>
                    <h3 className={classes.label}>Upload Video</h3>
                    <label htmlFor="video">
                        <input
                            id="video"
                            name="video"
                            style={{ display: 'none' }}
                            className={classes.file} 
                            type="file"
                            onChange={videoHandler} />
                        <Button
                            className="btn-choose"
                            variant="outlined"
                            component="span" >
                            Choose Files
                        </Button>
                        <span>{videoName === '' ? '' : videoName['name']}</span>
                    </label>
                    <div style={{height: 20}} />
                    <Button  variant='contained' fullWidth={true} type='submit'>
                        Submit
                        <span>{isLoading && <Spinner />}</span>
                    </Button>
                    <div style={{height: 20}} />
                </form>
                    
            </Grid>
        </Grid>
    );
}

export default UploadForm;