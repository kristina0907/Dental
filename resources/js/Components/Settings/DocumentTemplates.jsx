import React, { useRef, useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Vector from "../Appoints/media/Vector";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AddDocumentSettings from "../helpers/AddDocumentSettings";


const DocumentTemplate = (props) => {
    const [hideBtnClicked, sethideBtnClicked] = useState({
        "block_1": false,
    });
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [getVisibleAddDocument, setVisibleAddDocument] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={3} lg={3} xl={2}>
                <Grid item xs={12} >
                    <div className="filter_material">
                        {hideBtnClicked.block_1 ? null : (
                            <div className="hide-shedule-btn">
                                <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: true})}/>
                            </div>
                        )}
                        {!hideBtnClicked.block_1? (
                            <div>
                                <div className="title_filter">Показывать</div>
                                <form action="">
                                    <div className="form_radio">
                                        <input id="radio-1"
                                               name={`gender`}
                                               type="radio"
                                               value="1"/>
                                        <label htmlFor="radio-1">Все типы</label>
                                    </div>
                                    <div className="input_patient_checkbox">
                                        <input
                                            name={`status`}
                                            type="checkbox"
                                            value="1"/>
                                        <label>Отчеты</label>
                                    </div>
                                    <div className="input_patient_checkbox">
                                        <input
                                            name={`access `}
                                            type="checkbox"
                                            value={1}/>
                                        <label>Пациенты</label>
                                    </div>
                                    <div className="input_patient_checkbox">
                                        <input
                                            name={`status`}
                                            defaultChecked={true}
                                            type="checkbox"
                                            value="3"/>
                                        <label>Сотрудники</label>
                                    </div>
                                    <div className="input_patient_checkbox">
                                        <input
                                            name={`status`}
                                            type="checkbox"
                                            value="4"/>
                                        <label>Запись на приём</label>
                                    </div>
                                    <div className="container_btn_filter">
                                        <button type={"submit"} className="btn_filter">Применить</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className={`show-shedule-btn`}>
                                <div className={`row`}>
                                    <div className="col-lg-5 left-line">
                                        <hr />
                                    </div>
                                    <div className="col-lg-1 circle-btn">
                                        <button onClick={() => sethideBtnClicked({...hideBtnClicked, block_1: false})}>
                                            <Vector />
                                        </button>
                                    </div>
                                    <div className="col-lg-5 right-line">
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={12} md={3} lg={3} xl={4}>
                <div className="galeryPhotos">
                <Grid container className="container_document_title">
                <Grid item xs={12} sm={12}>
                    <AddDocumentSettings getVisible={getVisibleAddDocument} visible={setVisibleAddDocument}/>
                </Grid>
                  <Grid item xs={12} md={12} xl={8}>
                    <div className="document_title">Список документов</div>
                  </Grid>
                  <Grid item xs={12} md={12} xl={4}>
                  <button className="btn_creat_patient" onClick={() => setVisibleAddDocument(true)}>
                      + Добавить
                  </button>
                  </Grid>
                </Grid>
                    <Accordion  expanded={expanded === 'panel1'} className={classes.document_accordion} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={"panel1bh-content"}
                            id={"panel1bh-header"}
                            className="head_accordion"
                        >
                            <Typography component={'div'} className={classes.heading}>Отчет касса</Typography>
                            <Typography component={'div'}  className={classes.secondaryHeading}>
                                <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.0926 2.42416H6.28847L4.0926 0.213013V2.42416Z" fill="#B0BAC5"/>
                                <path d="M0 7.63636C0 7.83719 0.161681 8 0.361111 8H6.13889C6.33832 8 6.5 7.83719 6.5 7.63636V3.15144H3.73148C3.53205 3.15144 3.37037 2.98863 3.37037 2.78781V0H0.361111C0.161681 0 0 0.162812 0 0.363636V7.63636Z" fill="#B0BAC5"/>
                            </svg> 6
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetalis}>
                            <Typography component={'div'}>
                                <div className="containerPhotos">
                                    <Grid container>
                                       <div className="document_item_list">
                                          <div>
                                            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M8.18518 4.84833H12.5769L8.18518 0.426025V4.84833Z" fill="#B0BAC5"/>
                                              <path d="M0.722222 0C0.323363 0 0 0.325624 0 0.727273V15.2727C0 15.6744 0.323363 16 0.722222 16H12.2778C12.6766 16 13 15.6744 13 15.2727V6.30288H7.46296C7.0641 6.30288 6.74074 5.97726 6.74074 5.57561V0H0.722222ZM7.06849 10.1327C7.06935 10.1356 7.07012 10.1385 7.07089 10.1413L7.37389 11.2796L8.13034 8.57576C8.19111 8.35248 8.39824 8.20078 8.64519 8.20078C8.9791 8.20078 9.2507 8.44233 9.2507 8.7392C9.2507 8.76974 9.2507 8.82565 9.22894 8.89634L7.96924 13.2836C7.96857 13.2858 7.96794 13.288 7.96727 13.2902C7.89042 13.5401 7.65411 13.7015 7.36522 13.7015C7.06849 13.7015 6.82813 13.5296 6.76448 13.273L6.50332 12.2954L6.24149 13.2747C6.17611 13.5302 5.93546 13.7015 5.64123 13.7015C5.34859 13.7015 5.1117 13.5382 5.03774 13.2853L3.77188 8.89823C3.74925 8.82671 3.74925 8.77023 3.74925 8.7392C3.74925 8.44228 4.021 8.20078 4.35495 8.20078C4.60263 8.20078 4.80981 8.35302 4.87057 8.57959L5.62621 11.2799L5.92824 10.1456C5.99127 9.88853 6.21617 9.72286 6.50337 9.72286C6.77796 9.72291 6.99448 9.8799 7.06849 10.1327Z" fill="#B0BAC5"/>
                                            </svg> Договор для детей
                                          </div>
                                          <div className="btn_document_item_list">
                                          <div>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clip-path="url(#clip0)">
                                              <path d="M6.00002 8C5.89752 8 5.79952 7.958 5.72902 7.884L3.10402 5.134C2.87652 4.896 3.04552 4.5 3.37502 4.5H4.75002V1.625C4.75002 1.2805 5.03052 1 5.37502 1H6.62502C6.96952 1 7.25002 1.2805 7.25002 1.625V4.5H8.62502C8.95452 4.5 9.12352 4.896 8.89602 5.134L6.27102 7.884C6.20052 7.958 6.10252 8 6.00002 8Z" fill="#868789"/>
                                              <path d="M11.125 11H0.875C0.3925 11 0 10.6075 0 10.125V9.875C0 9.3925 0.3925 9 0.875 9H11.125C11.6075 9 12 9.3925 12 9.875V10.125C12 10.6075 11.6075 11 11.125 11Z" fill="#868789"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0">
                                              <rect width="12" height="12" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <div>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clip-path="url(#clip0)">
                                              <path d="M10.0391 3.16991L9.77736 2.38554C9.72467 2.22767 9.57692 2.12122 9.41049 2.12122H2.58961C2.42318 2.12122 2.27544 2.22769 2.22275 2.38554L1.96102 3.16991C1.90172 3.34761 2.03398 3.53117 2.22132 3.53117H9.77876C9.96612 3.53117 10.0984 3.34761 10.0391 3.16991Z" fill="#868789"/>
                                              <path d="M3.17859 11.5259C3.20859 11.7958 3.43678 12.0001 3.70842 12.0001H8.24869C8.52033 12.0001 8.74852 11.7958 8.77852 11.5259L9.58863 4.23499H2.36848L3.17859 11.5259Z" fill="#868789"/>
                                              <path d="M5.29436 1.00777C5.29436 0.839789 5.43102 0.703125 5.599 0.703125H6.63467C6.80265 0.703125 6.93931 0.839789 6.93931 1.00777V1.4187H7.64244V1.00777C7.64244 0.452086 7.19035 0 6.63467 0H5.599C5.04332 0 4.59123 0.452086 4.59123 1.00777V1.4187H5.29436V1.00777Z" fill="#868789"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0">
                                              <rect width="12" height="12" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          </div>

                                       </div>
                                       <div className="document_item_list">
                                          <div>
                                            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M8.18518 4.84833H12.5769L8.18518 0.426025V4.84833Z" fill="#B0BAC5"/>
                                              <path d="M0.722222 0C0.323363 0 0 0.325624 0 0.727273V15.2727C0 15.6744 0.323363 16 0.722222 16H12.2778C12.6766 16 13 15.6744 13 15.2727V6.30288H7.46296C7.0641 6.30288 6.74074 5.97726 6.74074 5.57561V0H0.722222ZM7.06849 10.1327C7.06935 10.1356 7.07012 10.1385 7.07089 10.1413L7.37389 11.2796L8.13034 8.57576C8.19111 8.35248 8.39824 8.20078 8.64519 8.20078C8.9791 8.20078 9.2507 8.44233 9.2507 8.7392C9.2507 8.76974 9.2507 8.82565 9.22894 8.89634L7.96924 13.2836C7.96857 13.2858 7.96794 13.288 7.96727 13.2902C7.89042 13.5401 7.65411 13.7015 7.36522 13.7015C7.06849 13.7015 6.82813 13.5296 6.76448 13.273L6.50332 12.2954L6.24149 13.2747C6.17611 13.5302 5.93546 13.7015 5.64123 13.7015C5.34859 13.7015 5.1117 13.5382 5.03774 13.2853L3.77188 8.89823C3.74925 8.82671 3.74925 8.77023 3.74925 8.7392C3.74925 8.44228 4.021 8.20078 4.35495 8.20078C4.60263 8.20078 4.80981 8.35302 4.87057 8.57959L5.62621 11.2799L5.92824 10.1456C5.99127 9.88853 6.21617 9.72286 6.50337 9.72286C6.77796 9.72291 6.99448 9.8799 7.06849 10.1327Z" fill="#B0BAC5"/>
                                            </svg> Договор для детей
                                          </div>
                                          <div className="btn_document_item_list">
                                          <div>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clip-path="url(#clip0)">
                                              <path d="M6.00002 8C5.89752 8 5.79952 7.958 5.72902 7.884L3.10402 5.134C2.87652 4.896 3.04552 4.5 3.37502 4.5H4.75002V1.625C4.75002 1.2805 5.03052 1 5.37502 1H6.62502C6.96952 1 7.25002 1.2805 7.25002 1.625V4.5H8.62502C8.95452 4.5 9.12352 4.896 8.89602 5.134L6.27102 7.884C6.20052 7.958 6.10252 8 6.00002 8Z" fill="#868789"/>
                                              <path d="M11.125 11H0.875C0.3925 11 0 10.6075 0 10.125V9.875C0 9.3925 0.3925 9 0.875 9H11.125C11.6075 9 12 9.3925 12 9.875V10.125C12 10.6075 11.6075 11 11.125 11Z" fill="#868789"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0">
                                              <rect width="12" height="12" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <div>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clip-path="url(#clip0)">
                                              <path d="M10.0391 3.16991L9.77736 2.38554C9.72467 2.22767 9.57692 2.12122 9.41049 2.12122H2.58961C2.42318 2.12122 2.27544 2.22769 2.22275 2.38554L1.96102 3.16991C1.90172 3.34761 2.03398 3.53117 2.22132 3.53117H9.77876C9.96612 3.53117 10.0984 3.34761 10.0391 3.16991Z" fill="#868789"/>
                                              <path d="M3.17859 11.5259C3.20859 11.7958 3.43678 12.0001 3.70842 12.0001H8.24869C8.52033 12.0001 8.74852 11.7958 8.77852 11.5259L9.58863 4.23499H2.36848L3.17859 11.5259Z" fill="#868789"/>
                                              <path d="M5.29436 1.00777C5.29436 0.839789 5.43102 0.703125 5.599 0.703125H6.63467C6.80265 0.703125 6.93931 0.839789 6.93931 1.00777V1.4187H7.64244V1.00777C7.64244 0.452086 7.19035 0 6.63467 0H5.599C5.04332 0 4.59123 0.452086 4.59123 1.00777V1.4187H5.29436V1.00777Z" fill="#868789"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0">
                                              <rect width="12" height="12" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          </div>

                                       </div>
                                       <div className="document_item_list">
                                          <div>
                                            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M8.18518 4.84833H12.5769L8.18518 0.426025V4.84833Z" fill="#B0BAC5"/>
                                              <path d="M0.722222 0C0.323363 0 0 0.325624 0 0.727273V15.2727C0 15.6744 0.323363 16 0.722222 16H12.2778C12.6766 16 13 15.6744 13 15.2727V6.30288H7.46296C7.0641 6.30288 6.74074 5.97726 6.74074 5.57561V0H0.722222ZM7.06849 10.1327C7.06935 10.1356 7.07012 10.1385 7.07089 10.1413L7.37389 11.2796L8.13034 8.57576C8.19111 8.35248 8.39824 8.20078 8.64519 8.20078C8.9791 8.20078 9.2507 8.44233 9.2507 8.7392C9.2507 8.76974 9.2507 8.82565 9.22894 8.89634L7.96924 13.2836C7.96857 13.2858 7.96794 13.288 7.96727 13.2902C7.89042 13.5401 7.65411 13.7015 7.36522 13.7015C7.06849 13.7015 6.82813 13.5296 6.76448 13.273L6.50332 12.2954L6.24149 13.2747C6.17611 13.5302 5.93546 13.7015 5.64123 13.7015C5.34859 13.7015 5.1117 13.5382 5.03774 13.2853L3.77188 8.89823C3.74925 8.82671 3.74925 8.77023 3.74925 8.7392C3.74925 8.44228 4.021 8.20078 4.35495 8.20078C4.60263 8.20078 4.80981 8.35302 4.87057 8.57959L5.62621 11.2799L5.92824 10.1456C5.99127 9.88853 6.21617 9.72286 6.50337 9.72286C6.77796 9.72291 6.99448 9.8799 7.06849 10.1327Z" fill="#B0BAC5"/>
                                            </svg> Договор для детей
                                          </div>
                                          <div className="btn_document_item_list">
                                          <div>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clip-path="url(#clip0)">
                                              <path d="M6.00002 8C5.89752 8 5.79952 7.958 5.72902 7.884L3.10402 5.134C2.87652 4.896 3.04552 4.5 3.37502 4.5H4.75002V1.625C4.75002 1.2805 5.03052 1 5.37502 1H6.62502C6.96952 1 7.25002 1.2805 7.25002 1.625V4.5H8.62502C8.95452 4.5 9.12352 4.896 8.89602 5.134L6.27102 7.884C6.20052 7.958 6.10252 8 6.00002 8Z" fill="#868789"/>
                                              <path d="M11.125 11H0.875C0.3925 11 0 10.6075 0 10.125V9.875C0 9.3925 0.3925 9 0.875 9H11.125C11.6075 9 12 9.3925 12 9.875V10.125C12 10.6075 11.6075 11 11.125 11Z" fill="#868789"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0">
                                              <rect width="12" height="12" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          <div>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <g clip-path="url(#clip0)">
                                              <path d="M10.0391 3.16991L9.77736 2.38554C9.72467 2.22767 9.57692 2.12122 9.41049 2.12122H2.58961C2.42318 2.12122 2.27544 2.22769 2.22275 2.38554L1.96102 3.16991C1.90172 3.34761 2.03398 3.53117 2.22132 3.53117H9.77876C9.96612 3.53117 10.0984 3.34761 10.0391 3.16991Z" fill="#868789"/>
                                              <path d="M3.17859 11.5259C3.20859 11.7958 3.43678 12.0001 3.70842 12.0001H8.24869C8.52033 12.0001 8.74852 11.7958 8.77852 11.5259L9.58863 4.23499H2.36848L3.17859 11.5259Z" fill="#868789"/>
                                              <path d="M5.29436 1.00777C5.29436 0.839789 5.43102 0.703125 5.599 0.703125H6.63467C6.80265 0.703125 6.93931 0.839789 6.93931 1.00777V1.4187H7.64244V1.00777C7.64244 0.452086 7.19035 0 6.63467 0H5.599C5.04332 0 4.59123 0.452086 4.59123 1.00777V1.4187H5.29436V1.00777Z" fill="#868789"/>
                                              </g>
                                              <defs>
                                              <clipPath id="clip0">
                                              <rect width="12" height="12" fill="white"/>
                                              </clipPath>
                                              </defs>
                                            </svg>
                                          </div>
                                          </div>

                                       </div>
                                    </Grid>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion  expanded={expanded === 'panel2'} className={classes.document_accordion} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={"panel1bh-content"}
                            id={"panel1bh-header"}
                            className="head_accordion"
                        >
                            <Typography component={'div'} className={classes.heading}>Пациенты: Счет квитанции</Typography>
                            <Typography component={'div'}  className={classes.secondaryHeading}>
                                <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.0926 2.42416H6.28847L4.0926 0.213013V2.42416Z" fill="#B0BAC5"/>
                                    <path d="M0 7.63636C0 7.83719 0.161681 8 0.361111 8H6.13889C6.33832 8 6.5 7.83719 6.5 7.63636V3.15144H3.73148C3.53205 3.15144 3.37037 2.98863 3.37037 2.78781V0H0.361111C0.161681 0 0 0.162812 0 0.363636V7.63636Z" fill="#B0BAC5"/>
                                </svg> 2
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetalis}>
                            <Typography component={'div'}>
                                <div className="containerPhotos">
                                    <Grid container>

                                    </Grid>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion  expanded={expanded === 'panel3'} className={classes.document_accordion} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={"panel1bh-content"}
                            id={"panel1bh-header"}
                            className="head_accordion"
                        >
                            <Typography component={'div'} className={classes.heading}>Пациенты: План лечения</Typography>
                            <Typography component={'div'}  className={classes.secondaryHeading}>
                                <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.0926 2.42416H6.28847L4.0926 0.213013V2.42416Z" fill="#B0BAC5"/>
                                    <path d="M0 7.63636C0 7.83719 0.161681 8 0.361111 8H6.13889C6.33832 8 6.5 7.83719 6.5 7.63636V3.15144H3.73148C3.53205 3.15144 3.37037 2.98863 3.37037 2.78781V0H0.361111C0.161681 0 0 0.162812 0 0.363636V7.63636Z" fill="#B0BAC5"/>
                                </svg> 8
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetalis}>
                            <Typography component={'div'}>
                                <div className="containerPhotos">
                                    <Grid container>

                                    </Grid>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion  expanded={expanded === 'panel4'} className={classes.document_accordion} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={"panel1bh-content"}
                            id={"panel1bh-header"}
                            className="head_accordion"
                        >
                            <Typography component={'div'} className={classes.heading}>Пациенты: документы</Typography>
                            <Typography component={'div'}  className={classes.secondaryHeading}>
                                <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.0926 2.42416H6.28847L4.0926 0.213013V2.42416Z" fill="#B0BAC5"/>
                                    <path d="M0 7.63636C0 7.83719 0.161681 8 0.361111 8H6.13889C6.33832 8 6.5 7.83719 6.5 7.63636V3.15144H3.73148C3.53205 3.15144 3.37037 2.98863 3.37037 2.78781V0H0.361111C0.161681 0 0 0.162812 0 0.363636V7.63636Z" fill="#B0BAC5"/>
                                </svg> 1
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetalis}>
                            <Typography component={'div'}>
                                <div className="containerPhotos">
                                    <Grid container>

                                    </Grid>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion  expanded={expanded === 'panel5'} className={classes.document_accordion} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={"panel1bh-content"}
                            id={"panel1bh-header"}
                            className="head_accordion"
                        >
                            <Typography component={'div'} className={classes.heading}>Отчет касса</Typography>
                            <Typography component={'div'}  className={classes.secondaryHeading}>
                                <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.0926 2.42416H6.28847L4.0926 0.213013V2.42416Z" fill="#B0BAC5"/>
                                    <path d="M0 7.63636C0 7.83719 0.161681 8 0.361111 8H6.13889C6.33832 8 6.5 7.83719 6.5 7.63636V3.15144H3.73148C3.53205 3.15144 3.37037 2.98863 3.37037 2.78781V0H0.361111C0.161681 0 0 0.162812 0 0.363636V7.63636Z" fill="#B0BAC5"/>
                                </svg> 6
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetalis}>
                            <Typography component={'div'}>
                                <div className="containerPhotos">
                                    <Grid container>

                                    </Grid>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
                <div className="open_galeryPhotos">
                <iframe className="document_iframe" src="https://www.vfsglobal.com/estonia/pskov/pdf/consent_on_personal_data_120216.pdf"></iframe>
                </div>
            </Grid>
        </Grid>
    );
}

export default DocumentTemplate;

const useStyles = makeStyles((theme) => ({

    document_accordion:{
        backgroundColor: '#F4F7FA'
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: 12,
        flexBasis: '50%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: 12,
        display:"flex",
        alignItems: "center"
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
