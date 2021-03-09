import React, {useState, useEffect} from "react";
import {Box, CircularProgress, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";
import SearchIcon from "../media/search/icon.svg";

export default function LiveSearch({placeholder, shedule, setPatient, setFormIsOpening}) {
    const styles = useStyles();
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {

    }, []);

    const handleChangeInput = (q) => {
        if (q.length >= 3) {
            setIsFocus(true);
            setIsLoading(true);

            clearTimeout(timer);
            const timer = setTimeout(() => {
                axios
                    .post(`/api/patients/search`, {"search": q})
                    .then((response) => {
                        setSearchResults(response.data);
                        setIsLoading(false);
                    })
            }, 200);
        } else {
            setIsFocus(false);
            setIsLoading(false);
            setSearchResults([]);
        }
    }
    const handleClickItem = (patient) => {
        setPatient(patient);
    }
    return(
        <Grid container className={styles.wrapper}>
            <Grid item xs={12}>
                <input
                    className={styles.input}
                    placeholder={placeholder? placeholder : "Поиск"}
                    onChange={(event) => handleChangeInput(event.target.value)}
                />
                <img className={styles.searchIcon} src={SearchIcon} alt={"search icon"}/>
                {isFocus &&
                    <Grid container xs={12} className={`${styles.searchResults} searchResults`}>
                        {isLoading ?
                            <Grid item xs={12} sm={12} className={styles.center}>
                                <CircularProgress color="primary" />
                            </Grid>
                            :searchResults.length ?
                                <Grid container>
                                    <Grid item xs={12} className={styles.itemsHeader}>
                                        <Box className={styles.itemCard}>Номер карты</Box>
                                        <Box className={styles.itemFullName}>ФИО</Box>
                                        <Box className={styles.itemBornDate}>Дата рождения</Box>
                                        <Box className={styles.itemContacts}>Номер телефона</Box>
                                    </Grid>
                                    {(searchResults).map((item, index) => {
                                        return(
                                            shedule ?
                                                <Grid item xs={12} className={styles.item} key={index} onClick={() => handleClickItem(item)}>
                                                    <Box className={styles.itemCard}>{item.card_number}</Box>
                                                    <Box className={styles.itemFullName}>{item.name} {item.patronymic} {item.surname}</Box>
                                                    <Box className={styles.itemBornDate}>{item.born_date}</Box>
                                                    <Box className={styles.itemContacts}>{item.contacts}</Box>
                                                </Grid>
                                                :
                                                <NavLink item xs={12} className={styles.item} key={index} to={`/cards/${item.user_id}`}>
                                                    <Box className={styles.itemCard}>{item.card_number}</Box>
                                                    <Box className={styles.itemFullName}>{item.name} {item.patronymic} {item.surname}</Box>
                                                    <Box className={styles.itemBornDate}>{item.born_date}</Box>
                                                    <Box className={styles.itemContacts}>{item.contacts}</Box>
                                                </NavLink>
                                        )
                                    })}
                                </Grid>
                                :<Grid item xs={12} className={styles.emptyResults}>
                                    <Box>Совпадений не найдено</Box>
                                    {shedule && <Box><button className={`${styles.button} ${styles.button_patientRecord}`} onClick={() => setFormIsOpening(true)}>Добавить нового пациента</button></Box>}
                                </Grid>}
                    </Grid>
                }

            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles(() => ({
    wrapper: {
        position: "relative"
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        background: "#FFFFFF",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.15)",
        borderRadius: "3px",
        width: "100%",
        height: "70px",
        border: "none",
        padding: "20px",
        textTransform: "capitalize"
    },
    searchIcon: {
        position: "absolute",
        top: "20px",
        right: "15px"
    },
    searchResults: {
        position: "absolute",
        background: "#FFFFFF",
        left: 0,
        right: 0,
        top: "75px",
        minHeight: "150px",
        padding: "10px"
    },
    button: {
        borderRadius: "30px",
        // height: "32px",
        minWidth: "80px",
        color: "#ffffff",
        padding: "10px 15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        margin: "10px 15px",
        cursor: "pointer",
        fontFamily: "Myriad"
    },
    button_patientRecord: {
        background: "#3B80D6"
    },
    emptyResults: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    itemsHeader: {
        color: "#494949",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        display: "flex",
        flexWrap: "nowrap",
        padding: "15px"
    },
    item: {
        width: "100%",
        display: "flex",
        flexWrap: "nowrap",
        padding: "15px",
        borderBottom: "1px solid #F6F7F8",
        cursor: "pointer",
        textDecoration: "none",
        color: "inherit",
        fontSize: "12px",
        "&:hover": {
            textDecoration: "none",
            color: "inherit",
            background: "#F4F7FA"
        }
    },
    itemCard: {
        width: "20%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    itemFullName: {
        width: "40%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    itemBornDate: {
        width: "20%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    itemContacts: {
        width: "20%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    }
}));
