import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AboutPatient from "./AboutPatient";
import InvoicePatient from "./InvoicePatient";
import Grid from "@material-ui/core/Grid";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Link,
    withRouter,
    useParams,
} from "react-router-dom";
import MedicalCard from "../MedicalCard";
import Photos from "./Photos";
import InspectionPatient from './InspectionPatient';
import MedicalHistory from "./medicalHistory";
import NotFound from "../../NotFound";
import Calendar from "../../Index/Calendar";
import SheduleFilter from "../../Index/SheduleFilter";
import Header from "../../helpers/Header";
import HeaderRight from "../../helpers/HeaderRight";
import IncomingCall from "../../IncomingCall";
import axios from "axios";
import {connect} from "react-redux";
import {getAllImages,imagesUpload} from "../../../actions/patientActions";
import store from "../../../store";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            className={`tabpanel`}
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'div'} >{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}


function PatientCard({allImages}) {
    const styles = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let { patientId } = useParams();

    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [getPatient, setPatient] = useState([]);
    const [getUpdated, setUpdated] = useState(false);
    const [getUpdatedImage, setUpdatedImage] = useState(false);

    useEffect(() => {

        axios({
            method: "get",
            url: `/api/patients/get/from/id/${patientId}`,
        }).then(
            (result) => {
                setPatient(result.data);
                setError(null);
                setIsLoaded(true);
            },
            (error) => {
                setError(true);
                setIsLoaded(true);
            }
        )

    }, []);

    useEffect(() => {
        if (getUpdated){
            setIsLoaded(false);
            axios({
                method: "get",
                url: `/api/patients/get/from/id/${patientId}`,
            }).then(
                (result) => {
                    setPatient(result.data);
                    setError(null);
                    setIsLoaded(true);
                    setUpdated(false)
                },
                (error) => {
                    setError(true);
                    setIsLoaded(true);
                }
            )
        }
    }, [getUpdated]);
    const fileInputRef = useRef();
    const [allImage, setallImage] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);


    useEffect(() => {
       if(getPatient && getPatient.patientCards){
        store.dispatch(getAllImages({'patient_card_id': getPatient.patientCards.id}));
       }
    },[getPatient]);

    useEffect(() => {
        if(getUpdatedImage){
            store.dispatch(getAllImages({'patient_card_id': getPatient.patientCards.id}));
            setUpdatedImage(false);
        }
    },[getUpdatedImage]);

    const uploadFiles = async (images) => {
        const formData = new FormData();
        formData.append('patient_card_id', getPatient.patientCards.id);
        for (let i = 0; i < images.length; i++) {
            formData.append('image', images[i]);
        }
        await store.dispatch(imagesUpload(formData));
        setUpdatedImage(true);
    }

    const preventDefault = (e) => {
        e.preventDefault();
        // e.stopPropagation();
    }

    const dragOver = (e) => {
        preventDefault(e);
    }

    const dragEnter = (e) => {
        preventDefault(e);
    }

    const dragLeave = (e) => {
        preventDefault(e);
    }


    const fileDrop =  (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
            uploadFiles(files);
        }
    }

    const filesSelected = async () => {
        if (fileInputRef.current.files.length) {
            await handleFiles(fileInputRef.current.files);
            uploadFiles(fileInputRef.current.files);
        }
    }

    const fileInputClicked =  () => {
        fileInputRef.current.click();
    }

    const handleFiles =  (files) => {
        for(let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                const reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = function(e) {
                    //console.log(`url(${e.target.result})`);
                    files[i].url = `url(${e.target.result})`;
                }
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                files[i]['invalid'] = true;
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                setErrorMessage('File type not permitted');
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
            }
        }
    }

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }

        return true;
    }
    return (
            <Router>
                {error ? (<Route component={NotFound} />):(
                    <Switch>
                    <Route path="/cards/:patientId">
                        <Grid className={"content_main_tab_card"} container spacing={4}>
                            <Grid item xs={12} md={3} lg={3} xl={2}>
                                <Grid item xs={12} className={styles.wrapper_component}>
                                    <IncomingCall />
                                </Grid>
                                {value === 2 && isLoaded?
                                    <Grid item xs={12} className={styles.wrapper_component}>
                                        <div className="dropZone">
                                            <div className="dropZone_title">Добавить фотографии</div>
                                            <div className="drop-container"
                                                 onDragOver={dragOver}
                                                 onDragEnter={dragEnter}
                                                 onDragLeave={dragLeave}
                                                 onDrop={fileDrop}
                                                 onClick={fileInputClicked}
                                            >
                                                <div className="drop-message">
                                                    <div>Перенесите фотографии</div>
                                                    <div className="upload-icon"></div>
                                                    <div>или нажмите сюда</div>
                                                </div>
                                                <input
                                                    ref={fileInputRef}
                                                    className="file-input"
                                                    type="file"
                                                    multiple
                                                    onChange={filesSelected}
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                    :null
                                }
                            </Grid>
                            <Grid item xs={12} md={9} lg={9} xl={10}>
                                <Grid item xs={12} className={"wrapper_component"}>
                                    <Grid item xs={12} md={9} xl={9}>
                                        <Box>
                                            <Header breadcrumb={
                                                {
                                                    "pageTitle": "Картотека",
                                                    "links":[
                                                        {"url": "/", "title": "Главная"},
                                                        {"url": "/cards", "title": "Картотека"}
                                                    ]
                                                }
                                            }/>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={3} xl={3}>
                                        <Box>
                                            <HeaderRight />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <AppBar position="static" color="default">
                                        <Tabs
                                            className="med-directions-menu ui-block"
                                            value={value}
                                            onChange={handleChange}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            aria-label="scrollable auto tabs example"
                                        >
                                            <Tab className="btn_tab_patient" label="О пациенте" {...a11yProps(0)} />
                                            <Tab className="btn_tab_patient" label="Осмотр" {...a11yProps(1)} />
                                            {/*<Tab className="btn_tab_patient" label="План лечения" {...a11yProps(2)} />*/}
                                            {/*<Tab className="btn_tab_patient" label="Лечение" {...a11yProps(3)} />*/}
                                            <Tab className="btn_tab_patient" label="Фотографии" {...a11yProps(2)} />
                                            <Tab className="btn_tab_patient" label="Счета" {...a11yProps(3)} />
                                            <Tab className="btn_tab_patient" label="История болезни" {...a11yProps(4)} />
                                        </Tabs>
                                    </AppBar>
                                <Box>
                                    <TabPanel value={value} index={0}>
                                        <AboutPatient patient={getPatient} updated={setUpdated} loaded={isLoaded}/>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        {isLoaded ? <InspectionPatient patient={getPatient}/> : null}
                                    </TabPanel>
                                    {/*<TabPanel value={value} index={2}>*/}
                                    {/*    План лечения*/}
                                    {/*</TabPanel>*/}
                                    {/*<TabPanel value={value} index={3}>*/}
                                    {/*    Лечение*/}
                                    {/*</TabPanel>*/}
                                    <TabPanel value={value} index={2}>
                                        {isLoaded ? <Photos allImagesPatient={allImages} patient={getPatient}/> : null}
                                    </TabPanel>
                                    <TabPanel value={value} index={3}>
                                        {isLoaded ?<InvoicePatient patient={getPatient} loaded={isLoaded}/>: null}
                                    </TabPanel>
                                    <TabPanel value={value} index={4}>
                                        {isLoaded ?<MedicalHistory patient={getPatient} loaded={isLoaded} />: null}
                                    </TabPanel>
                                </Box>
                            </Grid>
                        </Grid>
                    </Route>
                    <Route path="/cards">
                        <MedicalCard/>
                    </Route>
                </Switch>
                )}
            </Router>
    );
}

const mapStateToProps = (state) => ({
    allImages: state.patients.allImages,
});

export default connect(mapStateToProps, { getAllImages,imagesUpload })(PatientCard);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',

    },
    wrapper_component: {
        marginBottom: "20px"
    }
}));
