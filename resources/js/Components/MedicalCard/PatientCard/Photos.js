import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import {useForm} from "react-hook-form";


const Dropzone = ({allImagesPatient, patient}) => {
    const uploadModalRef = useRef();
    const [showimage, setShowimage] = useState(false);

    const deliteImage = async (id) => {
      let deliteimages =  await axios.post("/api/patients/images/delete",{'id': id});
      setShowimage(false);
    }

    const [comment, setComment] = useState('');
    const openImage = (image) => {
      setComment((image.comment !== null)?image.comment:'')
      setShowimage(image);
    }

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState('panel0');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const closeUploadModal = () => {
        uploadModalRef.current.style.display = 'none';
    }

    const { handleSubmit, register } = useForm();
    const [loaded, setLoaded] = useState(false);
    const onSubmit = async (values) => {
        setLoaded(true);
        let request = await axios.post(
            '/api/patients/images/update',
            values
        ).then((response) => {
            if (response.status === 200 ){
                console.log(response.data);
                setLoaded(false);
            }
        });
    };
    const handleChangeComment = ({ currentTarget }) => {
        setComment(currentTarget.value);
    };
    return (
        <Grid item xs={12} className={`container_materials`}>
            <Grid container spacing={4}>
            <Grid item xs={12} md={4} lg={4} xl={4}>
                <div className="galeryPhotos">
                    <div className="galeryPhotos_title">Фотографии</div>
                    {allImagesPatient? (
                        Object.keys(allImagesPatient).map((date) => {
                            let images = allImagesPatient[date];
                            return (
                                <Accordion  expanded={expanded === 'panel'+date} className={classes.photo_accordion} onChange={handleChange('panel'+date)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={"panel"+date+"bh-content"}
                                        id={"panel"+date+"bh-header"}
                                        className="head_accordion"
                                    >
                                        <Typography component={'div'} className={classes.heading}>{date}</Typography>
                                        <Typography component={'div'}  className={classes.secondaryHeading}><div className="views_photo"></div> {images.length}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className={classes.accordionDetalis}>
                                        <Typography component={'div'}>
                                            <div className="containerPhotos">
                                                <Grid container>
                                                    {
                                                        images.map((data) =>
                                                            <Grid item xs={12} sm={3}>
                                                                <div className="galery_patient_card" onClick={(() => openImage(data))}>
                                                                    <img src={'/storage/'+data.uri} alt=""/>
                                                                </div>
                                                            </Grid>
                                                        )}

                                                </Grid>
                                            </div>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })
                    ): (null)
                    }
                </div>
            </Grid>
            <Grid item xs={12} md={8} lg={8} xl={8}>
                            <div className="open_galeryPhotos">
                                {allImagesPatient ? (
                                    showimage?
                                        <Grid container>
                                            <Grid item xs={12} sm={12}>
                                                <div className="delite_image">
                                                    <IconButton aria-label="delete" onClick={(() => deliteImage(showimage.id))}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                                <div className="show_image_patient_card">
                                                    <img src={'/storage/'+showimage.uri} alt=""/>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                                                    <input type={"hidden"} ref={register} name={'photo_id'} value={showimage.id}/>
                                                    <TextField
                                                        inputRef={register}
                                                        label="Комментарий"
                                                        name={"comment"}
                                                        multiline
                                                        rowsMax={15}
                                                        value={comment}
                                                        variant="outlined"
                                                        fullWidth={true}
                                                        onChange={handleChangeComment}
                                                        InputProps={{ classes: { input: classes.textArea } }}
                                                    />
                                                    <button
                                                        className={classes.btnSave}
                                                        type="submit"
                                                    >
                                                        Сохранить
                                                    </button>
                                                </form>
                                            </Grid>
                                        </Grid>
                                        :
                                        null
                                ):<div className="title_notfoto">Пока не добавлено фотографий</div>}

                            </div>
                        </Grid>
        </Grid>
        </Grid>
    );
}

export default Dropzone;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: 12,
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: 12,
        display:"flex",
        alignItems: "baseline"
    },
    photo_accordion:{
        backgroundColor: '#F4F7FA'
    },
    accordionDetalis:{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    form: {
        marginTop: '35px',
    },
    textArea: {
        minHeight: '70px',
    },
    btnSave: {
        marginTop: '30px',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#F6F7F8',
        background: '#3B80D6',
        borderRadius: '25px',
        border: 'none',
        padding: '8px 13px',
    },
}));
